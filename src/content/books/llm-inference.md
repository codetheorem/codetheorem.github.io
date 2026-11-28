---
title: Notes on LLM Inference
description: "A working manuscript on the computation, memory, and measurements behind generating a token."
status: Working manuscript
pubDate: 2026-11-27
tags: [LLM inference, Systems, Memory]
---
These notes start below the API boundary. The goal is to make the work of generating text concrete: which computation happens, which state survives, and what a timing measurement actually includes.

This is an educational manuscript with three initial chapters. It is not documentation for a completed FerrumLM engine and does not present new benchmark results.

## How to read these notes

Start with the two phases of inference, then follow the memory that remains between steps. The final chapter turns those distinctions into an experiment design. Equations use simplified transformer assumptions; actual implementations have additional state and architecture-specific behavior.

The chapters link to public technical references. Examples and diagrams are original, with synthetic numbers wherever numbers are used.
