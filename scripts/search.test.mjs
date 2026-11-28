import test from "node:test";
import assert from "node:assert/strict";
import { searchItems, excerpt } from "../src/utils/search.mjs";
const entries = [
	{
		title: "Memory ownership",
		description: "An inference note",
		text: "A cache retains keys and values between tokens.",
		tags: ["Inference"],
		category: "Engineering",
		scope: "writing",
		series: "llm-systems",
	},
	{
		title: "Cache recovery",
		description: "Storage state",
		text: "Crash recovery preserves durable state.",
		tags: ["Storage"],
		category: "Engineering",
		scope: "writing",
	},
	{
		title: "Café notes",
		description: "An annotated book",
		text: "Inference memory and context",
		tags: ["Inference"],
		category: "Book",
		scope: "library",
	},
];
test("full text is searched even when the title does not contain the term", () =>
	assert.equal(
		searchItems(entries, { q: "values" })[0].title,
		"Memory ownership",
	));
test("all words must match; matching is case- and accent-insensitive", () => {
	assert.equal(searchItems(entries, { q: "CAFE" })[0].title, "Café notes");
	assert.equal(searchItems(entries, { q: "memory context" }).length, 1);
	assert.equal(searchItems(entries, { q: "memory durable" }).length, 0);
});
test("scope, category, topic and series intersect rather than silently widening results", () => {
	assert.equal(
		searchItems(entries, {
			scope: "writing",
			tag: "Inference",
			series: "llm-systems",
			category: "Engineering",
		}).length,
		1,
	);
	assert.equal(
		searchItems(entries, { scope: "library", category: "Engineering" }).length,
		0,
	);
});
test("a title match ranks above an equally valid body match", () =>
	assert.equal(
		searchItems(entries, { q: "cache" })[0].title,
		"Cache recovery",
	));
test("clearing filters returns original ordering and empty queries are harmless", () =>
	assert.deepEqual(searchItems(entries, { q: "   " }), entries));
test("long-body excerpts show the match without returning the entire article", () => {
	const value = excerpt(
		"x".repeat(400) + " needle " + "y".repeat(500),
		"needle",
	);
	assert.ok(value.includes("needle"));
	assert.ok(value.length < 240);
});
