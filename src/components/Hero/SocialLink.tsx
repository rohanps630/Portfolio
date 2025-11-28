import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { SocialLink as SocialLinkType } from "@/types/portfolio";
import styles from "../Hero.module.css";

interface SocialLinkProps {
  link: SocialLinkType;
  index: number;
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  twitter: Github,
  phone: Mail,
  location: Mail,
} as const;

export const SocialLink = ({ link, index }: SocialLinkProps) => {
  const Icon = iconMap[link.icon];

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
      whileHover={{ scale: 1.2, rotate: index % 2 === 0 ? 5 : -5 }}
      whileTap={{ scale: 0.9 }}
      aria-label={link.name}
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};
