<script lang="ts" setup>
const handleClick = async () => {
	const { data: text } = await useFetch("/api/foo");
	alert(text.value);
};
const items = [
	{ id: 1, title: "Card 1", description: "This is the description for Card 1" },
	{ id: 2, title: "Card 2", description: "This is the description for Card 2" },
	{ id: 3, title: "Card 3", description: "This is the description for Card 3" },
	{ id: 4, title: "Card 4", description: "This is the description for Card 4" },
];
</script>
<template>
	<MainContainer current="Home">
		<va-button @click="handleClick()">Button</va-button>

		<div class="card-columns">
			<va-card class="card" v-for="item in items" :key="item.id">
				<va-card-title>{{ item.title }}</va-card-title>
				<va-card-content>{{ item.description }}</va-card-content>
			</va-card>
		</div>
	</MainContainer>
</template>

<style scoped>
.card-columns {
	column-count: 4;
	column-gap: 1rem;
}
</style>
