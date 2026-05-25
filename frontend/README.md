# Portfolio.AI Frontend (Next.js 14)

Cyberpunk-themed AI portfolio. Talks to the FastAPI RAG backend and proxies TTS
through a server-side route to keep the ElevenLabs key off the browser.

## Setup

```powershell
cd frontend
npm install
copy .env.example .env.local
# fill NEXT_PUBLIC_API_URL, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID
npm run dev
```

Open http://localhost:3000.

## Environment

| Variable                  | Purpose                                           | Side    |
| ------------------------- | ------------------------------------------------- | ------- |
| `NEXT_PUBLIC_API_URL`     | FastAPI backend base URL                          | Public  |
| `ELEVENLABS_API_KEY`      | TTS API key                                       | Server  |
| `ELEVENLABS_VOICE_ID`     | ElevenLabs voice id                               | Server  |
| `ELEVENLABS_MODEL_ID`     | Default `eleven_turbo_v2`                         | Server  |

## Deploy (Vercel)

1. Import this `frontend/` folder as a Vercel project.
2. Set the env vars above in the Vercel dashboard.
3. Deploy. The TTS proxy route runs on Vercel's server — your API key never
   reaches the browser.

## Notes

- The avatar is a CSS/SVG animation that switches between `idle`, `thinking`,
  `speaking`, and `error` states. Swap to a real Lottie JSON later if you want
  a custom character — `lottie-react` is already installed.
- The backend health endpoint is pinged on first load (`BackendWaker`) to
  avoid Railway cold-start visibility.
