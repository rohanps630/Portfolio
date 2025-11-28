import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import styles from "../Hero.module.css";

interface MagneticButtonProps {
  text: string;
  href: string;
}

export const MagneticButton = ({ text, href }: MagneticButtonProps) => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const magneticX = useSpring(useTransform(mouseX, [-100, 100], [-20, 20]), {
    stiffness: 150,
    damping: 15,
  });
  const magneticY = useSpring(useTransform(mouseY, [-100, 100], [-20, 20]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = () => {
    const target = href.startsWith('#')
      ? document.getElementById(href.slice(1))
      : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (!href.startsWith('#')) {
      window.location.href = href;
    }
  };

  return (
    <motion.div
      ref={ctaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: magneticX, y: magneticY }}
      className={styles.magneticButton}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="lg"
          className={styles.primaryButton}
          onClick={handleClick}
        >
          <motion.div
            className={styles.buttonOverlay}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <Mail className={`w-4 h-4 ${styles.buttonContent}`} />
          <span className={styles.buttonContent}>{text}</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};
