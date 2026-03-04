# Matheus Almeida - Portfolio & Blog

[![Deploy to GitHub Pages](https://github.com/tthheusalmeida/tthheusalmeida.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/tthheusalmeida/tthheusalmeida.github.io/actions/workflows/deploy.yml)

Personal portfolio and blog developed with Astro, React, and Tailwind CSS, featuring multilingual support (PT/EN) and advanced search and navigation features.

🌐 **[View live site](https://tthheusalmeida.github.io)**

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Available Commands](#available-commands)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## 🎯 About the Project

This is a personal website and blog built with modern web technologies. The project was developed with a focus on performance, accessibility, and user experience, using Astro as the main framework and React for interactive components.

## ✨ Features

### Blog
- 📝 **Complete blog system** with Markdown support
- 🌍 **Multilingual support** (Portuguese and English)
- 🏷️ **Tag system** for post categorization
- 📅 **Date organization** with folder structure by year/month/day
- 🔍 **Real-time search** with optimized search index
- 📖 **Estimated reading time** for each post
- 📑 **Table of contents (TOC)** automatically generated
- 🔗 **Related posts** based on tags
- 📰 **RSS feed** for subscribers
- 🗺️ **Sitemap** for SEO

### Interface
- 🎨 **Design system** based on shadcn/ui
- 🌓 **Light/dark mode** with smooth transitions
- 📱 **Responsive design** for all devices
- ♿ **Accessibility** following best practices
- 🎯 **Sidebar navigation** with section links
- 🔝 **Scroll to top button** for easier navigation
- 🎨 **Code highlighting** with GitHub Dark theme

### Internationalization
- 🌐 **Complete i18n system** with PT/EN translations
- 🔄 **Persistent language toggle**
- 📝 **Automatic fallback** for untranslated posts
- 🗓️ **Localized date formatting**

### Search and Navigation
- 🔎 **Advanced search bar** with filters
- 🏷️ **Search by tags** and title
- ⚡ **Optimized performance** with pre-computed index
- 🎯 **Relevant results** per language

## 🛠 Technologies Used

### Core
- **[Astro](https://astro.build/)** (v5.18.0) - Web framework for content
- **[React](https://react.dev/)** (v18.3.1) - Library for interactive components
- **[TypeScript](https://www.typescriptlang.org/)** - Static typing

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.13) - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable UI components
- **[Lucide React](https://lucide.dev/)** - Modern icons
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Content styles

### Functionality
- **[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)** - Content management
- **[Zod](https://zod.dev/)** - Schema validation
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Frontmatter parser
- **[class-variance-authority](https://cva.style/)** - Component variants
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - CSS class management

### Astro Integrations
- **[@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)** - React integration
- **[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** - Tailwind integration
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Sitemap generation
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - RSS feed

### Testing
- **[Vitest](https://vitest.dev/)** (v4.0.18) - Testing framework
- **[@testing-library/react](https://testing-library.com/react)** - React component testing
- **[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)** - Custom matchers
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)** - User interaction simulation
- **[jsdom](https://github.com/jsdom/jsdom)** - DOM environment for testing

### DevOps
- **GitHub Actions** - Automated CI/CD
- **GitHub Pages** - Static hosting

## 📁 Project Structure

```
tthheusalmeida.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automatic deployment workflow
├── public/
│   ├── favicon.ico             # Site favicon
│   └── favicon.svg             # Vector favicon
├── src/
│   ├── components/             # React components
│   │   ├── ui/                # Base UI components (shadcn/ui)
│   │   │   └── button.tsx
│   │   ├── AsideNav.tsx       # Sidebar navigation
│   │   ├── BlogFooter.tsx     # Blog footer
│   │   ├── BlogHome.tsx       # Blog home page
│   │   ├── BlogPostToc.tsx    # Table of contents
│   │   ├── Header.tsx         # Site header
│   │   ├── RelatedPosts.tsx   # Related posts
│   │   └── SearchBar.tsx      # Search bar
│   ├── content/               # Site content
│   │   ├── blog/             # Blog posts organized by date
│   │   │   └── 2025/01/01/
│   │   │       ├── welcome.en.md
│   │   │       └── welcome.pt.md
│   │   └── blog.test.ts      # Schema tests
│   ├── layouts/              # Site layouts
│   │   ├── BaseLayout.astro  # Base layout
│   │   └── Layout.astro      # Post layout
│   ├── lib/                  # Utilities and functions
│   │   ├── i18n.ts          # Internationalization
│   │   ├── readingTime.ts   # Reading time calculation
│   │   ├── relatedPosts.ts  # Related posts logic
│   │   ├── search.ts        # Post search
│   │   ├── searchIndex.ts   # Search index
│   │   ├── useLang.ts       # Language hook
│   │   └── utils.ts         # General utilities
│   ├── pages/               # Site pages
│   │   ├── blog/
│   │   │   └── [...slug].astro  # Dynamic post page
│   │   ├── index.astro          # Home page
│   │   └── rss.xml.ts          # RSS feed
│   ├── schemas/             # Validation schemas
│   │   └── blog.ts         # Blog schema
│   ├── styles/             # Global styles
│   ├── test/               # Test configuration
│   ├── content.config.ts   # Content configuration
│   └── env.d.ts           # TypeScript types
├── astro.config.mjs        # Astro configuration
├── components.json         # shadcn/ui configuration
├── package.json           # Project dependencies
├── tailwind.config.mjs    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vitest.config.ts      # Testing configuration
├── .gitignore           # Git ignored files
├── LICENSE              # MIT License
└── README.md           # This file
```

## 🚀 Installation and Setup

### Prerequisites

- **Node.js** 20 or higher
- **npm** or another package manager

### Installation steps

1. Clone the repository:
```bash
git clone https://github.com/tthheusalmeida/tthheusalmeida.github.io.git
cd tthheusalmeida.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:4321`

## 📜 Available Commands

| Command | Description |
|---------|-----------|
| `npm run dev` | Starts the development server |
| `npm run start` | Alias for `npm run dev` |
| `npm run build` | Generates production build in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Runs all tests with Vitest |

## 💻 Development

### Adding a New Post

1. Create a `.md` file in `src/content/blog/YYYY/MM/DD/`
2. Add the frontmatter:

```markdown
---
title: "Post Title"
draft: false
slug: "post-title"
date: 2025-01-01
lang: "en"  # or "pt"
tags: ["tag1", "tag2"]
---

Post content in Markdown...
```

3. For multilingual posts, create `.pt.md` and `.en.md` versions

### Adding UI Components

Components follow the shadcn/ui pattern. To add new components:

1. Create the component in `src/components/ui/`
2. Use Tailwind classes and CVA for variants
3. Export the component

### Testing

Each component has its corresponding test file (`.test.tsx` or `.test.ts`). Tests use:

- **Vitest** as test runner
- **Testing Library** for component testing
- **jsdom** for DOM environment

Run tests with:
```bash
npm test
```

## 🚀 Deployment

The project is automatically deployed to GitHub Pages via GitHub Actions whenever there's a push to the `main` branch.

### Deployment Workflow

The `.github/workflows/deploy.yml` file contains the CI/CD configuration that:

1. ✅ Checks out the code
2. ⚙️ Sets up Node.js 20
3. 📦 Installs dependencies
4. 🏗️ Builds the project
5. 📤 Uploads the artifact
6. 🚀 Deploys to GitHub Pages

### Manual Deployment

You can also deploy manually:

1. Build the project:
```bash
npm run build
```

2. The content will be in `dist/` ready to be served

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

**Developed by [Matheus Almeida](https://github.com/tthheusalmeida)** 💙