<script lang="ts" setup>
const tab = ref(0);
definePageMeta({
	title: "Current Schedule",
});

import type { UserCourseModel, CourseModel } from "~/server/db/sequelize";

const classes = (await $fetch(`/api/userclass/0`)) as (typeof UserCourseModel & { course: typeof CourseModel })[];

const toClasses = (semester: number) => {
	const list = classes.filter(x => x.semester === semester);
	return [1, 2, 3, 4].map(x => {
		const found = list.find(y => y.block === x);
		if (found !== undefined) return { ...found.course, teacher: found.course.teacher.name };
		return { block: x, id: "-", room: "-", name: "Spare Block", teacher: "-" };
	});
};

const courses = [toClasses(1), toClasses(2)];
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
					<va-button v-if="value !== '-'" size="small" @click="router.push(`/classes/${value}`)">
						See Info
					</va-button>
				</template></va-data-table
			>
		</va-card>
	</MainContainer>
</template>

<style scoped>
.semester-selector {
	width: 100%;
}
</style>
