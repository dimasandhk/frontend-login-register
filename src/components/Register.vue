<template>
	<div class="register-page">
		<div class="container">
			<div class="box-register text-white rounded">
				<h2 class="text-center">Register</h2>
				<div class="row justify-content-center">
					<div class="col-12 col-md-12 col-lg-8">
						<form @submit="createNewUser">
							<label for="name" class="form-label text-left">Name</label>
							<input type="text" id="name" class="form-control shadow-none" v-model="name" />
							<label for="email" class="form-label text-left mt-2">Email</label>
							<input type="email" id="email" class="form-control shadow-none" v-model="email" />
							<label for="pass" class="form-label text-left mt-2">Password</label>
							<input type="password" id="pass" class="form-control shadow-none" v-model="pass" />
							<button
								class="btn btn-dark mt-3 shadow-none"
								type="submit"
								:disabled="!name || !email || !pass"
							>
								Register
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
		name: "",
		email: "",
		pass: "",
		fetched: false
	}),
	watch: {
		fetched: {
			handler(value) {
				if (value) {
					this.resetValue();
					swal({
						title: "Created",
						text: "Successfully created an account"
					});
				}
			}
		}
	},
	methods: {
		async createNewUser(e) {
			progress.start();
			e.preventDefault();
			try {
				await ApiService.createUser(this.name, this.email, this.pass);
				this.fetched = true;
			} catch (err) {
				if (!err.data.message) return swal("Error!", "Email already registered", "error");
				swal("Error!", err.data.message, "error");
				this.fetched = true;
			}
			progress.done();
		},
		resetValue() {
			this.name = "";
			this.email = "";
			this.pass = "";
			this.fetched = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.box-register {
	h2 {
		font-weight: 700;
	}
	background-color: #2a2e37;
	padding: 30px 15px;
}
</style>
