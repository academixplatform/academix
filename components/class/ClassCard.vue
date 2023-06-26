<script setup lang="ts">
import TeacherInfoModal from "../floatable/TeacherInfoModal.vue";
const props = defineProps<{
	id: string;
	title: string;
	image?: string;
	teacher: {
		name: string;
		email: string;
		phone: string;
		profilePicture: any;
	};
}>();

const showTeacherModal = ref(false);

const router = useRouter();
</script>
<template>
	<div class="card-container">
		<va-card class="class-card" @click="router.push(`/classes/${props.id}`)" stripe stripe-color="primary">
			<va-card-title class="class-title">{{ title }}</va-card-title>
			<va-image
				:src="image ?? 'https://cdn.pixabay.com/photo/2017/02/24/02/37/classroom-2093744_1280.jpg'"
				class="class-image"
			/>
		</va-card>
	</div>
</template>

<style>
.card-container {
	cursor: pointer;
}
.card-container:hover {
	transform: rotate(1deg);
}
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

.card-container {
	padding: 0.5rem;
	flex-basis: 25%;
	flex-shrink: 0;
	max-width: 300px;
}

.class-card:hover {
	background-color: "lightgrey" !important;
}
</style>
