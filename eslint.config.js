import js from "@eslint/js";
import astroPlugin from "eslint-plugin-astro";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const astroFlatConfig = astroPlugin.configs?.["flat/recommended"] ?? [];

export default [
	{
		ignores: [
			"dist/**",
			"node_modules/**",
			".astro/**",
			"**/*.d.ts",
			".prettierrc.cjs",
			".venv/**",
		],
	},
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
		},
	},
	js.configs.recommended,
	{
		files: [
			"scripts/**/*.mjs",
			"blog/tokenomics/assets/*.mjs",
			"src/pages/**/*.{js,ts}",
		],
		languageOptions: {
			globals: {
				console: "readonly",
				URL: "readonly",
				Response: "readonly",
				process: "readonly",
				Buffer: "readonly",
			},
		},
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: "module",
			},
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
		},
		rules: {
			...(tsPlugin.configs?.recommended?.rules ?? {}),
		},
	},
	...(Array.isArray(astroFlatConfig) ? astroFlatConfig : [astroFlatConfig]),
];
