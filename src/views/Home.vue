<template>
	<div class="home mt-5">
		<Login v-if="selected == 'login'" />
		<Register v-else />
		<div class="container con-route text-center mt-4">
			<button @click="selected = 'login'" class="btn btn-dark">Login</button> |
			<button @click="selected = 'register'" class="btn btn-dark">Register</button>
		</div>
	</div>
</template>

<script>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
	name: "Home",
	components: { Login, Register },
	data: () => ({
		selected: "register"
	})
};
</script>

<style lang="scss" scoped>
.con-route {
	color: #fff !important;
}
</style>
