---
title: FerrumDB
description: "A planned embedded database project for studying pages, indexes, transactions, and recovery."
kind: Future plan
status: Planned; no implementation claimed
topics: [Database internals, Storage, Transactions]
order: 4
featured: false
updatedDate: 2026-11-27
---
## Why this belongs on the map

An analytical execution engine and an embedded transactional database solve different problems. FerrumDB is a future plan to study the latter: what it means for application state to remain understandable and recoverable across process failure.

There is no implemented database or release claimed here.

## Questions for a future design

A useful study would start with page layout, a buffer manager, an index structure, and a deliberately narrow persistence contract. Transactions and recovery would need to be specified before claiming durability.

What survives a crash? Which writes must reach persistent storage together? How is an interrupted update recognized? A database's public promises have to be supported by failure tests, not just successful reads and writes.

## Boundaries

This plan is distinct from [FerrumData](/projects/ferrumdata/). Query execution concerns how a result is computed; storage and recovery concern what state exists after something goes wrong. I want the site to preserve that distinction rather than present one as a completed extension of the other.
