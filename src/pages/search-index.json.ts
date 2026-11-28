import { getCollection } from "astro:content";
import {
	getWriting,
	plainText,
	writingHref,
	shortDate,
} from "../utils/publication";
import { getWeeklyHref, formatWeeklyTitle } from "../utils/weekly";
export async function GET() {
	const [writing, projects, books, chapters, library, worklogs, weekly, pages] =
		await Promise.all([
			getWriting(),
			getCollection("projects"),
			getCollection("books"),
			getCollection("chapters", (p) => !p.data.draft),
			getCollection("library"),
			getCollection("worklogs", (p) => !p.data.draft),
			getCollection("weekly", (p) => !p.data.draft),
			getCollection("pages"),
		]);
	const items = [
		...writing.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: writingHref(p),
			tags: p.data.tags,
			category: p.data.category,
			series: p.data.series,
			scope: "writing",
			date: shortDate(p.data.pubDate),
		})),
		...projects.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: `/projects/${p.id}/`,
			tags: p.data.topics,
			category: p.data.kind,
			scope: "projects",
			date: p.data.status,
		})),
		...books.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: `/books/${p.id}/`,
			tags: p.data.tags,
			category: "Book",
			scope: "books",
			date: p.data.status,
		})),
		...chapters.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: `/books/${p.id}/`,
			tags: p.data.tags,
			category: "Chapter",
			scope: "books",
			date: shortDate(p.data.pubDate),
		})),
		...library.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: `/library/${p.id}/`,
			tags: p.data.tags,
			category: p.data.kind,
			scope: "library",
			date: p.data.author,
		})),
		...worklogs.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: `/worklogs/${p.id}/`,
			tags: p.data.tags,
			category: "Worklog",
			scope: "worklogs",
			date: shortDate(p.data.pubDate),
		})),
		...weekly.map((p) => ({
			title: formatWeeklyTitle(p.data),
			description: p.data.description,
			text: plainText(p.body ?? ""),
			href: getWeeklyHref(p.data),
			tags: [],
			category: "Weekly archive",
			scope: "worklogs",
			date: shortDate(p.data.date),
		})),
		...pages.map((p) => ({
			title: p.data.title,
			description: p.data.description ?? "",
			text: plainText(p.body ?? ""),
			href: `/${p.id}/`,
			tags: [],
			category: "About",
			scope: "pages",
			date: "",
		})),
	];
	return new Response(JSON.stringify(items), {
		headers: { "Content-Type": "application/json; charset=utf-8" },
	});
}
