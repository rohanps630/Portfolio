import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolioData";
import { ContactInfoCard } from "./Contact/ContactInfoCard";
import { ContactForm } from "./Contact/ContactForm";
import styles from "./Contact.module.css";

const Contact = () => {
  const { contact } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            {contact.title.split(' ').slice(0, -1).join(' ')}{" "}
            <span className="gradient-text">{contact.title.split(' ').slice(-1)}</span>
          </h2>
          <p className={styles.description}>{contact.description}</p>
        </motion.div>

        <div className={styles.contentGrid}>
          <div className={styles.infoSection}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={styles.infoHeader}>Get in Touch</h3>
              <p className={styles.infoDescription}>{contact.description}</p>
            </motion.div>

            <div className={styles.contactList}>
              {contact.contactInfo.map((info, index) => (
                <ContactInfoCard
                  key={info.label}
                  info={info}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </div>

          {contact.formEnabled && <ContactForm isInView={isInView} />}
        </div>
      </div>
    </section>
  );
};

export default Contact;
