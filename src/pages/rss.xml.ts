import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const allPosts = await getCollection('blog');

  const posts = allPosts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Blog | Matheus Almeida',
    description: 'Posts about software development, technology and more.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/blog/${post.id.replace(/\.(en|pt)$/, '')}/`,
      categories: post.data.tags,
      customData: `<language>${post.data.lang}</language>`,
    })),
    customData: '<language>en</language>',
  });
}
