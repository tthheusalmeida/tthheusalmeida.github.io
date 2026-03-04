import type { Lang } from './i18n';

export interface SearchIndexEntry {
  title: string;
  slug: string;
  tags: string[];
  content: string;
  href: string;
  date: string;
}

export type SearchIndex = Record<Lang, SearchIndexEntry[]>;

export interface RawPost {
  title: string;
  slug: string;
  tags: string[];
  lang: string;
  draft: boolean;
  date: string;
  content: string;
  href: string;
}

export function buildSearchIndex(posts: RawPost[]): SearchIndex {
  const index: SearchIndex = { en: [], pt: [] };

  for (const post of posts) {
    if (post.draft) continue;
    const lang = post.lang as Lang;
    if (lang !== 'en' && lang !== 'pt') continue;

    index[lang].push({
      title: post.title,
      slug: post.slug,
      tags: post.tags,
      content: stripMarkdown(post.content),
      href: post.href,
      date: post.date,
    });
  }

  index.en.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  index.pt.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return index;
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/>\s?/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .trim();
}
