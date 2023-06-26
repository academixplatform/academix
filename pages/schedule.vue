<script lang="ts" setup>
const tab = ref(0);
definePageMeta({
	title: "Current Schedule",
});
</script>
<template>
	<MainContainer>
		<va-tabs v-model="tab" class="semester-selector">
			<template #tabs>
				<va-tab v-for="tab in ['Semester 1', 'Semester 2']" :key="tab">
					{{ tab }}
				</va-tab>
			</template>
		</va-tabs>
		{{ tab }}
	</MainContainer>
</template>

<style scoped>
.semester-selector {
	width: 200px;
}
</style>
