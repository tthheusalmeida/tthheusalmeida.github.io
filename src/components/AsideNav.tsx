import * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t, type Lang, type TranslationKey } from '@/lib/i18n';

interface AsideGroup {
  year: string;
  months: { month: string }[];
}

export function AsideNav({
  groups,
  lang,
}: {
  groups: AsideGroup[];
  lang: Lang;
}) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (groups.length === 0) return null;

  return (
    <aside className="hidden w-48 shrink-0 md:block">
      <nav
        className="sticky top-20 space-y-4"
        aria-label="Blog navigation"
      >
        {groups.map(({ year, months }) => (
          <div key={year}>
            <a
              href={`#year-${year}`}
              className="block text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {year}
            </a>
            <ul className="mt-1 space-y-1 pl-3">
              {months.map(({ month }) => {
                const monthKey = `month.${month}` as TranslationKey;
                return (
                  <li key={month}>
                    <a
                      href={`#year-${year}-month-${month}`}
                      className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {t(lang, monthKey)}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {showScrollTop && (
          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            aria-label={t(lang, 'blog.scrollToTop')}
            className="mt-4 w-full gap-1"
          >
            <ArrowUp className="h-4 w-4" />
            {t(lang, 'blog.scrollToTop')}
          </Button>
        )}
      </nav>
    </aside>
  );
}
