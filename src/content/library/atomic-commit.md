---
title: "Atomic commit in SQLite"
description: "An implementation-oriented account of how database updates survive interruption."
url: "https://www.sqlite.org/atomiccommit.html"
author: "SQLite authors"
kind: "Documentation"
tags: ["Database internals","Reliability"]
pubDate: "2026-11-27"
---

## Why this is on the reading desk

Start with the hardware assumptions, then trace the order in which state changes become durable. The value of the explanation is the connection between a promise and the steps needed to support it.

## A question to keep

For a future embedded-database study, turn each boundary into a failure question: what can be recovered if execution stops here?
