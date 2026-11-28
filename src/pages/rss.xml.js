import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { render } from "astro:content";
import rss from "@astrojs/rss";
import { getWriting, writingHref } from "../utils/publication";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
export async function GET(context) {
	const renderers = await loadRenderers([getMDXRenderer()]);
	const container = await AstroContainer.create({ renderers });
	const posts = await getWriting();
	const items = [];
	for (const post of posts) {
		const { Content } = await render(post);
		const content = (await container.renderToString(Content)).replace(
			/(href|src)="\/(?!\/)([^"]*)"/g,
			(_, attribute, value) => `${attribute}="${new URL(value, context.site)}"`,
		);
		items.push({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			categories: post.data.tags,
			link: writingHref(post),
			content,
		});
	}
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items,
		customData: "<language>en</language>",
	});
}
