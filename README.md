# AI Dubbing Auto Voice - Proxy

High-Speed Khmer Dubbing (Up to 10+ Mins)

## Features
- 🎙️ Male Voice [M]
- 🎙️ Female Voice [F]  
- ⚡ Auto Sync High Quality
- 📝 Gemini Format Script Input
- 🔒 Hides Hugging Face backend URL

## Tech Stack
- React + Vite
- Tailwind CSS
- Vercel Serverless Functions (Proxy)

## Setup
1. Clone the repo
2. `npm install`
3. `npm run dev` for development
4. Deploy to Vercel for production

## How it works
The frontend sends requests to `/api/dub` which is a Vercel Serverless Function.
This function proxies the request to the Hugging Face Space, hiding the actual URL from users.