import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import VideoShowcase from "@/components/sections/VideoShowcase";
import Skills from "@/components/sections/Skills";
import Leadership from "@/components/sections/Leadership";
import Contact from "@/components/sections/Contact";
import RobotAssistant from "@/components/RobotAssistant";

export default function Home() {
  return (
    <main className="relative min-h-screen text-zinc-100 overflow-x-clip">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <VideoShowcase />
      <Skills />
      <Leadership />
      <Contact />
      <Footer />
      <RobotAssistant />
    </main>
  );
}
