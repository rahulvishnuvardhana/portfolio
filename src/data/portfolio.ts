export const profile = {
  name: "Rahul Vishnuvardhana",
  firstName: "Rahul",
  lastNameTop: "Vishnu",
  lastNameBottom: "vardhana",
  kicker: "ML & AI Engineer · Spring 2027 co-op",
  role: "Your team needs ML that keeps working after the demo. I build models and AI tools that are measured, monitored, and honest about what they don't know, backed by 3+ years of running production data pipelines for a global financial firm.",
  tagline: "Applied ML · Sequence Modeling · Anomaly Detection · Data-Efficient Learning",
  mission: "Turning messy, real-world data into predictive, deployable systems.",
  location: "Boston, MA",
  email: "vishnuvardhana.r@northeastern.edu",
  phone: "+1 (617) 602-8473",
  linkedin: "https://www.linkedin.com/in/rahulvishnuvardhana",
  github: "https://github.com/rahulvishnuvardhana",
  availability: "Available for a Spring 2027 co-op",
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
    "I'm a machine learning engineer, currently pursuing my M.S. in Electrical and Computer Engineering at Northeastern University, concentrating in hardware and software for machine intelligence. Before graduate school, I spent more than three years as a software and data engineer at Hexaware Technologies on the data warehouse and reporting team for Brown Brothers Harriman, building ETL pipelines and keeping business-critical jobs running. That work taught me how to turn messy, high-volume data into something reliable enough to run a business on.",
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

/** What a recruiter needs to decide, answered up front (shown in Contact). */
export const recruiterFacts = [
  { label: "Looking for", value: "Spring 2027 co-op" },
  { label: "Roles", value: "ML Engineer · AI / LLM Engineer · Software Engineer" },
  { label: "Work authorization", value: "Authorized for co-op via CPT" },
  { label: "Based in", value: "Boston, MA" },
  { label: "Reply time", value: "Usually within a few hours, here or by email" },
];

/** "What your team gets": the value proposition, each pillar tied to proof. */
export const pitch = [
  {
    title: "Models that warn before things break",
    body: "Forecasting with calibrated confidence and automatic failover, so on-call engineers act before customers notice a problem.",
    proof: [{ label: "LEO Gateway", href: "#leo-gateway" }],
  },
  {
    title: "AI that only says what it can back up",
    body: "Retrieval grounded in real records, with citations and human review for low-confidence answers, so a hallucination never reaches a user.",
    proof: [
      { label: "TraceOp", href: "#traceop" },
      { label: "LOEWISE", href: "#loewise" },
    ],
  },
  {
    title: "Production habits from day one",
    body: "Structured logging, reconciliation checks and runbooks, learned on pipelines a financial firm depended on every morning, so the basics never need teaching.",
    proof: [{ label: "Brown Brothers Harriman", href: "#experience" }],
  },
];

/** "Roles I fit" strip: each role links to the projects that prove it. */
export const roleFit = [
  { role: "ML Engineer", proof: ["LEO Gateway", "RNN vs. Transformer"] },
  { role: "AI / LLM Engineer", proof: ["TraceOp", "LOEWISE"] },
  { role: "Software Engineer", proof: ["TraceOp", "BayState Ghilli"] },
];

/** URL-safe id for a project row, so other parts of the page can link to it. */
export const projectSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export type Project = {
  tag: string;
  title: string;
  accent: string;
  description: string;
  highlights?: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  /** one-sentence pitch shown first on the project row */
  summary?: string;
  /** three scannable results */
  outcomes?: string[];
  /** hover preview: poster + lazily loaded screen recording */
  media?: { poster: string; video?: string; alt?: string };
  /** code-drawn preview used when there is no recording */
  preview?: "trajectory";
};

export const projects: Project[] = [
  {
    tag: "Flagship · Independent Project · Spring 2026 · Live",
    title: "LEO Gateway",
    accent: "Failover gateway that keeps API traffic alive through provider outages",
    summary: "Keeps apps working when an API provider goes down: it predicts failures before they happen and reroutes live requests to a healthy provider.",
    outcomes: [
      "Apps stay up when a provider fails: 5xx, 429 and timeout errors trigger an automatic retry on a healthy provider",
      "Failure risk is forecast 1, 5 and 15 steps ahead, at an average ROC-AUC of 0.8202 and PR-AUC of 0.5383 on 1.94M rows",
      "Every risk score carries a calibrated confidence range, so a team knows when to trust it",
    ],
    description:
      "A multi-horizon deep learning system that analyzes banking API failure patterns to support operational decision-making. I built a bidirectional 2-layer LSTM with multi-head attention and Conv1d feature extraction, trained with Focal Loss (γ=3.0) across 5 API types at horizons of 1, 5, and 15 steps. I engineered a 1.94M-row hybrid dataset from five real-world Kaggle sources (NAB EC2, Credit Card Fraud, PaySim, Network Anomaly, Web Logs) with 43 features and per-API scaling, reaching an average ROC-AUC of 0.8202 and PR-AUC of 0.5383 across the 1, 5, and 15-step horizons. I validated it with ablation studies, conformal prediction, and agent simulations, then wrapped it in a FastAPI and Docker reverse-proxy gateway that retries in-flight requests on a healthy provider when it sees 5xx, 429, or timeout errors. Trained on dual-GPU Kaggle T4×2 via PyTorch DataParallel and deployed live on Render.",
    highlights: [
      "1.94M-row hybrid dataset",
      "avg ROC-AUC 0.8202",
      "avg PR-AUC 0.5383",
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
      "Docker",
      "Render",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/rahulvishnuvardhana/Leo_Api_Intelligence" },
      { label: "Live demo", href: "https://leo-api-intelligence.onrender.com" },
    ],
    media: { poster: "/projects/leo-poster.jpg", video: "/projects/leo.mp4", alt: "LEO live demo re-scoring API failure risk across scenarios" },
  },
  {
    tag: "Independent Project · Summer 2026 · Live",
    title: "TraceOp",
    accent: "AI Copilot for the RA/TA and Co-op Hunt",
    summary: "Helps Northeastern grad students find real research, teaching, and co-op roles, then drafts outreach that never invents a skill or a number.",
    outcomes: [
      "One search across 2,693 Northeastern faculty in 7 colleges, plus live roles from Greenhouse, Lever, Ashby and Workday",
      "Drafts are grounded in each user's own profile, so the AI never invents a skill, metric or date",
      "Covered by Vitest unit tests and Playwright end-to-end tests, and live on Vercel",
    ],
    description:
      "A multi-user AI copilot for Northeastern graduate students hunting research, teaching, and co-op roles, built on one rule: never fabricate. It pulls live co-op roles from public ATS boards (Greenhouse, Lever, Ashby, Workday) and a directory of 2,693 Northeastern faculty across 7 colleges, scores fit honestly, and flags work-authorization blockers (F-1, CPT, OPT) before any effort is spent. Gemini, streamed through the Vercel AI SDK, drafts outreach, tailored resumes, and arXiv paper briefs grounded only in each user's own profile and resume, flagging gaps instead of inventing them. I added RAG over pgvector for outreach, isolated every account with Supabase row-level security, and exposed the copilot as agent tools through an MCP server.",
    highlights: [
      "2,693 faculty across 7 colleges",
      "4 public ATS sources",
      "RAG on pgvector",
      "per-user grounding",
      "row-level security",
      "MCP agent tools",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "pgvector", "Gemini", "Vercel AI SDK", "MCP", "Playwright"],
    links: [{ label: "Live App", href: "https://v0-traceop.vercel.app" }],
    media: { poster: "/projects/traceop-poster.jpg", video: "/projects/traceop.mp4", alt: "TraceOp landing page and product views" },
  },
  {
    tag: "Independent Project · In Progress · Fall 2026",
    title: "LOEWISE",
    accent: "Retrieval system that answers questions across FDA drug and patent records",
    summary: "Answers drug patent questions from cited FDA and patent records, and flags any answer it cannot back up for human review.",
    outcomes: [
      "Every answer cites the FDA or patent record it came from",
      "Low-confidence extractions go to a human before anyone sees them",
      "Flags where a patent's listed use reaches beyond the drug's approved label",
    ],
    description:
      "An in-progress independent project. I am prototyping an agentic retrieval pipeline in Python over FDA Orange Book and patent records that answers drug patent questions from cited sources instead of scattered documents. Every answer is tested against its source document, and low-confidence extractions are flagged for human review so unverified answers never reach users. It also cross-references Orange Book patent use codes with FDA labeling to flag where coverage exceeds approved uses.",
    stack: ["Python", "Agentic Retrieval", "RAG", "FDA Orange Book", "Patent Data", "Human Review"],
  },
  {
    tag: "Hackathon · Dell x NVIDIA · Team of 3",
    title: "Site Safety Watch",
    accent: "On-Device Vision Agent for Workplace Hazards",
    summary: "Spots a blocked fire exit on a site camera and alerts the supervisor in Slack, with the video never leaving the building.",
    outcomes: [
      "Raw video never leaves the site: every model runs on one local Dell GB10",
      "Measured on the box: 0.57 s per camera check and capacity for 24 cameras",
      "My part: the evaluation, comparing six detection settings on labelled test clips",
    ],
    description:
      "An always-on safety agent my team built in one day at the Dell x NVIDIA AI Hackathon in Boston. It checks each camera frame with a local vision-language model (Qwen on vLLM), and when an exit is blocked, posts the hazard, the OSHA rule (29 CFR 1910.37), and a proposed fix to Slack for a supervisor to approve or reject. All inference runs on one Dell Pro Max with GB10, so raw video never leaves the box. I owned evaluation and the story: I filmed and labelled the test clips (phone, CCTV-angle, dim, degraded 360p), built the eval harness comparing six detection settings, and wrote the slides and writeup. Measured on the box: 0.57 s per camera check and capacity for 24 cameras.",
    stack: ["Python", "Evaluation Harness", "OpenCV", "ffmpeg", "vLLM", "Vision-Language Models", "NVIDIA GB10"],
    links: [{ label: "GitHub", href: "https://github.com/hemnaath04/site-safety-watch" }],
    media: { poster: "/projects/ssw-poster.jpg", video: "/projects/ssw.mp4", alt: "Site Safety Watch project page with measured results" },
  },
  {
    tag: "Product · Offline PWA · Live",
    title: "BayState Ghilli",
    accent: "Massachusetts Learner's Permit Practice",
    summary: "Helps Massachusetts learners pass the permit test with free, offline practice exams that bring back the questions they miss.",
    outcomes: [
      "372 original questions across 7 categories, with timed mock exams",
      "A missed question comes back on the very next exam (Leitner-style spaced repetition)",
      "Works offline as an installable app and needs no account",
    ],
    description:
      "A free, offline-first practice app for the Massachusetts learner's permit exam, with 372 original questions across 7 categories, timed mock exams built to difficulty targets, and Leitner-style spaced repetition that brings a missed question back on the very next exam. The core runs entirely in the browser as an installable PWA with progress kept on the device, so it needs no account or backend. Optional features switch on only with credentials: a moderated review system on Supabase behind an 18+ age gate, and a daily GitHub Actions monitor that emails me through Resend when the official manual changes, checking only metadata, never the PDF itself.",
    stack: ["React", "TypeScript", "Vite", "PWA", "Supabase", "GitHub Actions", "Resend", "Vitest"],
    links: [{ label: "Live App", href: "https://baystateghilli.vercel.app" }],
    media: { poster: "/projects/ghilli-poster.jpg", video: "/projects/ghilli.mp4", alt: "BayState Ghilli practice exam in action" },
  },
  {
    tag: "Project · Robotics · Sequence Modeling",
    title: "RNN vs. Transformer",
    accent: "Robot Trajectory Prediction",
    summary: "Tested which model predicts where a robot moves next more accurately: a classic recurrent network or a physics-informed Transformer.",
    outcomes: [
      "The RNN baseline reached ADE 0.1494 m, FDE 0.3509 m and MSE 0.0214 on the NCLT dataset",
      "Physics-based kinematics were added to a linear Transformer to cut compute",
      "Written up as a full technical report with a side-by-side benchmark",
    ],
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
    preview: "trajectory",
  },
  {
    tag: "Publication · Peer-Reviewed",
    title: "Machine Learning Based Image Analysis for Grain Quality Assessment",
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
    title: "Programming",
    items: [
      { name: "Python", level: "" },
      { name: "SQL", level: "" },
      { name: "TypeScript", level: "" },
      { name: "Bash", level: "" },
      { name: "Data Structures", level: "" },
      { name: "Algorithms", level: "" },
    ],
  },
  {
    title: "Machine Learning",
    items: [
      { name: "PyTorch", level: "" },
      { name: "LSTM / Bi-LSTM", level: "" },
      { name: "Multi-Head Attention", level: "" },
      { name: "Focal Loss", level: "" },
      { name: "Conformal Prediction", level: "" },
      { name: "Ablation Studies", level: "" },
      { name: "Transformers", level: "" },
    ],
  },
  {
    title: "Artificial Intelligence",
    items: [
      { name: "LLMs", level: "" },
      { name: "RAG", level: "" },
      { name: "Agentic Frameworks", level: "" },
      { name: "Prompt Engineering", level: "" },
      { name: "Vector Search", level: "" },
      { name: "pgvector", level: "" },
      { name: "MCP", level: "" },
    ],
  },
  {
    title: "Data and Orchestration",
    items: [
      { name: "Snowflake", level: "" },
      { name: "Oracle", level: "" },
      { name: "PostgreSQL", level: "" },
      { name: "ETL", level: "" },
      { name: "Database Migrations", level: "" },
      { name: "AutoSys", level: "" },
      { name: "Redwood", level: "" },
      { name: "Supabase", level: "" },
    ],
  },
  {
    title: "Development",
    items: [
      { name: "REST APIs", level: "" },
      { name: "FastAPI", level: "" },
      { name: "Next.js", level: "" },
      { name: "Docker", level: "" },
      { name: "Git", level: "" },
      { name: "GitHub Copilot", level: "" },
      { name: "Linux", level: "" },
      { name: "Tableau", level: "" },
      { name: "Playwright", level: "" },
      { name: "Vercel", level: "" },
    ],
  },
  {
    title: "Cloud Certificates",
    items: [
      { name: "Azure Data Engineer Associate (DP-203)", level: "" },
      { name: "Azure Fundamentals (AZ-900)", level: "" },
    ],
  },
];

export type Milestone = {
  when: string;
  title: string;
  org: string;
  /** progression within one employer, newest first */
  roles?: { title: string; when: string }[];
  body?: string;
  bullets?: string[];
  courses?: string[];
};

export const journey: Milestone[] = [
  {
    when: "Jan 2026 to May 2028",
    title: "M.S., Electrical & Computer Engineering",
    org: "Northeastern University · Boston, MA · GPA 3.8",
    bullets: [
      "Concentration: Hardware and Software in Machine Intelligence.",
      "Building on 3+ years of industry data engineering to move from data pipelines into production ML.",
    ],
    courses: [
      "Machine Learning",
      "Large Language Models",
      "Reinforcement Learning",
      "Fundamentals of Computer Engineering",
    ],
  },
  {
    when: "Mar 2022 to Sep 2025",
    title: "Software Engineer, Data Warehouse and Reporting",
    org: "Hexaware Technologies · Client: Brown Brothers Harriman · India",
    roles: [
      { title: "Software Engineer, Data Warehouse and Reporting", when: "Sep 2022 to Sep 2025" },
      { title: "Graduate Engineer Trainee", when: "Mar 2022 to Aug 2022" },
    ],
    bullets: [
      "Average incident resolution time dropped 50% across 50+ business-critical AutoSys and Redwood pipelines on Linux, once every job carried structured logging that traced failures to root cause.",
      "Business-reported data discrepancies held at 5 or fewer a month: Python services validated API payloads and CSV feeds at ingest and reconciled them against source with row counts and checksums.",
      "8+ source systems consolidated into analytics-ready tables through ETL pipelines and database migrations in Python, SQL and Oracle Data Integrator, turning an hour-long manual report into automated same-day delivery.",
      "One-off scripts became reusable object-oriented components with shared configuration and database connections, built with help from GitHub Copilot and LLM assistants.",
      "No single-person dependency left across 250+ processes: runbooks, standard operating procedures and Tableau dashboards let teammates and stakeholders self-serve.",
      "Graduate Engineer Trainee: moved into a specialized Data Engineer track within 3 months, ahead of schedule, working in Python, SQL, Snowflake and Oracle.",
    ],
  },
  {
    when: "Aug 2018 to Apr 2022",
    title: "B.E., Electronics & Communication Engineering",
    org: "Sri Sairam Engineering College, Anna University · Chennai, India · GPA 3.4/4.0",
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
