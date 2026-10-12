import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { SourceRef } from './sources';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface FAQItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Shorter <title> for search results when `title` (the H1) runs past 60 characters. */
  seoTitle?: string;
  description: string;
  date: string;
  dateModified?: string;
  tag: string;
  emoji: string;
  readTime: string;
  image?: string;
  faq?: FAQItem[];
  sources?: SourceRef[];
  content: string;
}

function parsePost(slug: string, raw: string): BlogPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || '',
    seoTitle: data.seoTitle || undefined,
    description: data.description || '',
    date: data.date || '',
    dateModified: data.dateModified || data.date || '',
    tag: data.tag || '',
    emoji: data.emoji || '📝',
    readTime: data.readTime || '5 min read',
    image: data.image || undefined,
    faq: Array.isArray(data.faq) ? data.faq : undefined,
    sources: Array.isArray(data.sources) ? data.sources : undefined,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
    return parsePost(slug, raw);
  });

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  return parsePost(slug, raw);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}
