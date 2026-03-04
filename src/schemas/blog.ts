import { z } from 'zod';

export const blogSchema = z.object({
  title: z.string(),
  draft: z.boolean(),
  slug: z.string(),
  date: z.coerce.date(),
  lang: z.enum(['en', 'pt']),
  tags: z.array(z.string()),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
