import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogHome, type BlogPost } from './BlogHome';

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

const samplePosts: BlogPost[] = [
  {
    title: 'Welcome to my blog',
    slug: 'welcome-to-my-blog',
    date: '2025-01-01T00:00:00.000Z',
    lang: 'en',
    tags: ['welcome'],
    draft: false,
    href: '/blog/2025/01/01/welcome',
  },
  {
    title: 'Learning Astro',
    slug: 'learning-astro',
    date: '2025-01-02T00:00:00.000Z',
    lang: 'en',
    tags: ['astro'],
    draft: false,
    href: '/blog/2025/01/02/learning-astro',
  },
  {
    title: 'Bem-vindo ao meu blog',
    slug: 'welcome-to-my-blog',
    date: '2025-01-01T00:00:00.000Z',
    lang: 'pt',
    tags: ['welcome'],
    draft: false,
    href: '/blog/2025/01/01/welcome',
  },
  {
    title: 'Aprendendo Astro',
    slug: 'learning-astro',
    date: '2025-01-02T00:00:00.000Z',
    lang: 'pt',
    tags: ['astro'],
    draft: false,
    href: '/blog/2025/01/02/learning-astro',
  },
  {
    title: 'Draft Post',
    slug: 'draft-post',
    date: '2025-02-01T00:00:00.000Z',
    lang: 'en',
    tags: [],
    draft: true,
    href: '/blog/2025/02/01/draft-post',
  },
];

describe('BlogHome', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    document.documentElement.lang = 'en';
  });

  it('renders the "Recent Posts" heading in English by default', () => {
    render(<BlogHome posts={samplePosts} />);
    expect(screen.getByText('Recent Posts')).toBeInTheDocument();
  });

  it('shows English posts when language is "en"', () => {
    render(<BlogHome posts={samplePosts} />);
    expect(screen.getByText('Welcome to my blog')).toBeInTheDocument();
    expect(screen.getByText('Learning Astro')).toBeInTheDocument();
  });

  it('does not show Portuguese posts when language is "en"', () => {
    render(<BlogHome posts={samplePosts} />);
    expect(screen.queryByText('Bem-vindo ao meu blog')).not.toBeInTheDocument();
  });

  it('does not show draft posts', () => {
    render(<BlogHome posts={samplePosts} />);
    expect(screen.queryByText('Draft Post')).not.toBeInTheDocument();
  });

  it('groups posts under the correct year heading', () => {
    render(<BlogHome posts={samplePosts} />);
    const yearHeadings = screen.getAllByText('2025');
    expect(yearHeadings.length).toBeGreaterThanOrEqual(1);
    expect(yearHeadings[0].tagName).toBe('H2');
  });

  it('groups posts under the correct month heading', () => {
    render(<BlogHome posts={samplePosts} />);
    const monthHeadings = screen.getAllByText('January');
    expect(monthHeadings.length).toBeGreaterThanOrEqual(1);
    expect(monthHeadings[0].tagName).toBe('H3');
  });

  it('orders posts by date descending within a month', () => {
    render(<BlogHome posts={samplePosts} />);
    const items = screen.getAllByRole('listitem');
    const titles = items.map((li) => li.textContent);
    const astroIdx = titles.findIndex((t) => t?.includes('Learning Astro'));
    const welcomeIdx = titles.findIndex((t) => t?.includes('Welcome to my blog'));
    expect(astroIdx).toBeLessThan(welcomeIdx);
  });

  it('switches to Portuguese posts when lang attribute changes', async () => {
    render(<BlogHome posts={samplePosts} />);
    expect(screen.getByText('Welcome to my blog')).toBeInTheDocument();

    document.documentElement.lang = 'pt';
    // MutationObserver fires asynchronously
    await vi.waitFor(() => {
      expect(screen.getByText('Bem-vindo ao meu blog')).toBeInTheDocument();
    });
  });

  it('shows "No posts found." when there are no posts', () => {
    render(<BlogHome posts={[]} />);
    expect(screen.getByText('No posts found.')).toBeInTheDocument();
  });

  it('renders year sections with correct anchor ids', () => {
    render(<BlogHome posts={samplePosts} />);
    const yearSection = document.getElementById('year-2025');
    expect(yearSection).toBeInTheDocument();
  });

  it('renders month sections with correct anchor ids', () => {
    render(<BlogHome posts={samplePosts} />);
    const monthSection = document.getElementById('year-2025-month-01');
    expect(monthSection).toBeInTheDocument();
  });

  it('renders post titles as links to individual post pages', () => {
    render(<BlogHome posts={samplePosts} />);
    const link = screen.getByText('Welcome to my blog').closest('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/blog/2025/01/01/welcome');
  });
});
