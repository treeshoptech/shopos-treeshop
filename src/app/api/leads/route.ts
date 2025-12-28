import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

async function sendLeadNotification(leadData: any) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'TreeShop <notifications@treeshop.app>',
      to: ['office@fltreeshop.com', 'jeremiah@treeshop.app'],
      subject: `🌲 New Lead: ${leadData.name} - ${leadData.service}`,
      html: `
        <h2>New Estimate Request</h2>
        <p><strong>Name:</strong> ${leadData.name}</p>
        <p><strong>Email:</strong> ${leadData.email}</p>
        <p><strong>Phone:</strong> ${leadData.phone}</p>
        ${leadData.address ? `<p><strong>Address:</strong> ${leadData.address}</p>` : ''}
        <p><strong>Service:</strong> ${leadData.service}</p>
        <p><strong>Estimate:</strong> $${leadData.estimateLow?.toLocaleString()} - $${leadData.estimateHigh?.toLocaleString()}</p>
        ${leadData.acres ? `<p><strong>Acres:</strong> ${leadData.acres}</p>` : ''}
        ${leadData.dbhPackage ? `<p><strong>DBH Package:</strong> ${leadData.dbhPackage}"</p>` : ''}
        ${leadData.stumpCount ? `<p><strong>Stumps:</strong> ${leadData.stumpCount} @ ${leadData.stumpDiameter}" avg</p>` : ''}
        ${leadData.drainageLinearFeet ? `<p><strong>Drainage:</strong> ${leadData.drainageLinearFeet} LF</p>` : ''}
        <p><strong>Preferred Contact:</strong> ${leadData.preferredContact || 'Not specified'}</p>
        <p><strong>Best Time:</strong> ${leadData.bestTime || 'Not specified'}</p>
        ${leadData.notes ? `<p><strong>Notes:</strong> ${leadData.notes}</p>` : ''}
        <hr>
        <p>Lead ID: ${leadData.leadId}</p>
        <p><em>Respond within 5 minutes for best conversion.</em></p>
      `,
    })
  } catch (emailError) {
    console.error('Email notification failed:', emailError)
    // Don't fail the request if email fails
  }
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
      acres,
      dbhPackage,
      stumpCount,
      stumpDiameter,
      drainageLinearFeet,
      estimateLow,
      estimateHigh,
      preferredContact,
      bestTime,
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
        property_address: address || null,
        service_type: service,
        acreage: acres ? parseFloat(acres) : null,
        dbh_package: dbhPackage || null,
        estimated_value: estimateHigh || null,
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

    // Send email notification (async, doesn't block response)
    sendLeadNotification({
      leadId: lead.id,
      name,
      email,
      phone,
      address,
      service,
      acres,
      dbhPackage,
      stumpCount,
      stumpDiameter,
      drainageLinearFeet,
      estimateLow,
      estimateHigh,
      preferredContact,
      bestTime,
      notes,
    })

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
