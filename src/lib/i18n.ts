export const translations = {
  en: {
    'header.name': 'Matheus Almeida',
    'header.portfolio': 'Portfolio',
    'header.toggleLanguage': 'Toggle language',
    'header.switchToLight': 'Switch to light mode',
    'header.switchToDark': 'Switch to dark mode',
    'header.visitPortfolio': "Visit Matheus Almeida's portfolio",
    'home.welcome': 'Welcome',
    'home.description': 'Astro + React + Tailwind + shadcn/ui',
    'home.defaultButton': 'Default Button',
    'home.outlineButton': 'Outline Button',
    'home.secondaryButton': 'Secondary Button',
  },
  pt: {
    'header.name': 'Matheus Almeida',
    'header.portfolio': 'Portfólio',
    'header.toggleLanguage': 'Alternar idioma',
    'header.switchToLight': 'Mudar para modo claro',
    'header.switchToDark': 'Mudar para modo escuro',
    'header.visitPortfolio': 'Visitar portfólio de Matheus Almeida',
    'home.welcome': 'Bem-vindo',
    'home.description': 'Astro + React + Tailwind + shadcn/ui',
    'home.defaultButton': 'Botão Padrão',
    'home.outlineButton': 'Botão Contorno',
    'home.secondaryButton': 'Botão Secundário',
  },
} as const;

export type Lang = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)['en'];

export function t(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] ?? translations['en'][key] ?? key;
}
