import { PortfolioData } from '@/types/portfolio';

/**
 * PORTFOLIO CONFIGURATION
 * 
 * Edit this file to customize your portfolio.
 * All content is centralized here for easy maintenance.
 */

export const portfolioData: PortfolioData = {
  // Navigation Configuration
  navigation: {
    logo: "RPS",
    sections: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
  },

  // Hero Section
  hero: {
    name: "Rohan P. Suresh",
    titles: [
      "Senior Full Stack Developer",
      "AI Engineer",
      "Mobile App Developer",
      "DevOps Enthusiast",
    ],
    bio: "Results-driven Senior Full Stack Developer with 4 years of experience in building scalable web and mobile applications. Expertise in React.js, React Native, Next.js, NestJS, Django, and AI-driven development.",
    ctaButtons: {
      primary: { text: "View My Work", href: "#projects" },
      secondary: { text: "Get In Touch", href: "#contact" },
    },
    socialLinks: [
      { name: "GitHub", url: "https://github.com/rohanps630", icon: "github" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/rohanpsuresh", icon: "linkedin" },
      { name: "Email", url: "mailto:rohanpsuresh@gmail.com", icon: "email" },
    ],
  },

  // About Section
  about: {
    title: "About Me",
    description:
      "I'm a passionate Senior Full Stack Developer with a strong focus on performance optimization, UX, cloud solutions, and DevOps. I have experience leading teams, mentoring developers, and delivering high-impact solutions. I am passionate about building innovative, user-centric applications that enhance engagement and efficiency.",
    highlights: [
      {
        icon: "code",
        title: "Full-Stack Expertise",
        description:
          "React.js, Next.js, Node.js, Django, and modern web frameworks",
      },
      {
        icon: "zap",
        title: "AI & Automation",
        description:
          "Developing chatbots, voice AI, and automation using OpenAI and Twilio",
      },
      {
        icon: "rocket",
        title: "Cloud & DevOps",
        description:
          "Docker, Nginx, CI/CD pipelines, and scalable infrastructure",
      },
      {
        icon: "target",
        title: "Mobile Development",
        description:
          "High-performance cross-platform apps using React Native",
      },
    ],
  },

  // Skills Section
  skills: {
    title: "Skills & Technologies",
    description:
      "A comprehensive toolkit built over 4 years of professional development",
    categories: [
      {
        title: "Frontend Development",
        skills: [
          "React.js",
          "React Native",
          "Next.js",
          "TypeScript",
          "HTML5/CSS3",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      {
        title: "Backend Development",
        skills: [
          "Node.js",
          "NestJS",
          "Express.js",
          "Django",
          "Python",
          "REST APIs",
          "WebSockets",
        ],
      },
      {
        title: "Database",
        skills: [
          "MongoDB",
          "PostgreSQL",
          "Database Design",
          "Query Optimization",
        ],
      },
      {
        title: "DevOps & AI",
        skills: [
          "Docker",
          "Nginx",
          "CI/CD",
          "AWS",
          "OpenAI API",
          "Twilio",
          "Git/GitHub",
        ],
      },
    ],
  },

  // Experience Section
  experience: {
    title: "Professional Journey",
    description: "Experience in building impactful solutions across web, mobile, and backend",
    items: [
      {
        year: "Jun 2025 - Present",
        title: "Software Engineer",
        company: "Innovation Incubator Advisory",
        description:
          "Contributing to innovative software solutions and full-stack development.",
        achievements: [
          "Working on cutting-edge web and mobile applications",
          "Collaborating with cross-functional teams to deliver high-quality software",
        ],
      },
      {
        year: "Aug 2023 – May 2025",
        title: "Full Stack Developer",
        company: "Elsys Intelligent Devices Pvt Ltd",
        description:
          "Led a team of junior developers & AI engineers in frontend, backend, and AI-driven development.",
        achievements: [
          "Redesigned key modules, increasing user engagement by 20% through UX improvements",
          "Developed scalable React.js frontends with optimized performance and responsiveness",
          "Built a cross-platform React Native mobile app, transforming children's language learning",
          "Mentored developers, promoting best practices and code quality",
        ],
      },
      {
        year: "July 2021 – July 2023",
        title: "Full Stack Developer",
        company: "JitTech Technology Services",
        description:
          "Developed cross-platform mobile apps and secure backend services.",
        achievements: [
          "Developed cross-platform mobile apps (React Native) ensuring smooth, consistent UX",
          "Built secure, scalable backend services (Node.js, NestJS) with API optimization",
          "Delivered end-to-end web solutions (Next.js, Django) with seamless frontend-backend integration",
          "Implemented real-time features (WebSockets, push notifications) for improved user engagement",
        ],
      },
    ],
  },

  // Projects Section
  projects: {
    title: "Featured Projects",
    description:
      "Showcasing my skills in full-stack development, mobile apps, and AI integration",
    projects: [
      {
        title: "AI Automation Platform",
        description:
          "AI-driven automation platform with AI-powered bots for customer support, lead generation, and research. Integrated Twilio for automated AI call agents.",
        tags: ["React.js", "NestJS", "MongoDB", "OpenAI", "Twilio"],
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        github: "#",
        demo: "#",
      },
      {
        title: "Real-Time Accessible Chat",
        description:
          "Real-time chat app for users with hearing and speech impairments. Implemented instant text-to-text & text-to-audio communication features.",
        tags: ["React.js", "React Native", "WebSockets", "Accessibility"],
        image:
          "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        github: "#",
        demo: "#",
      },
      {
        title: "Interactive Learning Platform",
        description:
          "Web & mobile learning platform with interactive lessons & real-time video interactions. Integrated personalized learning paths and cross-platform synchronization.",
        tags: ["React.js", "React Native", "Node.js", "MongoDB"],
        image:
          "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
        github: "#",
        demo: "#",
      },
      {
        title: "Roofing CRM Solution",
        description:
          "Cross-platform CRM solution tailored for roofing companies. Features job management, appointment scheduling, invoicing, and real-time analytics.",
        tags: ["React Native", "CRM", "Analytics", "Mobile"],
        image:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        github: "#",
        demo: "#",
      },
    ],
  },

  // Contact Section
  contact: {
    title: "Get In Touch",
    description:
      "Have a project in mind or want to collaborate? I'd love to hear from you!",
    contactInfo: [
      {
        icon: "mail",
        label: "Email",
        value: "rohanpsuresh@gmail.com",
        href: "mailto:rohanpsuresh@gmail.com",
      },
      {
        icon: "phone",
        label: "Phone",
        value: "+91 8921355003",
        href: "tel:+918921355003",
      },
      {
        icon: "map-pin",
        label: "Location",
        value: "Kottayam, Kerala",
      },
    ],
    formEnabled: true,
  },

  // Footer Section
  footer: {
    name: "Rohan P. Suresh",
    copyright: "© 2025 All rights reserved.",
    socialLinks: [
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "Email", url: "mailto:rohanpsuresh@gmail.com", icon: "email" },
    ],
  },
};
