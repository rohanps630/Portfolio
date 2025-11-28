import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolioData";
import { ProjectCard } from "./Projects/ProjectCard";
import styles from "./Projects.module.css";

const Projects = () => {
  const { projects: projectsData } = portfolioData;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            {projectsData.title.split(' ')[0]}{" "}
            <span className="gradient-text">
              {projectsData.title.split(' ').slice(1).join(' ')}
            </span>
          </h2>
          <p className={styles.description}>{projectsData.description}</p>
        </motion.div>

        <div className={styles.projectsGrid}>
          {projectsData.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
