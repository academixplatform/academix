<script setup lang="ts">
const events = [
	{
		id: "EVENT-1",
		title: "No School",
		description: "Non-instructional day",
		startingDate: new Date("December 17, 1995 08:00:00"),
		endingDate: new Date("December 17, 1995 23:00:00"),
	},
]
	.map(x => ({
		...x,
		startingDate: dateTimeFormat.format(x.startingDate),
		endingDate: dateTimeFormat.format(x.endingDate),
	}))
	.sort((x, y) => +x.startingDate - +y.startingDate);

const columns = [
	{ key: "title", sortable: true },
	{ key: "startingDate", sortable: true },
	{ key: "endingDate", sortable: true },
];
</script>

<template>
	<va-card class="upcoming-events-card">
		<va-card-title>Upcoming Calendar Events</va-card-title>
		<va-card-content>
			<va-data-table :items="events" :columns="columns">
				<template #cell(title)="{ value }">
					<p class="boldname">{{ value }}</p>
				</template>
			</va-data-table>
		</va-card-content>
	</va-card>
</template>

<style>
.boldname {
	font-weight: bold;
}
</style>
