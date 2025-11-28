import { Button } from "@/components/ui/button";
import { Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { AnimatedName } from "./Hero/AnimatedName";
import { BackgroundOrbs } from "./Hero/BackgroundOrbs";
import { MagneticButton } from "./Hero/MagneticButton";
import { SocialLink } from "./Hero/SocialLink";
import styles from "./Hero.module.css";

const Hero = () => {
  const { hero } = portfolioData;
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % hero.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [hero.titles.length]);

  const handleSecondaryClick = () => {
    const { href } = hero.ctaButtons.secondary;
    const target = href.startsWith('#')
      ? document.getElementById(href.slice(1))
      : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (!href.startsWith('#')) {
      window.location.href = href;
    }
  };

  return (
    <section id="home" className={styles.section}>
      <BackgroundOrbs />

      <div className={styles.container}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 className="w-4 h-4 text-primary" />
          </motion.div>
          <span className={styles.badgeText}>Available for new opportunities</span>
        </motion.div>

        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm <AnimatedName name={hero.name} />
        </motion.h1>

        <div className={styles.titleWrapper}>
          <motion.p
            key={titleIndex}
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {hero.titles[titleIndex]}
          </motion.p>
        </div>

        <motion.p
          className={styles.bio}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {hero.bio}
        </motion.p>

        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MagneticButton
            text={hero.ctaButtons.primary.text}
            href={hero.ctaButtons.primary.href}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className={styles.secondaryButton}
              onClick={handleSecondaryClick}
            >
              {hero.ctaButtons.secondary.text}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.socialWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {hero.socialLinks.map((link, index) => (
            <SocialLink key={link.name} link={link} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
