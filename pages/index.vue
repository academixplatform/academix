<script lang="ts" setup>
const handleClick = async () => {
	const { data: text } = await useFetch("/api/foo");
	alert(text.value);
};
</script>
<template>
	<Sidebar />
	<va-button @click="handleClick()">Button</va-button>
</template>
