<script setup lang="ts">
const route = useRoute();
</script>
<template>
	<main>
		<Sidebar />
		<article>
			<va-navbar color="primary" class="navbar">
				<template #left>
					<va-navbar-item class="logo">Academix</va-navbar-item>
					<va-navbar-item>{{ String(route.meta.title).replace(/\<id\>/g, () => route.params.id.toString()) }}</va-navbar-item>
				</template>
				<template #right>
					<va-navbar-item>idk</va-navbar-item>
					<va-navbar-item>
						<va-icon name="mi-warning" />
					</va-navbar-item>
				</template>
			</va-navbar>
			<slot />
		</article>
	</main>
</template>

<style lang="scss" scoped>
.navbar {
	width: 100%;
}
main {
	display: flex;
}
article {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}
</style>
