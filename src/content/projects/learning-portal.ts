import type { Project } from "@/types/project";

const learningPortal: Project = {
  slug: "learning-portal",
  title: "Interactive Learning Portal",
  tagline:
    "Cross-platform educational ecosystem bridging web and mobile learning",
  description:
    "A unified educational platform that brings together a feature-rich web dashboard for educators and a student-focused mobile experience, powered by a shared API architecture that keeps learning seamless across every device.",
  category: "full-stack",
  featured: true,
  sortOrder: 2,
  challenge:
    "Educational institutions needed a unified platform that works seamlessly across web and mobile, where the web app provides full administrative and content features while the mobile app focuses on student engagement.",
  role: "Full Stack Developer",
  approach:
    "Shared API architecture serving both web and mobile clients, with React for the feature-rich web dashboard and React Native for the student-focused mobile experience.",
  features: [
    {
      title: "Adaptive Learning Paths with Progress Tracking",
      description:
        "Personalized course sequences that adjust difficulty and content based on individual performance, with granular progress dashboards for students and educators alike.",
    },
    {
      title: "Real-Time Video Sessions and Collaborative Tools",
      description:
        "Live video classrooms with shared whiteboards, breakout rooms, and in-session polling to replicate the interactivity of in-person learning.",
    },
    {
      title: "Assignment Submission and Automated Grading",
      description:
        "Streamlined submission workflows with configurable auto-grading rubrics that give students instant feedback and free up educator time.",
    },
    {
      title: "Analytics Dashboard for Educators",
      description:
        "Comprehensive reporting on student engagement, completion rates, and performance trends to help educators identify at-risk learners early.",
    },
    {
      title: "Offline-First Mobile Experience for Students",
      description:
        "Course materials and assignments cached locally so students can continue learning without an internet connection, with automatic sync when back online.",
    },
  ],
  impact: [
    {
      label: "Active Learners",
      value: "2,000+",
      description: "Served 2,000+ active learners",
    },
    {
      label: "Student Engagement",
      value: "+35%",
      description: "Improved student engagement by 35%",
    },
    {
      label: "Admin Overhead",
      value: "-50%",
      description: "Reduced administrative overhead by 50%",
    },
  ],
  techStack: [
    "React",
    "React Native",
    "Node.js",
    "MongoDB",
    "WebSockets",
    "Redis",
  ],
  coverImage: "/images/projects/learning-portal/cover.webp",
  screenshots: [
    "/images/projects/learning-portal/screenshot-1.webp",
    "/images/projects/learning-portal/screenshot-2.webp",
    "/images/projects/learning-portal/screenshot-3.webp",
  ],
  duration: "6 months",
  year: "2022",
};

export default learningPortal;
