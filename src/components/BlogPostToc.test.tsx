import { describe, it, expect, beforeEach, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogPostToc } from './BlogPostToc';

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

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  value: MockIntersectionObserver,
});

// Mock MutationObserver
class MockMutationObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(public callback: MutationCallback) {}
}
Object.defineProperty(window, 'MutationObserver', {
  value: MockMutationObserver,
});

function setupArticleWithHeadings() {
  const article = document.createElement('article');
  article.classList.add('post-article');
  article.style.display = 'block';

  const prose = document.createElement('div');
  prose.classList.add('prose');

  const h1 = document.createElement('h1');
  h1.id = 'intro';
  h1.textContent = 'Introduction';
  prose.appendChild(h1);

  const h2 = document.createElement('h2');
  h2.id = 'setup';
  h2.textContent = 'Setup';
  prose.appendChild(h2);

  const h3 = document.createElement('h3');
  h3.id = 'install';
  h3.textContent = 'Installation';
  prose.appendChild(h3);

  article.appendChild(prose);
  document.body.appendChild(article);

  return article;
}

describe('BlogPostToc', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.lang = 'en';
    document.body.innerHTML = '';
  });

  it('renders nothing when no headings exist', () => {
    const { container } = render(<BlogPostToc />);
    expect(container.querySelector('aside')).toBeNull();
  });

  it('renders ToC title in sentence case (not uppercase) for EN', () => {
    setupArticleWithHeadings();
    render(<BlogPostToc />);
    const title = screen.getByText('Page contents');
    expect(title).toBeInTheDocument();
    expect(title.className).not.toContain('uppercase');
  });

  it('renders ToC title in sentence case for PT', () => {
    localStorageMock.getItem.mockImplementation((key: string) => key === 'lang' ? 'pt' : null);
    document.documentElement.lang = 'pt';
    setupArticleWithHeadings();
    render(<BlogPostToc />);
    const title = screen.getByText('Conteúdo desta página');
    expect(title).toBeInTheDocument();
    expect(title.className).not.toContain('uppercase');
  });

  it('renders heading links with correct indentation levels', () => {
    setupArticleWithHeadings();
    render(<BlogPostToc />);

    const introLinks = screen.getAllByText('Introduction');
    const tocIntro = introLinks.find((el) => el.tagName === 'A');
    expect(tocIntro).toBeDefined();
    expect(tocIntro!.className).toContain('font-semibold');

    const setupLinks = screen.getAllByText('Setup');
    const tocSetup = setupLinks.find((el) => el.tagName === 'A');
    expect(tocSetup).toBeDefined();
    expect(tocSetup!.className).toContain('pl-3');

    const installLinks = screen.getAllByText('Installation');
    const tocInstall = installLinks.find((el) => el.tagName === 'A');
    expect(tocInstall).toBeDefined();
    expect(tocInstall!.className).toContain('pl-6');
  });

  it('renders inside an aside element', () => {
    setupArticleWithHeadings();
    const { container } = render(<BlogPostToc />);
    expect(container.querySelector('aside')).toBeInTheDocument();
  });

  it('renders a nav with table of contents aria-label', () => {
    setupArticleWithHeadings();
    render(<BlogPostToc />);
    expect(screen.getByLabelText('Table of contents')).toBeInTheDocument();
  });
});
