import * as React from 'react';
import { t, type Lang } from '@/lib/i18n';
import { getRelatedPosts, type PostForRelated } from '@/lib/relatedPosts';

interface RelatedPostsProps {
  canonicalSlug: string;
  allPosts: PostForRelated[];
}

export function RelatedPosts({ canonicalSlug, allPosts }: RelatedPostsProps) {
  const [lang, setLang] = React.useState<Lang>('en');

  React.useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang === 'en' || storedLang === 'pt') {
      setLang(storedLang);
    }

    const observer = new MutationObserver(() => {
      const htmlLang = document.documentElement.lang;
      if (htmlLang === 'en' || htmlLang === 'pt') {
        setLang(htmlLang);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  const currentPost = allPosts.find(
    (p) => p.canonicalSlug === canonicalSlug && p.lang === lang,
  ) ?? allPosts.find((p) => p.canonicalSlug === canonicalSlug);

  if (!currentPost) return null;

  const sameLangPosts = allPosts.filter((p) => p.lang === lang);
  const related = getRelatedPosts(
    {
      canonicalSlug,
      tags: currentPost.tags,
      date: currentPost.date,
    },
    sameLangPosts,
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border pt-8" aria-label={t(lang, 'post.relatedPosts')}>
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        {t(lang, 'post.relatedPosts')}
      </h2>
      <ul className="space-y-3">
        {related.map((post) => (
          <li key={post.href}>
            <a
              href={post.href}
              className="flex items-baseline justify-between gap-4 rounded-md border border-border p-3 transition-colors hover:bg-accent"
            >
              <span className="font-medium text-foreground">{post.title}</span>
              <time
                className="shrink-0 text-sm text-muted-foreground"
                dateTime={post.date}
              >
                {new Date(post.date).toLocaleDateString(
                  lang === 'pt' ? 'pt-BR' : 'en-US',
                  { day: '2-digit', month: 'short', year: 'numeric' },
                )}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
