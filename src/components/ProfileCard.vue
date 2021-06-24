<template>
	<div>
		<h4 class="mb-3">{{ name }} - {{ email }}</h4>
		<h5>Name : {{ name }}</h5>
		<h5>Email : {{ email }}</h5>
		<div class="d-grid gap-2 col-6 mx-auto">
			<button class="btn btn-dark shadow-none mt-3" @click="logoutUser">Logout</button>
		</div>
	</div>
</template>

<script>
import ApiService from "../api/ApiService";
import swal from "sweetalert";
import progress from "nprogress";
export default {
	props: {
		email: String,
		name: String
	},
	methods: {
		async logoutUser() {
			progress.start();
			try {
				const response = await ApiService.logoutUser(localStorage.getItem("keeptoken"));
				swal({ title: "Success", text: response.message, timer: 1000 });

				setTimeout(() => {
					this.$router.push({ name: "Home" });
				}, 1500);
			} catch (err) {
				if (!err.data.error) return swal("Error", "Unable to logout", "error");
				swal("Error", err.data.error, "error");
			}
			progress.done();
		}
	}
};
</script>

<style lang="scss" scoped>
h4 {
	font-weight: 700;
}
</style>
