<script setup>
const props = defineProps({
	title: String,
	description: String,
	imgLink: String,
    teacherName: String,
});
</script>

<template>
	<va-card>
		<va-card-title class="class-title">{{ title }}</va-card-title>
        <va-card-content>{{ teacherName }}</va-card-content>
		<va-image
			:src="imgLink ?? 'https://cdn.pixabay.com/photo/2017/02/24/02/37/classroom-2093744_1280.jpg'"
			class="class-image"
		/>
		<va-card-content>{{ description }}</va-card-content>
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
</style>
