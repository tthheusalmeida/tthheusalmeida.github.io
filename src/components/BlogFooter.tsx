import * as React from 'react';
import { Linkedin, Github, MessageCircle, Mail } from 'lucide-react';

const links = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dev-almeida-matheus/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/tthheusalmeida',
    icon: Github,
  },
  {
    label: 'WhatsApp',
    href: "https://wa.me/5538999460104?text=Hi!%20I%E2%80%99m%20looking%20for%20help%20with%20a%20project%20and%20came%20across%20your%20site.%20Can%20we%20talk?",
    icon: MessageCircle,
  },
  {
    label: 'Gmail',
    href: 'mailto:dev.almeida.matheus@gmail.com',
    icon: Mail,
  },
] as const;

export function BlogFooter() {
  return (
    <footer className="mt-12 border-t border-border pt-6 pb-8">
      <div className="flex items-center justify-center gap-6">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
