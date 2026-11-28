import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
const dates = z
	.object({
		published: z.string().optional(),
		updated: z.string().optional(),
		page: z.string().optional(),
	})
	.optional();
const editorial = {
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	category: z.string().default("Engineering"),
	tags: z.array(z.string()).default([]),
	series: z.string().optional(),
	seriesOrder: z.number().int().positive().optional(),
	featured: z.boolean().default(false),
	draft: z.boolean().default(false),
	breadcrumbTitle: z.string().optional(),
	dateLabels: dates,
};
const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) => z.object({ ...editorial, image: image().optional() }),
});
const philosophy = defineCollection({
	loader: glob({ base: "./src/content/philosophy", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			...editorial,
			category: z.string().default("Philosophy"),
			image: image().optional(),
		}),
});
const pages = defineCollection({
	loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			breadcrumbTitle: z.string().optional(),
			date: z.coerce.date().optional(),
			dateLabel: z.string().optional(),
			dateLabels: dates,
			image: image().optional(),
		}),
});
const weekly = defineCollection({
	loader: glob({ base: "./src/content/weekly", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			description: z.string(),
			date: z.coerce.date(),
			week: z.number().int().min(1).max(53),
			dateRange: z.string().optional(),
			image: image().optional(),
			draft: z.boolean().default(false),
		}),
});
const projects = defineCollection({
	loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		kind: z.enum([
			"Professional project",
			"Independent prototype",
			"Research direction",
			"Future plan",
		]),
		status: z.string(),
		topics: z.array(z.string()),
		order: z.number(),
		featured: z.boolean().default(false),
		updatedDate: z.coerce.date(),
	}),
});
const books = defineCollection({
	loader: glob({ base: "./src/content/books", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		status: z.enum(["Working manuscript", "Complete"]),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
	}),
});
const chapters = defineCollection({
	loader: glob({ base: "./src/content/chapters", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		...editorial,
		book: z.string(),
		order: z.number().int().positive(),
	}),
});
const library = defineCollection({
	loader: glob({ base: "./src/content/library", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		url: z.string().url(),
		author: z.string(),
		kind: z.enum(["Paper", "Engineering blog", "Book", "Documentation"]),
		tags: z.array(z.string()),
		pubDate: z.coerce.date(),
	}),
});
const worklogs = defineCollection({
	loader: glob({ base: "./src/content/worklogs", pattern: "**/*.{md,mdx}" }),
	schema: z.object({ ...editorial, category: z.string().default("Worklog") }),
});
export const collections = {
	blog,
	philosophy,
	pages,
	weekly,
	projects,
	books,
	chapters,
	library,
	worklogs,
};
