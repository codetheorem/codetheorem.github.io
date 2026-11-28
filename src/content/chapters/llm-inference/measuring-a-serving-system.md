---
title: "Measure the request, then the system"
description: "A reproducible inference experiment needs a workload and a timing boundary, not just tokens per second."
book: llm-inference
order: 3
pubDate: 2026-11-27
category: Systems measurement
tags: [Evaluation, Latency, Inference]
---
A performance result is a statement about an experiment. Without the conditions, a number such as tokens per second has too many possible meanings to support a design decision.

## Choose the boundary

A client observes time from sending a request to receiving its response. A model runtime may report only the execution interval. A scheduler sees queueing. An application may include retrieval and tools before the model is called.

These intervals overlap and nest. Adding reported durations can double-count time. Measure the overall critical path directly, then use component timings to explain it.

For a streaming request, useful boundaries include request sent, first token received, and final token received. Time to first token is not the same as total completion time. Neither reveals correctness.

## Define the workload

A minimal experiment description should name prompt-length distribution, output-length distribution, arrival pattern, concurrency, model, tokenizer, precision, runtime, and hardware. Cache policy and warmup behavior matter too.

Use synthetic inputs only when they exercise the behavior under study. Repeating one prompt may accidentally turn a prefill comparison into a prefix-cache comparison. Fixed-length outputs make decoding duration easier to compare but may not represent an application with variable stopping behavior.

## Preserve the failures

Timeouts and rejected requests belong in the result. Dropping them can make a saturated service appear faster because only its successful requests remain in the latency summary.

I would report successful throughput, failure rate, and latency distribution together. The median describes the middle request. A tail percentile helps explain the experience of requests that wait much longer. Small samples make extreme percentiles unstable, so sample size must accompany them.

## Separate correctness from speed

A different runtime configuration can change numerical behavior or outputs. A faster path needs a correctness comparison appropriate to the task, not just a timing comparison.

For deterministic low-level operations, compare against a reference with explicit tolerances. For generated answers, use task-specific criteria and record decoding settings. A semantically plausible answer is not automatically a correct tool call or a successful workflow.

## An experiment worth keeping

The result should leave enough material for another run: configuration, input identifiers, raw measurements, version information, and the calculation used to make the summary. Keep original units and distinguish provider-reported values from local estimates.

These are study notes, not a claim of a completed inference benchmark. They define the evidence I would want before using a benchmark to guide [FerrumLM](/projects/ferrumlm/) or a production gateway.
