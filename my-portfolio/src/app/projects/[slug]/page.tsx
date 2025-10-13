import Link from "next/link";
import { projects } from "../../../data/projects";
import Mermaid from "@/components/Mermaid";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const p = projects.find(pr => pr.slug === params.slug);
  if (!p) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 grid place-items-center">
        <div className="text-center">
          <p className="text-xl font-semibold">Project not found</p>
          <Link className="underline mt-2 inline-block" href="/projects">Back to Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{p.title}</h1>
            <p className="mt-2 opacity-80">{p.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-lg text-[11px] border border-neutral-700 bg-neutral-800">{t}</span>
              ))}
            </div>
          </div>
          <Link href="/projects" className="underline opacity-80 hover:opacity-100">Back</Link>
        </div>

        {/* Workflow */}
        {p.diagrams?.workflow && (
          <section>
            <h2 className="text-lg font-semibold mb-2">Workflow</h2>
            <Mermaid code={p.diagrams.workflow} />
          </section>
        )}

        {/* Before / After */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Before</h3>
            {p.diagrams?.before ? (
              <Mermaid code={p.diagrams.before} />
            ) : (
              <Placeholder note="Add Mermaid code to p.diagrams.before" />
            )}
          </div>
          <div>
            <h3 className="font-semibold mb-2">After</h3>
            {p.diagrams?.after ? (
              <Mermaid code={p.diagrams.after} />
            ) : (
              <Placeholder note="Add Mermaid code to p.diagrams.after" />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Placeholder({ note }: { note: string }) {
  return (
    <div className="h-[280px] grid place-items-center text-sm opacity-70 border border-dashed border-neutral-700 rounded-xl bg-neutral-900/50">
      {note}
    </div>
  );
}
