<script setup lang="ts">
const route = useRoute();
</script>
<template>
	<main>
		<Sidebar />
		<article>
			<va-navbar color="primary" class="navbar">
				<template #left>
					<va-navbar-item class="logo">
						<Logo />
					</va-navbar-item>
					<va-navbar-item class="page-title">{{ String(route.meta.title).replace(/\<id\>/g, () =>
						route.params.id.toString()) }}</va-navbar-item>
				</template>
				<template #right>
					<va-navbar-item>
						<va-icon name="account_circle" class="account-icon" />
					</va-navbar-item>
				</template>
			</va-navbar>
			<slot />
		</article>
	</main>
</template>

<style lang="scss">
.account-icon {
	cursor: pointer;
}

.page-title {
	font-weight: bold;
	display: flex;
	align-items: center;
}

.navbar {
	width: 100%;
	--va-navbar-padding-y: 1rem;
}

main {
	display: flex;
}

article {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
}

.va-card__title {
	font-size: 1.25rem !important;
	text-transform: initial !important;
}
</style>
