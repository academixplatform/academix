<script lang="ts" setup>
const props = defineProps<{
	current: string;
}>();
// See https://mui.com/material-ui/material-icons/ for icon list
const sidebarItems = [
	{ name: "Home", icon: "home" },
	{ name: "Classes", icon: "class" },
];
</script>

<template>
	<va-sidebar minimized minimized-width="64px" class="sidebar">
		<va-sidebar-item class="card" v-for="item in sidebarItems" :key="item.name" :active="current === item.name">
			<va-sidebar-item-content>
				<va-icon :name="item.icon" />
				<va-sidebar-item-title>{{ item.name }}</va-sidebar-item-title>
			</va-sidebar-item-content>
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
