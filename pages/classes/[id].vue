<script setup lang="ts">
import { useRoute } from "vue-router";
import { percentageToGrade } from "../../utils/gradeScale";

const route = useRoute();
const clazz = route.params.id;
const classData = {
	id: "ABC-1234",
	title: "Literary Studies 10",
	description: "This is a description.",
	teacherName: "Mr. Abc",
	image: undefined,
};
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
const totalMarks = data.reduce((l, c) => l + c.marks, 0) / data.reduce((l, c) => l + c.maxMarks, 0);
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
		<header class="class-header">
			<div
				class="header-content"
				:style="{
					backgroundImage: `linear-gradient(90deg, #000e, #000c 50%, transparent), url(${
						classData.image ?? 'https://cdn.pixabay.com/photo/2017/02/24/02/37/classroom-2093744_1280.jpg'
					})`,
				}"
			>
				<p>
					<em>{{ classData.title }}</em> - {{ clazz }}
				</p>
			</div>
		</header>
		<va-card class="class-content" stripe stripe-color="primary">
			<va-tabs v-model="tab" class="section-selector">
				<template #tabs>
					<va-tab v-for="tab in ['Information', 'Assignments', 'Marks', 'Teacher', 'Message Board']" :key="tab">
						{{ tab }}
					</va-tab>
				</template>
			</va-tabs>
			<article v-if="tab === 0">
				{{ classData.description }}
			</article>
			<article v-if="tab === 2" class="marks-article">
				<va-progress-circle :model-value="totalMarks * 100" :thickness="0.2" :size="256" class="percentage-circle">
					{{ percentageToGrade(totalMarks * 100) }}
				</va-progress-circle>
				<va-card stripe stripe-color="secondary">
					
				</va-card>
			</article>
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
				v-if="tab === 1"
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
								(
									(data.reduce((l, c) => l + c.marks, 0) / data.reduce((l, c) => l + c.maxMarks, 0)) *
									100
								).toFixed(1) + "%"
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
		</va-card>
	</MainContainer>
</template>

<style lang="scss">
.class-header {
	width: 100%;
	height: 12rem;
	background-color: black;
	margin-bottom: 1rem;
	border-top-right-radius: var(--va-card-border-radius);
	border-top-left-radius: var(--va-card-border-radius);
}
.header-content {
	display: flex;
	height: 100%;
	width: 100%;
	padding: 1rem 1.5rem;
	display: flex;
	align-items: flex-end;
	font-size: 2.5rem;
	color: white;
}
.class-content {
	padding: 0.5rem;
	article {
		padding: 0.5rem;
		padding-top: 1rem;
	}
}
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
em {
	font-weight: bold;
}
.percentage-circle .va-progress-circle__info {
	font-size: 80px;
	font-weight: bold;
}
</style>
