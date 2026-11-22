"use client"

import { useState } from 'react'

export default function Home() {
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleDubbing = async (voiceType) => {
    if (!script.trim()) {
      setError('សូមបញ្ចូល Script ជាមុនសិន')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Call our Vercel API route which proxies to Hugging Face
      const response = await fetch('/api/dub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: script,
          voice: voiceType,
          autoSync: true
        }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || 'ការស្នើសុំបានបរាជ័យ')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans">
      {/* Header */}
      <div className="w-full max-w-md bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 shadow-lg text-white mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.114 5.636a9 9 0 010 12.728m12.728 0a9 9 0 000-12.728 18 18 0 010 25.456a18 18 0 000-25.456zM5.086 19.114a9 9 0 010-12.728m0 0a18 18 0 000 25.456 18 18 0 010-25.456z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Dubbing Auto Voice</h1>
            <p className="text-sm text-blue-100">High-Speed Khmer Dubbing (Up to 10+ Mins)</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm">Running</span>
        </div>
      </div>

      {/* Voice Selection */}
      <div className="w-full max-w-md space-y-3 mb-6">
        <button
          onClick={() => handleDubbing('M')}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          សំឡេងប្រុស [M]
        </button>

        <button
          onClick={() => handleDubbing('F')}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          សំឡេងស្ត្រី [F]
        </button>

        <button
          onClick={() => handleDubbing('AUTO')}
          disabled={loading}
          className="w-full bg-blue-400 hover:bg-blue-500 disabled:bg-gray-300 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Auto Sync គុណភាពខ្ពស់
        </button>
      </div>

      {/* Script Input */}
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="font-semibold text-gray-800">បញ្ជាសកម្មភាព Script (Gemini Format)</h2>
        </div>

        <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 mb-3">
          00:00.00 - 10:00.00+
        </div>

        <textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder={`START END SPEAKER\nTRANSLATE KHMER\n00:00.00 00:02.80 [M] សូមស្វាគមន៍មកកាន់...`}
          className="w-full h-48 p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {error && (
          <div className="mt-3 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-3 flex items-center gap-2 text-blue-600 text-sm">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            កំពុងដំណើរការ...
          </div>
        )}

        {result && (
          <div className="mt-4 bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ ជោគជ័យ!</h3>
            {result.audio_url && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-1">Audio:</p>
                <audio controls src={result.audio_url} className="w-full">
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {result.srt_url && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-1">SRT File:</p>
                <a href={result.srt_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                  Download SRT
                </a>
              </div>
            )}
            {result.transcript && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Transcript:</p>
                <pre className="text-xs bg-white p-2 rounded overflow-x-auto max-h-32 overflow-y-auto">
                  {result.transcript}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}