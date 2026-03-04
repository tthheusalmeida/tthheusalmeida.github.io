import type { Lang } from './i18n';
import { stripLangSuffix } from './utils';

export interface SearchIndexEntry {
  title: string;
  slug: string;
  tags: string[];
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
  href: string;
}

export interface CollectionEntry {
  id: string;
  data: {
    title: string;
    slug: string;
    date: Date;
    lang: string;
    tags: string[];
    draft: boolean;
  };
}

export function toRawPosts(entries: CollectionEntry[]): RawPost[] {
  return entries.map((entry) => ({
    title: entry.data.title,
    slug: entry.data.slug,
    date: entry.data.date.toISOString(),
    lang: entry.data.lang,
    tags: entry.data.tags,
    draft: entry.data.draft,
    href: `/blog/${stripLangSuffix(entry.id)}`,
  }));
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
      href: post.href,
      date: post.date,
    });
  }

  index.en.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  index.pt.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return index;
}
