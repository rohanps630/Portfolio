import postgres from "postgres";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const sql = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false });

async function seed() {
  console.log("Seeding Supabase database...\n");

  // --- Site Config ---
  console.log("Seeding site_config...");
  const siteConfigEntries = [
    ["name", "Rohan P. Suresh"],
    ["title", "Rohan P. Suresh — Full Stack Developer"],
    ["description", "I help startups and businesses turn ideas into reliable, scalable software — from first prototype to production. Full Stack Developer specializing in React, React Native, Next.js, Node.js & AI integration."],
    ["tagline", "I build products that scale."],
    ["email", "rohanpsuresh@gmail.com"],
    ["phone", "+91 8921355003"],
    ["location", "Kottayam, Kerala, India"],
    ["whatsapp", "https://wa.me/918921355003"],
    ["github", "https://github.com/rohanps630"],
    ["linkedin", "https://linkedin.com/in/rohanpsuresh"],
    ["site_url", "https://rohansuresh.dev"],
  ];
  for (const [key, value] of siteConfigEntries) {
    await sql`INSERT INTO site_config (key, value) VALUES (${key}, ${value}) ON CONFLICT (key) DO UPDATE SET value = ${value}`;
  }
  console.log(`  ✓ ${siteConfigEntries.length} config entries`);

  // --- Nav Items ---
  console.log("Seeding nav_items...");
  const navItems = [
    { label: "Home", href: "/", sort_order: 1 },
    { label: "About", href: "/about", sort_order: 2 },
    { label: "Projects", href: "/projects", sort_order: 3 },
    { label: "Services", href: "/services", sort_order: 4 },
    { label: "Blog", href: "/blog", sort_order: 5 },
    { label: "Contact", href: "/contact", sort_order: 6 },
  ];
  for (const item of navItems) {
    await sql`INSERT INTO nav_items (label, href, sort_order) VALUES (${item.label}, ${item.href}, ${item.sort_order}) ON CONFLICT DO NOTHING`;
  }
  console.log(`  ✓ ${navItems.length} nav items`);

  // --- Stats ---
  console.log("Seeding stats...");
  const stats = [
    { label: "Years Experience", value: "4.5+", sort_order: 1 },
    { label: "Products Shipped", value: "6+", sort_order: 2 },
    { label: "Teams Led", value: "5+", sort_order: 3 },
  ];
  for (const s of stats) {
    await sql`INSERT INTO stats (label, value, sort_order) VALUES (${s.label}, ${s.value}, ${s.sort_order}) ON CONFLICT DO NOTHING`;
  }
  console.log(`  ✓ ${stats.length} stats`);

  // --- Tech Stack ---
  console.log("Seeding tech_stack...");
  const techStack = [
    "React", "React Native", "Next.js", "TypeScript", "Node.js", "NestJS",
    "Python", "Django", "Kotlin", "MongoDB", "PostgreSQL", "Docker",
    "AWS", "Tailwind CSS", "GraphQL", "WebSockets",
  ];
  for (let i = 0; i < techStack.length; i++) {
    await sql`INSERT INTO tech_stack (name, sort_order) VALUES (${techStack[i]}, ${i + 1}) ON CONFLICT DO NOTHING`;
  }
  console.log(`  ✓ ${techStack.length} technologies`);

  // --- Services ---
  console.log("Seeding services...");
  const services = [
    {
      slug: "mvp-development",
      title: "MVP Development",
      description: "Go from idea to a working product fast. Ideal for startups validating a concept or founders who need a polished prototype to secure funding.",
      price: "Starting from $3,000",
      timeline: "4-8 weeks",
      features: ["Requirements analysis", "UI/UX design", "Core feature development", "Testing & QA", "Deployment setup", "30 days post-launch support"],
      highlighted: false,
      cta_text: "Start Your MVP",
      sort_order: 1,
    },
    {
      slug: "full-product-build",
      title: "Full Product Build",
      description: "End-to-end development for businesses ready to invest in a production-grade application with scalable architecture, integrations, and long-term maintainability.",
      price: "Starting from $10,000",
      timeline: "3-6 months",
      features: ["Everything in MVP Development", "Architecture design", "Full feature development", "Third-party integrations", "Performance optimization", "CI/CD pipeline", "90 days post-launch support"],
      highlighted: true,
      cta_text: "Build Your Product",
      sort_order: 2,
    },
    {
      slug: "ongoing-support",
      title: "Ongoing Support & Development",
      description: "Continuous development and maintenance for established products that need to evolve, stay secure, and perform at scale without hiring a full-time team.",
      price: "Starting from $2,000/month",
      timeline: "Ongoing",
      features: ["Feature additions", "Bug fixes", "Performance monitoring", "Security updates", "Code reviews", "Architecture consulting"],
      highlighted: false,
      cta_text: "Get Ongoing Support",
      sort_order: 3,
    },
  ];
  for (const s of services) {
    await sql`INSERT INTO services (slug, title, description, price, timeline, features, highlighted, cta_text, sort_order)
      VALUES (${s.slug}, ${s.title}, ${s.description}, ${s.price}, ${s.timeline}, ${JSON.stringify(s.features)}, ${s.highlighted}, ${s.cta_text}, ${s.sort_order})
      ON CONFLICT (slug) DO NOTHING`;
  }
  console.log(`  ✓ ${services.length} services`);

  // --- Testimonials ---
  console.log("Seeding testimonials...");
  const testimonials = [
    { quote: "Rohan took our rough concept and turned it into a polished product in record time. His ability to translate business needs into clean, maintainable code is exceptional.", name: "Aditya Menon", role: "Co-founder", company: "TechLaunch Solutions", sort_order: 1 },
    { quote: "Working with Rohan was a game changer for our team. He brought structure to our codebase, mentored junior developers, and delivered features ahead of schedule consistently.", name: "Sarah Mitchell", role: "Product Manager", company: "CloudNine Apps", sort_order: 2 },
    { quote: "Rohan has a rare combination of deep technical skill and genuine care for the end-user experience. He is the kind of developer every startup needs on their side.", name: "Vivek Krishnan", role: "CTO", company: "FinEdge Technologies", sort_order: 3 },
  ];
  for (const t of testimonials) {
    await sql`INSERT INTO testimonials (quote, name, role, company, sort_order) VALUES (${t.quote}, ${t.name}, ${t.role}, ${t.company}, ${t.sort_order}) ON CONFLICT DO NOTHING`;
  }
  console.log(`  ✓ ${testimonials.length} testimonials`);

  // --- FAQs ---
  console.log("Seeding faqs...");
  const faqs = [
    { question: "What is your typical response time?", answer: "I respond to all inquiries within 24 hours. For ongoing projects, I'm available during overlapping business hours and typically reply to messages within a few hours.", sort_order: 1 },
    { question: "Do you work with clients in different time zones?", answer: "Absolutely. I've worked with clients across the US, Europe, and Middle East. I adjust my schedule to ensure meaningful overlap with your working hours for meetings and real-time collaboration.", sort_order: 2 },
    { question: "What if my project scope changes mid-development?", answer: "Scope changes are a natural part of development. I use an agile approach with regular check-ins, so we can adapt priorities as needed. Major scope changes are discussed transparently with timeline and cost implications.", sort_order: 3 },
    { question: "Do you provide post-launch support?", answer: "Yes, all my service packages include post-launch support. MVP builds include 30 days, full product builds include 90 days, and ongoing support packages provide continuous maintenance.", sort_order: 4 },
    { question: "What technologies do you specialize in?", answer: "My core stack includes React, React Native, Next.js, Node.js, NestJS, and TypeScript. I also work with Python/Django, Kotlin for native Android, and have experience integrating AI/ML services into production applications.", sort_order: 5 },
    { question: "How do we communicate during the project?", answer: "I believe in transparent, regular communication. We'll have weekly sync calls, a shared project board (Notion or Linear), and a direct messaging channel (Slack or WhatsApp) for quick questions.", sort_order: 6 },
  ];
  for (const f of faqs) {
    await sql`INSERT INTO faqs (question, answer, sort_order) VALUES (${f.question}, ${f.answer}, ${f.sort_order}) ON CONFLICT DO NOTHING`;
  }
  console.log(`  ✓ ${faqs.length} FAQs`);

  // --- Process Steps ---
  console.log("Seeding process_steps...");
  const processSteps = [
    { step_number: 1, title: "Discovery", description: "Understanding your vision and requirements", sort_order: 1 },
    { step_number: 2, title: "Architecture", description: "Designing the technical foundation", sort_order: 2 },
    { step_number: 3, title: "Development", description: "Building with clean, tested code", sort_order: 3 },
    { step_number: 4, title: "Testing", description: "Ensuring quality across all scenarios", sort_order: 4 },
    { step_number: 5, title: "Launch", description: "Deploying to production with confidence", sort_order: 5 },
    { step_number: 6, title: "Support", description: "Ongoing maintenance and optimization", sort_order: 6 },
  ];
  for (const p of processSteps) {
    await sql`INSERT INTO process_steps (step_number, title, description, sort_order) VALUES (${p.step_number}, ${p.title}, ${p.description}, ${p.sort_order}) ON CONFLICT DO NOTHING`;
  }
  console.log(`  ✓ ${processSteps.length} process steps`);

  // --- Page Sections ---
  console.log("Seeding page_sections...");
  const pageSections = [
    { key: "home", label: "Home Page" },
    { key: "about", label: "About Page" },
    { key: "projects", label: "Projects Page" },
    { key: "services", label: "Services Page" },
    { key: "blog", label: "Blog Page" },
    { key: "contact", label: "Contact Page" },
    { key: "testimonials", label: "Testimonials Section" },
    { key: "tech_stack", label: "Tech Stack Section" },
    { key: "blog_preview", label: "Blog Preview Section" },
    { key: "services_preview", label: "Services Preview Section" },
    { key: "featured_projects", label: "Featured Projects Section" },
    { key: "cta", label: "CTA Section" },
    { key: "process_steps", label: "Process Steps Section" },
    { key: "faqs", label: "FAQ Section" },
    { key: "stats", label: "Stats Bar" },
  ];
  for (const p of pageSections) {
    await sql`INSERT INTO page_sections (key, label) VALUES (${p.key}, ${p.label}) ON CONFLICT (key) DO NOTHING`;
  }
  console.log(`  ✓ ${pageSections.length} page sections`);

  // --- Projects (from existing TS files) ---
  console.log("\nSeeding projects...");
  const projectFiles = [
    "accessible-chat-system", "learning-portal", "ai-automation-hub",
    "roofing-crm", "transit-claims", "dental-clinic-hms",
  ];
  const projectsDir = path.join(process.cwd(), "src/content/projects");
  for (const file of projectFiles) {
    const mod = await import(path.join(projectsDir, `${file}.ts`));
    const p = mod.default || mod;
    await sql`
      INSERT INTO projects (slug, title, tagline, description, category, featured, sort_order, challenge, role, approach, features, impact, tech_stack, live_url, github_url, cover_image, screenshots, duration, year)
      VALUES (${p.slug}, ${p.title}, ${p.tagline}, ${p.description}, ${p.category}, ${p.featured}, ${p.sortOrder}, ${p.challenge}, ${p.role}, ${p.approach}, ${JSON.stringify(p.features)}, ${JSON.stringify(p.impact)}, ${JSON.stringify(p.techStack)}, ${p.liveUrl || null}, ${p.githubUrl || null}, ${p.coverImage || null}, ${JSON.stringify(p.screenshots || [])}, ${p.duration || null}, ${p.year || null})
      ON CONFLICT (slug) DO NOTHING
    `;
    console.log(`  ✓ ${p.title}`);
  }

  // --- Blog Posts (from existing MDX files) ---
  console.log("\nSeeding blog posts...");
  const blogDir = path.join(process.cwd(), "src/content/blog");
  const mdxFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  for (const file of mdxFiles) {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    await sql`
      INSERT INTO blog_posts (slug, title, excerpt, content, date, category, tags, cover_image, published)
      VALUES (${slug}, ${data.title}, ${data.excerpt}, ${content}, ${data.date}, ${data.category}, ${JSON.stringify(data.tags || [])}, ${data.coverImage || null}, ${data.published !== false})
      ON CONFLICT (slug) DO NOTHING
    `;
    console.log(`  ✓ ${data.title}`);
  }

  // --- Summary ---
  const counts = await sql`
    SELECT
      (SELECT COUNT(*) FROM projects) as projects,
      (SELECT COUNT(*) FROM blog_posts) as posts,
      (SELECT COUNT(*) FROM site_config) as config,
      (SELECT COUNT(*) FROM services) as services,
      (SELECT COUNT(*) FROM testimonials) as testimonials,
      (SELECT COUNT(*) FROM faqs) as faqs
  `;
  console.log("\n✅ Seeding complete!");
  console.log(`  Projects: ${counts[0].projects}`);
  console.log(`  Blog posts: ${counts[0].posts}`);
  console.log(`  Config entries: ${counts[0].config}`);
  console.log(`  Services: ${counts[0].services}`);
  console.log(`  Testimonials: ${counts[0].testimonials}`);
  console.log(`  FAQs: ${counts[0].faqs}`);

  await sql.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
