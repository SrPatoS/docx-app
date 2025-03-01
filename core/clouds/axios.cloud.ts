import { AxiosResponse } from "axios";
import api from "@/axios/axios";
import { Event } from "@/core/event/event";

export class AxiosCloud {
	async get(url: string): Promise<AxiosResponse> {
		try {
			return await api.get(url);
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Event.Instance.emit("redirect-login");
				console.log("Usuário não autorizado. Redirecionando para o login.");
			}
			throw error;
		}
	}
}
