import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";

import ApiService from "../api/ApiService";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/profile",
		name: "Profile Page",
		component: Profile
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) => {
	if (to.name == "Profile Page") {
		const kpToken = localStorage.getItem("keeptoken");
		if (!kpToken) return next("/");
		try {
			await ApiService.getProfile(kpToken);
		} catch (err) {
			return next("/");
		}
	}

	if (to.name == "Home") {
		const kpToken = localStorage.getItem("keeptoken");

		if (kpToken) {
			try {
				await ApiService.getProfile(kpToken);
				return next("/profile");
			} catch (err) {
				return next();
			}
		}
	}

	next();
});

export default router;
