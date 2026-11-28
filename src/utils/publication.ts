import { getCollection } from "astro:content";
export function readingTime(body = ""): number {
	return Math.max(
		1,
		Math.ceil(plainText(body).split(/\s+/).filter(Boolean).length / 220),
	);
}
export function plainText(body: string): string {
	return body
		.replace(/^import .*$/gm, "")
		.replace(/^export .*$/gm, "")
		.replace(/<[^>]*>/g, " ")
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
		.replace(/[#*_`~]/g, "")
		.replace(/\s+/g, " ")
		.trim();
}
export const slugify = (value: string) =>
	value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
export async function getWriting() {
	const [blog, philosophy] = await Promise.all([
		getCollection("blog", (p) => !p.data.draft),
		getCollection("philosophy", (p) => !p.data.draft),
	]);
	return [...blog, ...philosophy].sort(
		(a, b) =>
			b.data.pubDate.valueOf() - a.data.pubDate.valueOf() ||
			Number(b.data.featured) - Number(a.data.featured),
	);
}
export function writingHref(entry: { collection: string; id: string }): string {
	return `/${entry.collection === "philosophy" ? "philosophy" : "blog"}/${entry.id}/`;
}
export function shortDate(date: Date): string {
	return new Intl.DateTimeFormat("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "Asia/Kolkata",
	}).format(date);
}
