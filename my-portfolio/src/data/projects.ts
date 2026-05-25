export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  impact?: string;
  image: string;
  tags: string[];
  status: "Completed" | "In Progress" | "Prototype";
  category: "AI" | "Backend" | "Full-Stack" | "Mobile" | "Infra";
  year: string;
  link?: string;
  featured?: boolean;
  diagrams?: {
    workflow?: string;
    before?: string;
    after?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "aor-pipeline",
    title: "AOR Pipeline",
    subtitle: "Real-Time Account Open Requests · Goldman Sachs",
    summary:
      "Reduced AOR exception triage from ~2 hours to <1 minute by surfacing real-time status and root causes via a new REST endpoint and Hubble ViewObject enrichment.",
    impact: "SLA: ~2h → <1 min · ops escalations cut by ~95%",
    image: "/proj-aor.png",
    tags: ["Python", "REST API", "BigQuery", "Hubble", "Orion"],
    status: "Completed",
    category: "Backend",
    year: "2025",
    featured: true,
    diagrams: {
      workflow: `
graph TD
Trader --> Orion[Orion AOR]
Orion --> Hubble[Hubble]
Orion --> API[New AOR Status API]
API --> Hubble
Hubble --> Ops[Ops Console]`,
      before: `
graph TD
Trader --> Orion[Orion AOR]
Orion --> Hubble
Hubble --> Ops[Ops Team]
%% No real-time status API; manual reconciliation`,
      after: `
graph TD
Trader --> Orion[Orion AOR]
Orion --> XCP[XCP]
Orion --> Hubble
Orion --> API[New AOR Status API]
API --> Hubble
Hubble --> Ops[Ops Console]
classDef good fill:#16a34a22,stroke:#16a34a66,color:#d1fae5;
class Ops good;`,
    },
  },
  {
    slug: "smart-support",
    title: "Smart Support Assistant",
    subtitle: "LLM-Powered Ops Investigation · Goldman Sachs",
    summary:
      "Python CLI that pulls Elastic traces and BigQuery logs, chains them into a templated LLM prompt, and emits Markdown investigation + comparison reports with recommended next actions.",
    impact: "~50% faster investigations across ops teams",
    image: "/proj-smart-support.png",
    tags: ["Python", "Elastic", "BigQuery", "Jinja2", "LLM"],
    status: "Completed",
    category: "AI",
    year: "2025",
    featured: true,
    diagrams: {
      workflow: `
graph TD
Q[Ticket / Trade ID] --> CLI[investigate.py]
CLI --> E[Elastic Traces]
CLI --> BQ[BigQuery Logs]
E & BQ --> T[Template + LLM]
T --> R[Investigation Report]`,
      before: `
graph TD
Ticket -->|manual lookups| Engineer
Engineer --> Elastic[Elastic Kibana]
Engineer --> BigQuery[BigQuery Console]
Engineer --> Notes[Ad-hoc Notes/Email]
Notes -->|handoff| OpsTeam`,
      after: `
graph TD
Q[Ticket / Trade ID] --> CLI[investigate.py]
CLI --> E[Elastic Traces]
CLI --> BQ[BigQuery Logs]
E & BQ --> T[Template + LLM Summarizer]
T --> R[Investigation Report + Recommendations]
R -->|posted to| OpsTeam[Ops Channel]
classDef good fill:#16a34a22,stroke:#16a34a66,color:#a7f3d0;
class R,OpsTeam good;`,
    },
  },
  {
    slug: "prospects-agent",
    title: "USA Prospects Agent",
    subtitle: "AI Essay Coach · 1,000+ users",
    summary:
      "RAG-powered essay feedback platform that streams responses via the Vercel AI SDK and persists drafts in Supabase. Embedding-based retrieval surfaces rubric-aligned suggestions.",
    impact: "1,000+ users · weekly release cycle",
    image: "/proj-prospect.png",
    tags: ["Next.js", "React", "Supabase", "RAG", "Vercel AI SDK"],
    status: "In Progress",
    category: "Full-Stack",
    year: "2024–2025",
    featured: true,
    diagrams: {
      workflow: `
graph LR
PG[Prompt Generator] --> RET[Retriever - pgvector]
RET --> LLM[LLM Output Construction]
LLM --> EVAL[Evaluator and Metrics]
EVAL --> DB[Metrics Store]
DB --> Dash[Results Dashboard]`,
      before: `
graph LR
Analyst -->|manual prompt| LLM
LLM --> Output
Output -->|copy/paste| Doc[Docs and Sheets]
Doc -->|no consistent eval| Gap[Feedback Gap]`,
      after: `
graph LR
PG[Prompt Generator] --> RET[Retriever - pgvector]
RET --> LLM[LLM Output Construction]
LLM --> EVAL[Evaluator]
EVAL --> DB[(Metrics)]
DB --> Dash[Results Dashboard]
classDef good fill:#34d39922,stroke:#34d39966,color:#d1fae5;
class EVAL,Dash good;`,
    },
  },
  {
    slug: "beginnercode",
    title: "BeginnerCode",
    subtitle: "AI-Guided Coding Education Platform",
    summary:
      "Founded as a Duke independent study and grown into a standalone startup. A beginner-friendly coding environment that teaches reasoning over copy-pasting, with AI feedback that asks the right questions.",
    impact: "Startup spun out of Duke independent study",
    image: "/proj-beginnercode.png",
    tags: ["Next.js", "TypeScript", "LLMs", "Supabase", "EdTech"],
    status: "In Progress",
    category: "AI",
    year: "2025",
    featured: true,
  },
  {
    slug: "jonasrx",
    title: "JonasRX Mobile",
    subtitle: "Personalized Digital Support for Seniors",
    summary:
      "A cross-platform mobile app (iOS + Android) helping seniors with personalized digital support. I built onboarding, profile flows, and Google Maps integration; ambient AI features in progress.",
    impact: "Cross-platform launch on iOS + Android",
    image: "/proj-jonasrx.png",
    tags: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Google Maps"],
    status: "In Progress",
    category: "Mobile",
    year: "2025",
  },
  {
    slug: "datazon-mini-amazon",
    title: "DataZon — Mini Amazon",
    subtitle: "Full-stack E-Commerce + Recsys",
    summary:
      "Full-stack mini-Amazon with normalized PostgreSQL schema, TF-IDF + similarity-based 'Similar items' recommendations, and admin tooling.",
    impact: "End-to-end e-commerce prototype with recsys",
    image: "/proj-datazon.png",
    tags: ["Flask", "PostgreSQL", "TF-IDF", "RecSys"],
    status: "Prototype",
    category: "Full-Stack",
    year: "2024",
    diagrams: {
      workflow: `
graph TD
User --> SearchQ[Search / Voice]
SearchQ --> Ranker[TF-IDF + Similarity]
Ranker --> Results
Results --> Product[Product Page]
Product --> Cart
Results --> Feedback[Clicks / Purchases]
Feedback --> Store[(Signals Store)] --> Ranker`,
      before: `
graph TD
User --> Search[Keyword Search]
Search --> Results
Results --> Product`,
      after: `
graph TD
User --> SearchQ[Search / Voice]
SearchQ --> Ranker[TF-IDF + Similarity]
Ranker --> Results
Results --> Product
Product --> Cart
Results --> Feedback[Clicks / Purchases]
Feedback --> Store[(Signals Store)] --> Ranker
classDef good fill:#60a5fa22,stroke:#60a5fa66,color:#dbeafe;
class Ranker,Feedback,Store good;`,
    },
  },
];
