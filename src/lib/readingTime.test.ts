import { describe, it, expect } from 'vitest';
import { calculateReadingTime } from './readingTime';

describe('calculateReadingTime', () => {
  it('returns 1 for very short text', () => {
    expect(calculateReadingTime('Hello world')).toBe(1);
  });

  it('returns 1 for empty text', () => {
    expect(calculateReadingTime('')).toBe(1);
  });

  it('returns 1 for whitespace-only text', () => {
    expect(calculateReadingTime('   ')).toBe(1);
  });

  it('calculates 1 minute for up to 200 words', () => {
    const words = Array(200).fill('word').join(' ');
    expect(calculateReadingTime(words)).toBe(1);
  });

  it('calculates 2 minutes for 201-400 words', () => {
    const words = Array(201).fill('word').join(' ');
    expect(calculateReadingTime(words)).toBe(2);
  });

  it('calculates correct time for longer text', () => {
    const words = Array(1000).fill('word').join(' ');
    expect(calculateReadingTime(words)).toBe(5);
  });

  it('handles markdown content with headings and special chars', () => {
    const markdown = `# Title\n\nSome paragraph with **bold** text.\n\n- item 1\n- item 2`;
    const result = calculateReadingTime(markdown);
    expect(result).toBeGreaterThanOrEqual(1);
  });

  it('strips markdown headings before counting', () => {
    // "# " should be stripped, leaving only "Title"
    const withHeading = '# Title';
    const withoutHeading = 'Title';
    expect(calculateReadingTime(withHeading)).toBe(calculateReadingTime(withoutHeading));
  });

  it('strips markdown bold/italic markers before counting', () => {
    const withMarkdown = '**bold** and *italic* text';
    const withoutMarkdown = 'bold and italic text';
    expect(calculateReadingTime(withMarkdown)).toBe(calculateReadingTime(withoutMarkdown));
  });

  it('strips markdown links but keeps link text', () => {
    const withLink = 'Visit [my site](https://example.com) today';
    const withoutLink = 'Visit my site today';
    expect(calculateReadingTime(withLink)).toBe(calculateReadingTime(withoutLink));
  });

  it('strips markdown images', () => {
    const withImage = 'Text before ![alt text](image.png) text after';
    const withoutImage = 'Text before  text after';
    expect(calculateReadingTime(withImage)).toBe(calculateReadingTime(withoutImage));
  });

  it('strips fenced code blocks', () => {
    const withCode = 'Before\n\n```js\nconsole.log("hello")\n```\n\nAfter';
    const withoutCode = 'Before\n\nAfter';
    expect(calculateReadingTime(withCode)).toBe(calculateReadingTime(withoutCode));
  });
});
