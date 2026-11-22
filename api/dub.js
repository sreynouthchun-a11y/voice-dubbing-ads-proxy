import { NextResponse } from 'next/server'

// This is the PROXY that hides your Hugging Face URL
// The frontend calls /api/dub, and this function forwards to HF

const HF_SPACE_URL = 'https://yout666t-voice-dubbing-ads.hf.space'

export async function POST(request) {
  try {
    const { script, voice, autoSync } = await request.json()

    if (!script) {
      return NextResponse.json(
        { detail: 'Script is required' },
        { status: 400 }
      )
    }

    // Forward to Hugging Face Space
    const hfResponse = await fetch(`${HF_SPACE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: script,
        voice: voice,
        auto_sync: autoSync,
      }),
    })

    if (!hfResponse.ok) {
      const errorText = await hfResponse.text()
      return NextResponse.json(
        { detail: `HF Error: ${errorText}` },
        { status: hfResponse.status }
      )
    }

    const data = await hfResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { detail: 'Internal server error' },
      { status: 500 }
    )
  }
}