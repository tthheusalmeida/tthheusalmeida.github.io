import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogFooter } from './BlogFooter';

describe('BlogFooter', () => {
  it('renders all four social links', () => {
    render(<BlogFooter />);
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByLabelText('Gmail')).toBeInTheDocument();
  });

  it('renders LinkedIn link with correct href', () => {
    render(<BlogFooter />);
    const link = screen.getByLabelText('LinkedIn');
    expect(link).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/dev-almeida-matheus/',
    );
  });

  it('renders GitHub link with correct href', () => {
    render(<BlogFooter />);
    const link = screen.getByLabelText('GitHub');
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/tthheusalmeida',
    );
  });

  it('renders WhatsApp link with correct href', () => {
    render(<BlogFooter />);
    const link = screen.getByLabelText('WhatsApp');
    expect(link).toHaveAttribute('href');
    expect(link.getAttribute('href')).toContain('wa.me/5538999460104');
  });

  it('renders Gmail link with correct href', () => {
    render(<BlogFooter />);
    const link = screen.getByLabelText('Gmail');
    expect(link).toHaveAttribute(
      'href',
      'mailto:dev.almeida.matheus@gmail.com',
    );
  });

  it('all links open in a new tab', () => {
    render(<BlogFooter />);
    const links = [
      screen.getByLabelText('LinkedIn'),
      screen.getByLabelText('GitHub'),
      screen.getByLabelText('WhatsApp'),
      screen.getByLabelText('Gmail'),
    ];
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders inside a footer element', () => {
    const { container } = render(<BlogFooter />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
