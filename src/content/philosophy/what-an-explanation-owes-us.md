---
title: What an explanation owes us
description: "Reproducing an outcome, predicting it, and explaining it are different achievements."
pubDate: 2026-11-27
category: Philosophy
tags: [Explanation, Knowledge, Systems]
---
A program produces the expected result. That establishes something useful: under the conditions of the test, this execution agreed with an expectation. It does not establish that we understand why the result occurred.

The distinction matters because successful reproduction can imitate understanding. I can run a command copied from a tutorial and obtain the intended output. I may still be unable to predict what happens when a flag changes, identify the relevant dependency, or explain why the procedure fails on another machine.

## Three different achievements

Reproduction answers whether a procedure can produce an outcome again. Prediction concerns what will happen in conditions not yet observed. Explanation concerns which features of a situation make the outcome intelligible.

These achievements support each other, but none should silently stand in for the others. A statistical association may predict well without identifying a mechanism. A mechanistic account may explain a small case while being too expensive to use for a large prediction. A reproduced failure may remain unexplained.

In engineering, I find a useful test is to ask which changes an explanation lets me reason about. If I say a service is slow because it has many requests, have I explained anything? Only if the account identifies a capacity limit, a queue, or another relationship through which the load produces the delay.

## A good explanation excludes possibilities

An explanation becomes useful when it distinguishes the actual result from plausible alternatives. Why did this request wait while another did not? Why did adding resources fail to help? Which observation would make the proposed cause less credible?

This is a demand for specificity. An account that accommodates every possible outcome has little power to guide a decision. If a cache is credited for every speedup and blamed for every slowdown without an account of hits, invalidation, and memory pressure, the word is doing more work than the explanation.

The same difficulty appears outside software. Naming a motive does not establish that it caused an action. Attaching a category to an event does not explain the processes that produced it. Explanation has to connect its terms to evidence rather than rely on the familiarity of its vocabulary.

## Understanding has a scope

A complete account of every dependency is not a realistic requirement. Useful explanations omit things. A queueing model can ignore the details of a CPU instruction and still help reason about waiting time. The omission is justified by the question being asked, not by the omitted detail being unreal.

This makes scope part of the explanation. What assumptions allow the model to work? Which changes would invalidate it? Where should someone stop trusting its predictions?

I would rather have an account that makes these limits explicit than one that sounds universal. Knowing where an explanation stops is part of knowing what it explains.

## The responsibility of a technical account

A technical article should let a reader inspect more than its conclusion. It should expose the assumptions, show a concrete case, and distinguish evidence from interpretation. Code examples help when they make a mechanism visible; they are less useful when their presence merely lends authority to a claim.

Understanding is therefore not just possession of a correct statement. It is an ability to move between a statement, its conditions, and the consequences of changing those conditions. That is the standard I want to bring to both building systems and writing about them.
