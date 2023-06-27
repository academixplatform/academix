<template>
	<va-card class="assignments-card" stripe stripe-color="secondary">
		<va-card-title>Pending Assignments</va-card-title>
		<va-card-content>
			<va-data-table :columns="columns" :items="assignments">
				<template #cell(name)="{ value }">
					<p class="boldname">{{ value }}</p>
				</template>

				<template #cell(tag)="{ value }">
					<va-chip :style="{ backgroundColor: getTagColor(value) }" v-if="value" size="small">
						{{ value }}
					</va-chip>
				</template>
			</va-data-table>
		</va-card-content>
	</va-card>
</template>

<script setup>
const columns = [
	{ key: "name", sortable: true },
	{ key: "class", sortable: true },
	{ key: "due", sortable: true },
	{ key: "tag", sortable: true },
];

const assignments = [
	{ name: "Animal Farm Essay", class: "Literary Studies 10", due: new Date("December 20, 1995 08:00:00"), tag: "Important" },
]
	.map(x => ({
		...x,
		due: dateTimeFormat.format(x.due),
	}))
	.sort((a, b) => a - b);

const getTagColor = tagValue => {
	{
		Important: "#ff5454";
	}
	[tagValue] ?? "lightgrey";
};
</script>

<style>
.boldname {
	font-weight: bold !important;
}
</style>
