<script lang="ts" setup>
import { Button } from "@flavorly/vanilla-components";
const handleClick = async () => {
	const { data: text } = await useFetch("/api/foo");
	alert(text.value);
};
</script>
<template>
	<Button label="Press this to instantly die" variant="primary" @click="handleClick()" />
</template>
