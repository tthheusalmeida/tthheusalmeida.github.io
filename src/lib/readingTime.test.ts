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
});
