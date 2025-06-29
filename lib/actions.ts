"use server"

import { createClient } from "@/lib/supabase/server"
import { z } from "zod"
import { Resend } from "resend"
import Twilio from "twilio"
import { InquiryConfirmationEmail } from "@/components/emails/inquiry-confirmation"
import { InternalNotificationEmail } from "@/components/emails/internal-notification"

// --- Client Initialization ---

function getResendClient() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn("[Resend] RESEND_API_KEY is undefined – skipping email send.")
    return null
  }
  return new Resend(key)
}

function getTwilioClient() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (!accountSid || !authToken) {
    console.warn("[Twilio] Account SID or Auth Token is missing. Skipping WhatsApp notification.")
    return null
  }
  return Twilio(accountSid, authToken)
}

// --- Zod Schema ---

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long."),
})

// --- Server Action ---

export async function submitInquiry(prevState: any, formData: FormData) {
  // 1. Validate Form Data
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

  // 2. Save to Database
  const supabase = createClient()
  const { error: dbError } = await supabase.from("inquiries").insert([validatedFields.data])

  if (dbError) {
    console.error("Supabase error:", dbError)
    return {
      success: false,
      message: "There was an error submitting your inquiry. Please try again.",
    }
  }

  // 3. Send Notifications (Email & WhatsApp)
  const { name, email, company, phone, message } = validatedFields.data

  // Send Emails
  try {
    const resend = getResendClient()
    if (resend) {
      const internalNotifyEmail = process.env.INTERNAL_EMAIL_ADDRESS
      const emailPromises = [
        resend.emails.send({
          from: "Hopes Industrial <noreply@yourdomain.com>",
          to: email,
          subject: "Inquiry Received | Hopes Industrial Solutions",
          react: InquiryConfirmationEmail({ name }),
        }),
      ]
      if (internalNotifyEmail) {
        emailPromises.push(
          resend.emails.send({
            from: "Website Notification <noreply@yourdomain.com>",
            to: internalNotifyEmail,
            subject: `New Inquiry from ${name}`,
            react: InternalNotificationEmail({ name, email, company, phone, message }),
          }),
        )
      }
      await Promise.all(emailPromises)
    }
  } catch (emailError) {
    console.error("[Resend] Email send failed:", emailError)
  }

  // Send WhatsApp Message
  try {
    const twilio = getTwilioClient()
    const fromNumber = process.env.TWILIO_WHATSAPP_FROM_NUMBER
    const toNumber = process.env.INTERNAL_WHATSAPP_TO_NUMBER
    if (twilio && fromNumber && toNumber) {
      const messageBody = `*New Lead: Hopes Industrial*\n\n*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company || "N/A"}\n*Phone:* ${phone || "N/A"}\n\n*Message:*\n${message}`

      await twilio.messages.create({
        from: `whatsapp:${fromNumber}`,
        to: `whatsapp:${toNumber}`,
        body: messageBody,
      })
    }
  } catch (whatsappError) {
    console.error("[Twilio] WhatsApp send failed:", whatsappError)
  }

  return {
    success: true,
    message: "Thank you for your inquiry! We will get back to you shortly.",
  }
}
