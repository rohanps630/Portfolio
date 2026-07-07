import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { NoteMeta, Note, NoteCategory } from "@/types/note";

const NOTES_DIR = path.join(process.cwd(), "src/content/notes");

function getPostSlugsFromFiles(): string[] {
  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function getNoteBySlugFromFile(slug: string): Note {
  const filePath = path.join(NOTES_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  const meta: NoteMeta = {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category as NoteCategory,
    tags: data.tags || [],
    coverImage: data.coverImage || "",
    // Fail closed: a note missing `published` stays hidden. The schema
    // requires the field, so this only matters if validation is bypassed.
    published: data.published ?? false,
    readingTime: stats.text,
    series: data.series,
    seriesOrder: data.seriesOrder,
    relatedSystem: data.relatedSystem,
  };

  return { ...meta, content };
}

function getAllNotesFromFiles(): NoteMeta[] {
  const slugs = getPostSlugsFromFiles();
  return slugs
    .map((slug) => {
      const note = getNoteBySlugFromFile(slug);
      const { content, ...meta } = note;
      void content;
      return meta;
    })
    .filter((note) => note.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostSlugs(): Promise<string[]> {
  return getPostSlugsFromFiles();
}

export async function getNoteBySlug(slug: string): Promise<Note> {
  return getNoteBySlugFromFile(slug);
}

export async function getAllNotes(): Promise<NoteMeta[]> {
  return getAllNotesFromFiles();
}

export async function getPostsByCategory(category: NoteCategory): Promise<NoteMeta[]> {
  return getAllNotesFromFiles().filter((note) => note.category === category);
}

export async function getAllCategories(): Promise<{ value: NoteCategory; label: string; count: number }[]> {
  const labels: Record<NoteCategory, string> = {
    architecture: "Architecture",
    react: "React",
    mobile: "Mobile",
    ai: "AI",
    devops: "DevOps",
    career: "Career",
    accessibility: "Accessibility",
  };

  const notes = getAllNotesFromFiles();
  const categoryMap = new Map<NoteCategory, number>();

  for (const note of notes) {
    categoryMap.set(note.category, (categoryMap.get(note.category) || 0) + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([value, count]) => ({
      value,
      label: labels[value] || value,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export async function getSeriesSlugs(): Promise<string[]> {
  const notes = getAllNotesFromFiles();
  const seriesSet = new Set<string>();
  for (const note of notes) {
    if (note.series) seriesSet.add(note.series);
  }
  return Array.from(seriesSet);
}

export async function getNotesInSeries(series: string): Promise<NoteMeta[]> {
  const notes = getAllNotesFromFiles().filter(note => note.series === series);
  return notes.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}
export async function getNotesRelatedToSystem(systemSlug: string): Promise<NoteMeta[]> {
  return getAllNotesFromFiles().filter(note => note.relatedSystem === systemSlug);
}
