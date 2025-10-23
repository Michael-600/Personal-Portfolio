// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Embeddings (Voyage)
const EMBED_BASE  = process.env.OPENAI_BASE_URL || "https://api.voyageai.com/v1";
const EMBED_MODEL = process.env.EMBED_MODEL || "voyage-3.5-lite";
const EMBED_DIM   = parseInt(process.env.EMBED_DIM || "1024", 10);
const API_KEY_EMB = process.env.OPENAI_API_KEY || "";

// Chat (OpenAI)
const CHAT_BASE   = process.env.OPENAI_BASE_URL_CHAT || "https://api.openai.com/v1";
const CHAT_MODEL  = process.env.CHAT_MODEL || "gpt-4o-mini";
const API_KEY_CHAT= process.env.OPENAI_API_KEY_CHAT || API_KEY_EMB;

type EmbeddingBody = { model: string; input: string; output_dimension?: number };
type EmbeddingResponse = { data: { embedding: number[] }[] };
type RagRow = { id: string; slug: string; title: string; kind: string; content: string; similarity: number };
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };
type ChatResponse = { choices?: { message?: { content?: string } }[] };

// Optional GET so /api/chat in a browser returns something useful
export async function GET() {
  return NextResponse.json({ ok: true, note: "POST { message } to this endpoint" }, { status: 200 });
}

async function embed(q: string) {
  const body: EmbeddingBody = { model: EMBED_MODEL, input: q };
  if (EMBED_DIM) body.output_dimension = EMBED_DIM;

  const r = await fetch(`${EMBED_BASE}/embeddings`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY_EMB}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = (await r.json()) as EmbeddingResponse;
  if (!r.ok || !j?.data?.[0]?.embedding) throw new Error(`Embed error ${r.status}: ${JSON.stringify(j)}`);
  return j.data[0].embedding;
}

export async function POST(req: NextRequest) {
  const { message } = (await req.json()) as { message?: string };
  if (!message) return NextResponse.json({ error: "Missing message" }, { status: 400 });

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const qvec = await embed(message);

  const { data, error } = await supabase.rpc("match_rag_docs", {
    query_embedding: qvec, match_count: 6, filter_kind: null,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const context = (data as RagRow[] ?? [])
    .map((d) => `# ${d.title} (${d.kind})\n${d.content}`)
    .join("\n\n---\n\n");

  if (!context) {
    return NextResponse.json({
      answer: "I didn’t find relevant info yet. Try asking about AOR, Smart Support, Prospect AI, or DataZon."
    });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: "You are a concise, upbeat portfolio assistant. Use ONLY the context. If unknown, say you don't know and ask a short follow-up." },
    { role: "user", content: `Q: ${message}\n\nContext:\n${context}` },
  ];

  const r = await fetch(`${CHAT_BASE}/chat/completions`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${API_KEY_CHAT}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: CHAT_MODEL, messages, temperature: 0.4 }),
  });

  const j = (await r.json()) as ChatResponse;
  if (!r.ok) return NextResponse.json({ error: `Chat error ${r.status}`, details: j }, { status: 500 });

  return NextResponse.json({ answer: j.choices?.[0]?.message?.content ?? "Sorry, I don't know yet." });
}