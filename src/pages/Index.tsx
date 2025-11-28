import { useEffect } from "react";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import CustomCursor from "@/components/CustomCursor";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  useEffect(() => {
    // Konami Code Easter Egg
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.classList.add("konami-active");
          console.log("🎉 You found the secret! You're a true developer!");
          setTimeout(() => {
            document.body.classList.remove("konami-active");
          }, 5000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Console message for developers
    console.log(
      "%c👋 Hello Developer!",
      "font-size: 20px; font-weight: bold; color: #00BFFF;"
    );
    console.log(
      "%cThanks for checking out my portfolio! Try the Konami Code for a surprise 😉",
      "font-size: 14px; color: #888;"
    );

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      <CustomCursor />
      <AnimatedBackground />
      <Navigation />
      <ThemeToggle />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
