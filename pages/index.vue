<script lang="ts" setup>
const handleClick = async () => {
	const { data: text } = await useFetch("/api/foo");
	alert(text.value);
};
const items = [
	{ id: 1, title: "Card 1", description: "This is the description for Card 1", teacherName: "Mr. Doe" },
	{ id: 2, title: "Card 2", description: "This is the description for Card 2", teacherName: "Mr. Doe" },
	{ id: 3, title: "Card 3", description: "This is the description for Card 3", teacherName: "Mr. Doe" },
	{ id: 4, title: "Card 4", description: "This is the description for Card 4", teacherName: "Mr. Doe" },
];
</script>
<template>
	<MainContainer>
		<va-button @click="handleClick()">Button</va-button>

		<div class="card-columns">
			<ClassCard v-for="item in items" :key="item.id" :title="item.title" :description="item.description" :teacherName="item.teacherName" />
		</div>
	</MainContainer>
</template>

<style scoped>
.card-columns {
	display: flex;
	gap: 1rem;
}
</style>
