<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
// See https://mui.com/material-ui/material-icons/ for icon list
const sidebarItems = [
	{ name: "Home", icon: "home", target: "/" },
	{ name: "Schedule", icon: "schedule", target: "/schedule" },
	{ name: "Classes", icon: "class", target: "/classes" },
];
</script>

<template>
	<va-sidebar minimized minimized-width="64px" width="180px" class="sidebar">
		<va-sidebar-item
			v-for="item in sidebarItems"
			@click="router.push(item.target)"
			class="card"
			:key="item.name"
			:active="item.target === route.path.replace(/(?<=.)\/.+/, '')"
		>
			<va-popover placement="right" :message="item.name" :hover-out-timeout="0" :hover-over-timeout="0">
				<va-sidebar-item-content>
					<va-icon :name="item.icon" />
					<va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
				</va-sidebar-item-content>
			</va-popover>
		</va-sidebar-item>
	</va-sidebar>
</template>

<style lang="scss">
.sidebar {
	height: 100%;
}
#__nuxt {
	height: 100vh;
	> div {
		height: 100%;
	}
}
</style>
