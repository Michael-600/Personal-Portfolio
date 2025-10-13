import ChatBox from "../components/ChatBox";
import ProfileCard from "../components/ProfileCard";
import Marquee from "../components/Marquee";

function Card({ children, className = "" }: any) {
  return (
    <div className={`rounded-2xl p-4 bg-neutral-900/70 border border-neutral-800 ${className} hover:-translate-y-0.5 transition`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Michael Hayford's World</h1>
          <a href="/resume.pdf" className="px-3 py-2 bg-yellow-500 text-black rounded-xl text-sm font-semibold">Resume</a>
        </header>

        <div className="grid grid-cols-12 auto-rows-[160px] gap-4">
          {/* Profile */}
          <div className="col-span-4">
            <ProfileCard />
          </div>

          {/* Chat */}
          <div className="col-span-4 row-span-2">
            <ChatBox />
          </div>

          {/* Recommendations */}
          <Card className="col-span-4">
            <div className="text-xl font-semibold mb-2">Peer Recommendations</div>
            <p className="text-sm opacity-80">“Impressed by his drive and follow-through.”</p>
          </Card>

          {/* Tech stack */}
          <Card className="col-span-4">
            <div className="text-sm opacity-70">Featured</div>
            <div className="text-xl font-semibold mb-2">Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {["Python","TypeScript","React","PostgreSQL","Tailwind","Supabase"].map(t =>
                <span key={t} className="px-2 py-1 text-xs rounded-lg bg-neutral-800 border border-neutral-700">{t}</span>
              )}
            </div>
          </Card>

          {/* Works */}
          <Card className="col-span-4">
            <div className="text-xl font-semibold mb-2">Works Gallery</div>
            <a className="inline-block mt-2 text-sm underline opacity-80" href="/projects">View Works</a>
          </Card>

          {/* Online presence */}
          <Card className="col-span-4">
            <div className="text-xl font-semibold mb-2">Online Presence</div>
            <div className="space-y-2 text-sm">
              <a className="block underline" href="https://x.com/yourhandle">@yourhandle</a>
              <a className="block underline" href="https://github.com/you">GitHub</a>
              <a className="block underline" href="https://linkedin.com/in/you">LinkedIn</a>
            </div>
          </Card>

          {/* Moving text */}
          <div className="col-span-12">
            <Marquee items={[
              "Design → Research → Prototyping",
              "RAG + Vector Search",
              "Next.js + Tailwind",
              "Postgres + Supabase",
              "React Native",
            ]}/>
          </div>
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </main>
  );
}
