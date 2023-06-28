export default defineNuxtRouteMiddleware((to, from) => {
	const auth = useCookie("auth");
	if (!to.path.includes("/login") && +(auth.value ?? -1) !== 0) return navigateTo("/login?prev=" + encodeURIComponent(to.fullPath));
});
