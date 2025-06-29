"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { Resend } from "resend"
import { InquiryConfirmationEmail } from "@/components/emails/inquiry-confirmation"
import { InternalNotificationEmail } from "@/components/emails/internal-notification"

function getResendClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn("[Resend] RESEND_API_KEY is undefined – skipping email send.")
    return null
  }
  return new Resend(key)
}

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long."),
})

export async function submitInquiry(prevState: any, formData: FormData) {
  const validatedFields = inquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    const firstErrorMessage = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0]
    return {
      success: false,
      message: firstErrorMessage || "Invalid data provided. Please check the form.",
    }
  }

  const supabase = createClient()
  const { error: dbError } = await supabase.from("inquiries").insert([validatedFields.data])

  if (dbError) {
    console.error("Supabase error:", dbError)
    return {
      success: false,
      message: "There was an error submitting your inquiry. Please try again.",
    }
  }

  try {
    const resend = getResendClient()
    if (resend) {
      const { name, email, company, phone, message } = validatedFields.data
      const internalNotifyEmail = process.env.INTERNAL_EMAIL_ADDRESS
      const emailPromises = []

      // 1. Send confirmation to user
      emailPromises.push(
        resend.emails.send({
          from: "Hopes Industrial <noreply@yourdomain.com>", // IMPORTANT: Use your verified domain
          to: email,
          subject: "Inquiry Received | Hopes Industrial Solutions",
          react: InquiryConfirmationEmail({ name }),
        }),
      )

      // 2. Send notification to internal team
      if (internalNotifyEmail) {
        emailPromises.push(
          resend.emails.send({
            from: "Website Notification <noreply@yourdomain.com>", // IMPORTANT: Use your verified domain
            to: internalNotifyEmail,
            subject: `New Inquiry from ${name}`,
            react: InternalNotificationEmail({ name, email, company, phone, message }),
          }),
        )
      } else {
        console.warn("[Resend] INTERNAL_EMAIL_ADDRESS is not set. Skipping internal notification.")
      }

      await Promise.all(emailPromises)
    }
  } catch (emailError) {
    console.error("[Resend] Email send failed:", emailError)
  }

  return {
    success: true,
    message: "Thank you for your inquiry! We will get back to you shortly.",
  }
}
