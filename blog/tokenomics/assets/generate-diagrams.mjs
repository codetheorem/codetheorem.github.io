import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Original conceptual illustrations. No internal layout or source is reproduced.
const root = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"../../..",
);
const output = path.join(root, "blog/tokenomics/diagrams");
const publicOutput = path.join(root, "public/images/tokenomics");
fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(publicOutput, { recursive: true });
const ink = "#252b27",
	blue = "#34594c",
	pink = "#934d36";
const escape = (s) =>
	s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
function text(x, y, lines, size = 19, color = ink, weight = 400) {
	return `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? 26 : 0}">${escape(line)}</tspan>`).join("")}</text>`;
}
function box(x, y, w, h, title, lines = [], accent = blue) {
	return `<rect x="${x + 4}" y="${y + 4}" width="${w}" height="${h}" fill="${accent}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#efebe2" stroke="${ink}" stroke-width="2"/>${text(x + 16, y + 30, [title], 20, ink, 700)}${text(x + 16, y + 60, lines, 17)}`;
}
function link(x1, y1, x2, y2) {
	return `<path d="M${x1},${y1} L${x2},${y2}" fill="none" stroke="${blue}" stroke-width="2.5" marker-end="url(#arrow)"/>`;
}
function save(slug, title, subtitle, content, mermaid) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500" role="img" aria-labelledby="title desc"><title id="title">${escape(title)}</title><desc id="desc">${escape(subtitle)}</desc><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="${blue}" stroke-width="1.5"/></marker></defs><rect width="800" height="500" fill="#f6f3ec"/><g font-family="Arial, Helvetica, sans-serif">${text(30, 42, [title], 27, ink, 700)}${text(30, 73, [subtitle], 16, "#66695f")}${content}${text(30, 478, ["CONCEPTUAL · ORIGINAL ILLUSTRATION · NOT AN INTERNAL SYSTEM DIAGRAM"], 11, "#66695f")}</g></svg>\n`;
	fs.writeFileSync(path.join(output, `${slug}.svg`), svg);
	fs.writeFileSync(path.join(publicOutput, `${slug}.svg`), svg);
	fs.writeFileSync(
		path.join(output, `${slug}.mmd`),
		`%% Conceptual public illustration; not implementation-derived.\n${mermaid}\n`,
	);
}
save(
	"gateway",
	"Where the gateway fits",
	"Separate application behavior from shared resource policies.",
	text(30, 121, ["DIRECT CALL"], 14, blue, 700) +
		box(30, 145, 275, 80, "Application", ["Business logic + model decisions"]) +
		link(315, 185, 485, 185) +
		box(495, 145, 270, 80, "Model provider", ["Execute request"]) +
		text(30, 278, ["GATEWAY BOUNDARY"], 14, blue, 700) +
		box(30, 305, 190, 105, "Application", ["Business logic"]) +
		link(230, 355, 265, 355) +
		box(275, 305, 240, 105, "Tokenomics", [
			"Policy + optimization",
			"Measurement",
		]) +
		link(525, 355, 560, 355) +
		box(570, 305, 195, 105, "Model tier", ["Execute request"]),
	`flowchart LR\n subgraph Direct\n A[Application] --> P[Provider]\n end\n subgraph Gateway_boundary\n B[Application] --> G[Tokenomics policies and measurement] --> M[Model tier]\n end`,
);
save(
	"lifecycle",
	"A request, viewed by responsibility",
	"Policy configuration determines ordering and eligible transformations.",
	box(30, 110, 340, 105, "Ingest + analyze", [
		"Messages, tools, settings",
		"Identify request structure",
	]) +
		link(380, 160, 420, 160) +
		box(430, 110, 340, 105, "Apply eligible policies", [
			"Context and skills processing",
			"Consider valid reuse",
		]) +
		link(600, 225, 600, 265) +
		box(430, 275, 340, 105, "Route + execute", [
			"Eligible model tier",
			"Escalation / fallback policy",
		]) +
		link(420, 325, 380, 325) +
		box(30, 275, 340, 105, "Return + account", [
			"Response and attempts",
			"Tokens, cost, time, outcomes",
		]) +
		text(
			30,
			432,
			["Measurement spans the request; this is not a fixed call graph."],
			19,
			blue,
		),
	`flowchart TD\n A[Ingest and analyze] --> B[Eligible context, skills, and reuse policies]\n B --> C[Route and execute]\n C --> D[Return and account]\n E[Lifecycle measurement] -.-> A\n E -.-> B\n E -.-> C\n E -.-> D`,
);
save(
	"routing",
	"Routing with an escalation budget",
	"A cheaper first attempt is useful only if the whole path is acceptable.",
	box(30, 115, 330, 100, "Establish eligibility", [
		"Task and capability needs",
		"Application constraints",
	]) +
		link(370, 165, 420, 165) +
		box(430, 115, 340, 100, "Choose + execute a tier", [
			"Cost and policy",
			"Low / middle / high capability",
		]) +
		link(600, 225, 600, 270) +
		box(430, 280, 340, 120, "Assess policy outcome", [
			"Accept, fail, or escalate",
			"Quality checks are task-specific",
		]) +
		link(420, 340, 370, 340) +
		box(
			30,
			280,
			330,
			120,
			"Bound another attempt",
			["Money, time, and eligibility", "No unlimited retry chain"],
			pink,
		),
	`flowchart TD\n A[Task and policy constraints] --> B[Eligible model tier]\n B --> C[Execute]\n C --> D[Policy outcome]\n D --> E[Accept or return failure]\n D --> F[Escalate only within budget]\n F --> B`,
);
save(
	"context",
	"Context changes need a preservation rule",
	"The smallest request is not necessarily the correct request.",
	box(30, 110, 340, 115, "Separate request parts", [
		"Instructions, history, evidence",
		"Tool schemas and current task",
	]) +
		link(380, 165, 420, 165) +
		box(
			430,
			110,
			340,
			115,
			"Protect required meaning",
			["Constraints, identifiers, units", "Structure and tool contracts"],
			pink,
		) +
		link(600, 235, 600, 270) +
		box(430, 280, 340, 115, "Propose eligible changes", [
			"Leave protected parts intact",
			"Retain original request",
		]) +
		link(420, 335, 380, 335) +
		box(30, 280, 340, 115, "Compare outcomes", [
			"Quality and instruction adherence",
			"Cost and latency, not length alone",
		]),
	`flowchart TD\n A[Separate request parts] --> B[Protect constraints and structure]\n B --> C[Propose eligible changes]\n C --> D[Check and evaluate against baseline]\n D --> E[Retain or reject candidate]`,
);
save(
	"skills",
	"Reuse structure without hiding input",
	"Skills and fingerprinting: areas of work and exploration.",
	box(30, 110, 340, 110, "Recurring prompt structures", [
		"Identify selected stable content",
		"Explore fingerprints and hashing",
	]) +
		link(380, 165, 420, 165) +
		box(430, 110, 340, 110, "Reusable skill / template", [
			"Manage recurring instructions",
			"Versioning is a design concern",
		]) +
		link(600, 230, 600, 270) +
		box(430, 280, 340, 110, "Resolve model context", [
			"Include required instructions",
			"Count the expanded input",
		]) +
		link(420, 335, 380, 335) +
		box(
			30,
			280,
			340,
			110,
			"Evaluate actual savings",
			[
				"Identifier size is not input size",
				"Reuse does not imply fewer tokens",
			],
			pink,
		),
	`flowchart TD\n A[Recurring prompt structures] --> B[Explore fingerprints and reusable templates]\n B --> C[Resolve required context]\n C --> D[Count provider-visible input]\n D --> E[Evaluate savings and outcomes]`,
);
save(
	"caching",
	"Different caches, different contracts",
	"Ownership boundaries, not a pipeline or enabled-feature checklist.",
	box(30, 110, 740, 90, "Gateway / application response reuse", [
		"Exact or semantic answer reuse requires validity and context checks.",
	]) +
		box(30, 225, 740, 90, "Provider-managed prompt reuse", [
			"Provider rules and usage accounting determine input reuse.",
		]) +
		box(
			30,
			340,
			740,
			90,
			"Inference-engine state reuse",
			["Prefix reuse across requests; KV state during sequence generation."],
			pink,
		),
	`flowchart TD\n A[Cache taxonomy]\n A --- B[Gateway or application: exact / semantic response reuse]\n A --- C[Provider: prompt processing reuse]\n A --- D[Inference engine: prefix state and sequence KV state]`,
);
save(
	"measurement",
	"Evaluate before changing behavior",
	"Compare matched cases and include every paid attempt.",
	box(30, 110, 340, 115, "Record baseline", [
		"Request structure and usage",
		"Cost, latency, task outcomes",
	]) +
		link(380, 165, 420, 165) +
		box(430, 110, 340, 115, "Construct candidate", [
			"Policy change or shadow proposal",
			"Separate from served behavior",
		]) +
		link(600, 235, 600, 270) +
		box(430, 280, 340, 115, "Evaluate matched cases", [
			"Quality, failures, retries",
			"Cache state and policy version",
		]) +
		link(420, 335, 380, 335) +
		box(30, 280, 340, 115, "Compare + decide", [
			"Cost per successful workflow",
			"Retain, revise, or reject",
		]),
	`flowchart LR\n A[Record baseline] --> B[Construct candidate]\n B --> C[Evaluate matched cases]\n C --> D[Compare outcomes and total cost]\n D --> E[Retain, revise, or reject]\n D -.-> B`,
);
save(
	"tradeoffs",
	"Compare costs within acceptable behavior",
	"An engineering objective, not an implemented optimization solver.",
	box(30, 110, 740, 90, "Candidate policies", [
		"Model tier, context changes, reuse, escalation budget",
	]) +
		link(400, 210, 400, 245) +
		box(30, 255, 225, 95, "Quality", ["Task success"], pink) +
		box(285, 255, 225, 95, "Latency", ["Deadline / tail"], pink) +
		box(540, 255, 230, 95, "Reliability", ["Required constraints"], pink) +
		text(
			30,
			416,
			["Among acceptable policies: compare expected workflow cost."],
			21,
			blue,
			700,
		),
	`flowchart TD\n A[Candidate policies] --> B{Meet task success, latency, and reliability constraints?}\n B -->|Yes| C[Compare expected workflow costs]\n B -->|No| D[Reject or revise policy]\n C --> E[Choose and evaluate]`,
);
console.log("Generated eight conceptual SVGs and Mermaid sources.");
