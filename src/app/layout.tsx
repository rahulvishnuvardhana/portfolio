import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
  title: "Rahul Vishnuvardhana — Applied ML Engineer",
  description:
    "Applied Machine Learning Engineer. Temporal sequence modeling, data-efficient learning, banking-grade ML systems.",
  authors: [{ name: "Rahul Vishnuvardhana" }],
  keywords: [
    "Applied ML",
    "Machine Learning Engineer",
    "Temporal Sequence Modeling",
    "Banking ML",
    "Northeastern University",
    "Portfolio",
  ],
  openGraph: {
    title: "Rahul Vishnuvardhana — Applied ML Engineer",
    description:
      "Building banking-grade ML systems that predict failure before it happens.",
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
          <main className="mx-auto max-w-[44rem] px-6">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
