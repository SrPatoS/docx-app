import { ICloud } from "@/app/cloud/cloud.interface";
import { AxiosCloud } from "@/core/clouds/axios.cloud";
import { log } from "@/app/_layout";

export class UserCloud implements ICloud {
	title = "Usuário";

	async download() {
		const axios = new AxiosCloud();
		log.debug("Download");
		const result = await axios.get("/user");
	}
}