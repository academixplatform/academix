<script lang="ts" setup>
const handleClick = async () => {
	const { data: text } = await useFetch("/api/foo");
	alert(text.value);
};
const items = [
	{ id: "ABC-1234", title: "Lorem 10", description: "This is the description for Card 1", teacherName: "Mr. Abc" },
	{ id: "DEF-2345", title: "Ipsum 11", description: "This is the description for Card 2", teacherName: "Mr. Deffg" },
	{ id: "EFG-4555", title: "Abcdef 10", description: "This is the description for Card 3", teacherName: "Mr. Hijkl" },
	{ id: "AAA-1111", title: "Workplace Math 10", description: "This is the description for Card 4", teacherName: "Mr. Doe" },
];
</script>
<template>
	<MainContainer>
		<va-button @click="handleClick()">Button</va-button>
		<div class="card-columns">
			<ClassCard
				v-for="item in items"
				:key="item.id"
				:id="item.id"
				:title="item.title"
				:description="item.description"
				:teacher="{
					name: item.teacherName,
					email: 'jbiden@sd40.bc.ca',
					phone: '(111) 111-1111',
				}"
			>
			</ClassCard>
		</div>
	</MainContainer>
</template>

<style scoped>
.card-columns {
	display: flex;
	gap: 1rem;
}
</style>
