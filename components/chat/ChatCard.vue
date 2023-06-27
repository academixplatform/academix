<template>
    <va-card class="chat-card">
		<va-card-title>Chat</va-card-title>
		<va-card-content>
			<va-input v-model="searchValue" placeholder="Search students">

            </va-input>
		</va-card-content>
	</va-card>
</template>

<script setup>
    const searchValue = ref();

</script>

<style>

</style>