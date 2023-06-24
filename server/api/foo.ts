export default defineEventHandler(event => {
	return `abc ${Date.now()}`;
});
