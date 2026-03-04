import { describe, it, expect } from 'vitest';
import { buildSearchIndex, stripMarkdown, type RawPost } from './searchIndex';

function makePost(overrides: Partial<RawPost> = {}): RawPost {
  return {
    title: 'Test Post',
    slug: 'test-post',
    tags: ['test'],
    lang: 'en',
    draft: false,
    date: '2025-01-01T00:00:00.000Z',
    content: '# Hello\n\nThis is content.',
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

  it('strips markdown from content', () => {
    const posts = [
      makePost({ content: '# Heading\n\n**Bold** text with [link](http://example.com)' }),
    ];
    const index = buildSearchIndex(posts);
    expect(index.en[0].content).not.toContain('#');
    expect(index.en[0].content).not.toContain('**');
    expect(index.en[0].content).not.toContain('[link]');
    expect(index.en[0].content).toContain('Bold');
    expect(index.en[0].content).toContain('link');
  });

  it('indexes title, tags, and content', () => {
    const posts = [
      makePost({
        title: 'My Title',
        tags: ['react', 'astro'],
        content: 'Content body here',
      }),
    ];
    const index = buildSearchIndex(posts);
    const entry = index.en[0];
    expect(entry.title).toBe('My Title');
    expect(entry.tags).toEqual(['react', 'astro']);
    expect(entry.content).toContain('Content body here');
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

describe('stripMarkdown', () => {
  it('removes heading markers', () => {
    expect(stripMarkdown('# Heading 1')).toBe('Heading 1');
    expect(stripMarkdown('## Heading 2')).toBe('Heading 2');
    expect(stripMarkdown('### Heading 3')).toBe('Heading 3');
  });

  it('removes bold markers', () => {
    expect(stripMarkdown('**bold text**')).toBe('bold text');
  });

  it('removes italic markers', () => {
    expect(stripMarkdown('*italic text*')).toBe('italic text');
  });

  it('removes links but keeps text', () => {
    expect(stripMarkdown('[click here](http://example.com)')).toBe('click here');
  });

  it('removes frontmatter', () => {
    const md = '---\ntitle: Test\n---\n\nContent here';
    expect(stripMarkdown(md)).toContain('Content here');
    expect(stripMarkdown(md)).not.toContain('title: Test');
  });

  it('collapses multiple newlines', () => {
    const result = stripMarkdown('Line one\n\n\nLine two');
    expect(result).not.toContain('\n');
  });

  it('trims whitespace', () => {
    expect(stripMarkdown('  hello  ')).toBe('hello');
  });
});
