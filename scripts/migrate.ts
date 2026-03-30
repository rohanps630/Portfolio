import { Database } from "bun:sqlite";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

// --- Setup database ---
const DB_PATH = path.join(process.cwd(), "data", "portfolio.db");
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(DB_PATH);
db.exec("PRAGMA journal_mode = WAL");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    featured INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    challenge TEXT NOT NULL,
    role TEXT NOT NULL,
    approach TEXT NOT NULL,
    features TEXT NOT NULL,
    impact TEXT NOT NULL,
    tech_stack TEXT NOT NULL,
    live_url TEXT,
    github_url TEXT,
    cover_image TEXT,
    screenshots TEXT,
    duration TEXT,
    year TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT NOT NULL,
    cover_image TEXT,
    published INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    budget TEXT NOT NULL,
    timeline TEXT NOT NULL,
    message TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// --- Migrate Projects ---
console.log("Migrating projects...");

const projectFiles = [
  "accessible-chat-system",
  "learning-portal",
  "ai-automation-hub",
  "roofing-crm",
  "transit-claims",
  "dental-clinic-hms",
];

const insertProject = db.prepare(`
  INSERT OR REPLACE INTO projects (
    slug, title, tagline, description, category, featured, sort_order,
    challenge, role, approach, features, impact, tech_stack,
    live_url, github_url, cover_image, screenshots, duration, year
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?, ?
  )
`);

const projectsDir = path.join(process.cwd(), "src/content/projects");

const migrateProjects = db.transaction(() => {
  for (const file of projectFiles) {
    const filePath = path.join(projectsDir, `${file}.ts`);
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract the object from the default export using a simple eval-like approach
    // We need to parse the TS file to get the project data
    // Since we can't import TS directly in this context, we'll parse the structure

    // Actually, since we're running with bun, we can dynamically import
    const mod = require(filePath);
    const project = mod.default || mod;

    insertProject.run([
      project.slug,
      project.title,
      project.tagline,
      project.description,
      project.category,
      project.featured ? 1 : 0,
      project.sortOrder,
      project.challenge,
      project.role,
      project.approach,
      JSON.stringify(project.features),
      JSON.stringify(project.impact),
      JSON.stringify(project.techStack),
      project.liveUrl ?? null,
      project.githubUrl ?? null,
      project.coverImage ?? null,
      JSON.stringify(project.screenshots ?? []),
      project.duration ?? null,
      project.year ?? null,
    ]);

    console.log(`  Migrated project: ${project.title}`);
  }
});

migrateProjects();

// --- Migrate Blog Posts ---
console.log("\nMigrating blog posts...");

const blogDir = path.join(process.cwd(), "src/content/blog");
const mdxFiles = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".mdx"));

const insertPost = db.prepare(`
  INSERT OR REPLACE INTO blog_posts (
    slug, title, excerpt, content, date, category, tags, cover_image, published
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const migratePosts = db.transaction(() => {
  for (const file of mdxFiles) {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.mdx$/, "");

    insertPost.run([
      slug,
      data.title,
      data.excerpt,
      content,
      data.date,
      data.category,
      JSON.stringify(data.tags ?? []),
      data.coverImage ?? null,
      (data.published ?? true) ? 1 : 0,
    ]);

    console.log(`  Migrated post: ${data.title}`);
  }
});

migratePosts();

// --- Summary ---
const projectCount = (db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number }).count;
const postCount = (db.prepare("SELECT COUNT(*) as count FROM blog_posts").get() as { count: number }).count;

console.log(`\nMigration complete!`);
console.log(`  Projects: ${projectCount}`);
console.log(`  Blog posts: ${postCount}`);
console.log(`  Database: ${DB_PATH}`);

db.close();
