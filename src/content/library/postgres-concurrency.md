---
title: "PostgreSQL concurrency control"
description: "The contracts that govern concurrent access, isolation, locking, and retries."
url: "https://www.postgresql.org/docs/current/mvcc.html"
author: "PostgreSQL contributors"
kind: "Documentation"
tags: ["Database internals","Concurrency"]
pubDate: "2026-11-27"
---

## Why this is on the reading desk

Read this as a set of observable application behaviors. An isolation-level name is less informative than the anomalies it permits and the failures an application must handle.

## A question to keep

The reading question is where application-level invariants need more than an individually successful statement.
