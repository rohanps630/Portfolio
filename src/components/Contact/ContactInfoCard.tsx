import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ContactInfo } from "@/types/portfolio";
import styles from "../Contact.module.css";

interface ContactInfoCardProps {
  info: ContactInfo;
  index: number;
  isInView: boolean;
}

const iconMap: Record<ContactInfo['icon'], LucideIcon> = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
};

export const ContactInfoCard = ({ info, index, isInView }: ContactInfoCardProps) => {
  const Icon = iconMap[info.icon];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <Card className={styles.contactCard}>
        <div className={styles.contactCardContent}>
          <motion.div
            className={styles.iconWrapper}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-5 h-5 text-primary" />
          </motion.div>
          <div>
            <h4 className={styles.contactLabel}>{info.label}</h4>
            <p className={styles.contactValue}>{info.value}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
