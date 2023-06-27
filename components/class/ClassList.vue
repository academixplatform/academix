<script lang="ts" setup>
const classes = [
	{ id: "ABC-1234", title: "Lorem 10", teacherName: "Mr. Abc" },
	{ id: "DEF-2345", title: "Ipsum 11", teacherName: "Mr. Deffg" },
	{ id: "EFG-4555", title: "Abcdef 10", teacherName: "Mr. Hijkl" },
	{ id: "AAA-1111", title: "Workplace Math 10", teacherName: "Mr. Doe" },
];
</script>
<template>
	<va-card class="class-list" stripe stripe-color="secondary">
		<va-card-title class="class-title">Current Classes</va-card-title>
		<div class="current-classes">
			<ClassCard
				v-for="item in classes"
				:key="item.id"
				:id="item.id"
				:title="item.title"
				:teacher="{
					name: item.teacherName,
					email: 'jbiden@sd40.bc.ca',
					phone: '(111) 111-1111',
					profilePicture: null,
				}"
			>
			</ClassCard>
		</div>
	</va-card>
</template>

<style scoped>
.current-classes {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	min-width: 0;
}
.class-list {
	flex-basis: 80%;
	padding: 12px;
}
</style>
