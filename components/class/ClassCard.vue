<script setup lang="ts">
import TeacherInfoModal from "../floatable/TeacherInfoModal.vue";
const props = defineProps<{
	id: string;
	title: string;
	description: string;
	image?: string;
	teacher: {
		name: string;
		email: string;
		phone: string;
	};
}>();

const showTeacherModal = ref(false);

const router = useRouter();
</script>
<template>
	<TeacherInfoModal :teacher="teacher" :enabled="showTeacherModal" @disabled="showTeacherModal = false"> </TeacherInfoModal>
	<va-card>
		<va-card-title class="class-title">{{ title }}</va-card-title>
		<va-card-content class="class-teacher" @click="showTeacherModal = true">{{ teacher.name }}</va-card-content>
		<va-image
			:src="image ?? 'https://cdn.pixabay.com/photo/2017/02/24/02/37/classroom-2093744_1280.jpg'"
			class="class-image"
		/>
		<va-card-content>{{ description }}</va-card-content>
		<va-card-actions align="center">
			<va-button @click="router.push(`/classes/${props.id}`)">View</va-button>
		</va-card-actions>
	</va-card>
</template>

<style>
.class-title {
	font-size: 2em !important;
	color: black;
}

.class-image {
	max-height: 200px;
}

.class-teacher:hover {
	color: lightblue;
}

.class-teacher {
	color: black;
	cursor: default;
	user-select: none;
}
</style>
