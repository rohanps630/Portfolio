import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import styles from "../Skills.module.css";

interface SkillBadgeProps {
  skill: string;
  index: number;
  categoryIndex: number;
  isInView: boolean;
}

export const SkillBadge = ({ skill, index, categoryIndex, isInView }: SkillBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{
        delay: categoryIndex * 0.2 + index * 0.05 + 0.4,
        type: "spring",
      }}
      whileHover={{ scale: 1.15, rotate: 3 }}
      whileTap={{ scale: 0.95 }}
    >
      <Badge variant="secondary" className={styles.skillBadge}>
        {skill}
      </Badge>
    </motion.div>
  );
};
