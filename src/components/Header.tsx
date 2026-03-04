import * as React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
] as const;

type Lang = (typeof LANGUAGES)[number]['code'];

export function Header() {
  const [dark, setDark] = React.useState(false);
  const [lang, setLang] = React.useState<Lang>('en');

  React.useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setDark(
      storedTheme === 'dark' ||
        (!storedTheme &&
          window.matchMedia('(prefers-color-scheme: dark)').matches),
    );

    const storedLang = localStorage.getItem('lang');
    if (storedLang === 'en' || storedLang === 'pt') {
      setLang(storedLang);
    }
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
    setLang(next.code);
    document.documentElement.lang = next.code;
    localStorage.setItem('lang', next.code);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-sm sm:px-6">
      <a
        href="https://almeida-matheus.com/"
        className="text-lg font-bold text-foreground hover:text-foreground/80 transition-colors"
        rel="noopener noreferrer"
        aria-label="Visit Matheus Almeida's portfolio"
      >
        Matheus Almeida
      </a>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="sm" onClick={cycleLang} aria-label="Toggle language" className="gap-1 px-3">
          <Globe className="h-5 w-5" />
          <span className="text-xs font-medium">{lang.toUpperCase()}</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
