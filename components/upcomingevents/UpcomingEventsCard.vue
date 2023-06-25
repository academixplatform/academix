<template>
	<va-card>
		<va-card-title>Upcoming Calendar Events</va-card-title>
		<va-card-content>
			<va-data-table :items="events" :columns="columns"> </va-data-table>
			<a>Open Calendar</a>
		</va-card-content>
	</va-card>
</template>

<script setup>
const events = [
	{
		id: "EVENT-1",
		title: "No School",
		description: "Non-instructional day",
		startingDate: new Date("December 17, 1995 08:00:00").toDateString(),
		endingDate: new Date("December 17, 1995 23:00:00").toDateString(),
	},
];

const columns = [{ key: "title" }, { key: "description" }, { key: "startingDate" }, { key: "endingDate" }];
</script>

<style></style>
