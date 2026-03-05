---
title: "How this blog was built"
draft: true
slug: "como-esse-blog-foi-feito"
date: 2026-03-05
lang: "en"
tags: ["ai", "blog", "claude", "opus", "opus 4.6"]
---

![screenshot-1772724472107](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772724470/blog/bmir1aocozavm3hrg7kk.png)

This idea had been sitting in the drawer for some time: taking things out of my head and registering them. Mainly for content generation, based on how I see things and how I keep learning.

> This is the story of how I created my blog with 50 commits in less than 4 hours.

# Motivation
After watching the [live stream](https://www.youtube.com/watch?v=G_8uG1Ot0yo) from Mano Deyvin with Lucas Montano and Akita, I started to put a little more faith in AI and wanted it to write all the code.

The fact that Akita created 7 relevant personal projects in two and a half months made me excited about using the latest AI models (Claude Opus 4.6 and GPT Codex 5.3). That excitement is what led me to create this blog, as well as my Markdown editor, which I will talk about in another post.

# Foundation
During the live stream, Akita said that one of the most important things when working with Claude Opus 4.6 was defining the project, meaning:

- What is the project for?
- What problem does it solve?
- What are the features?

And the other most important thing was:

- Which tools or technologies will I use?

Thinking about this is thinking about Software Engineering. It means asking yourself: “Why use tool X instead of tool Y to do this?”

That led me to create a document defining what this blog project would be. I used ChatGPT to help structure it (😄) and ended up with something reasonable like:

Features:
  - Blog with a Markdown-based post system
  - Support for English and Brazilian Portuguese
  - Indexed search for each post using tags and title
  - Sitemap for SEO
  - Light and Dark theme

Technologies:
  - Astro -> to handle the content
  - React -> component library
  - TypeScript -> to make working with AI easier
  - Shadcn -> to standardize components and reuse some built-in resources
  - Vitest -> to write tests

If you want to check the chat, here is the [link](https://chatgpt.com/share/69a9838f-e670-8011-ae98-54b55c3dc731).

Everything a blog would need in a simple way, with a well-defined scope and using the same technologies with TypeScript/JavaScript.  
I also asked for this documentation to be generated in a task-oriented format, thinking about deliverables and how I would guide a junior developer. For that, I needed clear descriptions, business rules, and defined technologies.

Nothing against juniors, but describing tasks this way makes definitions clearer, especially in the task descriptions, which is very important for an AI to understand.

# Copilot with Opus 4.6
With the generated document in hand, I created a new project for GitHub Pages and, at the end of the form, there is an option called "Boost your project with Copilot".

![screenshot-1772716275932](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772716274/blog/cmnujtrjmn1to1jqk8mu.png)

> This post is being written after the blog was already created, which is why the screenshot shows a new repository 😉

I filled it with the first epic of the task that I generated with ChatGPT.

## Foundation with Astro + shadcn
Since I had already used Opus 4.6 to build my Markdown editor, it already defaults to using this model.

You can check and follow the result of your prompt in the `Agents` tab of your project.  
You can also check Copilot usage at [Avatar -> Copilot Settings](https://github.com/settings/copilot/features).

It had no problem creating the foundation of the project with Astro + shadcn, exactly as requested, nothing new here.  
A pull request was created and I evaluated it locally on my machine to make sure everything was working.  
Then I merged it and moved on to the next prompt.

## CI Workflow Breaking
After merging the first prompt, the CI broke and I asked it to fix it.  
A nice thing is that you can either provide the error to the agent (as I did) or ask it to investigate, which also works. Something like:

> The CI failed, please fix it.

Going back to the prompt:

- It read all my files and analyzed the repository, identifying that there was no workflow directory to run CI.
- It created the CI workflow file and validated that the code files still worked, meaning nothing was broken.
- It reported the problem and even suggested what should be done to prevent it from breaking again.

![screenshot-1772718367826](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772718365/blog/i90g5zuxii69zoa1mxm7.png)

Finally, I manually applied the modification it suggested in GitHub Actions and everything worked fine.

## Global Layout and Header
The main goal was to centralize the global structure of the site in a reusable layout:

- Fixed header at the top globally
- On the left, my name with a clickable link to my portfolio (which was later changed to link to the blog itself)
- Search field
- Language selector
- Button to toggle between Light and Dark themes
- Language and theme saved in `localStorage`

These were only “partially” fulfilled.

Later I had to give some clearer hints such as:

- Use the Shadcn Neutral theme for Light and Dark
- Visually it didn’t notice that the internal spacing of the language selector was not good
- Page scroll was still appearing even without relevant content
- Unit tests to ensure the changes

One interesting thing I noticed is that it started adding `i18n` to handle languages.

After validating everything, I moved on to the next prompt.

## Content System (Markdown)
Every blog needs an organization system and this task was exactly about that. In epic 3, it needed to handle the frontmatter template:
```
title: <string>
draft: <boolean>
slug: <string>
date: <Date> // YYYY/MM/DD
lang: <string> // "pt" | "en"
tags: [<string>]
```

So it created the content folder to store posts and performed the necessary configurations, including installing zod to validate the frontmatter schema.

At some point it also started using parallel resources such as file reading/creation and subagents:

![screenshot-1772720188774](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772720187/blog/aflamgcqbilj8pz8poxp.png)

![screenshot-1772720105760](https://res.cloudinary.com/dkz7xmefe/image/upload/f_auto,q_auto/v1772720104/blog/pbunlbyqd9d4pphepuug.png)

At this point there are already tools using subagents, but I had only seen parallel work like this while building my Markdown editor.

Using Copilot in VS Code is already a nice level of AI usage, but actually using an AI to perform actions and drive the process is a completely different level. It has already changed the way we write code today.

## Blog Home
What was needed here was something simple: a list of posts grouped by year and month, switching between languages, with an anchor menu for easy navigation and a scroll-to-top.

And here it clearly did everything with a single prompt, which kept happening throughout the tasks.

This is where I started noticing that we really had a leap toward using a model that actually does what it is supposed to do, if it is well instructed.

Being well instructed is the most important point here.

I suggest checking epic 4: it had 3 tasks, short descriptions of what needed to be done, and the result was quite good.

## Individual Post Page
Every blog needs dynamic pages, and that was the goal of this epic. Slug- and date-based routes, correct Markdown rendering, and computing estimated reading time.

And here it did absolutely everything! But due to layout reasons, some adjustments were needed: title, date, and reading time needed to be centered; navigation inside the blog post with a side menu; adding a link footer (an extra that I actually found interesting); and some spacing tweaks.

It handled all of that, including unit tests for the changes.

## Post Search
One of the coolest things is being able to search posts, because sometimes we want to find something related, and that was the goal of this epic.

Initially I asked for indexing based on frontmatter and content.

Later I realized that indexing content itself could become a memory issue as the blog grows. That ended up being the only improvement I asked for that was actually relevant in terms of architectural change.

## SEO and Accessibility
A blog needs accessibility and SEO. I left this part for the end and it did everything in one go.

The sitemap is generated during the build so that every new post is automatically added. This has pros and cons because the sitemap always changes, but for now it meets the needs.

## Refinements
This was the last relevant prompt I gave to the agent.

Refinements for mobile and desktop, header adjustments, spacing improvements in the post content, centering the post, removing nationality flags that it had added in previous commits, and adding an "X" button to clear the search field.

## Readme
Finally, updating the project Readme just for aesthetics.

That concludes the blog creation flow.

# Final Thoughts
**NOTE:** If you check the commit log, you’ll see that I manually pushed a modification to add the correct `favicon.ico` from my portfolio to the blog.  
The services running inside GitHub Copilot do not allow downloading images or external files (I tried 😄).

In the table below you can see the time taken by each prompt and how long each task ran. This does not include the time I spent pulling the branch locally, testing, and verifying everything. It only considers execution time.

| Prompt | Time |
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

You can learn a lot by observing this Opus 4.6 model being used inside Copilot. Especially because it runs subagents, executes processes in parallel, and in some cases tasks from the same epic were executed simultaneously. Knowing how to guide the model and structure instructions becomes very important.

Another interesting point is that I was able to do other things while it executed the tasks. In theory, I could study or work on other things during the process. However, most of the time I was observing how it worked: the comments it generated, the suggestions it made based on my instructions, and how it inferred decisions, always returning with a summary of what had been done. In the end, the whole process took about 7 hours, from the initial monitoring to the final completion.

Now things have really changed, and I believe the way we write code has already changed.

Knowing how to guide agents is already a way to write code faster today. There is no way to write code faster than a machine, and this shift only happened because of this new generation of models.

I believe everyone should try it, especially without touching the code. Today, what really makes the difference is knowing how to do pair programming, where you guide the agent and it writes the code.