import { motion } from "framer-motion";
import styles from "../Navigation.module.css";

interface MenuItemProps {
  href: string;
  label: string;
  index: number;
  isActive: boolean;
  onClick: (href: string) => void;
}

export const MenuItem = ({ href, label, index, isActive, onClick }: MenuItemProps) => {
  return (
    <motion.a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick(href);
      }}
      className={`${styles.navLink} ${
        isActive ? styles.navLinkActive : styles.navLinkInactive
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      {isActive && (
        <motion.div
          className={styles.activeIndicator}
          layoutId="activeSection"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </motion.a>
  );
};
