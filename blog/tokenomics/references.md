# References and source boundaries

## Author-supplied material

**S1 — Tokenomics — Engineering Background for the Blog**, supplied in this conversation on November 27, 2026. This is the primary source for the author's project experience. It is not independently audited implementation evidence and is not republished verbatim.

Section mapping:

1. Purpose, areas of work, gateway interface, and adoption objective.
2. Motivation and recurring inefficiencies.
3. Conceptual request lifecycle and policy-dependent ordering.
4. Correctness trade-offs and cost per successfully completed task.
5. Baseline recording, instrumentation, fingerprinting and shadow-mode exploration.
6. Evaluation areas and prohibition on internal benchmark disclosure.
7. Engineering lessons.
8. Future opportunities.
9. Confidentiality boundaries.
10. Title, audience, first-person voice, and editorial thesis.

**S2 — [Shared writing brief](https://chatgpt.com/s/t_6b09b9e9e3908191999b822b9fa983fd).** Used for the deliverable structure and topic coverage. It is not evidence of implemented functionality. Repository-inspection requirements were replaced by S1's instructions for a conceptual account of an internal product.

The earlier résumé source is not used to substantiate public implementation or benchmark claims. Its exact figures and local path have been removed from the working package.

## Public technical references

**P1 — [Hugging Face Transformers: How caching works](https://huggingface.co/docs/transformers/main/en/cache_explanation).** Supports the explanation of autoregressive generation and inference KV state. It does not document Tokenomics.

**P2 — [OpenAI: Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching).** Supports provider-managed input reuse and provider-specific usage accounting. No current prices, retention settings, or product-specific rules are asserted in the article.

**P3 — [vLLM: Automatic Prefix Caching](https://docs.vllm.ai/en/latest/features/automatic_prefix_caching/).** Supports shared-prefix KV reuse and the distinction from answer caching. It does not imply Tokenomics runs vLLM or implements inference kernels.

Public references checked on November 27, 2026. Provider behavior may change; the article intentionally avoids operational configuration instructions.

## Original explanatory material

All diagrams, pseudocode, request examples, and arithmetic were created for this article. `assets/illustrative-calculations.mjs` reproduces the numerical examples. They are not reverse-engineered internal artifacts, measured project results, real prices, or estimates of internal traffic.
