import { VanillaComponents } from "@flavorly/vanilla-components";

export default defineNuxtPlugin(nuxtApp => {
	// You can also override the default options here
	nuxtApp.vueApp.use(VanillaComponents, {});
});
