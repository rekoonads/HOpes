import type * as React from "react"

interface InternalNotificationEmailProps {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

export const InternalNotificationEmail: React.FC<Readonly<InternalNotificationEmailProps>> = ({
  name,
  email,
  company,
  phone,
  message,
}) => (
  <div style={{ fontFamily: "sans-serif", lineHeight: "1.5" }}>
    <h1>New Inquiry Received</h1>
    <p>A new inquiry has been submitted through the website contact form.</p>
    <hr />
    <h2 style={{ color: "#333" }}>Inquiry Details:</h2>
    <ul style={{ listStyle: "none", padding: 0 }}>
      <li style={{ marginBottom: "10px" }}>
        <strong>Name:</strong> {name}
      </li>
      <li style={{ marginBottom: "10px" }}>
        <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
      </li>
      {company && (
        <li style={{ marginBottom: "10px" }}>
          <strong>Company:</strong> {company}
        </li>
      )}
      {phone && (
        <li style={{ marginBottom: "10px" }}>
          <strong>Phone:</strong> {phone}
        </li>
      )}
    </ul>
    <h3 style={{ color: "#333" }}>Message:</h3>
    <p style={{ border: "1px solid #eee", padding: "15px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
      {message}
    </p>
    <hr />
    <p style={{ fontSize: "12px", color: "#777" }}>
      This is an automated notification. Please follow up with the customer directly.
    </p>
  </div>
)
