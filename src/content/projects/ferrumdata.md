---
title: FerrumData
description: "An analytical query execution research direction: columnar batches, operators, and the cost of moving data."
kind: Research direction
status: Scope and study notes
topics: [Database internals, Query execution, Rust]
order: 3
featured: true
updatedDate: 2026-11-27
---
## The question

An SQL query describes a result. An execution engine has to decide how data moves through operators to produce it. FerrumData is my direction for studying that boundary through an analytical query engine.

This is a scope document, not a claim of an implemented SQL frontend, storage format, optimizer, or benchmarked engine.

## Intended scope

A bounded initial design would evaluate typed columnar batches through scan, filter, projection, and aggregation operators. A reference execution path would make it possible to compare results before changing batch size, layout, or dispatch.

Execution and optimization are separate concerns. Choosing a good plan is not useful if the operators implement the wrong semantics. Null handling, numerical behavior, and expression evaluation need explicit contracts.

## Questions worth measuring

- How does batch size change dispatch overhead and locality?
- Where are intermediate values materialized?
- When does an operator become limited by memory bandwidth?
- How should correctness fixtures cover nulls, empty inputs, and aggregation?

I am keeping the intended analytical scope separate from [FerrumDB](/projects/ferrumdb/), which is a future embedded-database plan.
