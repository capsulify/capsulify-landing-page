import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { email, name } = await req.json()

		// Validate required fields
		if (!email || !name) {
			return NextResponse.json(
				{ error: 'Email and name are required' },
				{ status: 400 }
			)
		}

		const API_KEY = process.env.MAILERLITE_API_KEY
		const GROUP_ID = process.env.MAILERLITE_GROUP_ID

		// Check if environment variables are set
		if (!API_KEY || !GROUP_ID) {
			console.error('Missing MailerLite environment variables')
			return NextResponse.json(
				{ error: 'Service temporarily unavailable' },
				{ status: 500 }
			)
		}

		const mlRes = await fetch(
			`https://api.mailerlite.com/api/v2/groups/${GROUP_ID}/subscribers`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-MailerLite-ApiKey': API_KEY,
				},
				body: JSON.stringify({
					email,
					name,
					resubscribe: true,
				}),
			}
		)

		const data = await mlRes.json()
		if (!mlRes.ok) {
			console.error('MailerLite API error:', data)
			return NextResponse.json(
				{ error: data.error?.message || 'Failed to subscribe' },
				{ status: mlRes.status }
			)
		}

		return NextResponse.json({ success: true })
	} catch (err) {
		console.error('Subscriber API error:', err)
		return NextResponse.json(
			{ error: 'Something went wrong.' },
			{ status: 500 }
		)
	}
}
