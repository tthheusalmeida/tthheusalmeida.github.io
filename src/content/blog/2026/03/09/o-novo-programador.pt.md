---
title: "O novo programador"
draft: false
slug: "o-novo-programador"
date: 2026-03-09
lang: "pt"
tags:
  [
    "inteligencia artificial",
    "programacao",
    "engenharia de software",
    "arquitetura de software",
    "fundamentos",
    "carreira dev",
    "futuro da programacao",
    "ai no desenvolvimento",
  ]
---

Você acha que medir um desenvolvedor contra uma Inteligência Artificial (IA) usando linhas de código é uma boa métrica?

Com a chegada dos novos modelos de IA Claude Opus 4.6 e GPT Codex 5.3, o modo como escrevemos código mudou.

Pois agora esses modelos conseguem escrever bem e mais rápido, com pouca intervenção se comparados aos modelos anteriores.

Isso muda um pouco como o programador que "só" escreve código lida com os problemas, porque essa parte já foi resolvida ou está bem próxima de ser resolvida.

Vejo uma movimentação no mercado para o uso massivo de IA nesse primeiro semestre de 2026 para escrever código, que surgiu possivelmente depois de como o Spotify está lidando com o código. [Eles não escrevem mais código desde dezembro de 2025](https://fastcompanybrasil.com/ia/no-spotify-a-ia-ja-escreve-o-codigo-e-os-engenheiros/).

# Código

## O fim

Resgatando a pergunta que fizemos no começo do post:

> Você acha que medir um desenvolvedor contra uma Inteligência Artificial (IA) usando linhas de código é uma boa métrica?

Eu acredito que, se avaliarmos só esse quesito, estaríamos esquecendo de todo o restante. O código, para um programador atual, é o fim. Não há como competir com a velocidade com que a IA gera código; isso se tornou commodity.

Com o que devemos nos preocupar é com aquilo em que, de fato, hoje a IA não tem como nos substituir:

- Fundamentos
- Arquitetura de Software

E isso é o meio.

## O meio

Pensar em como um software vai ser arquitetado, modificado e na criação de novas features a partir de objetivos claros ainda não tem como ser substituído por IA.
Mas o programador agora não programará tanto como antes, e sim arquitetará mais.

Escrever um código bonito, legível, elegante, seguindo Design Patterns, Clean Code e SOLID é importante para que a arquitetura escale. E, se pedido, a IA faz isso bem. Mas isso ainda precisa passar pela validação por pares em um Code Review para só então ir para deploy.

Para isso, esse "par", no momento do Code Review, precisa trazer uma bagagem de Fundamentos e Arquitetura de Software.

# Fundamentos

Fundamentos são aquilo que não mudam rápidamente.

`Framework` muda, linguagem muda, biblioteca muda. Mas conceitos como estruturas de dados, complexidade de algoritmos, concorrência, redes, banco de dados e sistemas distribuídos continuam sendo os mesmos há décadas.

Uma IA consegue escrever um `for` melhor que você.
Mas ela não entende o problema do negócio do começo ao fim.

Quando um sistema fica lento, quando uma `query` começa a custar caro, quando um `endpoint` começa a cair com volume alto de requisições, deixa de ser "escrever código", mas sim entender o que está acontecendo por baixo dos panos.

Fundamentos permitem fazer perguntas melhores:

- Esse algoritmo escala?
- Essa `query` está correta?
- Esse `cache` faz sentido?

Esse sistema aguenta 10x, 100x, 1000x mais usuários?

A IA pode sugerir respostas, mas quem valida se aquilo faz sentido no contexto do sistema ainda é o desenvolvedo. (Que eu acho que começaremos a ter mais Arquitetos de Software do que de fato desenvolvedores)

Quanto mais forte for a base de fundamentos, mais útil a IA se torna.
Sem isso, ela é apenas um autocomplete muito caro.

# Arquitetura de Softaware

Se fundamentos explicam como as coisas funcionam, arquitetura define como elas se organizam.

Arquitetura é decidir:

- como os serviços se comunicam
- como os dados são armazenados
- como o sistema cresce sem quebrar
- como novas features entram sem gerar caos

IA consegue gerar código para um microserviço.
Mas decidir se deveria existir um microserviço ainda é um problema nosso.

Arquitetura exige trocas o tempo todo.

Centralizar ou distribuir?
Cache ou consistência forte?
SQL ou NoSQL?
Monólito modular ou microsserviços?

Essas decisões não são só técnicas. Elas envolvem custo, equipe, tempo de entrega e manutenção futura.

E é exatamente por isso que o papel do programador está mudando.

Antes grande parte do trabalho era produzir código.
Agora cada vez mais o trabalho será tomar decisões.

A IA escreve o código.
Mas alguém precisa decidir qual código deveria existir.

# O que não está sendo falado

Nos últimos meses temos visto muitas matérias como estas:

- [IA já escreve 90% do código da Anthropic, mas CEO considera engenheiros essenciais](https://exame.com/inteligencia-artificial/ia-escreve-90-do-codigo-da-anthropic-mas-ceo-nao-demite-engenheiros/?utm_source=copiaecola&utm_medium=compartilhamento)
- [Como a Code.B aumentou em até 80% a sua eficiência no planejamento de campanhas do Google Ads usando IA](https://aws.amazon.com/pt/blogs/aws-brasil/como-a-code-b-aumentou-em-ate-80-a-sua-eficiencia-no-planejamento-de-campanhas-do-google-ads-usando-ia/)
- [Brian Armstrong revela que 40% do código da Coinbase é gerado por IA](https://livecoins.com.br/brian-armstrong-revela-que-40-do-codigo-da-coinbase-e-gerado-por-ia/)

Parece que isso de fato vai acabar com os programadores.

Mas o que todas elas têm em comum? **Agilização nos processos**.

A IA veio para fazer isso: pegamos um gargalo na linha de produção e colocamos algo mais efetivo.

Mas o que há em comum também, e o que não estão falando, é que, para que isso acontecesse, houve mãos humanas por trás. Não nasceu algo só por existir IA.

Como foi o processo? É isso que temos que nos perguntar.

Houve uma pessoa por trás que entendeu os requisitos, especificou como deveria ser feito e o que deveria ser feito. Essa pessoa orquestrou os agentes que estavam trabalhando, teve que revisar, definir escopo e, no fim... revisar o código.

No post anterior, eu falo [como a IA escreveu todo esse blog em menos de 4 horas](https://tthheusalmeida.github.io/blog/2026/03/05/como-esse-blog-foi-feito/).Porém, antes disso, eu tive que arquitetar o projeto, definir as tecnologias, planejar como seria cada página e seu comportamento, além de decidir quais features ele teria.

No fim, foi ela quem gerou o código, que posteriormente precisei baixar localmente, validar e aprovar no code review. Ou seja, no final das contas, não foram apenas 4 horas.

# Conclusão

Se o código virou commodity, então o valor do programador mudou de lugar.

Saber usar um framework continua sendo importante. Mas cada vez menos será sobre lembrar a sintaxe exata de uma biblioteca ou como configurar uma ferramenta específica. Esses detalhes estão se tornando o tipo de coisa que a IA resolve em segundos se bem orientada.

O que continua difícil, e provavelmente continuará por muito tempo, é entender problemas complexos.

Entender como um sistema deve crescer.
Como ele não deve quebrar.
Como novas funcionalidades entram sem transformar tudo em um caos.

É aí que entram fundamentos e arquitetura de software.

Fundamentos permitem entender o que está acontecendo por baixo dos panos.
Arquitetura permite decidir como tudo deve se organizar.

E quanto mais experiência profissional alguém tem, mais essa bagagem pesa. Porque arquitetura não nasce só de teoria, mas de sistemas que já quebraram, de decisões que já deram errado e de problemas que já precisaram ser resolvidos em produção.

Talvez o novo programador escreva menos código.

Mas ele precisará entender muito mais software.

A IA pode escrever o código.

Mas alguém ainda precisa decidir qual sistema deveria existir.
