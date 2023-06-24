<script lang="ts" setup>
const props = defineProps<{
	current: string;
}>();
</script>

<template>
	<main>
		<Sidebar :current="props.current" />
		<slot></slot>
	</main>
</template>

<style lang="scss">
main {
	display: flex;
}
</style>
