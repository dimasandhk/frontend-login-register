<template>
	<div class="login-page">
		<div class="container">
			<div class="box-login text-white rounded">
				<h2 class="text-center">Login</h2>
				<div class="row justify-content-center">
					<div class="col-12 col-md-12 col-lg-8">
						<form @submit="loginUser">
							<label for="email" class="form-label text-left">Email</label>
							<input type="email" id="email" class="form-control shadow-none" v-model="email" />
							<label for="pass" class="form-label text-left mt-2">Password</label>
							<input type="password" id="pass" class="form-control shadow-none" v-model="pass" />
							<button
								class="btn btn-dark mt-3 shadow-none"
								type="submit"
								:disabled="!email || !pass"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import swal from "sweetalert";
import ApiService from "../api/ApiService";
import progress from "nprogress";
export default {
	data: () => ({
		email: "",
		pass: ""
	}),
	methods: {
		async loginUser(e) {
			e.preventDefault();
			progress.start();
			try {
				const user = await ApiService.loginUser(this.email, this.pass);
				localStorage.setItem("keeptoken", user.token);
				this.$router.push({ name: "Profile Page" });
			} catch (err) {
				if (!err.data.error) return swal("Error!", "Unable to login", "error");
				swal("Error!", err.data.error, "error");
			}
			progress.done();
		}
	}
};
</script>

<style lang="scss" scoped>
.box-login {
	h2 {
		font-weight: 700;
	}
	padding: 30px 15px;
	background-color: #2a2e37;
}
</style>
