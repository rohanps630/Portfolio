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
    logo: "AJ",
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
    name: "Alex Johnson",
    titles: [
      "Full-Stack Developer",
      "Mobile App Developer",
      "Backend Specialist",
      "UI/UX Enthusiast",
    ],
    bio: "Crafting exceptional digital experiences with clean code and innovative solutions. Specialized in building scalable web applications, responsive mobile apps, and robust backend systems.",
    ctaButtons: {
      primary: { text: "View My Work", href: "#projects" },
      secondary: { text: "Get In Touch", href: "#contact" },
    },
    socialLinks: [
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "Email", url: "mailto:alex@example.com", icon: "email" },
    ],
  },

  // About Section
  about: {
    title: "About Me",
    description:
      "I'm a passionate full-stack developer with 5 years of experience building modern web applications, mobile apps, and scalable backend systems. I love turning complex problems into simple, beautiful, and intuitive solutions.",
    highlights: [
      {
        icon: "code",
        title: "Clean Code Advocate",
        description:
          "Writing maintainable, scalable code that stands the test of time",
      },
      {
        icon: "rocket",
        title: "Performance Focused",
        description:
          "Optimizing applications for speed and user experience",
      },
      {
        icon: "users",
        title: "Team Collaboration",
        description:
          "Working effectively with designers, developers, and stakeholders",
      },
      {
        icon: "trophy",
        title: "Problem Solver",
        description:
          "Finding creative solutions to complex technical challenges",
      },
    ],
  },

  // Skills Section
  skills: {
    title: "Skills & Technologies",
    description:
      "A comprehensive toolkit built over 5 years of professional development",
    categories: [
      {
        title: "Frontend Development",
        skills: [
          "React",
          "TypeScript",
          "Next.js",
          "Vue.js",
          "Tailwind CSS",
          "Framer Motion",
          "HTML5/CSS3",
          "JavaScript (ES6+)",
        ],
      },
      {
        title: "Backend Development",
        skills: [
          "Node.js",
          "Express",
          "Python",
          "Django",
          "REST APIs",
          "GraphQL",
          "PostgreSQL",
          "MongoDB",
        ],
      },
      {
        title: "Mobile Development",
        skills: [
          "React Native",
          "Flutter",
          "iOS Development",
          "Android Development",
          "Mobile UI/UX",
        ],
      },
      {
        title: "Tools & Others",
        skills: [
          "Git",
          "Docker",
          "AWS",
          "CI/CD",
          "Jest",
          "Webpack",
          "Figma",
          "Agile/Scrum",
        ],
      },
    ],
  },

  // Experience Section
  experience: {
    title: "Professional Journey",
    description: "5 years of building impactful solutions across web, mobile, and backend",
    items: [
      {
        year: "2023 - Present",
        title: "Senior Full-Stack Developer",
        company: "Tech Innovations Inc.",
        description:
          "Leading development of enterprise-scale applications with a focus on performance and scalability.",
        achievements: [
          "Architected and deployed microservices infrastructure serving 100k+ users",
          "Reduced application load time by 60% through optimization techniques",
          "Mentored junior developers and established coding standards",
        ],
      },
      {
        year: "2021 - 2023",
        title: "Full-Stack Developer",
        company: "Digital Solutions Co.",
        description:
          "Developed modern web applications and mobile apps for diverse clients.",
        achievements: [
          "Built 15+ responsive web applications using React and Node.js",
          "Created cross-platform mobile apps with React Native",
          "Implemented CI/CD pipelines reducing deployment time by 80%",
        ],
      },
      {
        year: "2020 - 2021",
        title: "Frontend Developer",
        company: "StartUp Labs",
        description:
          "Focused on creating exceptional user interfaces and experiences.",
        achievements: [
          "Designed and implemented UI component library used across 5 products",
          "Improved accessibility scores to 95+ on all projects",
          "Collaborated with UX team to refine user workflows",
        ],
      },
      {
        year: "2019 - 2020",
        title: "Junior Developer",
        company: "WebDev Agency",
        description:
          "Started professional journey building websites and learning best practices.",
        achievements: [
          "Delivered 20+ client websites on time and within budget",
          "Learned modern development workflows and version control",
          "Contributed to team knowledge base and documentation",
        ],
      },
    ],
  },

  // Projects Section
  projects: {
    title: "Featured Projects",
    description:
      "Showcasing my skills in full-stack development, mobile apps, and scalable backend systems",
    projects: [
      {
        title: "E-Commerce Platform",
        description:
          "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include real-time inventory, payment processing, and admin dashboard.",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        image:
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        github: "#",
        demo: "#",
      },
      {
        title: "Task Management App",
        description:
          "Collaborative task manager with real-time updates using WebSockets. Drag-and-drop interface with team collaboration features.",
        tags: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
        image:
          "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
        github: "#",
        demo: "#",
      },
      {
        title: "Weather Dashboard",
        description:
          "Real-time weather application with interactive maps and forecasting. Integrated with multiple weather APIs for accurate data.",
        tags: ["Vue.js", "Chart.js", "REST API", "Tailwind"],
        image:
          "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
        github: "#",
        demo: "#",
      },
      {
        title: "Social Media Analytics",
        description:
          "Analytics dashboard for tracking social media performance. Features data visualization and automated reporting.",
        tags: ["Next.js", "D3.js", "Express", "Redis"],
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
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
        value: "alex@example.com",
        href: "mailto:alex@example.com",
      },
      {
        icon: "phone",
        label: "Phone",
        value: "+1 (555) 123-4567",
        href: "tel:+15551234567",
      },
      {
        icon: "map-pin",
        label: "Location",
        value: "San Francisco, CA",
      },
    ],
    formEnabled: true,
  },

  // Footer Section
  footer: {
    name: "Alex Johnson",
    copyright: "© 2024 All rights reserved.",
    socialLinks: [
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "Email", url: "mailto:alex@example.com", icon: "email" },
    ],
  },
};
