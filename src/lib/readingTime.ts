const WORDS_PER_MINUTE = 200;

function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, '')         // headings
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → keep text
    .replace(/[*_~`]{1,3}/g, '')          // bold, italic, strikethrough, code
    .replace(/^>\s+/gm, '')              // blockquotes
    .replace(/^[-*+]\s+/gm, '')          // unordered list markers
    .replace(/^\d+\.\s+/gm, '')          // ordered list markers
    .replace(/---+/g, '')                 // horizontal rules
    .replace(/```[\s\S]*?```/g, '')       // fenced code blocks
    .replace(/\n{2,}/g, '\n');            // collapse blank lines
}

export function calculateReadingTime(text: string): number {
  const cleaned = stripMarkdown(text);
  const words = cleaned.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return Math.max(1, minutes);
}
