export interface PostForRelated {
  title: string;
  slug: string;
  date: string;
  lang: string;
  tags: string[];
  href: string;
  canonicalSlug: string;
}

export function getRelatedPosts(
  current: { canonicalSlug: string; tags: string[]; date: string },
  allPosts: PostForRelated[],
  limit: number = 3,
): PostForRelated[] {
  const currentDate = new Date(current.date);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const scored = allPosts
    .filter((p) => p.canonicalSlug !== current.canonicalSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) =>
        current.tags.includes(tag),
      ).length;
      const postDate = new Date(post.date);
      const sameMonth =
        postDate.getMonth() === currentMonth &&
        postDate.getFullYear() === currentYear
          ? 1
          : 0;
      const score = sharedTags * 2 + sameMonth;
      return { post, score };
    });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
