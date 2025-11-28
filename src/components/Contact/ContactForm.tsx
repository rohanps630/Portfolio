import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import styles from "../Contact.module.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  isInView: boolean;
}

export const ContactForm = ({ isInView }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const isFieldActive = (field: keyof FormData) =>
    focusedField === field || formData[field] !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6 }}
    >
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldWrapper}>
            <motion.label
              className={`${styles.label} ${
                isFieldActive("name") ? styles.labelFloating : styles.labelDefault
              }`}
              animate={{
                y: isFieldActive("name") ? -12 : 0,
                scale: isFieldActive("name") ? 0.9 : 1,
              }}
            >
              Your Name
            </motion.label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              className="cursor-hover"
              required
              aria-label="Your Name"
            />
          </div>

          <div className={styles.fieldWrapper}>
            <motion.label
              className={`${styles.label} ${
                isFieldActive("email") ? styles.labelFloating : styles.labelDefault
              }`}
              animate={{
                y: isFieldActive("email") ? -12 : 0,
                scale: isFieldActive("email") ? 0.9 : 1,
              }}
            >
              Email Address
            </motion.label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              className="cursor-hover"
              required
              aria-label="Email Address"
            />
          </div>

          <div className={styles.fieldWrapper}>
            <motion.label
              className={`${styles.label} ${
                isFieldActive("message") ? styles.labelFloating : styles.labelDefault
              }`}
              animate={{
                y: isFieldActive("message") ? -12 : 0,
                scale: isFieldActive("message") ? 0.9 : 1,
              }}
            >
              Your Message
            </motion.label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              className={styles.textarea}
              required
              aria-label="Your Message"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>

          {submitStatus === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.successMessage}
            >
              ✓ Message sent successfully!
            </motion.p>
          )}
        </form>
      </Card>
    </motion.div>
  );
};
