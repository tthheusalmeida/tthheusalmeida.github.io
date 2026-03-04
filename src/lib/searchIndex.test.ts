import { describe, it, expect } from 'vitest';
import { buildSearchIndex, type RawPost } from './searchIndex';

function makePost(overrides: Partial<RawPost> = {}): RawPost {
  return {
    title: 'Test Post',
    slug: 'test-post',
    tags: ['test'],
    lang: 'en',
    draft: false,
    date: '2025-01-01T00:00:00.000Z',
    href: '/blog/2025/01/01/test-post',
    ...overrides,
  };
}

describe('buildSearchIndex', () => {
  it('separates posts by language', () => {
    const posts = [
      makePost({ lang: 'en', title: 'English Post' }),
      makePost({ lang: 'pt', title: 'Post em Português', slug: 'post-pt' }),
    ];
    const index = buildSearchIndex(posts);
    expect(index.en).toHaveLength(1);
    expect(index.pt).toHaveLength(1);
    expect(index.en[0].title).toBe('English Post');
    expect(index.pt[0].title).toBe('Post em Português');
  });

  it('excludes draft posts', () => {
    const posts = [
      makePost({ draft: true }),
      makePost({ draft: false, slug: 'published' }),
    ];
    const index = buildSearchIndex(posts);
    expect(index.en).toHaveLength(1);
    expect(index.en[0].slug).toBe('published');
  });

  it('indexes title and tags', () => {
    const posts = [
      makePost({
        title: 'My Title',
        tags: ['react', 'astro'],
      }),
    ];
    const index = buildSearchIndex(posts);
    const entry = index.en[0];
    expect(entry.title).toBe('My Title');
    expect(entry.tags).toEqual(['react', 'astro']);
  });

  it('does not include content in index entries', () => {
    const posts = [makePost()];
    const index = buildSearchIndex(posts);
    expect(index.en[0]).not.toHaveProperty('content');
  });

  it('sorts posts by date descending', () => {
    const posts = [
      makePost({ slug: 'old', date: '2025-01-01T00:00:00.000Z' }),
      makePost({ slug: 'new', date: '2025-06-15T00:00:00.000Z' }),
    ];
    const index = buildSearchIndex(posts);
    expect(index.en[0].slug).toBe('new');
    expect(index.en[1].slug).toBe('old');
  });

  it('returns empty arrays when no posts exist', () => {
    const index = buildSearchIndex([]);
    expect(index.en).toEqual([]);
    expect(index.pt).toEqual([]);
  });

  it('ignores posts with unsupported languages', () => {
    const posts = [
      makePost({ lang: 'fr' as 'en' }),
    ];
    const index = buildSearchIndex(posts);
    expect(index.en).toHaveLength(0);
    expect(index.pt).toHaveLength(0);
  });

  it('preserves href field in index entries', () => {
    const posts = [makePost({ href: '/blog/2025/01/01/my-post' })];
    const index = buildSearchIndex(posts);
    expect(index.en[0].href).toBe('/blog/2025/01/01/my-post');
  });
});
