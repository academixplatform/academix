<template>
	<main>
		<Sidebar />
		<article>
			<slot />
		</article>
	</main>
</template>

<style lang="scss">
main {
	display: flex;
}
article {
	display: flex;
	flex-direction: column;
}
</style>
