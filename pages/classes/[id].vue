<script setup lang="ts">
import { useRoute } from "vue-router";
import { percentageToGrade } from "../../utils/gradeScale";

const route = useRoute();
const clazz = route.params.id;
definePageMeta({
	title: "Class Info - <id>",
});
const data = [
	{
		date: "2023-05-10",
		assignment: "Triangle Classification Worksheet",
		marks: 20,
		maxMarks: 27,
	},
	{
		date: "2023-04-30",
		assignment: "Unit Test 2",
		marks: 50,
		maxMarks: 100,
	},
	{
		date: "2023-05-06",
		assignment: "Final Exam",
		marks: 30,
		maxMarks: 37,
	},
	{
		date: "2023-01-06",
		assignment: "Unit Test 1",
		marks: 23,
		maxMarks: 55,
	},
];
const teacher = {
	name: "J. Biden",
	email: "jbiden@sd40.bc.ca",
	phone: "(111) 111-1111",
	profilePicture: null,
};
const initialSortBy = ref("date");
const initialSortingOrder = ref("asc" as const);
const tab = ref(0);
</script>

<template>
	<MainContainer>
		<h1>Class: {{ clazz }}</h1>
		<va-tabs v-model="tab" class="section-selector">
			<template #tabs>
				<va-tab v-for="tab in ['Information', 'Assignments', 'Marks', 'Teacher', 'Message Board']" :key="tab">
					{{ tab }}
				</va-tab>
			</template>
		</va-tabs>
		<article v-if="tab === 3">
			<div id="teacher-modal-header">
				<img
					id="teacher-modal-profilepicture"
					:src="
						teacher.profilePicture ??
						'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
					"
				/>
				<h2 class="teacher-modal-name">{{ teacher.name }}</h2>
			</div>
			<div>
				<p>
					Email: <a :href="`mailto:${teacher.email}`">{{ teacher.email }}</a>
				</p>
				<p>Phone: {{ teacher.phone }}</p>
			</div>
		</article>
		<va-data-table
			:columns="[
		{ key: 'date', sortable: true },
		{ key: 'assignment', sortable: true },
		{ key: 'marks', sortable: true, sortingFn: (a: number, b: number) => a - b },
		{ key: 'maxMarks', sortable: true, label: 'Maximum Marks',
			sortingFn: (a: number, b: number) => a - b, },
		{
			key: 'percentage',
			sortable: true,
			sortingFn: (a: string, b: string) => +a.replace('%', '') - +b.replace('%', ''),
		},
	]"
			:items="data.map(x => ({ ...x, percentage: ((x.marks / x.maxMarks) * 100).toFixed(1) + '%' }))"
			v-model:sort-by="initialSortBy"
			v-model:sorting-order="initialSortingOrder"
		>
			<template #bodyAppend>
				<tr class="va-data-table__table-tr total-row">
					<td class="va-data-table__table-td">-</td>
					<td class="va-data-table__table-td">Total Grade</td>
					<td class="va-data-table__table-td">
						{{ data.reduce((l, c) => l + c.marks, 0) }}
					</td>
					<td class="va-data-table__table-td">
						{{ data.reduce((l, c) => l + c.maxMarks, 0) }}
					</td>
					<td class="va-data-table__table-td">
						{{
							((data.reduce((l, c) => l + c.marks, 0) / data.reduce((l, c) => l + c.maxMarks, 0)) * 100).toFixed(
								1
							) + "%"
						}}
						({{
							percentageToGrade(
								(data.reduce((l, c) => l + c.marks, 0) / data.reduce((l, c) => l + c.maxMarks, 0)) * 100
							)
						}})
					</td>
				</tr>
			</template>
		</va-data-table>
	</MainContainer>
</template>

<style>
.teacher-modal-name {
	font-weight: bold;
}

#teacher-modal-profilepicture {
	border-radius: 20%;
	width: 4em;
	height: 4m;
	float: right;
}

#teacher-modal-header {
	margin-bottom: 50px;
}
.section-selector {
	width: 100%;
}
</style>
