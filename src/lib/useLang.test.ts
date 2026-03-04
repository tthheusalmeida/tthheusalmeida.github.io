import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLang } from './useLang';

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

describe('useLang', () => {
  beforeEach(() => {
    localStorageMock.clear();
    localStorageMock.getItem.mockClear();
    document.documentElement.lang = 'en';
  });

  it('defaults to "en"', () => {
    const { result } = renderHook(() => useLang());
    expect(result.current).toBe('en');
  });

  it('reads language from localStorage on mount', () => {
    localStorageMock.setItem('lang', 'pt');
    const { result } = renderHook(() => useLang());
    expect(result.current).toBe('pt');
  });

  it('ignores invalid language in localStorage', () => {
    localStorageMock.setItem('lang', 'fr');
    const { result } = renderHook(() => useLang());
    expect(result.current).toBe('en');
  });

  it('reacts to document.documentElement.lang changes', async () => {
    const { result } = renderHook(() => useLang());
    expect(result.current).toBe('en');

    act(() => {
      document.documentElement.lang = 'pt';
    });

    await vi.waitFor(() => {
      expect(result.current).toBe('pt');
    });
  });

  it('ignores invalid lang attribute on document', async () => {
    const { result } = renderHook(() => useLang());
    expect(result.current).toBe('en');

    act(() => {
      document.documentElement.lang = 'fr';
    });

    // Should stay 'en' — the observer ignores invalid languages
    await new Promise((r) => setTimeout(r, 50));
    expect(result.current).toBe('en');
  });

  it('cleans up the observer on unmount', () => {
    const disconnectSpy = vi.fn();
    const observeSpy = vi.fn();
    const originalMutationObserver = globalThis.MutationObserver;

    globalThis.MutationObserver = class {
      constructor() {}
      observe = observeSpy;
      disconnect = disconnectSpy;
      takeRecords = vi.fn().mockReturnValue([]);
    } as unknown as typeof MutationObserver;

    const { unmount } = renderHook(() => useLang());
    expect(observeSpy).toHaveBeenCalled();

    unmount();
    expect(disconnectSpy).toHaveBeenCalled();

    globalThis.MutationObserver = originalMutationObserver;
  });
});
