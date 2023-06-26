<script setup lang="ts">
const props = defineProps(["enabled", "teacher"]);
const emit = defineEmits(["disabled"]);

const modal = ref(null);
const enabledRef = toRef(() => props.enabled);
const localEnable = ref(false);

watch(enabledRef, newVal => {
	localEnable.value = newVal;
});

watch(localEnable, newVal => {
	if (!newVal) {
		emit("disabled");
	}
});
/*const props = defineProps<{ enabled: boolean }>();
const emit = defineEmits<{ "update:enabled": [boolean] }>();
const enabled = computed({
	get() {
		return props.enabled;
	},
	set(value) {
		emit("update:enabled", value);
	},
});*/
</script>

<style>
.teacher-modal-name {
	font-weight: bold;
}

#teacher-modal-profilepicture {
	border-radius: 20%;
	width: 4em;
	height: 4m;
	float: right;
}

#teacher-modal-header {
	margin-bottom: 50px;
}
</style>

<template>
	<va-modal ref="modal" v-model="localEnable" cancel-text="">
		<div id="teacher-modal-header">
			<img
				id="teacher-modal-profilepicture"
				:src="
					teacher.profilePicture ??
					'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
				"
			/>
			<h2 class="teacher-modal-name">{{ teacher.name }}</h2>
		</div>
		<div>
			<p>
				Email: <a :href="`mailto:${teacher.email}`">{{ teacher.email }}</a>
			</p>
			<p>Phone: {{ teacher.phone }}</p>
		</div>
	</va-modal>
</template>
