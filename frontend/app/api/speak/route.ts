import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const VOICE = process.env.KOKORO_VOICE || "am_adam";
const MODEL = process.env.KOKORO_MODEL || "fal-ai/kokoro/american-english";
const MAX_TEXT_LENGTH = 2500;

const fallbackResponse = (reason: string) =>
  NextResponse.json(
    { fallback: "browser", reason },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-TTS-Fallback": "browser",
      },
    }
  );

export async function POST(req: NextRequest) {
  const falToken = process.env.FAL_KEY || process.env.KOKORO_API_KEY;

  if (!falToken) {
    return fallbackResponse("Kokoro TTS not configured on server");
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
      `https://fal.run/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${falToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: text,
          voice: VOICE,
          speed: 1,
        }),
      }
    );

    if (!ttsRes.ok) {
      const detail = await ttsRes.text().catch(() => "");
      return fallbackResponse(detail || "Kokoro TTS request failed");
    }

    const payload = await ttsRes.json();
    const audioUrl = payload?.audio?.url;
    if (!audioUrl) {
      return fallbackResponse("Kokoro TTS response did not include audio");
    }

    const audioRes = await fetch(audioUrl);
    if (!audioRes.ok) {
      return fallbackResponse("Kokoro audio download failed");
    }

    const audio = await audioRes.arrayBuffer();
    const contentType = audioRes.headers.get("content-type") ?? "audio/wav";

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown TTS error";
    return fallbackResponse(msg);
  }
}
