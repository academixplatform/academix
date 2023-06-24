<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const clazz = route.params.id;
</script>

<template>
	<h1>Class: {{ clazz }}</h1>
</template>
