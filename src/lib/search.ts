import type { SearchIndexEntry } from './searchIndex';
import type { Lang } from './i18n';

export function searchPosts(
  query: string,
  index: Record<Lang, SearchIndexEntry[]>,
  lang: Lang,
): SearchIndexEntry[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const entries = index[lang] ?? [];
  const terms = trimmed.split(/\s+/);

  return entries.filter((entry) => {
    const haystack = [
      entry.title,
      entry.tags.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return terms.every((term) => haystack.includes(term));
  });
}
