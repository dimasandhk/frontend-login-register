import axios from "redaxios";

export default class {
	static async createUser(name, email, password) {
		await (await axios.post("/api/user", { name, email, password })).data;
	}

	static async loginUser(email, password) {
		const user = await (await axios.post("/api/user/login", { email, password })).data;
		return user;
	}

	static async getProfile(token) {
		const profile = await (await axios.get("/api/user/me", { headers: { Authorization: token } }))
			.data;

		return profile;
	}

	static async logoutUser(token) {
		const response = await (
			await axios.post("/api/user/logout", {}, { headers: { Authorization: token } })
		).data;

		return response;
	}
}
