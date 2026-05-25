export const profile = {
  name: "Michael Hayford",
  fullName: "Michael Quansah Hayford",
  role: "Software Engineer",
  tagline: "Software engineer building useful, AI-powered products.",
  location: "Durham, NC",
  email: "michael.hayford@duke.edu",
  phone: "+1 (919) 748-9995",
  resumeUrl: "/resume.pdf",
  avatar: "/michael-headshot.png",

  status: {
    label: "Incoming SWE @ Goldman Sachs · July 2026",
    available: true,
  },

  // Short bio for the About section
  shortBio:
    "I'm a Duke University senior studying Computer Science with a certificate in Innovation & Entrepreneurship. I build pragmatic, production-grade software at the intersection of backend systems, AI, and product — from optimizing trade infrastructure at Goldman Sachs to founding a coding-education startup.",

  // Longer bio paragraphs for About / RAG
  longBio: [
    "I'm a Duke CS '26 student who likes shipping. My favorite work sits where backend reliability meets AI product — fast feedback loops, real users, real impact.",
    "This past summer at Goldman Sachs (Orion / Hubble), I cut new-account-request SLAs from ~2 hours to under a minute and shipped an LLM-powered investigation assistant that halved average triage time. I'm returning full-time in 2026.",
    "On the side, I'm a senior engineer at JonasRX — a health-tech startup helping seniors with personalized digital support — and the founder of BeginnerCode, an AI-guided coding education platform that spun out of a Duke independent study.",
  ],

  interests: [
    "Software Engineering",
    "Startups & Entrepreneurship",
    "AI / LLM Products",
    "Consulting & Strategy",
    "Product Engineering",
    "Building things that matter",
  ],

  // What I'm looking for
  lookingFor: [
    "Full-time SWE / Product Engineering roles",
    "Startup collaborations & technical co-founders",
    "Consulting & advisory projects",
    "Hackathons, research, and AI experiments",
  ],

  social: {
    linkedin: "https://www.linkedin.com/in/michael-hayford-099711205/",
    github: "https://github.com/Michael-600",
    twitter: "https://x.com/",
    email: "mailto:michael.hayford@duke.edu",
  },

  education: {
    school: "Duke University",
    schoolShort: "Duke",
    degree: "B.S. Computer Science",
    certificate: "Certificate in Innovation & Entrepreneurship",
    graduation: "May 2026",
    coursework: [
      "Data Structures & Algorithms",
      "Computer Systems",
      "Operating Systems",
      "Database Systems",
      "Design & Analysis of Algorithms",
      "Applied Machine Learning",
      "Computer Architecture",
      "Computer Networks",
      "Graph & Matrix Analysis",
      "High Dimensional Analysis",
      "Discrete Math",
      "OOP",
    ],
  },

  // Highlight stats for hero / about
  stats: [
    { value: "95%", label: "Ops escalations cut", caption: "Goldman AOR Pipeline" },
    { value: "<1 min", label: "AOR SLA", caption: "down from ~2 hours" },
    { value: "1,000+", label: "AI users served", caption: "Prospects Agent" },
    { value: "50%", label: "Faster triage", caption: "Smart Support Assistant" },
  ],
} as const;

export type Profile = typeof profile;
