import HomeGrid from "./HomeGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">Michael Hayford</h1>
          <nav className="text-sm opacity-80 space-x-4">
            <a href="/" className="underline">Home</a>
            <a href="/projects" className="underline">Projects</a>
          </nav>
        </header>
        <HomeGrid />
      </div>
    </main>
  );
}
