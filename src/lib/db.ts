import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_PATH = path.join(process.cwd(), "data", "portfolio.db");

let db: InstanceType<typeof Database> | null = null;

function initializeSchema(database: InstanceType<typeof Database>): void {
  database.exec(`
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
}

export function getDb() {
  if (db) return db;

  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  initializeSchema(db);

  return db;
}
