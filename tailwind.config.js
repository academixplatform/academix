const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	darkMode: "class",
	content: [
		// Add our default tailwind preset to the content list
		"./node_modules/@flavorly/vanilla-components/dist/presets/tailwind/all.json",
	],
	theme: {
		extend: {
			colors: {
				// Set your primary color
				primary: colors.indigo,
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),

		// Forms plugin is required if you are using the tailwind preset
		require("@tailwindcss/forms"),
	],
};
