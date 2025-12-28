import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
  from = 'TreeShop <noreply@treeshop.app>',
}: {
  to: string | string[]
  subject: string
  html: string
  from?: string
}) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    })

    if (error) {
      console.error('Email send error:', error)
      throw error
    }

    return data
  } catch (err) {
    console.error('Email send failed:', err)
    throw err
  }
}

// Lead notification email
export async function sendLeadNotification({
  leadName,
  leadEmail,
  leadPhone,
  serviceType,
  details,
}: {
  leadName: string
  leadEmail: string
  leadPhone: string
  serviceType: string
  details?: string
}) {
  return sendEmail({
    to: ['office@fltreeshop.com', 'jeremiah@treeshop.app'],
    subject: `🌲 New ${serviceType} Lead: ${leadName}`,
    html: `
      <h2>New Lead Received</h2>
      <p><strong>Name:</strong> ${leadName}</p>
      <p><strong>Email:</strong> ${leadEmail}</p>
      <p><strong>Phone:</strong> ${leadPhone}</p>
      <p><strong>Service:</strong> ${serviceType}</p>
      ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
      <hr>
      <p>Respond within 5 minutes for best conversion.</p>
    `,
  })
}
