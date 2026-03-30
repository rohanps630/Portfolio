export type BlogCategory =
  | "architecture"
  | "react"
  | "mobile"
  | "ai"
  | "devops"
  | "career"
  | "accessibility";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: BlogCategory;
  tags: string[];
  coverImage: string;
  published: boolean;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
