/** @param {string} value */
export function normalize(value) {
	return value
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}
/** @param {Array<{title:string,description:string,text:string,tags:string[],category:string,series?:string,scope:string}>} items
 * @param {{q?:string,category?:string,tag?:string,series?:string,scope?:string}} filters */
export function searchItems(items, filters = {}) {
	const terms = normalize(filters.q ?? "")
		.trim()
		.split(/\s+/)
		.filter(Boolean);
	return items
		.map((item, index) => ({ item, index }))
		.filter(({ item }) => {
			if (
				filters.scope &&
				filters.scope !== "all" &&
				item.scope !== filters.scope
			)
				return false;
			if (filters.category && item.category !== filters.category) return false;
			if (filters.tag && !item.tags.includes(filters.tag)) return false;
			if (filters.series && item.series !== filters.series) return false;
			const text = normalize(
				[item.title, item.description, item.text, ...item.tags].join(" "),
			);
			return terms.every((term) => text.includes(term));
		})
		.map(({ item, index }) => ({
			item,
			index,
			score: terms.reduce(
				(sum, term) =>
					sum +
					(normalize(item.title).includes(term) ? 10 : 0) +
					(normalize(item.description).includes(term) ? 3 : 0),
				0,
			),
		}))
		.sort((a, b) => b.score - a.score || a.index - b.index)
		.map(({ item }) => item);
}
/** @param {string} text @param {string} query */
export function excerpt(text, query) {
	const term = normalize(query).trim().split(/\s+/)[0];
	const index = term ? normalize(text).indexOf(term) : -1;
	const start = index > 80 ? index - 60 : 0;
	return `${start ? "…" : ""}${text.slice(start, start + 230)}${text.length > start + 230 ? "…" : ""}`;
}
