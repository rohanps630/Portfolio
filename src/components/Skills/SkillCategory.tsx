import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SkillCategory as SkillCategoryType } from "@/types/portfolio";
import { SkillBadge } from "./SkillBadge";
import styles from "../Skills.module.css";

interface SkillCategoryProps {
  category: SkillCategoryType;
  index: number;
  isInView: boolean;
}

export const SkillCategory = ({ category, index, isInView }: SkillCategoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : { opacity: 0, y: 50, rotateX: -15 }
      }
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card className={styles.card}>
        <motion.h3
          className={styles.cardTitle}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {category.title}
        </motion.h3>
        <div className={styles.skillsWrapper}>
          {category.skills.map((skill, skillIndex) => (
            <SkillBadge
              key={skill}
              skill={skill}
              index={skillIndex}
              categoryIndex={index}
              isInView={isInView}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
