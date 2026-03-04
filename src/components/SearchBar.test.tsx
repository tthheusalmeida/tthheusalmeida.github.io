import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';
import type { SearchIndex } from '@/lib/searchIndex';

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

const mockIndex: SearchIndex = {
  en: [
    {
      title: 'Welcome to my blog',
      slug: 'welcome',
      tags: ['welcome', 'introduction'],
      href: '/blog/2025/01/01/welcome',
      date: '2025-01-01T00:00:00.000Z',
    },
    {
      title: 'Learning Astro',
      slug: 'learning-astro',
      tags: ['astro', 'web development'],
      href: '/blog/2025/01/02/learning-astro',
      date: '2025-01-02T00:00:00.000Z',
    },
  ],
  pt: [
    {
      title: 'Bem-vindo ao meu blog',
      slug: 'bem-vindo',
      tags: ['bem-vindo', 'introdução'],
      href: '/blog/2025/01/01/welcome',
      date: '2025-01-01T00:00:00.000Z',
    },
  ],
};

describe('SearchBar', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.lang = 'en';
  });

  it('renders the search input', () => {
    render(<SearchBar searchIndex={mockIndex} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('has correct placeholder text in English', () => {
    render(<SearchBar searchIndex={mockIndex} />);
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(<SearchBar searchIndex={mockIndex} />);
    expect(screen.getByLabelText('Search posts')).toBeInTheDocument();
  });

  it('does not show dropdown when input is empty', () => {
    render(<SearchBar searchIndex={mockIndex} />);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows dropdown with results when typing a matching query', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Welcome');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Welcome to my blog')).toBeInTheDocument();
  });

  it('shows "No results found." when no posts match', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'zzzznonexistent');
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders results as links to post href', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Astro');
    const link = screen.getByRole('option');
    expect(link.closest('a')).toHaveAttribute('href', '/blog/2025/01/02/learning-astro');
  });

  it('displays tags on search results', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Welcome');
    expect(screen.getByText('welcome')).toBeInTheDocument();
    expect(screen.getByText('introduction')).toBeInTheDocument();
  });

  it('closes dropdown when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Welcome');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <SearchBar searchIndex={mockIndex} />
      </div>,
    );
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Welcome');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('hides dropdown when query is cleared', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Welcome');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.clear(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('searches by tag, not by content', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'web development');
    expect(screen.getByText('Learning Astro')).toBeInTheDocument();
  });

  it('does not show clear button when input is empty', () => {
    render(<SearchBar searchIndex={mockIndex} />);
    const clearBtn = screen.queryByLabelText('Clear search');
    expect(clearBtn).toHaveAttribute('aria-hidden', 'true');
    expect(clearBtn).toHaveAttribute('tabIndex', '-1');
  });

  it('shows clear button when input has text', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Astro');
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears search and closes dropdown when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(<SearchBar searchIndex={mockIndex} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'Welcome');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByLabelText('Clear search'));
    expect(input).toHaveValue('');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Clear search')).toHaveAttribute('aria-hidden', 'true');
  });
});
