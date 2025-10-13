import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const OPENAI_API_KEY    = process.env.OPENAI_API_KEY || "";            // works for OpenAI or Voyage
const BASE         = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const EMBED_MODEL  = process.env.EMBED_MODEL ?? "text-embedding-3-small";
const CHAT_MODEL     = process.env.CHAT_MODEL || "gpt-4o-mini";


async function embed(q: string) {
const r = await fetch(`${BASE}/embeddings`, {
method: "POST",
headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
body: JSON.stringify({ input: q, model: EMBED_MODEL })
});
const j = await r.json();
if (!j.data) throw new Error(JSON.stringify(j));
return j.data[0].embedding as number[];
}


export async function POST(req: NextRequest) {
const { message } = await req.json();
if (!message || typeof message !== "string") {
return new Response(JSON.stringify({ error: "Missing message" }), { status: 400 });
}


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const qvec = await embed(message);


const { data, error } = await supabase.rpc("match_rag_docs", {
query_embedding: qvec,
match_count: 6,
filter_kind: null,
});
if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });


const context = (data ?? [])
.map((d: any) => `# ${d.title} (${d.kind})\n${d.content}`)
.join("\n\n---\n\n");


const system = `You are a concise, upbeat portfolio assistant. Use ONLY the context. If unknown, say you don't know and ask a short follow-up.`;


const r = await fetch(`${BASE}/chat/completions`, {
method: "POST",
headers: { "Authorization": `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
body: JSON.stringify({
model: CHAT_MODEL,
messages: [ { role: "system", content: system }, { role: "user", content: `Q: ${message}\n\nContext:\n${context}` } ],
temperature: 0.4
})
});
const j = await r.json();
const answer = j.choices?.[0]?.message?.content ?? "Sorry, I don't know yet.";


return new Response(JSON.stringify({ answer }), { headers: { "Content-Type": "application/json" } });
}