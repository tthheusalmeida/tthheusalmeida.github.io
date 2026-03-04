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

  it('renders "Matheus Almeida" as a link to the portfolio', () => {
    render(<Header />);
    const link = screen.getByText('Matheus Almeida');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://almeida-matheus.com/');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('aria-label', "Visit Matheus Almeida's portfolio");
  });

  it('does not render "tthheusalmeida" text', () => {
    render(<Header />);
    expect(screen.queryByText('tthheusalmeida')).not.toBeInTheDocument();
  });

  it('renders language toggle button with proper padding (size="sm")', () => {
    render(<Header />);
    const langButton = screen.getByLabelText('Toggle language');
    expect(langButton).toBeInTheDocument();
    // size="sm" adds px-3 class giving proper padding instead of icon size
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
});
