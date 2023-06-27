<script lang="ts" setup>
const tab = ref(0);
definePageMeta({
	title: "Current Schedule",
});
const courses = [
	[
		{
			id: "ABCD-1234",
			name: "Composition 10",
			room: 2033,
			teacher: "Mr. Lorb",
		},
		{
			id: "GEFA-7676",
			name: "Social Studies 10",
			room: 1144,
			teacher: "Ms. Fish",
		},
		{
			id: "FMNE-4443",
			name: "Career Life Education 10",
			room: 3322,
			teacher: "Ms. Bleb",
		},
		{
			id: "FAFJ-3423",
			name: "Composition 10",
			room: 2033,
			teacher: "Mr. Lorb",
		},
	],
	[
		{
			id: "HIJK-1923",
			name: "Precalculus 11",
			room: 3000,
			teacher: "Mr. Crab",
		},
		{
			id: "EKFE-7354",
			name: "Science 10",
			room: 3322,
			teacher: "Ms. Crile",
		},
		{
			id: "DFAA-6765",
			name: "Chemistry 11",
			room: 2003,
			teacher: "Mr. Fiwer",
		},
		{
			id: "-",
			name: "No Class Scheduled",
			room: "-",
			teacher: "-",
		},
	],
];
const router = useRouter();
</script>
<template>
	<MainContainer>
		<va-card stripe>
			<va-card-title>Current Schedule</va-card-title>
			<va-tabs v-model="tab" class="semester-selector">
				<template #tabs>
					<va-tab v-for="tab in ['Semester 1', 'Semester 2']" :key="tab">
						{{ tab }}
					</va-tab>
				</template>
			</va-tabs>
			<va-data-table
				:items="courses[tab].map((x, i) => ({ ...x, block: i + 1 }))"
				:columns="[
					{
						key: 'block',
					},
					{
						key: 'id',
					},
					{
						key: 'name',
					},
					{
						key: 'room',
					},
					{
						key: 'teacher',
					},
					{
						key: 'id',
						name: 'info',
						label: 'info',
					},
				]"
			>
				<template #cell(info)="{ value }">
					<va-button size="small" @click="router.push(`/classes/${value}`)"> See Info </va-button>
				</template></va-data-table
			>
		</va-card>
	</MainContainer>
</template>

<style scoped>
.semester-selector {
	width: 200px;
}
</style>
