---
title: "Como esse blog foi feito"
draft: true
slug: "como-esse-blog-foi-feito"
date: 2026-03-05
lang: "pt"
tags: ["ai", "blog", "claude", "opus", "opus 4.6"]
---

![screenshot-1772724472107](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772724470/blog/bmir1aocozavm3hrg7kk.png)

Já havia algum tempo que essa ideia estava na gaveta: tirar as coisas da cabeça e registrá-las. Principalmente para geração de conteúdo, pela forma como vejo as coisas e vou aprendendo.

> Essa é a história de como criei meu blog com 50 commits em menos de 4h.

# Motivação
Depois de ver a [live](https://www.youtube.com/watch?v=G_8uG1Ot0yo) do Mano Deyvin com Lucas Montano e Akita, coloquei um pouco mais de fé em AI e queria deixar ela escrever todo o código.
O fato de o Akita ter criado 7 projetos pessoais relevantes em dois meses e meio começou a me empolgar com a utilização dos modelos de AI mais recentes (Claude Opus 4.6 e GPT Codex 5.3). Essa empolgação foi o que me conduziu a criar esse blog, assim como o meu editor de Markdown, sobre o qual falarei em outro post.

#  Fundação
Na live, o Akita disse que uma das coisas mais relevantes ao trabalhar com o Claude Opus 4.6 foi criar a definição do projeto, ou seja:
- Para que serve o projeto?
- O que ele resolve?
- Quais são as funcionalidades?

E a outra coisa mais importante era:
- Quais ferramentas ou tecnologias vou usar?

Pensar nisso é pensar em Engenharia de Software. É se questionar: "Por que usar a ferramenta X e não a Y para fazer isso?".

Isso me levou a criar um documento com as definições do que seria esse blog post. Usei o ChatGPT para facilitar o esquema (😄) e cheguei em algo razoável como:

Funcionalidades:
  - Blog com sistema de posts em Markdown
  - Suporte para idiomas em Inglês e Português do Brasil
  - Busca indexada de cada post usando tags e título
  - Sitemap para SEO
  - Tema Light e Dark

Tecnologias: 
  - Astro -> para lidar com o conteúdo
  - React -> biblioteca para componentes
  - TypeScript -> para facilitar o trabalho com IA
  - Shadcn -> para padronizar os componentes e já usar alguns recursos
  - Vitest -> para escrever os testes

Caso queira consultar o chat, segue o [link](https://chatgpt.com/share/69a9838f-e670-8011-ae98-54b55c3dc731).

Tudo que um blog precisaria ter de forma simples, com escopo bem fechado e usando as mesmas tecnologias com TypeScript/JavaScript.  
Também pedi para gerar essa documentação de forma fraseada, pensando em entregas e em como eu direcionaria isso para um júnior. Para isso, precisaria de descrições e regras de negócio bem definidas, assim como as tecnologias.

Nada contra júnior, porém o fato de falar dessa forma faz com que as definições fiquem mais claras, inclusive na descrição da tarefa, um ponto bem importante para uma IA entender.

# Copilot com Opus 4.6
Com o documento gerado em mãos, criei um novo projeto para o GitHub Pages e, no final do formulário, há uma opção "Dê um impulso ao seu projeto com o Copilot".

![screenshot-1772716275932](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772716274/blog/cmnujtrjmn1to1jqk8mu.png)

> Esse post está sendo escrito depois de já ter criado o blog, por isso o print de um novo repositório 😉

E preenchi com o primeiro épico da tarefa que gerei com o ChatGPT.

## Fundação com Astro + shadcn
Como já tinha usado o Opus 4.6 para fazer o editor de texto Markdown, ele já passa a usar esse modelo por padrão.

Você pode consultar e acompanhar o resultado do seu prompt na aba `Agents` do seu projeto.
Também pode consultar o uso do Copilot em [Avatar -> Copilot Settings](https://github.com/settings/copilot/features).

Ele teve facilidade em criar a fundação do projeto com Astro + shadcn, assim como pedido, nada de novo aqui.  
Foi criado o pull request e fiz a avaliação na minha máquina, testando se estava tudo ok.  
Então fiz o merge e segui para o próximo prompt.

## Workflow do CI quebrando
O CI, após o merge do primeiro prompt, quebrou e então pedi para corrigi-lo.  
Um fato legal é que dá para passar o erro para o agente (como fiz) ou então pedir para ele consultar, que também dá certo. Algo como:

> Deu erro no CI, corrija por favor.

Voltando ao prompt:

- Ele leu todos os meus arquivos e conseguiu levantar uma análise do repositório indicando que não havia o diretório de workflow para rodar o CI.
- Criou o arquivo para o workflow do CI e validou se os arquivos de código funcionavam, ou seja, não quebrou nada aqui.
- Relatou o problema e ainda deu uma sugestão do que deveria ser feito para não quebrar novamente.
![screenshot-1772718367826](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772718365/blog/i90g5zuxii69zoa1mxm7.png)

Por fim, realizei a modificação manual que ele sugeriu no GitHub Action e tudo ocorreu bem.

## Layout Global e Header
O objetivo central era centralizar a estrutura global do site em um layout reutilizável, ou seja:

- Header fixo no topo globalmente
- À esquerda, o meu nome com link clicável para o meu portfólio (que posteriormente foi trocado para o próprio blog)
- Campo de busca
- Seletor de idioma
- Botão para troca de tema Light e Dark
- Com idioma e tema salvos no `localStorage`

Que foram até que "meio" atendidas.
Pois posteriormente precisei dar algumas dicas mais claras, como:
- Usar o tema Neutral do Shadcn para Light e Dark
- Visualmente ele não via que o espaçamento interno no seletor de idioma não estava legal
- Scroll da página ainda aparecia mesmo sem ter conteúdo relevante
- Testes unitários para garantir as mudanças

Uma das coisas interessantes que notei é que ele foi adicionando um `i18n` para lidar com idiomas.
Validando tudo, segui para o próximo prompt.

## Sistema de Conteúdo (Markdown)
Todo blog precisa de um sistema de organização e essa tarefa era justamente isso. Passando o épico 3, ele precisaria lidar com o template do frontmatter:

```
title: <string>
draft: <boolean>
slug: <string>
date: <Date> // YYYY/MM/DD
lang: <string> // "pt" | "en"
tags: [<string>]
```

Então ele criou a pasta de conteúdos para salvar os posts, realizou as configurações necessárias, incluindo a instalação do zod para validação do schema do frontmatter.

Além disso, em um dado momento ele começa a usar recursos em paralelo, como leitura/criação de arquivos e subagents:

![screenshot-1772720188774](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772720187/blog/aflamgcqbilj8pz8poxp.png)

![screenshot-1772720105760](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772720104/blog/pbunlbyqd9d4pphepuug.png)

Até esse ponto já há ferramentas que usam esses recursos de subagents, porém trabalho em paralelo vi quando estava construindo o editor de texto Markdown.

Usar o Copilot no VS Code é um nível de uso de IA legal, mas usar de fato uma IA para realizar ações e conduzir o processo é um nível totalmente diferente. Já mudou a forma como escrever código hoje.

## Home do Blog 
O que precisava aqui era algo simples: uma listagem de posts, agrupados por ano e mês, alternando entre idiomas, com um menu âncora para fácil navegação e um scroll para o topo.

E aqui, claramente ele fez isso com um único prompt, coisa que foi se repetindo ao longo das tarefas.

Aqui já comecei a notar como agora tivemos um salto de fato para usar um modelo que realmente faz o que deve ser feito, se bem instruído.
Bem instruído é o ponto mais importante aqui.

Sugiro ver como foi o épico 4, porque foram 3 tarefas, descrições curtas do que deveria ser feito e o resultado foi bem agradável.

## Página de Post Individual
Todo blog precisa de páginas dinâmicas, e aqui era o objetivo do épico. Rotas baseadas em slug e data, renderização de Markdown corretamente, computação do tempo estimado de leitura.

E aqui ele fez absolutamente tudo! Maaas, por questões de layout, foram necessárias modificações como: título, data e tempo deveriam ficar centralizados, a navegação dentro do blog post com menu lateral, adicionar rodapé de link (adicional, algo que achei interessante) e alguns espaçamentos.

Assim ele fez, como também os testes unitários para essas mudanças.

## Busca de Posts
Uma das coisas mais legais é conseguir fazer a busca de posts, porque às vezes queremos ir para algo relacionado, e assim era o objetivo desse épico.
No começo pedi para fazer por index, levando em consideração o frontmatter e o conteúdo.

Mas posteriormente vi que, por conteúdo, à medida que o blog cresce teríamos um problema de memória que não seria legal. Inclusive essa foi a única melhoria que pedi que era de fato relevante para modificações.

## SEO e Acessibilidade
Blog tem que ter acessibilidade e SEO. Deixei essa parte para o final e ele fez em uma tacada só.
O sitemap é criado no build para que a cada post novo seja adicionado. Isso tem prós e contras de sempre mudar o sitemap, mas por enquanto atende o que precisava.

## Refinamentos
Esse foi o último prompt relevante que orientei para o agente.
Refinamentos para mobile, desktop, header, alguns espaçamentos de conteúdo do post, como centralização do post, remoção das bandeiras de nacionalidade que ele tinha incorporado em commits anteriores, campo de busca agora tinha um "X" para remover toda a busca de uma vez.

## Readme
Por fim, atualização do Readme do projeto por questões de estética mesmo.
Encerrando o fluxo de criação do blog.

# Considerações finais
**OBS:** Se você entrar no log de commits, vai ver que subi manualmente uma modificação para adicionar o favicon.ico correto do meu portfólio ao blog.
Os serviços que rodam dentro do Github Copilot não deixam fazer download de imagens e arquivos externos (eu tentei 😄).

Na tabela abaixo vocês verão os tempos de cada prompt e quanto tempo cada tarefa levou para ser executada. Isso não leva em consideração o tempo que tive que baixar a branch localmente, testar e ver se tudo estava ok. Considera apenas o tempo de execução.

| Prompt | Tempo |
|:------:|:------:|
| #1 | 13:22 |
| #2 | 03:56 |
| #3 | 29:21 |
| #4 | 09:07 |
| #5 | 13:38 |
| #6 | 55:42 |
| #7 | 32:01 |
| #8 | 13:32 |
| #9 | 26:21 |
| #10 | 08:29 |
| **Total** | **03:25:29** |

Dá para aprender bastante coisa observando esse modelo do Opus 4.6 sendo usado no Copilot. Principalmente pelo fato de que eles rodam subagentes, executam processos em paralelo e, em alguns casos, tarefas de um mesmo épico foram realizadas simultaneamente. Saber orientar o modelo e estruturar bem as instruções acaba se tornando algo muito importante.

Outro ponto bem interessante é que pude fazer outras coisas enquanto ele executava as tarefas. Em teoria, dava para estudar ou trabalhar em outras coisas enquanto o processo acontecia. Porém, na maior parte do tempo eu fiquei observando como ele trabalhava: os comentários que trazia, as sugestões que fazia a partir do que eu dizia e como ele inferia algumas decisões, sempre retornando com um resumo do que havia sido feito. No fim das contas, todo o processo levou cerca de 7 horas, desde o acompanhamento inicial até a conclusão.

Agora as coisas realmente mudaram, e a forma como escrevemos código acredito que já mudou.

Saber orientar agentes já é uma forma de escrever código mais rápido hoje. Não tem como escrever código mais rápido que uma máquina, e isso só mudou por causa desse novo modelo.

Acredito que todos deveriam testar, principalmente sem encostar a mão no código. Vejo que hoje o que realmente faz a diferença é saber fazer pair programming, onde você direciona e o agente escreve o código.
 