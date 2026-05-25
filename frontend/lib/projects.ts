export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bullets?: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: "AI/ML" | "LLM" | "Full-Stack" | "Product" | "NLP" | "CV";
  year?: string;
  status?: "featured" | "shipped" | "building";
};

export const GITHUB_URL = "https://github.com/Anirudh-Saini10";
export const LINKEDIN_URL = "https://www.linkedin.com/in/anirudh-saini1";

/**
 * Featured / spotlight project — ProctorVision. Litify gets its own
 * dedicated co-founder section that appears earlier on the page.
 */
export const FEATURED_PROJECT: Project = {
  slug: "proctorvision",
  name: "ProctorVision",
  tagline: "Online exam proctor that catches cheating in real time",
  description:
    "An exam-integrity app that watches a student's webcam during a test and flags suspicious behavior live — when they look away, when a phone enters the frame, when they start talking. It outputs a final integrity score and a downloadable PDF report for the teacher.",
  bullets: [
    "Tracks gaze + head pose with 478 face landmarks (MediaPipe)",
    "Detects phones in frame with YOLOv8",
    "Picks up speech via mouth-aspect-ratio analysis",
    "Live WebSocket pipeline + auto-generated PDF report",
  ],
  tags: ["YOLOv8", "MediaPipe", "FastAPI", "OpenCV", "WebSockets", "React"],
  liveUrl: "https://anirudhsaini-proctorvision.hf.space/",
  category: "CV",
  status: "featured",
};


/** Other shipped technical projects. */
export const CORE_PROJECTS: Project[] = [
  {
    slug: "cadence",
    name: "Cadence",
    tagline: "A goal-tracking tool for teams",
    description:
      "Companies use Cadence to set quarterly objectives, run weekly check-ins, and watch progress roll up across nested goals. Each company's data is isolated using Postgres row-level security, weights cascade automatically through custom DB triggers, and email nudges go out through Resend when goals slip.",
    tags: ["React 18", "Supabase", "PostgreSQL", "RLS", "TypeScript"],
    liveUrl: "https://cadence-growth.vercel.app/",
    category: "Full-Stack",
  },
  {
    slug: "atsense",
    name: "ATSense",
    tagline: "An AI resume × job-description checker",
    description:
      "Drop in your resume and a job description and ATSense returns a match score, the skills you're missing, and stronger AI-rewritten bullet points. Powered by Gemini 2.0 Flash with strict JSON prompting and a resilient parser.",
    tags: ["Gemini", "Prompt Eng.", "Streamlit", "Python"],
    liveUrl: "https://atsense-analyse.vercel.app/",
    category: "LLM",
  },
  {
    slug: "spamsentry",
    name: "SpamSentry",
    tagline: "A spam-message classifier you can actually try",
    description:
      "DistilBERT fine-tuned on 5,574 real SMS messages to 97%+ accuracy. Runs as a small Streamlit app — paste a message in, see instantly whether it's spam. Trained end-to-end with a custom PyTorch tokenization pipeline.",
    tags: ["PyTorch", "DistilBERT", "HuggingFace", "Streamlit"],
    liveUrl: "https://spamsentry-scam-detector.streamlit.app/",
    category: "NLP",
  },
];

/** In-progress, ongoing builds. */
export const BUILDING_NOW: Project = {
  slug: "petpal",
  name: "PetPal",
  tagline: "An AI companion app for pet owners — in active build",
  description:
    "PetPal builds a digital twin of your pet that learns its personality over time. It helps you triage health issues, recommends products tailored to its breed and habits, and remembers past conversations so the bond compounds. Built on Claude, LangChain, and Supabase.",
  bullets: [
    "Pet Twin simulation with persistent personality",
    "AI health triage via Claude",
    "Breed-aware product recommendations",
    "Emotional memory layer + community features",
  ],
  tags: ["Claude", "LangChain", "Supabase", "Next.js"],
  liveUrl: "https://pet-pal-love.vercel.app/",
  category: "Product",
  year: "2026",
};

/** Co-founded startup spotlight. */
export const STARTUP = {
  brand: "Litify",
  role: "Co-Founder & Product Lead",
  period: "May 2025 — Present",
  url: "https://litify.shop/",
  pitch: "Light Up Your Space with Litify!",
  description:
    "I co-founded Litify and owned the full product and business side — ideation, UI/UX design, brand identity, marketing strategy, and go-to-market execution. We built it end-to-end together, shipping a live store with real customers, real orders, and real iteration loops every week.",
  highlights: [
    "Led product ideation, design, and brand identity",
    "Owned go-to-market strategy and customer acquisition",
    "Drove UX decisions from real customer-behavior data",
    "Live operations: marketing, fulfillment, support",
  ],
  stack: ["WordPress", "Elementor Pro", "Razorpay", "Custom Frontend", "Analytics"],
};

/** All projects in display order for the tabbed showcase. */
export const ALL_PROJECTS: Project[] = [
  FEATURED_PROJECT,
  ...CORE_PROJECTS,
  { ...BUILDING_NOW, status: "building" },
];

export const SUGGESTED_QUESTIONS: string[] = [
  "Introduce yourself",
  "What is the strongest AI/ML project?",
  "Explain ProctorVision technically.",
  "Which projects use LLMs or RAG?",
  "What did Aniruddha build at Litify as co-founder?",
  "Why hire Aniruddha for an AI/ML role?",
];

export const ROLLING_TAGS: string[] = [
  "RAG",
  "LLMs",
  "Computer Vision",
  "PyTorch",
  "Fine-Tuning",
  "Transformers",
  "LangChain",
  "Diffusion",
  "Agentic AI",
  "FastAPI",
  "Supabase pgvector",
  "Gemini",
  "Claude",
  "ElevenLabs",
  "Next.js",
  "TypeScript",
  "Postgres",
  "WebSockets",
  "YOLOv8",
  "MediaPipe",
];
