import { AxiosResponse } from "axios";
import api from "@/axios/axios";
import { Event } from "@/core/event/event";

export class AxiosCloud {
	public static Instance: AxiosCloud;

	constructor() {
		if (!AxiosCloud.Instance) {
			AxiosCloud.Instance = this;
		}
	}

	async get<T>(url: string): Promise<{ data: T }> {
		try {
			return (await api.get(url)).data;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Event.Instance.emit("redirect-login");
			}
			throw error;
		}
	}

	async post<T>(data: any, url: string): Promise<{ data: T }> {
		try {
			return (await api.post(url, data)).data;
		} catch (error: any) {
			if (error.response && error.response.status === 401) {
				Event.Instance.emit("redirect-login");
			}
			throw error;
		}
	}
}
