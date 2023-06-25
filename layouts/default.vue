<template>
	<main>
		<Sidebar />
		<article>
			<va-navbar color="primary" shape class="mb-2">
				<template #left>
					<va-navbar-item class="logo">Academix</va-navbar-item>
				</template>
				<template #right>
					<va-navbar-item>idk</va-navbar-item>
					<va-navbar-item>
						<va-icon name="mdi-magnify" />
					</va-navbar-item>
					<va-navbar-item>
						<va-icon name="mdi-account-circle-outline" />
					</va-navbar-item>
				</template>
			</va-navbar>
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
