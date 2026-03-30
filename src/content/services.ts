export interface ServiceTier {
  id: string;
  title: string;
  description: string;
  price: string;
  timeline: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
}

const services: ServiceTier[] = [
  {
    id: "mvp-development",
    title: "MVP Development",
    description:
      "Go from idea to a working product fast. Ideal for startups validating a concept or founders who need a polished prototype to secure funding.",
    price: "Starting from $3,000",
    timeline: "4-8 weeks",
    features: [
      "Requirements analysis",
      "UI/UX design",
      "Core feature development",
      "Testing & QA",
      "Deployment setup",
      "30 days post-launch support",
    ],
    highlighted: false,
    ctaText: "Start Your MVP",
  },
  {
    id: "full-product-build",
    title: "Full Product Build",
    description:
      "End-to-end development for businesses ready to invest in a production-grade application with scalable architecture, integrations, and long-term maintainability.",
    price: "Starting from $10,000",
    timeline: "3-6 months",
    features: [
      "Everything in MVP Development",
      "Architecture design",
      "Full feature development",
      "Third-party integrations",
      "Performance optimization",
      "CI/CD pipeline",
      "90 days post-launch support",
    ],
    highlighted: true,
    ctaText: "Build Your Product",
  },
  {
    id: "ongoing-support",
    title: "Ongoing Support & Development",
    description:
      "Continuous development and maintenance for established products that need to evolve, stay secure, and perform at scale without hiring a full-time team.",
    price: "Starting from $2,000/month",
    timeline: "Ongoing",
    features: [
      "Feature additions",
      "Bug fixes",
      "Performance monitoring",
      "Security updates",
      "Code reviews",
      "Architecture consulting",
    ],
    highlighted: false,
    ctaText: "Get Ongoing Support",
  },
];

export default services;
