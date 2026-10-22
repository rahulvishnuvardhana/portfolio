import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Experience from "@/components/site/Experience";
import Projects from "@/components/site/Projects";
import ValuePitch from "@/components/site/ValuePitch";
import Publications from "@/components/site/Publications";
import Skills from "@/components/site/Skills";
import Contact from "@/components/site/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ValuePitch />
      <Projects />
      <Experience />
      <Skills />
      <Publications />
      <About />
      <Contact />
    </>
  );
}
