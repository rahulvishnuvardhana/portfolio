import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ChatWidget from "@/components/site/ChatWidget";
import DotField from "@/components/site/DotField";
import ChapterDock from "@/components/site/ChapterDock";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Serif for headings — editorial, human feel.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Vishnuvardhana · ML & AI Engineer, Spring 2027 co-op",
  description:
    "ML and AI engineer for teams that need models to keep working after the demo. M.S. ECE at Northeastern, 3+ years of production data engineering for Brown Brothers Harriman. Available for a Spring 2027 co-op.",
  authors: [{ name: "Rahul Vishnuvardhana" }],
  keywords: [
    "Machine Learning Engineer",
    "AI Engineer",
    "LLM Engineer",
    "Software Engineer",
    "Spring 2027 co-op",
    "Northeastern University",
  ],
  openGraph: {
    title: "Rahul Vishnuvardhana · ML & AI Engineer, Spring 2027 co-op",
    description:
      "ML and AI that keeps working after the demo: forecasting, grounded AI tools and production data habits. Available for a Spring 2027 co-op.",
    type: "website",
  },
};

// Runs before paint to set the theme class and avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <DotField />
          <main className="relative z-[1] mx-auto max-w-6xl px-5 sm:px-8">{children}</main>
          <div className="relative z-[1]">
            <Footer />
          </div>
          <ChatWidget />
          <ChapterDock />
        </SmoothScroll>
      </body>
    </html>
  );
}
