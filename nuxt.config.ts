// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	typescript: {
		strict: true,
	},
	postcss: {
		plugins: {
			autoprefixer: {},
		},
	},
	modules: ["@vuestic/nuxt", "@sidebase/nuxt-auth"],
	nitro: {
		esbuild: {
			options: {
				target: "esnext",
			},
		},
		moduleSideEffects: ["reflect-metadata"],
	},
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	]
});
