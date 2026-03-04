import * as React from 'react';
import { Moon, Sun, Globe, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t, type Lang } from '@/lib/i18n';
import { useLang } from '@/lib/useLang';
import { SearchBar } from '@/components/SearchBar';
import type { SearchIndex } from '@/lib/searchIndex';

const LANGUAGES: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
];

export interface HeaderProps {
  searchIndex?: SearchIndex;
}

export function Header({ searchIndex }: HeaderProps) {
  const [dark, setDark] = React.useState(false);
  const lang = useLang();

  React.useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setDark(
      storedTheme === 'dark' ||
        (!storedTheme &&
          window.matchMedia('(prefers-color-scheme: dark)').matches),
    );
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const cycleLang = () => {
    const idx = LANGUAGES.findIndex((l) => l.code === lang);
    const next = LANGUAGES[(idx + 1) % LANGUAGES.length];
    document.documentElement.lang = next.code;
    localStorage.setItem('lang', next.code);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-sm sm:px-6">
      <a
        href="https://tthheusalmeida.github.io/"
        className="text-lg font-bold text-foreground hover:text-foreground/80 transition-colors"
        aria-label={t(lang, 'header.visitPortfolio')}
      >
        {t(lang, 'header.name')}
      </a>

      {searchIndex && (
        <div className="flex-1 flex justify-center px-4">
          <SearchBar searchIndex={searchIndex} />
        </div>
      )}

      <div className="flex items-center gap-1 sm:gap-2">
        <Button asChild size="sm" className="min-w-[6rem] gap-1">
          <a
            href="https://almeida-matheus.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(lang, 'header.portfolio')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>

        <Button asChild variant="ghost" size="icon" aria-label={t(lang, 'header.github')}>
          <a
            href="https://github.com/tthheusalmeida"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>

        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />

        <Button variant="ghost" size="sm" onClick={cycleLang} aria-label={t(lang, 'header.toggleLanguage')} className="min-w-[3.5rem] gap-1 px-3">
          <Globe className="h-5 w-5" />
          <span className="text-xs font-medium">{lang.toUpperCase()}</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? t(lang, 'header.switchToLight') : t(lang, 'header.switchToDark')}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
