import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { FAQItem } from './blog';

const COMPARE_DIR = path.join(process.cwd(), 'content/compare');

export interface ComparePost {
  slug: string;
  title: string;
  description: string;
  competitor: string;
  date: string;
  dateModified?: string;
  readTime: string;
  image?: string;
  faq?: FAQItem[];
  content: string;
}

function parseCompare(slug: string, raw: string): ComparePost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    competitor: data.competitor || '',
    date: data.date || '',
    dateModified: data.dateModified || data.date || '',
    readTime: data.readTime || '8 min read',
    image: data.image || undefined,
    faq: Array.isArray(data.faq) ? data.faq : undefined,
    content,
  };
}

export function getAllCompareSlugs(): string[] {
  if (!fs.existsSync(COMPARE_DIR)) return [];
  return fs
    .readdirSync(COMPARE_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getComparePostBySlug(slug: string): ComparePost | null {
  const filePath = path.join(COMPARE_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return parseCompare(slug, raw);
}

export function getAllComparePosts(): ComparePost[] {
  return getAllCompareSlugs()
    .map((slug) => getComparePostBySlug(slug))
    .filter((p): p is ComparePost => p !== null)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
