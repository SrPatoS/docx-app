import { ICloud } from "@/app/cloud/cloud.interface";
import { AxiosCloud } from "@/core/clouds/axios.cloud";
import { UserDatabase } from "@/database/user.database";

export class UserCloud implements ICloud {
	title = "Usuário";

	async download() {
		const result = (await AxiosCloud.Instance.get<any>("/user")).data;
		await UserDatabase.Instance.create(result._id, result.email, result.avatar, result.name);
	}
}