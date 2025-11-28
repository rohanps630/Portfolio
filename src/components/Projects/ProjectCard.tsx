import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { Project } from "@/types/portfolio";
import styles from "../Projects.module.css";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const x: MotionValue<number> = useMotionValue(0);
  const y: MotionValue<number> = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]));

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02, z: 50 }}
        transition={{ duration: 0.3 }}
        className="cursor-hover"
      >
        <Card className={styles.card}>
          <div className={styles.imageWrapper}>
            <motion.img
              src={project.image}
              alt={project.title}
              className={styles.image}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className={styles.imageOverlay}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className={styles.content}>
            <h3 className={styles.title}>{project.title}</h3>
            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.tagsWrapper}>
              {project.tags.map((tag, tagIndex) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: tagIndex * 0.1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Badge variant="secondary" className={styles.badge}>
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <div className={styles.buttonsWrapper}>
              {project.demo && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="default"
                    size="sm"
                    className={styles.button}
                    onClick={() => window.open(project.demo, '_blank')}
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </motion.div>
              )}
              {project.github && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className={styles.button}
                    onClick={() => window.open(project.github, '_blank')}
                    aria-label={`View source code of ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
