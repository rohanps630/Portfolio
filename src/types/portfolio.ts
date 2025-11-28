export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'email' | 'phone' | 'location';
}

export interface HeroConfig {
  name: string;
  titles: string[];
  bio: string;
  profileImage?: string;
  ctaButtons: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
  socialLinks: SocialLink[];
}

export interface Highlight {
  icon: 'code' | 'rocket' | 'users' | 'trophy' | 'target' | 'zap';
  title: string;
  description: string;
}

export interface AboutConfig {
  title: string;
  description: string;
  highlights: Highlight[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SkillsConfig {
  title: string;
  description: string;
  categories: SkillCategory[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
}

export interface ProjectsConfig {
  title: string;
  description: string;
  projects: Project[];
}

export interface ExperienceItem {
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

export interface ExperienceConfig {
  title: string;
  description: string;
  items: ExperienceItem[];
}

export interface ContactInfo {
  icon: 'mail' | 'phone' | 'map-pin';
  label: string;
  value: string;
  href?: string;
}

export interface ContactConfig {
  title: string;
  description: string;
  contactInfo: ContactInfo[];
  formEnabled: boolean;
}

export interface FooterConfig {
  name: string;
  copyright: string;
  socialLinks: SocialLink[];
}

export interface NavigationConfig {
  logo: string;
  sections: Array<{
    id: string;
    label: string;
  }>;
}

export interface PortfolioData {
  navigation: NavigationConfig;
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  experience: ExperienceConfig;
  projects: ProjectsConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}
