import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false });

async function setup() {
  console.log("Creating tables...\n");

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      featured BOOLEAN DEFAULT false,
      sort_order INT DEFAULT 0,
      challenge TEXT NOT NULL,
      role TEXT NOT NULL,
      approach TEXT NOT NULL,
      features JSONB NOT NULL DEFAULT '[]',
      impact JSONB NOT NULL DEFAULT '[]',
      tech_stack JSONB NOT NULL DEFAULT '[]',
      live_url TEXT,
      github_url TEXT,
      cover_image TEXT,
      screenshots JSONB DEFAULT '[]',
      duration TEXT,
      year TEXT,
      visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ projects");

  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]',
      cover_image TEXT,
      published BOOLEAN DEFAULT true,
      visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ blog_posts");

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      project_type TEXT NOT NULL,
      budget TEXT NOT NULL,
      timeline TEXT NOT NULL,
      message TEXT NOT NULL,
      read BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ contact_submissions");

  await sql`
    CREATE TABLE IF NOT EXISTS site_config (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ site_config");

  await sql`
    CREATE TABLE IF NOT EXISTS nav_items (
      id SERIAL PRIMARY KEY,
      label TEXT NOT NULL,
      href TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ nav_items");

  await sql`
    CREATE TABLE IF NOT EXISTS stats (
      id SERIAL PRIMARY KEY,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ stats");

  await sql`
    CREATE TABLE IF NOT EXISTS tech_stack (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ tech_stack");

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      timeline TEXT NOT NULL,
      features JSONB NOT NULL DEFAULT '[]',
      highlighted BOOLEAN DEFAULT false,
      cta_text TEXT NOT NULL DEFAULT 'Get Started',
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ services");

  await sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      quote TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ testimonials");

  await sql`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ faqs");

  await sql`
    CREATE TABLE IF NOT EXISTS process_steps (
      id SERIAL PRIMARY KEY,
      step_number INT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      visible BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ process_steps");

  await sql`
    CREATE TABLE IF NOT EXISTS page_sections (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      label TEXT NOT NULL,
      visible BOOLEAN DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  ✓ page_sections");

  console.log("\nAll 12 tables created successfully!");
  await sql.end();
}

setup().catch((err) => {
  console.error("Setup failed:", err);
  process.exit(1);
});
