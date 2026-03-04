import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AsideNav } from './AsideNav';

const scrollToMock = vi.fn();
Object.defineProperty(window, 'scrollTo', { value: scrollToMock });

const sampleGroups = [
  {
    year: '2025',
    months: [
      { month: '02', posts: [] },
      { month: '01', posts: [] },
    ],
  },
];

describe('AsideNav', () => {
  beforeEach(() => {
    scrollToMock.mockClear();
  });

  it('renders year links for each group', () => {
    render(<AsideNav groups={sampleGroups} lang="en" />);
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('renders month links with translated names', () => {
    render(<AsideNav groups={sampleGroups} lang="en" />);
    expect(screen.getByText('February')).toBeInTheDocument();
    expect(screen.getByText('January')).toBeInTheDocument();
  });

  it('renders translated month names in Portuguese', () => {
    render(<AsideNav groups={sampleGroups} lang="pt" />);
    expect(screen.getByText('Fevereiro')).toBeInTheDocument();
    expect(screen.getByText('Janeiro')).toBeInTheDocument();
  });

  it('renders correct anchor href for year', () => {
    render(<AsideNav groups={sampleGroups} lang="en" />);
    const yearLink = screen.getByText('2025');
    expect(yearLink).toHaveAttribute('href', '#year-2025');
  });

  it('renders correct anchor href for month', () => {
    render(<AsideNav groups={sampleGroups} lang="en" />);
    const monthLink = screen.getByText('January');
    expect(monthLink).toHaveAttribute('href', '#year-2025-month-01');
  });

  it('does not render when groups is empty', () => {
    const { container } = render(<AsideNav groups={[]} lang="en" />);
    expect(container.innerHTML).toBe('');
  });

  it('shows scroll to top button when scrolled', async () => {
    render(<AsideNav groups={sampleGroups} lang="en" />);
    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    window.dispatchEvent(new Event('scroll'));

    await vi.waitFor(() => {
      expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
    });
  });

  it('calls window.scrollTo with smooth behavior when scroll to top is clicked', async () => {
    const user = userEvent.setup();
    render(<AsideNav groups={sampleGroups} lang="en" />);

    Object.defineProperty(window, 'scrollY', { value: 300, writable: true });
    window.dispatchEvent(new Event('scroll'));

    await vi.waitFor(() => {
      expect(screen.getByLabelText('Scroll to top')).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText('Scroll to top'));
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('has a nav element with aria-label', () => {
    render(<AsideNav groups={sampleGroups} lang="en" />);
    expect(screen.getByLabelText('Blog navigation')).toBeInTheDocument();
  });
});
