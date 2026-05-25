import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || "eleven_turbo_v2";

  if (!apiKey || !voiceId) {
    return NextResponse.json(
      { error: "ElevenLabs not configured on server" },
      { status: 503 }
    );
  }

  let text = "";
  try {
    const body = await req.json();
    text = (body?.text || "").toString().slice(0, 2500);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!text.trim()) {
    return NextResponse.json({ error: "Empty text" }, { status: 400 });
  }

  const ttsRes = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  if (!ttsRes.ok) {
    const detail = await ttsRes.text().catch(() => "");
    return NextResponse.json(
      { error: "ElevenLabs request failed", detail },
      { status: 502 }
    );
  }

  const audio = await ttsRes.arrayBuffer();
  return new NextResponse(audio, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
