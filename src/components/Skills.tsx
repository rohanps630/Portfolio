import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolioData";
import { SkillCategory } from "./Skills/SkillCategory";
import styles from "./Skills.module.css";

const Skills = () => {
  const { skills } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            {skills.title.split(' ').slice(0, -1).join(' ')}{" "}
            <span className="gradient-text">{skills.title.split(' ').slice(-1)}</span>
          </h2>
          <p className={styles.description}>{skills.description}</p>
        </motion.div>

        <div className={styles.categoriesGrid}>
          {skills.categories.map((category, index) => (
            <SkillCategory
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
