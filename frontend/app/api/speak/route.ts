import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const VOICE = process.env.KOKORO_VOICE || "am_adam";

export async function POST(req: NextRequest) {
  const hfToken = process.env.HUGGINGFACE_API_KEY;

  if (!hfToken) {
    return NextResponse.json(
      { error: "Kokoro TTS not configured on server" },
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
    "https://api-inference.huggingface.co/models/hexgrad/Kokoro-82M",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text,
        parameters: { voice: VOICE },
      }),
    }
  );

  if (!ttsRes.ok) {
    const detail = await ttsRes.text().catch(() => "");
    return NextResponse.json(
      { error: "Kokoro TTS request failed", detail },
      { status: 502 }
    );
  }

  const audio = await ttsRes.arrayBuffer();
  const contentType = ttsRes.headers.get("content-type") ?? "audio/flac";

  return new NextResponse(audio, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    },
  });
}
