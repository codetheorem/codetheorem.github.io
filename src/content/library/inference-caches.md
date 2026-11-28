---
title: "How inference caching works"
description: "A concrete account of keys, values, and the state reused during autoregressive generation."
url: "https://huggingface.co/docs/transformers/main/en/cache_explanation"
author: "Hugging Face"
kind: "Documentation"
tags: ["LLM inference","Memory"]
pubDate: "2026-11-27"
---

## Why this is on the reading desk

Useful for drawing the boundary between sequence state and a stored answer. Follow what is appended at a decoding step and what remains valid from earlier tokens.

## A question to keep

A question for implementation: who owns the lifetime of a sequence cache, and what state is architecture-specific?
