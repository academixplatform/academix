<script lang="ts" setup>
import type { CourseModel, TeacherModel } from "../../server/db/sequelize";

definePageMeta({
	title: "Classes",
});
const router = useRouter();
const classes = (await $fetch("/api/classes")) as (CourseModel & { teacher: TeacherModel })[];
</script>
<template>
	<MainContainer>
		<va-card stripe>
			<va-card-title>Class List</va-card-title>
			<va-data-table
				:items="classes.map((x, i) => ({ ...x, teacher: x.teacher.name }))"
				:columns="[
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
.current-classes {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	margin-bottom: 30px;
	min-width: 0;
}
</style>
