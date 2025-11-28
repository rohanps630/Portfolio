import { motion } from "framer-motion";
import styles from "../Hero.module.css";

interface AnimatedNameProps {
  name: string;
}

export const AnimatedName = ({ name }: AnimatedNameProps) => {
  return (
    <span className="inline-block">
      {name.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={styles.nameChar}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + i * 0.05,
            ease: [0.6, 0.01, 0.05, 0.95],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};
