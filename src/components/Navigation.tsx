import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { MenuItem } from "./Navigation/MenuItem";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const { navigation } = portfolioData;
  const navItems = navigation.sections.map((section) => ({
    name: section.label,
    href: `#${section.id}`,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navigation.sections[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : styles.navDefault}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.container}>
          <motion.a
            href={`#${navigation.sections[0].id}`}
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(`#${navigation.sections[0].id}`);
            }}
            aria-label="Home"
          >
            {navigation.logo}
          </motion.a>

          <div className={styles.desktopMenu}>
            {navItems.map((item, index) => (
              <MenuItem
                key={item.name}
                href={item.href}
                label={item.name}
                index={index}
                isActive={activeSection === item.href.slice(1)}
                onClick={scrollToSection}
              />
            ))}
          </div>

          <motion.button
            className={styles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.mobileMenuBackground}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className={styles.mobileMenuContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className={styles.mobileMenuNav}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className={styles.mobileNavLink}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, x: 10 }}
                  >
                    <span
                      className={
                        activeSection === item.href.slice(1)
                          ? styles.mobileNavLinkActive
                          : styles.mobileNavLinkInactive
                      }
                    >
                      {item.name}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
