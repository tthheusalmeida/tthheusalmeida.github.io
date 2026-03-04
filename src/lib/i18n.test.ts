import { describe, it, expect } from 'vitest';
import { t, translations } from './i18n';

describe('i18n', () => {
  it('returns English translation for a known key', () => {
    expect(t('en', 'header.name')).toBe('Matheus Almeida');
  });

  it('returns Portuguese translation for a known key', () => {
    expect(t('pt', 'header.portfolio')).toBe('Portfólio');
  });

  it('has the same keys in both en and pt', () => {
    const enKeys = Object.keys(translations.en).sort();
    const ptKeys = Object.keys(translations.pt).sort();
    expect(enKeys).toEqual(ptKeys);
  });

  it('returns translated theme labels in Portuguese', () => {
    expect(t('pt', 'header.switchToDark')).toBe('Mudar para modo escuro');
    expect(t('pt', 'header.switchToLight')).toBe('Mudar para modo claro');
  });

  it('returns translated toggle language label in Portuguese', () => {
    expect(t('pt', 'header.toggleLanguage')).toBe('Alternar idioma');
  });

  it('returns toc.title in sentence case for EN', () => {
    const title = t('en', 'toc.title');
    expect(title).toBe('Page contents');
    expect(title[0]).toBe(title[0].toUpperCase());
    expect(title.slice(1)).not.toBe(title.slice(1).toUpperCase());
  });

  it('returns toc.title in sentence case for PT', () => {
    const title = t('pt', 'toc.title');
    expect(title).toBe('Conteúdo desta página');
    expect(title[0]).toBe(title[0].toUpperCase());
    expect(title.slice(1)).not.toBe(title.slice(1).toUpperCase());
  });
});
