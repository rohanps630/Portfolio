import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolioData";
import { TimelineItem } from "./Experience/TimelineItem";
import styles from "./Experience.module.css";

const Experience = () => {
  const { experience } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className={styles.section} ref={ref}>
      <motion.div
        className={styles.timeline}
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{ transformOrigin: "top" }}
      />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            {experience.title.split(' ')[0]}{" "}
            <span className="gradient-text">
              {experience.title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <p className={styles.description}>{experience.description}</p>
        </motion.div>

        <div className={styles.itemsWrapper}>
          {experience.items.map((exp, index) => (
            <TimelineItem
              key={`${exp.company}-${exp.year}`}
              exp={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
