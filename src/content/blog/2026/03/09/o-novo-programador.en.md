---
title: The New Programmer
draft: false
slug: the-new-programmer
date: 2026-03-09
lang: en
tags:
  [
    "artificial intelligence",
    "programming",
    "software engineering",
    "software architecture",
    "fundamentals",
    "dev career",
    "future of programming",
    "ai in development",
  ]
---

Do you think measuring a developer against an Artificial Intelligence (AI) using lines of code is a good metric? 

With the arrival of the new AI models Claude Opus 4.6 and GPT Codex 5.3, the way we write code has changed.

These models can now write well and faster, with little intervention compared to previous models.

This changes how a programmer who "only" writes code deals with problems, because that part has already been solved or is very close to being solved.

I see a movement in the market toward massive use of AI in the first half of 2026 to write code, possibly influenced by how Spotify is dealing with code. [They have not written code themselves since December 2025](https://fastcompanybrasil.com/ia/no-spotify-a-ia-ja-escreve-o-codigo-e-os-engenheiros/).

# Code

## The End

Going back to the question we asked at the beginning of the post:

> Do you think measuring a developer against an Artificial Intelligence (AI) using lines of code is a good metric?

I believe that if we evaluate only this aspect, we would be forgetting everything else. Code, for today's programmer, is the end. There is no way to compete with the speed at which AI generates code; it has become a commodity.

What we should focus on are the things where AI still cannot replace us today:

- Fundamentals
- Software Architecture

And that is the middle.

## The Middle

Thinking about how software will be architected, modified, and how new features are created based on clear objectives still cannot be replaced by AI. But programmers will now program less than before and architect more.

Writing beautiful, readable, elegant code following Design Patterns, Clean Code, and SOLID is important so the architecture can scale. And, when asked, AI does this well. But it still needs to go through peer validation in a Code Review before it can go to deploy.

For that, this "peer", during the Code Review, needs to bring a background in Fundamentals and Software Architecture.

# Fundamentals

Fundamentals are the things that do not change quickly.

A `framework` changes, a language changes, a library changes. But concepts such as data structures, algorithm complexity, concurrency, networking, databases, and distributed systems have remained the same for decades.

An AI can write a `for` loop better than you. But it does not understand the business problem from beginning to end.

When a system becomes slow, when a `query` starts becoming expensive, or when an `endpoint` begins failing under high request volume, it stops being about "writing code" and becomes about understanding what is happening under the hood.

Fundamentals allow us to ask better questions:

- Does this algorithm scale?
- Is this `query` correct?
- Does this `cache` make sense?

Can this system handle 10x, 100x, or 1000x more users?

AI can suggest answers, but the person who validates whether that makes sense in the context of the system is still the developer. (And I believe we will start seeing more Software Architects than actual developers.)

The stronger the foundation in fundamentals, the more useful AI becomes. Without it, AI is just a very expensive autocomplete.

# Software Architecture

If fundamentals explain how things work, architecture defines how they are organized.

Architecture means deciding:

- how services communicate
- how data is stored
- how the system grows without breaking
- how new features enter without creating chaos

AI can generate code for a microservice. But deciding whether a microservice should exist is still our problem.

Architecture requires trade-offs all the time.

Centralize or distribute? Cache or strong consistency? SQL or NoSQL? Modular monolith or microservices?

These decisions are not only technical. They involve cost, team structure, delivery time, and future maintenance.

And that is exactly why the role of the programmer is changing.

Before, a large part of the work was producing code. Now, more and more of the work will be making decisions.

AI writes the code. But someone needs to decide which code should exist.

# What is not being said

In recent months we have seen many articles like these:

- [AI already writes 90% of Anthropic's code, but the CEO still considers engineers essential](https://exame.com/inteligencia-artificial/ia-escreve-90-do-codigo-da-anthropic-mas-ceo-nao-demite-engenheiros/?utm_source=copiaecola&utm_medium=compartilhamento)
- [How Code.B increased its efficiency in planning Google Ads campaigns by up to 80% using AI](https://aws.amazon.com/pt/blogs/aws-brasil/como-a-code-b-aumentou-em-ate-80-a-sua-eficiencia-no-planejamento-de-campanhas-do-google-ads-usando-ia/)
- [Brian Armstrong reveals that 40% of Coinbase code is generated by AI](https://livecoins.com.br/brian-armstrong-revela-que-40-do-codigo-da-coinbase-e-gerado-por-ia/)

At first glance, it seems like this will actually end programmers.

But what do all of them have in common? **Process acceleration**.

AI came to do exactly that: take a bottleneck in the production line and make it more efficient.

But there is something else in common that people are not talking about:
for this to happen, there were human hands behind it. Nothing appeared simply because AI exists.

How was the process? That is what we should ask.

There was a person behind it who understood the requirements, specified how it should be done, and what should be done. This person orchestrated the agents that were working, had to review the results, define the scope, and in the end... review the code.

In the previous post, I explain [how AI wrote this entire blog in less than 4 hours](https://tthheusalmeida.github.io/blog/2026/03/05/como-esse-blog-foi-feito/). However, before that, I had to architect the project, define the technologies, plan how each page would work and behave, and decide which features it would have.

In the end, it was the AI that generated the code, which I later had to download locally, validate, and approve in a code review. In other words, in the end, it wasn’t just 4 hours.

# Conclusion

If code has become a commodity, then the value of the programmer has moved somewhere else.

Knowing how to use a framework is still important. But it will increasingly be less about remembering the exact syntax of a library or how to configure a specific tool. Those details are becoming the kind of thing AI solves in seconds when properly guided.

What remains difficult, and will probably remain difficult for a long time, is understanding complex problems.

Understanding how a system should grow. How it should avoid breaking. How new features enter without turning everything into chaos.

This is where fundamentals and software architecture come in.

Fundamentals allow us to understand what is happening under the hood. Architecture allows us to decide how everything should be organized.

And the more professional experience someone has, the more this background matters. Because architecture is not born only from theory, but from systems that have already broken, decisions that have gone wrong, and problems that had to be solved in production.

Maybe the new programmer will write less code.

But they will need to understand much more software.

AI can write the code.

But someone still needs to decide which system should exist.
