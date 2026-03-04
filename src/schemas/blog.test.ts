import { describe, it, expect } from 'vitest';
import { blogSchema } from '@/schemas/blog';

describe('Blog Frontmatter Schema (Task 3.2)', () => {
  const validFrontmatter = {
    title: 'Welcome to my blog',
    draft: false,
    slug: 'welcome-to-my-blog',
    date: '2025-01-01',
    lang: 'en',
    tags: ['welcome', 'introduction'],
  };

  it('should accept valid frontmatter', () => {
    const result = blogSchema.safeParse(validFrontmatter);
    expect(result.success).toBe(true);
  });

  it('should coerce date strings to Date objects', () => {
    const result = blogSchema.parse(validFrontmatter);
    expect(result.date).toBeInstanceOf(Date);
  });

  it('should accept "en" as a valid lang', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, lang: 'en' });
    expect(result.success).toBe(true);
  });

  it('should accept "pt" as a valid lang', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, lang: 'pt' });
    expect(result.success).toBe(true);
  });

  it('should reject unsupported lang values', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, lang: 'fr' });
    expect(result.success).toBe(false);
  });

  it('should accept draft as true', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, draft: true });
    expect(result.success).toBe(true);
  });

  it('should accept draft as false', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, draft: false });
    expect(result.success).toBe(true);
  });

  it('should reject non-boolean draft values', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, draft: 'yes' });
    expect(result.success).toBe(false);
  });

  it('should accept an empty tags array', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, tags: [] });
    expect(result.success).toBe(true);
  });

  it('should reject tags with non-string elements', () => {
    const result = blogSchema.safeParse({ ...validFrontmatter, tags: [123] });
    expect(result.success).toBe(false);
  });

  describe('required fields', () => {
    const requiredFields = ['title', 'draft', 'slug', 'date', 'lang', 'tags'] as const;

    requiredFields.forEach((field) => {
      it(`should reject frontmatter missing "${field}"`, () => {
        const incomplete = { ...validFrontmatter };
        delete (incomplete as Record<string, unknown>)[field];
        const result = blogSchema.safeParse(incomplete);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('field types', () => {
    it('should reject non-string title', () => {
      const result = blogSchema.safeParse({ ...validFrontmatter, title: 123 });
      expect(result.success).toBe(false);
    });

    it('should reject non-string slug', () => {
      const result = blogSchema.safeParse({ ...validFrontmatter, slug: 123 });
      expect(result.success).toBe(false);
    });

    it('should reject invalid date', () => {
      const result = blogSchema.safeParse({ ...validFrontmatter, date: 'not-a-date' });
      expect(result.success).toBe(false);
    });

    it('should reject non-array tags', () => {
      const result = blogSchema.safeParse({ ...validFrontmatter, tags: 'single-tag' });
      expect(result.success).toBe(false);
    });
  });
});
