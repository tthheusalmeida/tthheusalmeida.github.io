import * as React from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function BlogPostToc() {
  const [headings, setHeadings] = React.useState<TocItem[]>([]);
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    function collectHeadings() {
      const article = document.querySelector('.post-article[style*="display: block"], .post-article[style="display:block"]');
      if (!article) return;

      const prose = article.querySelector('.prose');
      if (!prose) return;

      const elements = prose.querySelectorAll('h1, h2, h3');
      const items: TocItem[] = [];

      elements.forEach((el) => {
        if (!el.id) {
          el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') ?? '';
        }
        items.push({
          id: el.id,
          text: el.textContent ?? '',
          level: parseInt(el.tagName.charAt(1), 10),
        });
      });

      setHeadings(items);
    }

    collectHeadings();

    const observer = new MutationObserver(collectHeadings);
    const target = document.querySelector('[data-lang-content]')?.parentElement;
    if (target) {
      observer.observe(target, { childList: true, subtree: true, attributes: true });
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (headings.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden w-48 shrink-0 xl:block">
      <nav className="sticky top-20 space-y-1" aria-label="Table of contents">
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`block text-sm transition-colors hover:text-foreground ${
              level === 1
                ? 'font-semibold text-foreground'
                : level === 2
                  ? 'pl-3 text-muted-foreground'
                  : 'pl-6 text-muted-foreground'
            } ${activeId === id ? 'text-primary' : ''}`}
          >
            {text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
