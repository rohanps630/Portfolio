import { motion } from "framer-motion";
import styles from "../Hero.module.css";

export const BackgroundOrbs = () => {
  return (
    <div className={styles.backgroundWrapper}>
      <motion.div
        className={`${styles.orb} ${styles.orbPrimary}`}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orbAccent}`}
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className={`${styles.orb} ${styles.orbCenter}`}
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};
