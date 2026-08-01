import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const dateLabelsSchema = z
	.object({
		published: z.string().optional(),
		updated: z.string().optional(),
		page: z.string().optional(),
	})
	.optional();

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			breadcrumbTitle: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			dateLabels: dateLabelsSchema,
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
			dateLabels: dateLabelsSchema,
			image: image().optional(),
		}),
});

const philosophy = defineCollection({
	loader: glob({ base: "./src/content/philosophy", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			breadcrumbTitle: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			dateLabels: dateLabelsSchema,
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
			draft: z.boolean().optional().default(false),
		}),
});

export const collections = { blog, pages, philosophy, weekly };
