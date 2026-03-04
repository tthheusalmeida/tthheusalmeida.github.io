# Matheus Almeida - Portfolio & Blog

[![Deploy to GitHub Pages](https://github.com/tthheusalmeida/tthheusalmeida.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/tthheusalmeida/tthheusalmeida.github.io/actions/workflows/deploy.yml)

Portfolio pessoal e blog desenvolvido com Astro, React e Tailwind CSS, com suporte para múltiplos idiomas (PT/EN) e funcionalidades avançadas de busca e navegação.

🌐 **[Ver site ao vivo](https://tthheusalmeida.github.io)**

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Comandos Disponíveis](#comandos-disponíveis)
- [Desenvolvimento](#desenvolvimento)
- [Testes](#testes)
- [Deploy](#deploy)
- [Licença](#licença)

## 🎯 Sobre o Projeto

Este é um site pessoal e blog construído com tecnologias modernas da web. O projeto foi desenvolvido com foco em performance, acessibilidade e experiência do usuário, utilizando Astro como framework principal e React para componentes interativos.

## ✨ Funcionalidades

### Blog
- 📝 **Sistema de blog completo** com suporte a Markdown
- 🌍 **Suporte multilíngue** (Português e Inglês)
- 🏷️ **Sistema de tags** para categorização de posts
- 📅 **Organização por data** com estrutura de pastas por ano/mês/dia
- 🔍 **Busca em tempo real** com índice de pesquisa otimizado
- 📖 **Tempo de leitura estimado** para cada post
- 📑 **Tabela de conteúdo (TOC)** gerada automaticamente
- 🔗 **Posts relacionados** baseados em tags
- 📰 **Feed RSS** para assinantes
- 🗺️ **Sitemap** para SEO

### Interface
- 🎨 **Design system** baseado em shadcn/ui
- 🌓 **Modo claro/escuro** com alternância suave
- 📱 **Design responsivo** para todos os dispositivos
- ♿ **Acessibilidade** seguindo as melhores práticas
- 🎯 **Navegação lateral** com links para seções
- 🔝 **Botão de scroll to top** para facilitar navegação
- 🎨 **Highlight de código** com tema GitHub Dark

### Internacionalização
- 🌐 **Sistema de i18n completo** com traduções para PT/EN
- 🔄 **Alternância de idioma** persistente
- 📝 **Fallback automático** para posts não traduzidos
- 🗓️ **Formatação de datas localizada**

### Busca e Navegação
- 🔎 **Barra de busca avançada** com filtros
- 🏷️ **Busca por tags** e título
- ⚡ **Performance otimizada** com índice pré-computado
- 🎯 **Resultados relevantes** por idioma

## 🛠 Tecnologias Utilizadas

### Core
- **[Astro](https://astro.build/)** (v5.18.0) - Framework web para conteúdo
- **[React](https://react.dev/)** (v18.3.1) - Biblioteca para componentes interativos
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.13) - Framework CSS utility-first
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes UI reutilizáveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Estilos para conteúdo

### Funcionalidades
- **[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)** - Gerenciamento de conteúdo
- **[Zod](https://zod.dev/)** - Validação de schemas
- **[gray-matter](https://github.com/jonschlinkert/gray-matter)** - Parser de frontmatter
- **[class-variance-authority](https://cva.style/)** - Variantes de componentes
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Gerenciamento de classes CSS

### Integrações Astro
- **[@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)** - Integração React
- **[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** - Integração Tailwind
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** - Geração de sitemap
- **[@astrojs/rss](https://docs.astro.build/en/guides/rss/)** - Feed RSS

### Testes
- **[Vitest](https://vitest.dev/)** (v4.0.18) - Framework de testes
- **[@testing-library/react](https://testing-library.com/react)** - Testes de componentes React
- **[@testing-library/jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/)** - Matchers customizados
- **[@testing-library/user-event](https://testing-library.com/docs/user-event/intro/)** - Simulação de interações
- **[jsdom](https://github.com/jsdom/jsdom)** - Ambiente DOM para testes

### DevOps
- **GitHub Actions** - CI/CD automático
- **GitHub Pages** - Hospedagem estática

## 📁 Estrutura do Projeto

```
tthheusalmeida.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Workflow de deploy automático
├── public/
│   ├── favicon.ico             # Favicon do site
│   └── favicon.svg             # Favicon vetorial
├── src/
│   ├── components/             # Componentes React
│   │   ├── ui/                # Componentes UI base (shadcn/ui)
│   │   │   └── button.tsx
│   │   ├── AsideNav.tsx       # Navegação lateral
│   │   ├── BlogFooter.tsx     # Rodapé do blog
│   │   ├── BlogHome.tsx       # Página inicial do blog
│   │   ├── BlogPostToc.tsx    # Tabela de conteúdo
│   │   ├── Header.tsx         # Cabeçalho do site
│   │   ├── RelatedPosts.tsx   # Posts relacionados
│   │   └── SearchBar.tsx      # Barra de busca
│   ├── content/               # Conteúdo do site
│   │   ├── blog/             # Posts do blog organizados por data
│   │   │   └── 2025/01/01/
│   │   │       ├── welcome.en.md
│   │   │       └── welcome.pt.md
│   │   └── blog.test.ts      # Testes do schema
│   ├── layouts/              # Layouts do site
│   │   ├── BaseLayout.astro  # Layout base
│   │   └── Layout.astro      # Layout de post
│   ├── lib/                  # Utilitários e funções
│   │   ├── i18n.ts          # Internacionalização
│   │   ├── readingTime.ts   # Cálculo de tempo de leitura
│   │   ├── relatedPosts.ts  # Lógica de posts relacionados
│   │   ├── search.ts        # Busca de posts
│   │   ├── searchIndex.ts   # Índice de busca
│   │   ├── useLang.ts       # Hook de idioma
│   │   └── utils.ts         # Utilitários gerais
│   ├── pages/               # Páginas do site
│   │   ├── blog/
│   │   │   └── [...slug].astro  # Página de post dinâmica
│   │   ├── index.astro          # Página inicial
│   │   └── rss.xml.ts          # Feed RSS
│   ├── schemas/             # Schemas de validação
│   │   └── blog.ts         # Schema do blog
│   ├── styles/             # Estilos globais
│   ├── test/               # Configuração de testes
│   ├── content.config.ts   # Configuração de conteúdo
│   └── env.d.ts           # Tipos TypeScript
├── astro.config.mjs        # Configuração do Astro
├── components.json         # Configuração do shadcn/ui
├── package.json           # Dependências do projeto
├── tailwind.config.mjs    # Configuração do Tailwind
├── tsconfig.json         # Configuração do TypeScript
├── vitest.config.ts      # Configuração de testes
├── .gitignore           # Arquivos ignorados pelo Git
├── LICENSE              # Licença MIT
└── README.md           # Este arquivo
```

## 🚀 Instalação e Configuração

### Pré-requisitos

- **Node.js** 20 ou superior
- **npm** ou outro gerenciador de pacotes

### Passos para instalação

1. Clone o repositório:
```bash
git clone https://github.com/tthheusalmeida/tthheusalmeida.github.io.git
cd tthheusalmeida.github.io
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:4321`

## 📜 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run start` | Alias para `npm run dev` |
| `npm run build` | Gera a build de produção em `dist/` |
| `npm run preview` | Preview da build de produção localmente |
| `npm test` | Executa todos os testes com Vitest |

## 💻 Desenvolvimento

### Adicionando um Novo Post

1. Crie um arquivo `.md` em `src/content/blog/YYYY/MM/DD/`
2. Adicione o frontmatter:

```markdown
---
title: "Título do Post"
draft: false
slug: "titulo-do-post"
date: 2025-01-01
lang: "pt"  # ou "en"
tags: ["tag1", "tag2"]
---

Conteúdo do post em Markdown...
```

3. Para posts multilíngues, crie versões `.pt.md` e `.en.md`

### Adicionando Componentes UI

Os componentes seguem o padrão do shadcn/ui. Para adicionar novos componentes:

1. Crie o componente em `src/components/ui/`
2. Use as classes do Tailwind e CVA para variantes
3. Exporte o componente

### Testes

Cada componente possui seu arquivo de teste correspondente (`.test.tsx` ou `.test.ts`). Os testes utilizam:

- **Vitest** como test runner
- **Testing Library** para testes de componentes
- **jsdom** para ambiente de DOM

Execute os testes com:
```bash
npm test
```

## 🚀 Deploy

O projeto é automaticamente implantado no GitHub Pages através do GitHub Actions sempre que há um push para a branch `main`.

### Workflow de Deploy

O arquivo `.github/workflows/deploy.yml` contém a configuração de CI/CD que:

1. ✅ Faz checkout do código
2. ⚙️ Configura Node.js 20
3. 📦 Instala dependências
4. 🏗️ Faz build do projeto
5. 📤 Upload do artifact
6. 🚀 Deploy no GitHub Pages

### Deploy Manual

Você também pode fazer deploy manualmente:

1. Build do projeto:
```bash
npm run build
```

2. O conteúdo estará em `dist/` pronto para ser servido

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido por [Matheus Almeida](https://github.com/tthheusalmeida)** 💙