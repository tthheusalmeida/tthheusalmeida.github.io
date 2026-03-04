import * as React from 'react';
import { t, type Lang, type TranslationKey } from '@/lib/i18n';
import { AsideNav } from '@/components/AsideNav';

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  lang: string;
  tags: string[];
  draft: boolean;
  href: string;
}

interface YearGroup {
  year: string;
  months: { month: string; posts: BlogPost[] }[];
}

function groupPostsByYearMonth(posts: BlogPost[]): YearGroup[] {
  const map = new Map<string, Map<string, BlogPost[]>>();

  for (const post of posts) {
    const d = new Date(post.date);
    const year = String(d.getFullYear());
    const month = String(d.getMonth() + 1).padStart(2, '0');

    if (!map.has(year)) map.set(year, new Map());
    const yearMap = map.get(year)!;
    if (!yearMap.has(month)) yearMap.set(month, []);
    yearMap.get(month)!.push(post);
  }

  const years = Array.from(map.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, monthMap]) => {
      const months = Array.from(monthMap.entries())
        .sort(([a], [b]) => Number(b) - Number(a))
        .map(([month, posts]) => ({
          month,
          posts: posts.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          ),
        }));
      return { year, months };
    });

  return years;
}

export function BlogHome({ posts }: { posts: BlogPost[] }) {
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

  const filtered = posts.filter((p) => p.lang === lang && !p.draft);
  const groups = groupPostsByYearMonth(filtered);

  return (
    <div className="mx-auto flex max-w-5xl gap-8 px-4 py-8 sm:px-6">
      <section className="min-w-0 flex-1" aria-label={t(lang, 'blog.recentPosts')}>
        <h1 className="mb-8 text-3xl font-bold text-foreground">
          {t(lang, 'blog.recentPosts')}
        </h1>

        {groups.length === 0 ? (
          <p className="text-muted-foreground">{t(lang, 'blog.noPosts')}</p>
        ) : (
          groups.map(({ year, months }) => (
            <div key={year} id={`year-${year}`} className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                {year}
              </h2>

              {months.map(({ month, posts: monthPosts }) => {
                const monthKey = `month.${month}` as TranslationKey;
                return (
                  <div
                    key={month}
                    id={`year-${year}-month-${month}`}
                    className="mb-6"
                  >
                    <h3 className="mb-3 text-lg font-medium text-muted-foreground">
                      {t(lang, monthKey)}
                    </h3>

                    <ul className="space-y-3">
                      {monthPosts.map((post) => (
                        <li
                          key={post.slug}
                        >
                          <a
                            href={post.href}
                            className="flex items-baseline justify-between gap-4 rounded-md border border-border p-3 transition-colors hover:bg-accent"
                          >
                            <span className="font-medium text-foreground">
                              {post.title}
                            </span>
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
                  </div>
                );
              })}
            </div>
          ))
        )}
      </section>

      <AsideNav groups={groups} lang={lang} />
    </div>
  );
}
