export type Project = {
  id: string;
  title: string;
  area: string;
  problem: string;
  solution: string;
  impact: string;
  features: string[];
  stack: string[];
  liveLink?: string;
  githubLink?: string;
  secret?: boolean;
};

export type SkillGroup = {
  id: string;
  title: string;
  level: "daily driver" | "comfortable" | "exploring" | "experimental";
  items: string[];
};

export type LabModule = {
  id: string;
  title: string;
  status: "online" | "locked" | "experimental";
  description: string;
};

export type TimelineEntry = {
  year: string;
  event: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
};

export const profile = {
  name: "Rajhans Jadhao",
  role: "Senior Software Engineer",
  tagline: "I build production AI systems that feel alive and stay reliable.",
  location: "Bengaluru, India",
  timezone: "IST",
  availability: "selectively available",
  mode: "building GenAI platforms",
  email: "rajhans.jadhao@gmail.com",
  github: "https://github.com/iamrajhans",
  linkedin: "https://www.linkedin.com/in/rajhans-jadhao-ba9aa383",
  focus: "LLM gateways, RAG, agent tooling, MCP, backend reliability, observability",
  stack: "Python, Go, TypeScript, React, FastAPI, PostgreSQL, Kubernetes",
  bio:
    "Senior backend and GenAI engineer with 9+ years shipping production systems, now focused on LLM infrastructure, RAG workflows, agents, MCP tooling, and high-throughput APIs.",
};

export const projects: Project[] = [
  {
    id: "project-01",
    title: "GenAI brand visibility platform",
    area: "Applied GenAI / Search intelligence",
    problem:
      "Research teams needed a repeatable way to compare brand and competitor visibility across web-search LLMs without manual prompt runs.",
    solution:
      "Built a workflow that dispatches one query across multiple LLM search surfaces, normalizes outputs, and exposes share-of-voice signals.",
    impact: "Reduced research and analysis effort by roughly 40%.",
    features: ["multi-provider search runs", "normalized visibility signals", "competitor comparison", "semantic retrieval"],
    stack: ["LLMs", "RAG", "semantic search", "Milvus", "pgvector"],
  },
  {
    id: "project-02",
    title: "Multi-provider LLM gateway",
    area: "LLM infrastructure",
    problem:
      "Product teams needed one stable interface for provider choice, fallback behavior, retries, and configurable model changes.",
    solution:
      "Designed a LiteLLM-based gateway for OpenAI, Anthropic, and Google access with fallback routing and config-driven swaps.",
    impact: "Standardized LLM access for a roughly 1,000+ developer organization.",
    features: ["fallback routing", "retry policies", "model config swaps", "provider abstraction"],
    stack: ["LiteLLM", "OpenAI", "Anthropic", "Gemini", "Python"],
  },
  {
    id: "project-03",
    title: "Agent + MCP tooling",
    area: "Agent workflows",
    problem:
      "Agent prototypes needed trustworthy tools, structured telemetry, and a path from experiment to production-grade SDK patterns.",
    solution:
      "Prototyped campaign automation, browser-use flows, and an MCP server that exposes search-console-style metrics as callable tools.",
    impact: "Created a reusable foundation for agent workflows, tool calls, integration tests, and structured logging.",
    features: ["tool-call interface", "browser automation POCs", "structured logs", "integration tests"],
    stack: ["MCP", "AWS Bedrock AgentCore", "Computer Use", "structured logging"],
  },
  {
    id: "project-04",
    title: "Fintech backend systems",
    area: "Payments / APIs / reliability",
    problem:
      "High-throughput financial workflows needed lower latency, clearer observability, and stronger release discipline.",
    solution:
      "Optimized REST APIs, profiled bottlenecks, introduced monitoring patterns, and hardened review and static-analysis gates.",
    impact: "Reduced p95 latency by 40% and post-release defects by 30%.",
    features: ["API profiling", "query optimization", "monitoring", "release gates"],
    stack: ["Go", "Node.js", "PostgreSQL", "Datadog", "REST APIs"],
  },
  {
    id: "project-05",
    title: "Fraud and ledger automation",
    area: "Risk systems / Reconciliation",
    problem:
      "Risk and transaction operations needed better geospatial signals and less manual reconciliation across ledger workflows.",
    solution:
      "Built modular fraud features with geospatial indexing and designed ledger automation for transaction reconciliation.",
    impact: "Improved fraud model accuracy by 40%, cut investigation time by 20%, and reduced reconciliation effort by 60%.",
    features: ["geospatial features", "ledger automation", "risk scoring", "transaction reconciliation"],
    stack: ["Uber H3", "ML features", "ledger systems", "PostgreSQL", "Kubernetes"],
  },
  {
    id: "project-secret",
    title: "Secret module: RJ operator mode",
    area: "Hidden command system",
    problem: "Visitors who explore commands should discover something beyond the visible interface.",
    solution: "A local command puzzle reveals a hidden module and stores the unlock as an achievement.",
    impact: "Rewards curiosity without blocking normal portfolio access.",
    features: ["localStorage achievements", "hidden commands", "dark/light mode", "playful terminal flow"],
    stack: ["React", "TypeScript", "CSS animation", "localStorage"],
    secret: true,
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "genai",
    title: "GenAI & LLM",
    level: "daily driver",
    items: ["OpenAI", "Anthropic", "Gemini", "LiteLLM", "RAG", "Milvus", "pgvector", "MCP", "PydanticAI"],
  },
  {
    id: "backend",
    title: "Backend",
    level: "daily driver",
    items: ["Python", "Go", "FastAPI", "Flask", "Node.js", "REST APIs", "PostgreSQL", "Redis"],
  },
  {
    id: "frontend",
    title: "Frontend",
    level: "comfortable",
    items: ["React", "TypeScript", "Vite", "responsive UI", "accessibility", "interactive tools"],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    level: "comfortable",
    items: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "CI/CD", "Datadog"],
  },
  {
    id: "tools",
    title: "Developer Tools",
    level: "daily driver",
    items: ["Git", "GitHub Actions", "SQL", "observability", "integration tests"],
  },
];

export const labModules: LabModule[] = [
  {
    id: "shader-cursor",
    title: "Shader cursor playground",
    status: "experimental",
    description: "A cursor trail with phosphor glow and reduced-motion fallback.",
  },
  {
    id: "particle-field",
    title: "Particle field",
    status: "online",
    description: "A lightweight procedural starfield experiment for the RJ interface.",
  },
  {
    id: "ascii-generator",
    title: "ASCII image generator mock",
    status: "experimental",
    description: "A mocked module for converting future screenshots into terminal glyphs.",
  },
  {
    id: "command-puzzle",
    title: "Mini command puzzle",
    status: "online",
    description: "Type `run game`, then find the hidden unlock command.",
  },
  {
    id: "theme-switcher",
    title: "Theme switcher",
    status: "online",
    description: "Switch between dark and light terminal modes.",
  },
];

export const timeline: TimelineEntry[] = [
  { year: "2026", event: "Building immersive GenAI and developer-system interfaces." },
  { year: "2025", event: "Shipping LLM gateways, RAG workflows, MCP tools, and agent prototypes." },
  { year: "2024", event: "Owning backend systems, automation pipelines, and production deployments." },
  { year: "2023", event: "Hardening high-traffic APIs with monitoring, profiling, and release quality gates." },
  { year: "2016+", event: "Building payment, risk, ledger, cloud, and backend systems under real load." },
];

export const openSource = [
  ["Google A2UI", "Replaced unsafeCSS usage with a safer CSSStyleSheet flow in the Lit renderer."],
  ["CPython", "Contributed a C API documentation fix."],
  ["Dify", "Improved workflow condition sync and development script robustness."],
  ["pandas", "Fixed a mypy type-checking issue in the test suite."],
  ["GitHub CLI", "Added clearer handling for expired GitHub Actions workflows."],
] as const;

export const achievements: Achievement[] = [
  { id: "first-command", title: "First command executed", description: "Ran an RJ command." },
  { id: "opened-archive", title: "Opened the archive", description: "Explored the project archive." },
  { id: "found-lab", title: "Found the lab", description: "Entered the experiment modules." },
  { id: "hired-developer", title: "Hired the developer", description: "Triggered `sudo hire-me`." },
  { id: "secret-unlocked", title: "Secret project unlocked", description: "Found the hidden project card." },
];
