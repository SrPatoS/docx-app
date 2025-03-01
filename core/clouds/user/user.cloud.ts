import { ICloud } from "@/app/cloud/cloud.interface";
import { AxiosCloud } from "@/core/clouds/axios.cloud";
import { log } from "@/app/_layout";
import { UserDatabase } from "@/database/user.database";

export class UserCloud implements ICloud {
	title = "Usuário";

	async download() {
		const axios = new AxiosCloud();
		const result = (await axios.get("/user")).data.data;
		await UserDatabase.Instance.create(result._id, result.email, result.avatar, result.name);
	}
}