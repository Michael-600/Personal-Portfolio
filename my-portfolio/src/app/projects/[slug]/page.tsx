import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { projects } from "@/data/projects";
import Mermaid from "@/components/Mermaid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RobotAssistant from "@/components/RobotAssistant";
import Badge from "@/components/ui/Badge";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const p = projects.find((pr) => pr.slug === slug);
  return {
    title: p ? `${p.title} — Michael Hayford` : "Project — Michael Hayford",
    description: p?.summary,
  };
}

export default async function ProjectDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const p = projects.find((pr) => pr.slug === slug);
  if (!p) notFound();

  return (
    <main className="relative min-h-screen text-zinc-100">
      <Navbar />
      <div className="pt-28 md:pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10 space-y-10">
          <div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
            >
              <ArrowLeft className="size-4" /> All projects
            </Link>
          </div>

          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="cyan">{p.category}</Badge>
              <Badge
                tone={
                  p.status === "Completed"
                    ? "green"
                    : p.status === "In Progress"
                    ? "amber"
                    : "blue"
                }
              >
                {p.status}
              </Badge>
              <span className="text-xs font-mono text-zinc-500">{p.year}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="text-base md:text-lg text-zinc-400">{p.subtitle}</div>
            )}
            <p className="text-zinc-300 leading-relaxed text-base md:text-lg max-w-2xl">
              {p.summary}
            </p>

            {p.impact && (
              <div className="inline-flex items-start gap-2 text-sm text-cyan-200/90 bg-cyan-400/[0.06] border border-cyan-400/15 rounded-lg px-3 py-2">
                <TrendingUp className="size-4 shrink-0 mt-0.5" />
                <span>{p.impact}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-[12px] font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm hover:bg-white/[0.10] transition"
              >
                Visit live <ArrowUpRight className="size-4" />
              </a>
            )}
          </header>

          {p.diagrams?.workflow && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Workflow</h2>
              <Mermaid code={p.diagrams.workflow} />
            </section>
          )}

          <section className="grid md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <h3 className="font-semibold">Before</h3>
              {p.diagrams?.before ? (
                <Mermaid code={p.diagrams.before} />
              ) : (
                <Placeholder note="Diagram coming soon" />
              )}
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">After</h3>
              {p.diagrams?.after ? (
                <Mermaid code={p.diagrams.after} />
              ) : (
                <Placeholder note="Diagram coming soon" />
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
      <RobotAssistant />
    </main>
  );
}

function Placeholder({ note }: { note: string }) {
  return (
    <div className="h-[280px] grid place-items-center text-sm text-zinc-500 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
      {note}
    </div>
  );
}
