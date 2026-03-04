import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { blogSchema } from '@/schemas/blog';

const CONTENT_DIR = path.resolve(__dirname, '../content/blog');

/**
 * Expected directory structure:
 *   src/content/blog/{year}/{month}/{day}/{post}.{lang}.md
 *
 * Naming conventions:
 *   - year: 4 digits (e.g. 2025)
 *   - month: 2 digits (01–12)
 *   - day: 2 digits (01–31)
 *   - post: kebab-case slug
 *   - lang: supported language code (en | pt)
 */

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

describe('Blog Content Structure (Task 3.1)', () => {
  it('should have the content/blog directory', () => {
    expect(fs.existsSync(CONTENT_DIR)).toBe(true);
  });

  it('should contain at least one markdown file', () => {
    const files = getAllMarkdownFiles(CONTENT_DIR);
    expect(files.length).toBeGreaterThan(0);
  });

  describe('file naming convention', () => {
    const files = getAllMarkdownFiles(CONTENT_DIR);

    it('all markdown files should follow year/month/day/post.lang.md pattern', () => {
      const pattern = /^(\d{4})\/(\d{2})\/(\d{2})\/([a-z0-9]+(?:-[a-z0-9]+)*)\.(en|pt)\.md$/;

      files.forEach((file) => {
        const relativePath = path.relative(CONTENT_DIR, file);
        expect(relativePath).toMatch(pattern);
      });
    });

    it('year directories should have 4 digits', () => {
      const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
      entries
        .filter((e) => e.isDirectory())
        .forEach((e) => {
          expect(e.name).toMatch(/^\d{4}$/);
        });
    });

    it('month directories should have 2 digits (01-12)', () => {
      const years = fs
        .readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((e) => e.isDirectory());

      years.forEach((year) => {
        const months = fs
          .readdirSync(path.join(CONTENT_DIR, year.name), { withFileTypes: true })
          .filter((e) => e.isDirectory());

        months.forEach((month) => {
          expect(month.name).toMatch(/^(0[1-9]|1[0-2])$/);
        });
      });
    });

    it('day directories should have 2 digits (01-31)', () => {
      const years = fs
        .readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((e) => e.isDirectory());

      years.forEach((year) => {
        const months = fs
          .readdirSync(path.join(CONTENT_DIR, year.name), { withFileTypes: true })
          .filter((e) => e.isDirectory());

        months.forEach((month) => {
          const days = fs
            .readdirSync(path.join(CONTENT_DIR, year.name, month.name), {
              withFileTypes: true,
            })
            .filter((e) => e.isDirectory());

          days.forEach((day) => {
            expect(day.name).toMatch(/^(0[1-9]|[12]\d|3[01])$/);
          });
        });
      });
    });
  });

  describe('multilingual posts', () => {
    const files = getAllMarkdownFiles(CONTENT_DIR);

    it('should have posts in both "en" and "pt" languages', () => {
      const langs = new Set(
        files.map((f) => {
          const match = path.basename(f).match(/\.(\w+)\.md$/);
          return match ? match[1] : '';
        }),
      );
      expect(langs.has('en')).toBe(true);
      expect(langs.has('pt')).toBe(true);
    });
  });

  describe('frontmatter in actual posts (Task 3.2 integration)', () => {
    const files = getAllMarkdownFiles(CONTENT_DIR);

    files.forEach((file) => {
      const relativePath = path.relative(CONTENT_DIR, file);

      it(`"${relativePath}" should have valid frontmatter`, () => {
        const content = fs.readFileSync(file, 'utf-8');
        const { data } = matter(content);
        const result = blogSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });
});
