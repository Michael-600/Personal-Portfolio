import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RobotAssistant from "@/components/RobotAssistant";
import ProjectsGrid from "./ProjectsGrid";

export const metadata = {
  title: "Projects — Michael Hayford",
  description:
    "Deep-dives into Michael Hayford's projects: AOR pipeline, Smart Support Assistant, BeginnerCode, JonasRX, and more.",
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen text-zinc-100">
      <Navbar />
      <div className="pt-28 md:pt-32 pb-20 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/80 mb-3">
            <span className="h-px w-6 bg-cyan-400/60" />
            All Projects
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            Every project, in one place.
          </h1>
          <p className="mt-4 text-zinc-400 leading-relaxed">
            From production-grade pipelines to scrappy startup MVPs — pick any
            card to see the architecture, before/after diagrams, and the impact.
          </p>
        </div>
        <ProjectsGrid />
      </div>
      <Footer />
      <RobotAssistant />
    </main>
  );
}
