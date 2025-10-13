import ProjectsGrid from "./ProjectsGrid"; // server -> client boundary

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <ProjectsGrid />
      </div>
    </main>
  );
}
