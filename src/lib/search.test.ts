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
        content: 'This is the first post on my blog.',
        href: '/blog/2025/01/01/welcome',
        date: '2025-01-01T00:00:00.000Z',
      },
      {
        title: 'Learning Astro',
        slug: 'learning-astro',
        tags: ['astro', 'web development'],
        content: 'Astro is a great framework for building static sites.',
        href: '/blog/2025/01/02/learning-astro',
        date: '2025-01-02T00:00:00.000Z',
      },
    ],
    pt: [
      {
        title: 'Bem-vindo ao meu blog',
        slug: 'bem-vindo',
        tags: ['bem-vindo', 'introdução'],
        content: 'Este é o primeiro post do meu blog.',
        href: '/blog/2025/01/01/welcome',
        date: '2025-01-01T00:00:00.000Z',
      },
      {
        title: 'Aprendendo Astro',
        slug: 'aprendendo-astro',
        tags: ['astro', 'desenvolvimento web'],
        content: 'Astro é um ótimo framework para construir sites estáticos.',
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

  it('finds posts by content', () => {
    const index = makeIndex();
    const results = searchPosts('framework', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('learning-astro');
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
    const results = searchPosts('astro framework', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('learning-astro');
  });

  it('returns no results when not all terms match', () => {
    const index = makeIndex();
    const results = searchPosts('astro welcome', index, 'en');
    expect(results).toHaveLength(0);
  });

  it('returns multiple results when query matches multiple posts', () => {
    const index = makeIndex();
    const results = searchPosts('blog', index, 'en');
    expect(results).toHaveLength(1);
    expect(results[0].slug).toBe('welcome');
  });

  it('handles missing language gracefully', () => {
    const index: SearchIndex = { en: [], pt: [] };
    const results = searchPosts('test', index, 'en');
    expect(results).toEqual([]);
  });
});
