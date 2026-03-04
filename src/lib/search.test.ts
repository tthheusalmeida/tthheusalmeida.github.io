import { describe, it, expect } from 'vitest';
import { searchPosts } from './search';
import type { SearchIndex } from './searchIndex';

function makeIndex(overrides: Partial<SearchIndex> = {}): SearchIndex {
  return {
    en: [
      {
        title: 'Welcome to my blog',
        slug: 'welcome',
        tags: ['welcome', 'introduction'],
        href: '/blog/2025/01/01/welcome',
        date: '2025-01-01T00:00:00.000Z',
      },
      {
        title: 'Learning Astro',
        slug: 'learning-astro',
        tags: ['astro', 'web development'],
        href: '/blog/2025/01/02/learning-astro',
        date: '2025-01-02T00:00:00.000Z',
      },
    ],
    pt: [
      {
        title: 'Bem-vindo ao meu blog',
        slug: 'bem-vindo',
        tags: ['bem-vindo', 'introdução'],
        href: '/blog/2025/01/01/welcome',
        date: '2025-01-01T00:00:00.000Z',
      },
      {
        title: 'Aprendendo Astro',
        slug: 'aprendendo-astro',
        tags: ['astro', 'desenvolvimento web'],
        href: '/blog/2025/01/02/learning-astro',
        date: '2025-01-02T00:00:00.000Z',
      },
    ],
    ...overrides,
  };
}

describe('searchPosts', () => {
  it('returns empty array for empty query', () => {
    const index = makeIndex();
    expect(searchPosts('', index, 'en')).toEqual([]);
    expect(searchPosts('   ', index, 'en')).toEqual([]);
  });

  it('finds posts by title', () => {
    const index = makeIndex();
    const results = searchPosts('Welcome', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('welcome');
  });

  it('finds posts by tag', () => {
    const index = makeIndex();
    const results = searchPosts('astro', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('learning-astro');
  });

  it('does not search by content', () => {
    const index = makeIndex();
    const results = searchPosts('framework', index, 'en');
    expect(results).toHaveLength(0);
  });

  it('is case-insensitive', () => {
    const index = makeIndex();
    const results = searchPosts('WELCOME', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('welcome');
  });

  it('searches in the correct language', () => {
    const index = makeIndex();
    const ptResults = searchPosts('Bem-vindo', index, 'pt');
    expect(ptResults).toHaveLength(1);
    expect(ptResults[0].slug).toBe('bem-vindo');

    const enResults = searchPosts('Bem-vindo', index, 'en');
    expect(enResults).toHaveLength(0);
  });

  it('supports multi-word search (all terms must match)', () => {
    const index = makeIndex();
    const results = searchPosts('astro web', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('learning-astro');
  });

  it('returns no results when not all terms match', () => {
    const index = makeIndex();
    const results = searchPosts('astro welcome', index, 'en');
    expect(results).toHaveLength(0);
  });

  it('handles missing language gracefully', () => {
    const index: SearchIndex = { en: [], pt: [] };
    const results = searchPosts('test', index, 'en');
    expect(results).toEqual([]);
  });
});
