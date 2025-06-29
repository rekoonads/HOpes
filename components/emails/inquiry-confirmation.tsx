import type * as React from "react"

interface InquiryConfirmationEmailProps {
  name: string
}

export const InquiryConfirmationEmail: React.FC<Readonly<InquiryConfirmationEmailProps>> = ({ name }) => (
  <div>
    <h1>Thank you for your inquiry, {name}!</h1>
    <p>We have received your message and will get back to you as soon as possible.</p>
    <p>Our team is reviewing your request and will contact you at the email address you provided.</p>
    <br />
    <p>Best regards,</p>
    <p>The Hopes Industrial Solutions Team</p>
  </div>
)
