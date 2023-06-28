<script lang="ts" setup>
import { useForm } from "vuestic-ui";
definePageMeta({
	title: "Login",
});
const { isValid } = useForm("formRef");
const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useCookie("auth");
if (auth.value === "0") router.push("/");
const goToPrev = () => {
	router.push(decodeURIComponent(new URLSearchParams(window.location.search).get("prev") ?? "/"));
};
</script>
<template>
	<MainContainer>
		<va-card stripe class="login-card">
			<va-card-title>Student Login</va-card-title>
			<va-form immediate class="form" ref="formRef">
				<va-input label="Email" v-model="email" name="Login" :rules="[v => Boolean(v) || 'Email is required']" />
				<va-input
					label="Password"
					v-model="password"
					type="password"
					name="Password"
					:rules="[v => Boolean(v) || 'Password is required']"
				/>
				<va-button
					:disabled="!isValid"
					@click="
						auth = '0';
						goToPrev();
					"
				>
					Submit
				</va-button>
			</va-form></va-card
		>
	</MainContainer>
</template>

<style scoped>
.login-card {
	display: flex;
	margin: 0 auto;
	flex-direction: column;
	padding: 1rem 2rem;
	--va-card-padding: 0.5rem;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
