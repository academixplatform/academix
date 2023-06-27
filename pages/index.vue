<script lang="ts" setup>
definePageMeta({
	title: "Home",
});
</script>
<template>
	<MainContainer>
		<div class="cards">
			<ClassList />
			<div class="bottom-cards">
				<div class="upcoming-events">
					<UpcomingEventsCard></UpcomingEventsCard>
				</div>
				<div class="pending-assignments">
					<AssignmentsCard></AssignmentsCard>
				</div>
			</div>
		</div>
	</MainContainer>
</template>

<style scoped>
.cards {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
}

.bottom-cards {
	display: flex;
	flex-wrap: nowrap;
	width: 100%;
	gap: 30px;
}
.bottom-cards > div {
	flex-basis: 100%;
}
</style>
