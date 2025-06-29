"use client"

import { useFormStatus } from "react-dom"
import { useActionState, useEffect } from "react"
import { submitInquiry } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const initialState = {
  message: "",
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        "Submit Inquiry"
      )}
    </Button>
  )
}

export function ContactForm() {
  const [state, formAction /* dispatch */, isPending] = useActionState(submitInquiry, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        })
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        })
      }
    }
  }, [state, toast])

  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Your company name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" placeholder="Your phone number" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Your Requirement</Label>
            <Textarea id="message" name="message" placeholder="Describe your requirements" rows={5} required />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  )
}
