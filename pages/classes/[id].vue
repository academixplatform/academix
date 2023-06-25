<script setup lang="ts">
import { useRoute } from "vue-router";
import { percentageToGrade } from "../../utils/gradeScale";

const route = useRoute();
const clazz = route.params.id;
const data = [
	{
		date: "2023-05-10",
		assignment: "Triangle Classification Worksheet",
		marks: 20,
		maxMarks: 27,
		percentage: "86.5%",
	},
	{
		date: "2023-04-30",
		assignment: "Unit Test 2",
		marks: 50,
		maxMarks: 100,
		percentage: "50.0%",
	},
	{
		date: "2023-05-06",
		assignment: "Final Exam",
		marks: 30,
		maxMarks: 37,
		percentage: "82.2%",
	},
	{
		date: "2023-01-06",
		assignment: "Unit Test 1",
		marks: 3,
		maxMarks: 55,
		percentage: "7.4%",
	},
];
const initialSortBy = ref("date");
const initialSortingOrder = ref("asc" as const);
</script>

<template>
	<h1>Class: {{ clazz }}</h1>
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
		:items="data"
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
						((data.reduce((l, c) => l + c.marks, 0) / data.reduce((l, c) => l + c.maxMarks, 0)) * 100).toFixed(1) +
						"%"
					}}
					({{ percentageToGrade((data.reduce((l, c) => l + c.marks, 0) / data.reduce((l, c) => l + c.maxMarks, 0)) * 100)

					}})
				</td>
			</tr>
		</template>
	</va-data-table>
</template>

<style>
h1 {
	font-size: 100px;
}
.total-row {
	font-weight: bold;
}
</style>
