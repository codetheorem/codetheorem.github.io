export type SocialLink = {
	label: string;
	href: string;
	icon: "mail" | "github" | "linkedin" | "rss";
	external?: boolean;
};

export const SOCIAL_LINKS: SocialLink[] = [
	{
		label: "Email",
		href: "mailto:hrishikeshagarwalv@gmail.com",
		icon: "mail",
		external: false,
	},
	{
		label: "GitHub",
		href: "https://github.com/codetheorem",
		icon: "github",
		external: true,
	},
	{
		label: "LinkedIn",
		href: "https://linkedin.com/in/hrishikesh-agarwal",
		icon: "linkedin",
		external: true,
	},
	{
		label: "RSS",
		href: "/rss.xml",
		icon: "rss",
		external: false,
	},
];
