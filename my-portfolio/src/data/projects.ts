export type Project = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  status: "Completed" | "In Progress" | "Prototype";
  link?: string;
  diagrams?: {
    workflow?: string;      // Mermaid code
    before?: string;        // Mermaid code
    after?: string;         // Mermaid code
  };
};

export const projects: Project[] = [
  // 1) AOR Pipeline
  {
    slug: "aor-pipeline",
    title: "AOR Pipeline – Real-Time Account Open Requests",
    summary:
      "Reduced AOR exception triage from ~2hrs to <1min by surfacing real-time status/causes via a new REST endpoint and Hubble enrichment.",
    image: "/proj-aor.png",
    tags: ["Python", "BigQuery", "REST API", "Hubble", "Orion"],
    status: "Completed",
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
class Ops good;`
    },
  },

  // 2) Smart Support Assistant
  {
    slug: "smart-support",
    title: "Smart Support Assistant – Ops Investigation",
    summary:
      "CLI + LLM pipeline that pulls Elastic traces and BigQuery logs, auto-writes investigation summaries and recommendations.",
    image: "/proj-smart-support.png",
    tags: ["Python", "Elastic", "BigQuery", "LLM"],
    status: "Completed",
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
class R,OpsTeam good;`
    },
  },

  // 3) Prospect AI
  {
    slug: "prospect-ai",
    title: "Prospect AI – Prompt Generation & Output Construction",
    summary:
      "Modular RAG pipeline for prompt generation, output construction, and evaluation with metrics dashboards.",
    image: "/proj-prospect.png",
    tags: ["RAG", "Supabase", "Next.js", "LangChain"],
    status: "In Progress",
    diagrams: {
      workflow: `
graph LR
PG[Prompt Generator] --> RET[Retriever (pgvector)]
RET --> LLM[LLM Output Construction]
LLM --> EVAL[Evaluator & Metrics]
EVAL --> DB[Metrics Store]
DB --> Dash[Results Dashboard]`,
      before: `
graph LR
Analyst -->|manual prompt| LLM
LLM --> Output
Output -->|copy/paste| Doc[Docs/Sheets]
Doc -->|no consistent eval| Gap[Feedback Gap]`,
      after: `
graph LR
PG[Prompt Generator] --> RET[Retriever (pgvector)]
RET --> LLM[LLM Output Construction]
LLM --> EVAL[Evaluator]
EVAL --> DB[(Metrics)]
DB --> Dash[Results Dashboard]
classDef good fill:#34d39922,stroke:#34d39966,color:#d1fae5;
class EVAL,Dash good;`
    },
  },

  // 4) DataZon Mini-Amazon
  {
    slug: "datazon-mini-amazon",
    title: "DataZon – Mini Amazon",
    summary:
      "Full-stack e-commerce with TF-IDF similarity recs, normalized schema, and admin tooling.",
    image: "/proj-datazon.png",
    tags: ["Flask", "PostgreSQL", "TF-IDF", "RecSys"],
    status: "Prototype",
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
Results --> Product
%% No personalization or loop`,
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
class Ranker,Feedback,Store good;`
    },
  },
];
