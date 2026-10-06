export const profile = {
  name: "Rahul Vishnuvardhana",
  firstName: "Rahul",
  lastNameTop: "Vishnu",
  lastNameBottom: "vardhana",
  kicker: "Machine Learning Engineer",
  role: "I build machine learning systems that turn messy, real-world data into decisions people can trust, in banking, fintech, and beyond.",
  tagline: "Applied ML · Sequence Modeling · Anomaly Detection · Data-Efficient Learning",
  mission: "Turning messy, real-world data into predictive, deployable systems.",
  location: "Boston, MA",
  email: "vishnuvardhana.r@northeastern.edu",
  phone: "+1 (617) 602-8473",
  linkedin: "https://www.linkedin.com/in/rahul-vishnuvardhana-197890266/",
  github: "https://github.com/rahulvishnuvardhana",
};

export const introPhrases = [
  "Hi, I'm Rahul.",
  "I build ML systems that predict failure.",
  "Temporal models. Real data. Production-grade.",
  "From banking pipelines to deep learning.",
  "Let's build something reliable.",
];

export const about = {
  paragraphs: [
    "I'm a machine learning engineer, currently finishing my Master's in Computer Engineering at Northeastern University on the Machine Intelligence track. Before graduate school, I spent more than three years as a software and data engineer at Hexaware Technologies, building ETL pipelines and data-integration systems for banking clients. That work taught me how to turn messy, high-volume data into something reliable enough to run a business on.",
    "Today I build machine learning systems that solve real problems: predicting failures before they happen, catching anomalies in live data streams, and producing calibrated probabilities that teams can actually act on. I gravitate toward banking and fintech because that is where the problems are hardest and the cost of being wrong is highest, but the work isn't tied to any one industry. Wherever data is scarce, noisy, or imbalanced, that is where I do my best work.",
    "My path into applied ML started in undergrad, where my thesis on automated grain-quality assessment became my first peer-reviewed publication. The thread from grain images to banking-API failures has stayed the same the whole way through: take noisy real-world signals, learn the structure inside them, and ship something useful. I care about the engineering around a model as much as the model itself, so I lean on observability, ablation studies, and clear runbooks before I trust anything in production.",
    "My biggest strength is how quickly I pick things up. Drop me into a new stack, framework, or research area and I will be shipping in it within a week. My honest weakness is the flip side of that: I lean perfectionist, and I have had to learn that a solid solution delivered on time usually beats a perfect one that arrives late.",
    "Outside of work, I spend my time at the gym, reading manga, cooking, and getting to know new cities on foot. Different inputs, same wiring: I follow my curiosity until whatever I'm looking at stops being a black box.",
  ],
  stats: [
    { big: "3+", lbl: "Years Eng. Experience" },
    { big: "3.8", lbl: "Graduate GPA" },
    { big: "1", lbl: "Peer-Reviewed Publication" },
  ],
  focusedOn: [
    "Multi-horizon temporal sequence modeling",
    "Conformal prediction for calibrated uncertainty",
    "Data-efficient learning under class imbalance",
    "Streaming online ML (River + Kafka)",
    "Operational ML observability and runbooks",
  ],
  currentlyReading: [
    "Vovk, Gammerman & Shafer — Algorithmic Learning in a Random World",
    "Chollet — Deep Learning with Python (2nd ed.)",
    "PaperswithCode — anomaly detection & sequence modeling",
    "Goodfellow et al. — Deep Learning (theory chapters)",
  ],
  coursework: [
    { code: "EECE 7205", name: "Fundamentals of Computer Engineering", note: "Robot trajectory prediction (RNN vs Transformer)" },
    { code: "EECE 7150", name: "Machine Learning & Pattern Recognition" },
    { code: "EECE 5644", name: "Probabilistic Modeling" },
    { code: "EECE 7374", name: "Mathematical Foundations of ML" },
  ],
  philosophy: [
    { title: "Defensive over clever", body: "I'd rather ship the boring model with good observability than the SOTA paper with no runbook." },
    { title: "Metrics I can defend", body: "Every number on this site has a notebook, a test set, and a story behind it." },
    { title: "Pipelines as a love language", body: "Three years of ETL taught me that the unglamorous data plumbing IS the product." },
  ],
  hobbies: [
    "Gym & Fitness",
    "Anime & Manga",
    "Cooking",
    "City Exploration",
  ],
  character: {
    strength: "Speed of acquisition — new stack / framework / domain to shipping in a week.",
    weakness: "Perfectionism — hold for one more polish pass when 'good enough' would ship.",
    drive: "Stay curious, follow the rabbit hole.",
  },
};

export type Project = {
  tag: string;
  title: string;
  accent: string;
  description: string;
  highlights?: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    tag: "Flagship · Independent Research · Deployed",
    title: "LEO API Intelligence",
    accent: "",
    description:
      "A multi-horizon deep learning system that analyzes banking API failure patterns to support operational decision-making. I built a bidirectional 2-layer LSTM with multi-head attention and Conv1d feature extraction, trained with Focal Loss (γ=3.0) across 5 API types at horizons of 1, 5, and 15 steps. I engineered a 1.94M-row hybrid dataset from five real-world Kaggle sources (NAB EC2, Credit Card Fraud, PaySim, Network Anomaly, Web Logs) with 43 features and per-API scaling, reaching ROC-AUC 0.8088 and PR-AUC 0.5132. I validated it with ablation studies, conformal prediction, and agent simulations, then deployed an interactive FastAPI dashboard on Render, training on dual-GPU Kaggle T4×2 via PyTorch DataParallel.",
    highlights: [
      "1.94M-row hybrid dataset",
      "ROC-AUC 0.8088",
      "PR-AUC 0.5132",
      "5 API types",
      "horizons h=1, 5, 15",
      "43 features",
    ],
    stack: [
      "PyTorch",
      "Bi-LSTM",
      "Multi-Head Attention",
      "Conv1d",
      "Focal Loss",
      "Conformal Prediction",
      "FastAPI",
      "Render",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/rahulvishnuvardhana/Leo_Api_Intelligence" },
      { label: "Live API", href: "https://leo-api-intelligence.onrender.com" },
    ],
  },
  {
    tag: "AI Product · Multi-User · Live",
    title: "TraceOp",
    accent: "AI Copilot for the RA/TA and Co-op Hunt",
    description:
      "A multi-user AI copilot for Northeastern graduate students hunting research, teaching, and co-op roles, built on one rule: never fabricate. It pulls live co-op roles from public ATS boards (Greenhouse, Lever, Ashby, Workday) and a directory of 2,600+ Northeastern faculty across 7 colleges, scores fit honestly, and flags work-authorization blockers (F-1, CPT, OPT) before any effort is spent. Gemini, streamed through the Vercel AI SDK, drafts outreach, tailored resumes, and arXiv paper briefs grounded only in each user's own profile and resume, flagging gaps instead of inventing them. I added RAG over pgvector for outreach, isolated every account with Supabase row-level security, and exposed the copilot as agent tools through an MCP server.",
    highlights: [
      "2,600+ faculty across 7 colleges",
      "4 public ATS sources",
      "RAG on pgvector",
      "per-user grounding",
      "row-level security",
      "MCP agent tools",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "pgvector", "Gemini", "Vercel AI SDK", "MCP", "Playwright"],
    links: [{ label: "Live App", href: "https://v0-traceop.vercel.app" }],
  },
  {
    tag: "Hackathon · Dell x NVIDIA · Team of 3",
    title: "Site Safety Watch",
    accent: "On-Device Vision Agent for Workplace Hazards",
    description:
      "An always-on safety agent my team built in one day at the Dell x NVIDIA AI Hackathon in Boston. It checks each camera frame with a local vision-language model (Qwen on vLLM), and when an exit is blocked, posts the hazard, the OSHA rule (29 CFR 1910.37), and a proposed fix to Slack for a supervisor to approve or reject. All inference runs on one Dell Pro Max with GB10, so raw video never leaves the box. I owned evaluation and the story: I filmed and labelled the test clips (phone, CCTV-angle, dim, degraded 360p), built the eval harness comparing six detection settings, and wrote the slides and writeup. Measured on the box: 0.57 s per camera check and capacity for 24 cameras.",
    stack: ["Python", "Evaluation Harness", "OpenCV", "ffmpeg", "vLLM", "Vision-Language Models", "NVIDIA GB10"],
    links: [{ label: "GitHub", href: "https://github.com/hemnaath04/site-safety-watch" }],
  },
  {
    tag: "Product · Offline PWA · Live",
    title: "BayState Ghilli",
    accent: "Massachusetts Learner's Permit Practice",
    description:
      "A free, offline-first practice app for the Massachusetts learner's permit exam, with 372 original questions across 7 categories, timed mock exams built to difficulty targets, and Leitner-style spaced repetition that brings a missed question back on the very next exam. The core runs entirely in the browser as an installable PWA with progress kept on the device, so it needs no account or backend. Optional features switch on only with credentials: a moderated review system on Supabase behind an 18+ age gate, and a daily GitHub Actions monitor that emails me through Resend when the official manual changes, checking only metadata, never the PDF itself.",
    stack: ["React", "TypeScript", "Vite", "PWA", "Supabase", "GitHub Actions", "Resend", "Vitest"],
    links: [{ label: "Live App", href: "https://baystateghilli.vercel.app" }],
  },
  {
    tag: "Project · Robotics · Sequence Modeling",
    title: "RNN vs. Transformer",
    accent: "Robot Trajectory Prediction",
    description:
      "A comparative study of a recurrent baseline against a Transformer for spatiotemporal robot trajectory prediction on the NCLT (North Campus Long-Term) autonomous-vehicle dataset. I built a complete 5-script RNN pipeline that reached 0.1494m ADE, 0.3509m FDE, and 0.0214 MSE (early stopping at epoch 74), after tracking down a NumPy normalization bug, and wrote a full technical report. I then introduced physics-based kinematics into a linear Transformer to improve computational efficiency and predictive accuracy, and benchmarked it systematically against the RNN baseline across every metric.",
    highlights: [
      "0.1494m ADE",
      "0.3509m FDE",
      "0.0214 MSE",
      "NCLT dataset",
      "5-script RNN pipeline",
      "physics-informed Transformer",
    ],
    stack: ["RNN", "Seq2Seq LSTM", "Transformer", "Python", "PyTorch", "NCLT Dataset"],
    links: [
      { label: "GitHub", href: "https://github.com/rahulvishnuvardhana/robot-trajectory-rnn-vs-transformer" },
    ],
  },
  {
    tag: "Publication · Peer-Reviewed",
    title: "ML-Based Grain Quality Assessment",
    accent: "",
    description:
      "My undergraduate thesis on automated grain-quality assessment using classical machine learning and computer vision. I built an image-processing pipeline that extracts shape, texture, and color features from grain images under controlled lighting, then classifies grade and quality with SVM and Random Forest models. I validated it on a curated multi-variety dataset and published the work in the International Journal of Engineering Technology and Management Sciences (Vol. 6, July 2022). It was my first peer-reviewed contribution and the foundation of everything I've built since: take noisy real-world signals, learn the structure inside them, and ship something useful.",
    highlights: [
      "Vol. 6, July 2022",
      "International Journal of Engineering Technology and Management Sciences",
      "SVM and Random Forest models",
      "first peer-reviewed contribution",
    ],
    stack: ["Machine Learning", "Computer Vision", "MATLAB", "Kaggle Dataset", "Peer-Reviewed"],
  },
];

export type SkillCol = { title: string; items: { name: string; level: string }[] };

export const skills: SkillCol[] = [
  {
    title: "AI / ML",
    items: [
      { name: "PyTorch", level: "core" },
      { name: "LSTM / Bi-LSTM", level: "strong" },
      { name: "Multi-Head Attention", level: "applied" },
      { name: "Conv1d / Conv2d", level: "applied" },
      { name: "Transformer", level: "applied" },
      { name: "Seq2Seq Models", level: "applied" },
      { name: "Focal Loss", level: "applied" },
      { name: "XGBoost", level: "strong" },
      { name: "Scikit-learn", level: "core" },
      { name: "Computer Vision", level: "applied" },
      { name: "River (Online Learning)", level: "applied" },
      { name: "LLMs", level: "applied" },
      { name: "LLM Agents & MCP", level: "applied" },
      { name: "RAG", level: "applied" },
      { name: "Embeddings & Vector Search", level: "applied" },
    ],
  },
  {
    title: "Data Science",
    items: [
      { name: "Python", level: "primary" },
      { name: "Pandas / NumPy", level: "core" },
      { name: "SQL", level: "strong" },
      { name: "R", level: "applied" },
      { name: "MATLAB", level: "applied" },
      { name: "Matplotlib", level: "applied" },
      { name: "Seaborn", level: "applied" },
      { name: "Conformal Prediction", level: "applied" },
    ],
  },
  {
    title: "Front-End / Viz",
    items: [
      { name: "FastAPI", level: "deployed" },
      { name: "REST APIs", level: "strong" },
      { name: "Next.js", level: "deployed" },
      { name: "React", level: "deployed" },
      { name: "TypeScript", level: "applied" },
      { name: "Tailwind CSS", level: "applied" },
      { name: "Grafana", level: "applied" },
      { name: "Dashboard Design", level: "applied" },
      { name: "HTML / CSS", level: "applied" },
    ],
  },
  {
    title: "Conceptual Knowledge",
    items: [
      { name: "Banking ETL & Data Integration", level: "strong" },
      { name: "Multi-tenant Data Isolation", level: "applied" },
      { name: "Streaming ML Architecture", level: "applied" },
      { name: "Online Learning", level: "applied" },
      { name: "Temporal Sequence Modeling", level: "strong" },
      { name: "Ablation Studies", level: "applied" },
      { name: "Defensive Engineering", level: "strong" },
      { name: "Data Quality Validation", level: "strong" },
    ],
  },
  {
    title: "Cloud & Tools",
    items: [
      { name: "Microsoft Azure (AZ-900, DP-203)", level: "certified" },
      { name: "Git / GitHub", level: "daily" },
      { name: "Linux / Unix", level: "strong" },
      { name: "Docker", level: "applied" },
      { name: "Apache Kafka", level: "applied" },
      { name: "Redis", level: "applied" },
      { name: "Render.com", level: "deployed" },
      { name: "Vercel", level: "deployed" },
      { name: "Supabase (Postgres, RLS)", level: "deployed" },
      { name: "GitHub Actions", level: "applied" },
      { name: "Playwright / Vitest", level: "applied" },
      { name: "AutoSys", level: "prod" },
      { name: "Redwood RunMyJob", level: "prod" },
      { name: "ODI (Oracle Data Integrator)", level: "prod" },
      { name: "SQLite", level: "applied" },
    ],
  },
];

export type Milestone = {
  when: string;
  title: string;
  org: string;
  body?: string;
  bullets?: string[];
  courses?: string[];
};

export const journey: Milestone[] = [
  {
    when: "Jan 2026 — May 2028",
    title: "M.S., Electrical & Computer Engineering",
    org: "Northeastern University · Boston, MA · Machine Intelligence Track · GPA 3.8",
    bullets: [
      "Specializing in applied machine learning: deep learning, probabilistic modeling, sequence models, and deployable ML systems.",
      "Building on 3+ years of industry data engineering to move from data pipelines into production ML.",
    ],
    courses: [
      "EECE 5644 — Machine Learning & Pattern Recognition",
      "EECE 7205 — Fundamentals of Computer Engineering",
    ],
  },
  {
    when: "Mar 2023 — Sep 2025",
    title: "Software Engineer",
    org: "Hexaware Technologies · Chennai, India · Banking ETL & Data Integration",
    bullets: [
      "Evaluated and advised on cloud infrastructure and document/data-retrieval architectures on Microsoft Azure, comparing tools and services to support scalable data-processing and analytics workflows and inform tool-adoption decisions.",
      "Designed and maintained ETL pipelines integrating REST APIs, SFTP feeds, and SQL databases, monitoring batch execution and pipeline health in real time and resolving failures through root-cause analysis.",
      "Authored technical documentation, SOPs, and runbooks that translated complex systems into accessible formats for non-technical stakeholders, and built structured evaluation frameworks for new-tool decisions.",
    ],
  },
  {
    when: "Mar 2022 — Feb 2023",
    title: "Associate Software Engineer",
    org: "Hexaware Technologies · Chennai, India",
    bullets: [
      "Developed and tested API integrations and data-ingestion workflows, validating payload accuracy and enforcing data-quality checks.",
      "Documented end-to-end data workflows and communicated resolution steps clearly across cross-functional teams, self-teaching new tooling as project requirements evolved.",
    ],
  },
  {
    when: "Aug 2018 — Apr 2022",
    title: "B.E., Electronics & Communication Engineering",
    org: "Sri Sairam Engineering College · Chennai, India · GPA 3.4/4.0",
    bullets: [
      "Specialized in Electronics & Communication Engineering with hands-on work in embedded systems and machine learning.",
      "Authored an undergraduate thesis on ML-based grain-quality assessment that became my first peer-reviewed publication and set my applied-ML trajectory.",
    ],
  },
];

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Quests", href: "/work" },
  { label: "Stack", href: "/skills" },
  { label: "Journey", href: "/journey" },
  { label: "Contact", href: "/contact" },
];
