# Technical fact-check

## Evidence standard

The project is internal. No proprietary implementation, Git history, or raw experiment data was inspected. Project statements are bounded by the author's sanitized engineering background (**S1**, indexed in `references.md`). External documentation explains general mechanisms, not Tokenomics implementation.

| Article claim or element | Supporting source | Treatment and limit |
| --- | --- | --- |
| The author built Tokenomics to centralize LLM optimization decisions | S1 §§1–2 | First-person account; no invented development chronology |
| Work covered gateway, routing, context optimization, caching, skills, escalation, and instrumentation | S1 §1 | Broad responsibilities only; no undocumented algorithms |
| The interface is OpenAI-compatible and aims to reduce adoption changes | S1 §1 and §3, request ingestion | Objective and interface, not a complete SDK/parameter compatibility guarantee |
| Repeated instructions, history, tools, and unnecessary model capability motivated the work | S1 §2 | Reported motivations, without customer incidents or traffic claims |
| Lifecycle order depends on configuration | S1 §3 opening | Explicitly called conceptual; diagram is not a fixed pipeline or call graph |
| Information preservation is a primary optimization constraint | S1 §§3–4 | Compression examples are original and not actual internal prompts |
| Routing and escalation can erase initial savings | S1 §4 and §7 | Original simplified expected-cost derivation; assumptions stated |
| Baseline recording and request-level instrumentation were areas of work | S1 §5 | Listed measurement dimensions only; no disclosed schema or dashboard |
| Fingerprinting and hashing were explored | S1 §5 | Not described as a deployed detection service |
| Shadow-mode experiments were explored | S1 §5 | Not described as proven production rollout infrastructure |
| Internal experiments examined multiple techniques and quality | S1 §6 | Methodology discussed; no exact results, sample sizes, or claimed savings |
| Future work includes learned routing, adaptive compression, budgeting, agent context, and serving integration | S1 §8 | Explicitly future opportunities |
| Autoregressive inference uses preceding context and commonly caches keys and values | P1 | General inference explanation, not Tokenomics internals |
| Provider prompt reuse and inference prefix reuse differ from response caching | P1–P3 and explanatory taxonomy | External ownership boundaries; no assertion that all cache modes are enabled |
| Expanded skill references can retain the same provider-visible token count | Original reasoning; S1 §§3, 5 for work area | Conditional explanation, no claimed product-specific compression mechanism |
| Cache keys need relevant context, versions, permissions, and external-state validity | Original design analysis | Requirements, not evidence of implemented keying or tenant isolation |
| Streaming and side effects complicate retries | Original design analysis | General gateway failure modes, explicitly not Tokenomics implementation claims |
| Constrained optimization equation | Original mathematical formulation; S1 §4 | Engineering objective only; no deployed solver or enforced thresholds asserted |
| Proposed evaluation criteria and datasets | S1 §6 for evaluation areas; original proposed methodology | Wording distinguishes reported experiments from what the author would measure |
| All request traces, code, diagrams, and prices | Original illustrative material | Conceptual, independently written, and explicitly labeled synthetic |

## Arithmetic checks

Reproducible command: `node blog/tokenomics/assets/illustrative-calculations.mjs`.

| Synthetic claim | Derivation |
| --- | --- |
| Uncached request costs $0.016 | `(6000 × 2 + 500 × 8) / 1,000,000` |
| Eight calls cost $0.128 | `8 × 0.016` |
| Ten thousand eight-call workflows cost $1,280 | `10,000 × 8 × 0.016` |
| Cached-prefix scenario costs $0.010 | `(2000 × 2 + 4000 × 0.5 + 500 × 8) / 1,000,000` |
| Shorter uncached request costs $0.012 | `(4000 × 2 + 500 × 8) / 1,000,000` |
| Escalation break-even fraction is below 0.8 | `1 − (0.001 + 0.003) / 0.020` |
| Expected routed cost is $0.010 at an escalation fraction of 0.3 | `0.001 + 0.003 + 0.3 × 0.020` |
| Added time is 15 ms | `35 − 20` |

These values are created for the article. They do not encode internal performance, real provider prices, customer volumes, or predicted Tokenomics savings. Cost-per-success also requires measured task outcomes; the illustrative cost calculations do not establish improved quality.

## Deliberately omitted

Exact internal benchmarks and savings percentages; raw traces; internal source snippets and paths; provider deployment details; thresholds, cache keys, and isolation claims; specific compression algorithms; historical failures and design alternatives presented as events; exact implementation ordering; release or production-readiness claims.

## Remaining limitations

This is an author-based conceptual engineering account, not a repository audit or independent benchmark report. A paragraph about a requirement does not establish that the product fully implements that requirement. Descriptive captions and explicit caveats preserve that distinction in the public version.
