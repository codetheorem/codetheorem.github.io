---
title: Turning the site into an engineering publication
description: "Preserving article URLs while adding a clearer content model, project status, and a reading path."
pubDate: 2026-11-27
updatedDate: 2026-11-27
tags: [Publishing, Architecture, Static sites]
---
The starting point was an Astro site with MDX articles, KaTeX, syntax highlighting, RSS, and GitHub Pages deployment. The Tokenomics account was already published at its own blog URL.

## The boundary to preserve

Existing articles remain under `/blog/`. A new `/writing/` page provides topic filters, search, and series discovery. The weekly archive stays under `/weekly/`; `/worklogs/` brings it together with experiment and engineering notes.

This keeps old links useful while letting the navigation express a broader publication.

## Content that makes its status explicit

Project pages distinguish professional work, independent prototypes, research directions, and future plans. Tokenomics is an internal professional project with a sanitized public account. FerrumLM and FerrumData describe research scope; FerrumDB is planned. Those labels are part of the content contract, not a visual embellishment.

## Static by default

Search uses a build-generated index and browser-side matching. Articles, project pages, reading notes, and book chapters are static documents. Mermaid rendering loads on demand. The site does not need a new backend to publish technical work.

## What to inspect when adding content

Check the page at a narrow viewport, including equations, tables, and diagrams. Confirm that a new article appears in the writing index, relevant series, search, and RSS. A successful build is necessary, but a long label or a wide table can still make the reading experience worse.
