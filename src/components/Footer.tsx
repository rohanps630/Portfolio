import { Github, Linkedin, Mail, Heart, LucideIcon } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { SocialLink } from "@/types/portfolio";
import styles from "./Footer.module.css";

const iconMap: Record<SocialLink['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Github,
  email: Mail,
  phone: Mail,
  location: Mail,
};

const Footer = () => {
  const { footer } = portfolioData;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <span>Built with</span>
            <Heart className={styles.heart} />
            <span>by {footer.name}</span>
          </div>

          <nav className={styles.socialLinks} aria-label="Social media links">
            {footer.socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </nav>

          <p className={styles.copyright}>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
