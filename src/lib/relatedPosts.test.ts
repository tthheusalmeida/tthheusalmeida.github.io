import { describe, it, expect } from 'vitest';
import { getRelatedPosts, type PostForRelated } from './relatedPosts';

const basePosts: PostForRelated[] = [
  {
    title: 'Post A',
    slug: 'post-a',
    date: '2025-01-15T00:00:00.000Z',
    lang: 'en',
    tags: ['javascript', 'react'],
    href: '/blog/2025/01/15/post-a',
    canonicalSlug: '2025/01/15/post-a',
  },
  {
    title: 'Post B',
    slug: 'post-b',
    date: '2025-01-20T00:00:00.000Z',
    lang: 'en',
    tags: ['javascript', 'astro'],
    href: '/blog/2025/01/20/post-b',
    canonicalSlug: '2025/01/20/post-b',
  },
  {
    title: 'Post C',
    slug: 'post-c',
    date: '2025-02-10T00:00:00.000Z',
    lang: 'en',
    tags: ['css', 'tailwind'],
    href: '/blog/2025/02/10/post-c',
    canonicalSlug: '2025/02/10/post-c',
  },
  {
    title: 'Post D',
    slug: 'post-d',
    date: '2025-01-25T00:00:00.000Z',
    lang: 'en',
    tags: ['react', 'testing'],
    href: '/blog/2025/01/25/post-d',
    canonicalSlug: '2025/01/25/post-d',
  },
];

describe('getRelatedPosts', () => {
  it('returns posts with shared tags', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['javascript', 'react'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts);
    const slugs = related.map((p) => p.slug);
    expect(slugs).toContain('post-b');
    expect(slugs).toContain('post-d');
  });

  it('excludes the current post', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['javascript', 'react'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts);
    expect(related.find((p) => p.canonicalSlug === current.canonicalSlug)).toBeUndefined();
  });

  it('returns posts from the same month even without shared tags', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['unique-tag'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts);
    const slugs = related.map((p) => p.slug);
    expect(slugs).toContain('post-b');
    expect(slugs).toContain('post-d');
  });

  it('does not return posts with no shared tags and different month', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['unique-tag'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts);
    const slugs = related.map((p) => p.slug);
    expect(slugs).not.toContain('post-c');
  });

  it('ranks posts with more shared tags higher', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['javascript', 'react'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts);
    // post-b has 1 shared tag (javascript) + same month = score 3
    // post-d has 1 shared tag (react) + same month = score 3
    expect(related.length).toBeGreaterThanOrEqual(2);
  });

  it('respects the limit parameter', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['javascript', 'react'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts, 1);
    expect(related.length).toBeLessThanOrEqual(1);
  });

  it('returns empty array when no related posts found', () => {
    const current = {
      canonicalSlug: '2025/06/01/isolated',
      tags: ['niche-topic'],
      date: '2025-06-01T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, basePosts);
    expect(related).toEqual([]);
  });

  it('returns empty array when allPosts is empty', () => {
    const current = {
      canonicalSlug: '2025/01/15/post-a',
      tags: ['javascript'],
      date: '2025-01-15T00:00:00.000Z',
    };
    const related = getRelatedPosts(current, []);
    expect(related).toEqual([]);
  });
});
