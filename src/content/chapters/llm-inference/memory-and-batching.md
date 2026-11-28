---
title: "Memory is part of the execution model"
description: "Separate weights, sequence state, and temporary work before reasoning about batch size."
book: llm-inference
order: 2
pubDate: 2026-11-27
category: LLM inference
tags: [Memory, Batching, Inference]
---
The model's weight file is not its complete serving memory budget. A request also needs state, and the runtime needs space for temporary computation. Those parts have different lifetimes.

## Weights and sequence state

Weights persist across requests. A sequence's attention state depends on its tokens and grows as generation extends the sequence. Temporary activations and workspaces depend on execution choices.

For a simplified transformer with ordinary key/value caching, a rough KV memory estimate is:

$$
M_{KV}=2 L B S H_{KV} d_h b.
$$

Here, $L$ is the number of cached layers, $B$ the number of sequences with the same assumed length, $S$ that length, $H_{KV}$ the number of key/value heads, $d_h$ the head dimension, and $b$ bytes per stored value. The factor of two counts keys and values.

This is an explanatory model, not an allocator specification. Padding, block allocation, metadata, sliding windows, shared prefixes, and other model state can change actual memory use. With variable sequence lengths, summing their lengths is more useful than assuming every sequence has the same $S$.

## Batching changes the work available

Several active sequences provide more work to execute together. That can improve utilization, but every admitted sequence also carries state. The resource limiting admission may be the space needed for future output rather than just the space occupied at the moment the request arrives.

Throughput and latency are different goals. Waiting to form a larger batch may improve completed tokens per second while delaying an individual request. A scheduler must decide which trade-off serves its workload.

## Allocation is not arithmetic

Two runtimes can perform similar model operations and still differ because of allocation, fragmentation, and state reuse. The [PagedAttention paper](https://arxiv.org/abs/2309.06180) examines serving efficiency through KV memory management. It is a useful example of why an inference engine's data structures belong in its performance explanation.

That paper does not establish the behavior of every model or serving stack. A local measurement still needs a named model, runtime version, hardware configuration, and workload.

## The useful first inventory

Before changing kernels, I would record four quantities: resident weights, state per active sequence, temporary workspace, and unallocated headroom. Then I would vary context length and concurrency independently.

A failed allocation at a longer context is not necessarily evidence of slow arithmetic. A throughput plateau at a larger batch is not necessarily a memory-capacity problem. The inventory narrows the explanation without pretending that one number explains the whole machine.

The next step is to [design a measurement](/books/llm-inference/measuring-a-serving-system/) that can distinguish these possibilities.
