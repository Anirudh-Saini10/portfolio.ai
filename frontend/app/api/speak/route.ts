import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const VOICE = process.env.KOKORO_VOICE || "am_adam";
const MAX_TEXT_LENGTH = 2500;

export async function POST(req: NextRequest) {
  const hfToken = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;

  if (!hfToken) {
    return NextResponse.json(
      { error: "Kokoro TTS not configured on server" },
      { status: 503 }
    );
  }

  let text = "";
  try {
    const body = await req.json();
    text = (body?.text || "").toString().trim().slice(0, MAX_TEXT_LENGTH);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!text) {
    return NextResponse.json({ error: "Empty text" }, { status: 400 });
  }

  try {
    const ttsRes = await fetch(
      "https://router.huggingface.co/fal-ai/kokoro/v1/audio/speech",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "hexgrad/Kokoro-82M",
          input: text,
          voice: VOICE,
          response_format: "mp3",
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
    const contentType = ttsRes.headers.get("content-type") ?? "audio/mpeg";

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown TTS error";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
