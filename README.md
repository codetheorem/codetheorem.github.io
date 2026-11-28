# Hrishikesh Agarwal — engineering publication

A static Astro publication for AI infrastructure, systems engineering, independent research directions, and philosophy. Production: https://codetheorem.github.io/.

## Develop and verify

```sh
npm ci
npm run dev
npm test
npm run build
npm run check:site
npm run lint
npm run preview
```

`npm test` exercises full-text matching, ranking, filter intersections, normalization, and excerpts. `check:site` runs after a build and checks generated pages, preserved URLs, local assets and link fragments, metadata, search destinations, and feeds. The GitHub Actions workflow runs the tests, production build, and generated-site checks before deploying to GitHub Pages.

There is no new application backend. Content, search data, feeds, and routes are generated at build time. The existing optional view-counter worker is separate and remains opt-in through environment configuration. No analytics credentials are required to build or read the site.

## Content model

Schemas live in `src/content.config.ts`. All collections accept Markdown and MDX.

| Collection | Source | Public address |
| --- | --- | --- |
| Engineering articles | `src/content/blog` | `/blog/<id>/` — existing URLs preserved |
| Philosophical essays | `src/content/philosophy` | `/philosophy/<id>/` |
| Standalone biography | `src/content/pages` | `/<id>/` |
| Projects and research scope | `src/content/projects` | `/projects/<id>/` |
| Book introductions | `src/content/books` | `/books/<id>/` |
| Book chapters | `src/content/chapters/<book>` | `/books/<book>/<chapter>/` |
| Annotated external sources | `src/content/library` | `/library/<id>/` |
| Engineering notes | `src/content/worklogs` | `/worklogs/<id>/` |
| Original weekly notes | `src/content/weekly` | `/weekly/<year>-w<week>/` — existing URLs preserved |

`/writing/` combines engineering articles and essays. Its category, topic, and series filters can be shared as URL query parameters. Search can be widened to the entire publication. `/blog/` and `/weekly/` remain useful archive pages rather than broken aliases.

## Add an article

```yaml
---
title: "An explicit engineering question"
description: "What the reader will understand after reading it."
pubDate: 2026-11-27
updatedDate: 2026-11-27
category: "AI infrastructure"
tags: [Inference, Memory]
series: "llm-systems"
seriesOrder: 3
featured: false
draft: true
---
```

Remove `draft: true` when ready. Drafts are excluded from generated article routes, writing lists, related articles, search, and RSS. Set a real modification date when content changes. Dates display in Asia/Kolkata. Registered series names and descriptions live in `src/data/series.ts`; membership and order belong to article metadata. The article layout builds its table of contents from rendered headings and computes an approximate reading time at 220 words per minute.

Use `$...$` or display math for KaTeX. Escape dollar signs used as currency. Markdown footnotes, references, syntax highlighting, code copying, and line wrapping are supported. Fenced `mermaid` blocks keep their readable source and offer on-demand rendering with a locally bundled renderer in strict security mode. Ordinary SVG illustrations can be used directly; `EngineeringDiagram.astro` provides an accessible scrolling frame for wide labeled figures. `EngineeringTable.astro` provides the equivalent for tables in MDX.

Static Tokenomics SVGs have editable Mermaid counterparts and a generator under `blog/tokenomics/`. They are conceptual, public-safe illustrations, not internal architecture disclosures. No internal source or benchmark data is required to build the site.

## Other collections

A project must declare `kind`, `status`, `topics`, `order`, and `updatedDate`. Supported kinds separate professional projects, independent prototypes, research directions, and future plans. Do not infer progress from a project name. FerrumLM and FerrumData are explicitly research directions; FerrumDB is planned.

A chapter declares an existing `book` ID and positive `order`. The book's introduction uses `status: Working manuscript` or `Complete`. Only published chapters belong in reader navigation.

A library entry declares an external `url`, `author`, `kind`, topics in `tags`, and a date recording when the entry was added. Its body is an original annotation, not copied source text. Inclusion does not imply completed reading.

## Search and feeds

`/search-index.json` contains the public text of published entries. `src/utils/search.mjs` supplies matching for the browser and unit tests. All query words must match; case and diacritics are normalized. Scope, category, topic, and series filters intersect. Results use safe text nodes rather than injecting article HTML. JavaScript is needed for filtering; the original static lists remain visible if it is unavailable or search fails.

`/rss.xml` includes engineering writing and essays with rendered content. `/worklogs/rss.xml` includes worklogs and the weekly archive. `@astrojs/sitemap` generates the sitemap. `BaseHead.astro` provides canonical, social, feed, and article metadata; article pages also emit BlogPosting structured data.

## Deployment and performance

`.github/workflows/deploy.yml` builds on pushes to `main` and publishes `dist/` using GitHub Pages. No custom routing service, server rewrite, or database is required. Preserve `astro.config.ts`'s production `site` value when updating metadata.

The main layouts use system fonts, locally served KaTeX assets, static HTML, and small interaction scripts. Mermaid's larger renderer is dynamically imported only after a reader asks to render a diagram. No automatic animation or client-rendered application shell is used.

The light theme is the default; an explicit dark-theme choice persists when browser storage is available. All text remains readable if storage or JavaScript is unavailable. Wide code, tables, math, and labeled diagrams scroll within their own containers.

## Optional view counter

Existing worker instructions remain in `worker/README.md`. Never commit worker secrets, private endpoints, customer material, or deployment credentials. The publication works without that worker.
