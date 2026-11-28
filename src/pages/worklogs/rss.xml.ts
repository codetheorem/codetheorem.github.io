import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { SITE_TITLE } from "../../consts";
import { getWeeklyHref, formatWeeklyTitle } from "../../utils/weekly";
export async function GET(context: APIContext) {
	const [notes, weekly] = await Promise.all([
		getCollection("worklogs", (p) => !p.data.draft),
		getCollection("weekly", (p) => !p.data.draft),
	]);
	const items = [
		...notes.map((p) => ({
			title: p.data.title,
			description: p.data.description,
			pubDate: p.data.pubDate,
			link: `/worklogs/${p.id}/`,
		})),
		...weekly.map((p) => ({
			title: formatWeeklyTitle(p.data),
			description: p.data.description,
			pubDate: p.data.date,
			link: getWeeklyHref(p.data),
		})),
	].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
	return rss({
		title: `${SITE_TITLE} — Worklogs`,
		description: "Experiments and engineering progress.",
		site: context.site!,
		items,
	});
}
