import { Card } from "@/components/ui/card";
import { Code, Users, Rocket, Trophy, Target, Zap, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Highlight } from "@/types/portfolio";
import styles from "../About.module.css";

interface HighlightCardProps {
  highlight: Highlight;
  index: number;
  isInView: boolean;
}

const iconMap: Record<Highlight['icon'], LucideIcon> = {
  code: Code,
  users: Users,
  rocket: Rocket,
  trophy: Trophy,
  target: Target,
  zap: Zap,
};

export const HighlightCard = ({ highlight, index, isInView }: HighlightCardProps) => {
  const Icon = iconMap[highlight.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <Card className={styles.card}>
        <motion.div
          className={styles.iconWrapper}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-8 h-8 text-primary" />
        </motion.div>
        <h3 className={styles.cardTitle}>{highlight.title}</h3>
        <p className={styles.cardDescription}>{highlight.description}</p>
      </Card>
    </motion.div>
  );
};
