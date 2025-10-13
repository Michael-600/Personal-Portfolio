// scripts/ingest.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local', override: true });

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

// --- Env + guards ------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const API_KEY      = process.env.OPENAI_API_KEY || "";            // works for OpenAI or Voyage
const BASE         = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
const EMBED_MODEL  = process.env.EMBED_MODEL ?? "text-embedding-3-small";
const EMBED_DIM    = parseInt(process.env.EMBED_DIM || "1536", 10);

if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error("Missing Supabase URL or anon key");
if (!API_KEY) throw new Error("Missing OPENAI_API_KEY (or Voyage key)");
console.log("INGEST ENV URL:", SUPABASE_URL.slice(0, 40), "...");
console.log("Provider:", BASE, "| Model:", EMBED_MODEL, "| Dim:", EMBED_DIM);

// --- Helpers -----------------------------------------------------------------
type Doc = { slug: string; title: string; kind: string; content: string };

/** Minimal chunker so we don't send huge blocks to the embed API */
function chunkText(text: string, maxChars = 2000): string[] {
  if (text.length <= maxChars) return [text];
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + maxChars, text.length);
    chunks.push(text.slice(i, end));
    i = end;
  }
  return chunks;
}

/** Generic fetch with tiny retry for rate/quota hiccups */
async function fetchJSON(url: string, init: RequestInit, retries = 2): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, init);
    const json = await res.json().catch(() => ({}));
    if (res.ok && json) return json;

    // If last try or not a transient error, throw
    const status = res.status;
    const transient = status === 429 || status >= 500;
    if (attempt === retries || !transient) {
      throw new Error(JSON.stringify(json || { status }));
    }
    const backoff = 500 * Math.pow(2, attempt);
    await new Promise(r => setTimeout(r, backoff));
  }
}

/** Create a single embedding for a text chunk */
async function embedOne(text: string): Promise<number[]> {
  // Voyage supports output_dimension; OpenAI ignores unknown fields.
  const body: any = { model: EMBED_MODEL, input: text };
  if (BASE.includes("voyageai.com") && EMBED_DIM) {
    body.output_dimension = EMBED_DIM;
  }

  const j = await fetchJSON(`${BASE}/embeddings`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!j?.data?.[0]?.embedding) {
    throw new Error(JSON.stringify(j));
  }
  return j.data[0].embedding as number[];
}

/** Embed (and, if chunked, average) to a single vector */
async function embed(text: string): Promise<number[]> {
  const chunks = chunkText(text.trim(), 2000);
  if (chunks.length === 1) return embedOne(chunks[0]);

  // Average the chunk embeddings (simple pooling)
  const vecs = await Promise.all(chunks.map(embedOne));
  const dim = vecs[0].length;
  const out = new Array(dim).fill(0);
  for (const v of vecs) {
    if (v.length !== dim) throw new Error("Embedding dimension mismatch across chunks");
    for (let i = 0; i < dim; i++) out[i] += v[i];
  }
  for (let i = 0; i < dim; i++) out[i] /= vecs.length;
  return out;
}

// --- Main --------------------------------------------------------------------
async function main() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const docs: Doc[] = [];

  // Bio
  const bioPath = path.join("content", "bio.md");
  if (fs.existsSync(bioPath)) {
    const bio = fs.readFileSync(bioPath, "utf8");
    docs.push({ slug: "bio", title: "Bio", kind: "bio", content: bio });
  } else {
    console.warn("Skipping: content/bio.md not found");
  }

  // Projects
  const projPath = path.join("content", "projects.json");
  if (fs.existsSync(projPath)) {
    const projects = JSON.parse(fs.readFileSync(projPath, "utf8"));
    for (const p of projects) {
      docs.push({
        slug: p.slug,
        title: p.title,
        kind: "project",
        content: `${p.title}\n\n${p.summary}\n\nTech: ${Array.isArray(p.tech) ? p.tech.join(", ") : p.tech}`,
      });
    }
  } else {
    console.warn("Skipping: content/projects.json not found");
  }

  if (docs.length === 0) {
    console.error("No documents to ingest. Add files under content/ and retry.");
    process.exit(1);
  }

  // Upsert with embeddings
  for (const d of docs) {
    console.log(`Embedding: ${d.slug} (${d.kind}) …`);
    const e = await embed(d.content.slice(0, 8000));
    if (EMBED_DIM && e.length !== EMBED_DIM) {
      throw new Error(
        `Embedding dimension ${e.length} != EMBED_DIM ${EMBED_DIM}. ` +
        `Either set EMBED_DIM to ${e.length} in .env.local or alter your SQL vector(...) column.`
      );
    }

    const { error } = await supabase
      .from("rag_docs")
      .upsert(
        { slug: d.slug, title: d.title, kind: d.kind, content: d.content, embedding: e },
        { onConflict: "slug" }
      );

    if (error) throw error;
    console.log("Upserted:", d.slug);
  }

  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });
