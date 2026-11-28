---
title: FerrumLM
description: "A Rust LLM inference research direction, focused on execution, memory, and the path from weights to tokens."
kind: Research direction
status: Scope and study notes
topics: [Rust, LLM inference, Memory systems]
order: 2
featured: true
updatedDate: 2026-11-27
---
## The question

What does it take to make a language model produce tokens without hiding the execution behind a framework? FerrumLM is the name for my independent Rust inference-engine direction.

This page records its intended scope. It does not claim a working runtime, supported models, GPU kernels, or performance results.

## Intended scope

The useful starting boundary is small: a model representation, tensor operations, tokenization, and a correct autoregressive loop. Cache ownership and memory layout matter before throughput optimizations can be understood.

A later comparison could study prefill separately from decode, measure allocation and memory traffic, and compare a reference path with optimized execution. Each step would need correctness checks on the same model and inputs.

## Study questions

- Which data must remain resident between decoding steps?
- Where does Rust's ownership model help make execution state explicit?
- Which measurements separate arithmetic cost from memory movement?
- What is the smallest reference implementation worth trusting?

The [LLM inference notes](/books/llm-inference/) cover the underlying concepts. They are educational material, not a report of completed FerrumLM milestones.
