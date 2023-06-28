<script lang="ts" setup>
import type { UserCourseModel, CourseModel } from "~/server/db/sequelize";

const classes = (await $fetch(`/api/userclass/0`)) as (typeof UserCourseModel & { course: typeof CourseModel })[];
</script>
<template>
	<va-card class="class-list" stripe stripe-color="secondary">
		<va-card-title class="class-title">Current Classes</va-card-title>
		<div class="current-classes">
			<ClassCard
				v-for="item in classes.filter(x => x.semester === 1)"
				:key="item.course.id"
				:id="item.course.id"
				:title="item.course.name"
				:image="item.course.image"
				:teacher="{
					name: item.course.teacher.name,
					email: item.course.teacher.email,
					phone: item.course.teacher.phone,
					profilePicture: null,
				}"
			>
			</ClassCard>
		</div>
	</va-card>
</template>

<style scoped>
.current-classes {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	min-width: 0;
}
.class-list {
	flex-basis: 100%;
	padding: 12px;
}
</style>
