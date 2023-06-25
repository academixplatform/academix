<script setup lang="ts">
defineProps<{ enabled: boolean }>();
defineEmits<{ "update:enabled": boolean }>();
const enabled = computed({
	get() {
		return props.enabled;
	},
	set(value) {
		emit("update:enabled", value);
	},
});
</script>

<style></style>

<template>
	<va-modal :model="enabled">
		<div id="teacher-modal-header">
			<h2>Teacher Name</h2>
		</div>
		<div>
			<p>Email: aoeu@example.com</p>
			<p>Phone: ansteaohusnh</p>
		</div>
	</va-modal>
</template>
