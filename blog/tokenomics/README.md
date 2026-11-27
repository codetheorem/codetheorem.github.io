# Tokenomics engineering article

The article is complete and integrated into Astro at `/blog/how-i-built-tokenomics/`. It is based on the author's sanitized engineering background, not access to the internal implementation. No internal code or benchmark data is included.

## Read and edit

- [Public article](article-public.md): approximately 4,400 words, with portable Markdown images.
- [Article](article.md): identical public-safe manuscript; no private expanded edition is retained.
- [LinkedIn post](linkedin-post.md) and [executive summary](executive-summary.md).
- [Technical fact-check](technical-fact-check.md): claims mapped to the supplied background, public documentation, or original derivations.
- [Confidentiality review](confidentiality-review.md) and [references](references.md).
- [Working brief](working-brief.md): scope updated for an internal product.

The website manuscript is `src/content/blog/how-i-built-tokenomics.mdx`. It uses `EngineeringDiagram.astro` and `EngineeringTable.astro` for keyboard-accessible horizontal scrolling on narrow screens. The Markdown manuscripts use ordinary relative image links.

## Illustrations

`diagrams/` contains eight original conceptual SVGs with matching Mermaid sources. Published copies live in `public/images/tokenomics/`. These are views of responsibilities and design principles; they are not implementation or deployment diagrams.

Regenerate the SVGs and Mermaid sources from the project root:

```sh
node blog/tokenomics/assets/generate-diagrams.mjs
```

Reproduce the synthetic arithmetic:

```sh
node blog/tokenomics/assets/illustrative-calculations.mjs
```

No provider calls, internal samples, real prices, or paid benchmarks are needed. See [charts/README.md](charts/README.md) for why there are no measured benchmark plots.

## Editorial boundaries

The background confirms work on gateway architecture, routing, context optimization, caching strategies, skills-aware processing, escalation/fallback, and instrumentation. It describes fingerprinting and shadow mode as explored. Learned routers, adaptive compression, predictive budgeting, workflow-wide optimization, and serving integration remain future directions.

Exact routing rules, compression algorithms, cache modes and keys, isolation implementation, streaming behavior, deployment layout, historical incidents, and release chronology are not established and are not presented as product facts.

The article is integrated into the site. Pushing to `main` triggers the existing GitHub Pages deployment workflow.
