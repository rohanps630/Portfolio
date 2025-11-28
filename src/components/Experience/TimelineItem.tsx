import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Briefcase, ChevronDown } from "lucide-react";
import { ExperienceItem } from "@/types/portfolio";
import styles from "../Experience.module.css";

interface TimelineItemProps {
  exp: ExperienceItem;
  index: number;
  isInView: boolean;
}

export const TimelineItem = ({ exp, index, isInView }: TimelineItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={`${styles.itemContainer} ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
      }
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className={styles.timelineDot}>
        <motion.div
          className={styles.dot}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          whileHover={{ scale: 1.2, rotate: 180 }}
        >
          <Briefcase className="w-6 h-6 text-primary" />
        </motion.div>
      </div>

      <motion.div
        className={styles.contentWrapper}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.titleGroup}>
              <h3 className={styles.title}>{exp.title}</h3>
              <p className={styles.company}>{exp.company}</p>
            </div>
            <span className={styles.year}>{exp.year}</span>
          </div>

          <p className={styles.cardDescription}>{exp.description}</p>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.toggleButton}
            whileHover={{ x: 5 }}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Hide achievements" : "View achievements"}
          >
            <span>{isExpanded ? "Hide" : "View"} achievements</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>

          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? "auto" : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className={styles.achievementsList}>
              {exp.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className={styles.achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isExpanded
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <span className={styles.achievementBullet}>▸</span>
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
