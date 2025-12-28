import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

async function getResend() {
  const { Resend } = await import('resend')
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      address,
      service,
      propertyDetails,
      projectFactors,
      estimateTotal,
      productionHours,
      methodology,
      notes,
    } = body

    const supabase = createAdminClient()

    // Save to Supabase
    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        property_address: address,
        service_type: service,
        acreage: propertyDetails?.acres || null,
        dbh_package: propertyDetails?.dbhPackage ? String(propertyDetails.dbhPackage) : null,
        estimated_value: estimateTotal || null,
        notes: notes || null,
        source: 'website_estimator',
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save lead', details: error.message }, { status: 500 })
    }

    // Send email notification
    try {
      const resend = await getResend()

      const factorsList = projectFactors?.length
        ? projectFactors.map((f: any) => `${f.name}: +${f.percentage}%`).join('<br>')
        : 'None'

      await resend.emails.send({
        from: 'TreeShop <notifications@treeshop.app>',
        to: ['office@fltreeshop.com', 'jeremiah@treeshop.app'],
        subject: `🌲 New Lead: ${name} - ${service}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address || 'Not provided'}</p>
          <hr>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Quote:</strong> $${estimateTotal?.toLocaleString()}</p>
          <p><strong>Production Hours:</strong> ${productionHours?.toFixed(2)}</p>
          <hr>
          <p><strong>Property Details:</strong></p>
          <pre>${JSON.stringify(propertyDetails, null, 2)}</pre>
          <p><strong>Project Factors:</strong><br>${factorsList}</p>
          <hr>
          <p><strong>Methodology:</strong><br><code>${methodology}</code></p>
          ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          <hr>
          <p>Lead ID: ${lead.id}</p>
          <p><em>Respond within 5 minutes for best conversion.</em></p>
        `,
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
