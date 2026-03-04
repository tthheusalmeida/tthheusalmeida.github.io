import * as React from 'react';
import { Search } from 'lucide-react';
import { t, type Lang } from '@/lib/i18n';
import { useLang } from '@/lib/useLang';
import { searchPosts } from '@/lib/search';
import type { SearchIndex, SearchIndexEntry } from '@/lib/searchIndex';

export interface SearchBarProps {
  searchIndex: SearchIndex;
}

export function SearchBar({ searchIndex }: SearchBarProps) {
  const lang = useLang();
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [results, setResults] = React.useState<SearchIndexEntry[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const matches = searchPosts(query, searchIndex, lang);
    setResults(matches);
    setOpen(query.trim().length > 0);
  }, [query, lang, searchIndex]);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-1 rounded-md border border-border bg-background/60 px-2 py-1">
        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (query.trim()) setOpen(true); }}
          placeholder={t(lang, 'search.placeholder')}
          aria-label={t(lang, 'search.label')}
          className="w-28 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none sm:w-40"
        />
      </div>

      {open && (
        <div
          role="listbox"
          aria-label={t(lang, 'search.label')}
          className="absolute left-1/2 top-full z-50 mt-1 max-h-80 min-w-[20rem] -translate-x-1/2 overflow-y-auto rounded-md border border-border bg-popover shadow-lg"
        >
          {results.length === 0 ? (
            <p className="p-3 text-sm text-muted-foreground">
              {t(lang, 'search.noResults')}
            </p>
          ) : (
            results.map((entry) => (
              <a
                key={entry.slug}
                href={entry.href}
                role="option"
                aria-selected={false}
                className="flex flex-col gap-1 border-b border-border px-3 py-2 last:border-b-0 hover:bg-accent transition-colors"
              >
                <span className="text-sm font-medium text-foreground break-words">
                  {entry.title}
                </span>
                <span className="flex gap-1 flex-wrap">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-accent px-1.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
}
