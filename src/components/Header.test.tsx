import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});

describe('Header', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.classList.remove('dark');
    document.documentElement.lang = 'en';
  });

  it('renders "Matheus Almeida" as a link to the deploy page', () => {
    render(<Header />);
    const link = screen.getByText('Matheus Almeida');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://tthheusalmeida.github.io/');
  });

  it('does not render "tthheusalmeida" text', () => {
    render(<Header />);
    expect(screen.queryByText('tthheusalmeida')).not.toBeInTheDocument();
  });

  it('renders a highlighted Portfolio button linking to almeida-matheus.com', () => {
    render(<Header />);
    const portfolioLink = screen.getByRole('link', { name: 'Portfolio' });
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute('href', 'https://almeida-matheus.com');
    expect(portfolioLink).toHaveAttribute('target', '_blank');
    expect(portfolioLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a GitHub icon-only button linking to GitHub profile', () => {
    render(<Header />);
    const githubLink = screen.getByLabelText('GitHub profile');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/tthheusalmeida');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a vertical separator between navigation groups', () => {
    render(<Header />);
    const separator = document.querySelector('[aria-hidden="true"]');
    expect(separator).toBeInTheDocument();
    expect(separator?.className).toContain('bg-border');
  });

  it('renders Portfolio button with min-width to prevent resize', () => {
    render(<Header />);
    const portfolioLink = screen.getByRole('link', { name: 'Portfolio' });
    const button = portfolioLink.closest('[class*="min-w"]') ?? portfolioLink;
    expect(button.className).toContain('min-w-');
  });

  it('renders language toggle button with min-width and proper padding', () => {
    render(<Header />);
    const langButton = screen.getByLabelText('Toggle language');
    expect(langButton).toBeInTheDocument();
    expect(langButton.className).toContain('px-3');
  });

  it('displays current language code in uppercase', () => {
    render(<Header />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  it('cycles language from EN to PT on click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const langButton = screen.getByLabelText('Toggle language');
    await user.click(langButton);
    expect(screen.getByText('PT')).toBeInTheDocument();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('lang', 'pt');
  });

  it('toggles dark mode on theme button click', async () => {
    const user = userEvent.setup();
    render(<Header />);
    const themeButton = screen.getByLabelText('Switch to dark mode');
    await user.click(themeButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('renders header element with responsive padding classes', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('px-4');
    expect(header.className).toContain('sm:px-6');
  });

  it('renders theme toggle button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  describe('i18n', () => {
    it('translates Portfolio button text to PT after language switch', async () => {
      const user = userEvent.setup();
      render(<Header />);
      // Initially in EN
      expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveTextContent('Portfolio');
      // Switch to PT
      const langButton = screen.getByLabelText('Toggle language');
      await user.click(langButton);
      expect(screen.getByRole('link', { name: 'Portfólio' })).toHaveTextContent('Portfólio');
    });

    it('translates theme toggle aria-label to PT after language switch', async () => {
      const user = userEvent.setup();
      render(<Header />);
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
      const langButton = screen.getByLabelText('Toggle language');
      await user.click(langButton);
      expect(screen.getByLabelText('Mudar para modo escuro')).toBeInTheDocument();
    });

    it('translates language toggle aria-label to PT after language switch', async () => {
      const user = userEvent.setup();
      render(<Header />);
      expect(screen.getByLabelText('Toggle language')).toBeInTheDocument();
      const langButton = screen.getByLabelText('Toggle language');
      await user.click(langButton);
      expect(screen.getByLabelText('Alternar idioma')).toBeInTheDocument();
    });
  });
});
