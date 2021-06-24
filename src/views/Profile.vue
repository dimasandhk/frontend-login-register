<template>
	<div class="profile-page mt-5">
		<div class="container text-light text-center">
			<h3>Profile Page</h3>
			<div class="box-profile rounded mt-4" v-if="!isEmpty">
				<ProfileCard
					v-for="user of profile"
					:key="user._id"
					:name="user.name"
					:email="user.email"
				/>
			</div>
			<div class="spinner-border text-light mt-3" role="status" v-else>
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";
import ApiService from "../api/ApiService";
import progress from "nprogress";

export default {
	data: () => ({
		profile: []
	}),
	computed: {
		isEmpty() {
			if (!Object.keys(this.profile).length) return true;
			return false;
		}
	},
	async created() {
		progress.start();
		this.profile = [];

		const profile = await ApiService.getProfile(localStorage.getItem("keeptoken"));
		this.profile.push(profile);
		progress.done();
	},
	components: { ProfileCard }
};
</script>

<style lang="scss" scoped>
.profile-page {
	.box-profile {
		background-color: #2a2e37;
		padding: 30px 15px;
	}
	h3 {
		font-weight: 800;
	}
}
</style>
