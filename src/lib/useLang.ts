import * as React from 'react';
import type { Lang } from './i18n';

export function useLang(): Lang {
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

  return lang;
}
