import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
const root = path.resolve("dist");
function files(dir) {
	return fs
		.readdirSync(dir, { withFileTypes: true })
		.flatMap((e) =>
			e.isDirectory()
				? files(path.join(dir, e.name))
				: [path.join(dir, e.name)],
		);
}
const htmlFiles = files(root).filter((f) => f.endsWith(".html"));
const failures = [];
const decode = (s) => s.replaceAll("&amp;", "&");
for (const file of htmlFiles) {
	const html = fs.readFileSync(file, "utf8");
	const relative = path.relative(root, file).replaceAll(path.sep, "/");
	const url = new URL(
		relative === "index.html"
			? "/"
			: "/" + relative.replace(/index\.html$/, ""),
		"https://codetheorem.github.io",
	);
	if (!relative.startsWith("keybinds/")) {
		if ((html.match(/<h1\b/g) || []).length !== 1)
			failures.push(`${relative}: expected one h1`);
		if (!html.includes('id="main-content"'))
			failures.push(`${relative}: missing skip-link target`);
		if (!html.includes('rel="canonical"'))
			failures.push(`${relative}: missing canonical URL`);
	}
	if (html.includes('class="katex-error"'))
		failures.push(`${relative}: invalid equation`);
	const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
	if (new Set(ids).size !== ids.length)
		failures.push(`${relative}: duplicate element IDs`);
	for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
		const raw = decode(m[1]);
		if (/^(?:https?:|mailto:|data:|javascript:)/.test(raw)) continue;
		const target = new URL(raw, url);
		if (target.origin !== url.origin) continue;
		let local = path.join(root, decodeURIComponent(target.pathname));
		if (fs.existsSync(local) && fs.statSync(local).isDirectory())
			local = path.join(local, "index.html");
		if (!fs.existsSync(local)) {
			failures.push(`${relative}: broken local link ${raw}`);
			continue;
		}
		if (target.hash && local.endsWith(".html")) {
			const id = decodeURIComponent(target.hash.slice(1));
			if (!fs.readFileSync(local, "utf8").includes(`id="${id}"`))
				failures.push(`${relative}: missing fragment ${raw}`);
		}
	}
}
const required = [
	"about",
	"writing",
	"projects",
	"books",
	"library",
	"worklogs",
	"philosophy",
	"blog/looped-transformers",
	"blog/how-i-built-tokenomics",
	"blog/why-we-need-distributed-systems",
	"weekly/2026-w31",
];
for (const route of required)
	assert.ok(
		fs.existsSync(path.join(root, route, "index.html")),
		`Missing preserved or required route: ${route}`,
	);
const index = JSON.parse(
	fs.readFileSync(path.join(root, "search-index.json"), "utf8"),
);
assert.ok(
	index.some(
		(p) =>
			p.href === "/blog/how-i-built-tokenomics/" &&
			p.text.includes("escalation"),
	),
	"Featured article missing from full-text index",
);
for (const entry of index) {
	assert.ok(entry.text.length > 0, `Empty indexed text: ${entry.href}`);
	assert.ok(
		fs.existsSync(path.join(root, entry.href, "index.html")),
		`Search points to missing page: ${entry.href}`,
	);
}
for (const feed of ["rss.xml", "worklogs/rss.xml"])
	assert.ok(
		fs.readFileSync(path.join(root, feed), "utf8").includes("<item>"),
		`Empty feed: ${feed}`,
	);
assert.ok(
	fs.existsSync(path.join(root, "sitemap-index.xml")),
	"Missing sitemap",
);
assert.deepEqual(failures, [], failures.join("\n"));
console.log(
	`Checked ${htmlFiles.length} HTML pages, ${index.length} search entries, preserved URLs, feeds, fragments, and assets.`,
);
