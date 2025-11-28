import { Code } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolioData";
import { HighlightCard } from "./About/HighlightCard";
import styles from "./About.module.css";

const About = () => {
  const { about } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            {about.title.split(' ')[0]}{" "}
            <span className="gradient-text">
              {about.title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <p className={styles.description}>{about.description}</p>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <p className={styles.textContent}>{about.description}</p>
          </motion.div>

          <motion.div
            className={styles.visualContainer}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className={styles.visualBox}
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Code className="w-32 h-32 text-primary/40" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className={styles.highlightsGrid}>
          {about.highlights.map((highlight, index) => (
            <HighlightCard
              key={highlight.title}
              highlight={highlight}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
