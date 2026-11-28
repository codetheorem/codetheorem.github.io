export type NavLink = { href: string; label: string };
export const NAV_LINKS: NavLink[] = [
	{ href: "/writing/", label: "Writing" },
	{ href: "/projects/", label: "Projects" },
	{ href: "/books/", label: "Books" },
	{ href: "/library/", label: "Reading library" },
	{ href: "/worklogs/", label: "Worklogs" },
	{ href: "/philosophy/", label: "Philosophy" },
	{ href: "/about/", label: "About" },
];
export function findNavLabel(segment: string): string | undefined {
	if (segment === "blog") return "Writing";
	if (segment === "weekly") return "Weekly archive";
	return NAV_LINKS.find((link) => link.href === `/${segment}/`)?.label;
}
