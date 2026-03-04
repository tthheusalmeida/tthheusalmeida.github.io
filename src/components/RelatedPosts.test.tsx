import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { RelatedPosts } from './RelatedPosts';
import type { PostForRelated } from '@/lib/relatedPosts';

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

const samplePosts: PostForRelated[] = [
  {
    title: 'Welcome to my blog',
    slug: 'welcome-to-my-blog',
    date: '2025-01-01T00:00:00.000Z',
    lang: 'en',
    tags: ['welcome', 'introduction'],
    href: '/blog/2025/01/01/welcome',
    canonicalSlug: '2025/01/01/welcome',
  },
  {
    title: 'Bem-vindo ao meu blog',
    slug: 'bem-vindo-ao-meu-blog',
    date: '2025-01-01T00:00:00.000Z',
    lang: 'pt',
    tags: ['bem-vindo', 'introdução'],
    href: '/blog/2025/01/01/welcome',
    canonicalSlug: '2025/01/01/welcome',
  },
  {
    title: 'Learning Astro',
    slug: 'learning-astro',
    date: '2025-01-02T00:00:00.000Z',
    lang: 'en',
    tags: ['astro', 'web development'],
    href: '/blog/2025/01/02/learning-astro',
    canonicalSlug: '2025/01/02/learning-astro',
  },
  {
    title: 'Aprendendo Astro',
    slug: 'aprendendo-astro',
    date: '2025-01-02T00:00:00.000Z',
    lang: 'pt',
    tags: ['astro', 'desenvolvimento web'],
    href: '/blog/2025/01/02/learning-astro',
    canonicalSlug: '2025/01/02/learning-astro',
  },
];

describe('RelatedPosts', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    document.documentElement.lang = 'en';
  });

  it('renders related posts heading when there are related posts', () => {
    render(
      <RelatedPosts
        canonicalSlug="2025/01/01/welcome"
        allPosts={samplePosts}
      />,
    );
    expect(screen.getByText('Related Posts')).toBeInTheDocument();
  });

  it('shows related posts from the same month', () => {
    render(
      <RelatedPosts
        canonicalSlug="2025/01/01/welcome"
        allPosts={samplePosts}
      />,
    );
    expect(screen.getByText('Learning Astro')).toBeInTheDocument();
  });

  it('does not show the current post in related posts', () => {
    render(
      <RelatedPosts
        canonicalSlug="2025/01/01/welcome"
        allPosts={samplePosts}
      />,
    );
    expect(screen.queryByText('Welcome to my blog')).not.toBeInTheDocument();
  });

  it('renders related posts as links', () => {
    render(
      <RelatedPosts
        canonicalSlug="2025/01/01/welcome"
        allPosts={samplePosts}
      />,
    );
    const link = screen.getByText('Learning Astro').closest('a');
    expect(link).toHaveAttribute('href', '/blog/2025/01/02/learning-astro');
  });

  it('returns null when no related posts are found', () => {
    const isolatedPosts: PostForRelated[] = [
      {
        title: 'Isolated Post',
        slug: 'isolated-post',
        date: '2025-06-01T00:00:00.000Z',
        lang: 'en',
        tags: ['unique'],
        href: '/blog/2025/06/01/isolated',
        canonicalSlug: '2025/06/01/isolated',
      },
    ];
    const { container } = render(
      <RelatedPosts
        canonicalSlug="2025/06/01/isolated"
        allPosts={isolatedPosts}
      />,
    );
    expect(container.querySelector('section')).not.toBeInTheDocument();
  });

  it('switches to Portuguese related posts when language changes', async () => {
    render(
      <RelatedPosts
        canonicalSlug="2025/01/01/welcome"
        allPosts={samplePosts}
      />,
    );
    expect(screen.getByText('Learning Astro')).toBeInTheDocument();

    document.documentElement.lang = 'pt';
    await vi.waitFor(() => {
      expect(screen.getByText('Aprendendo Astro')).toBeInTheDocument();
    });
  });
});
