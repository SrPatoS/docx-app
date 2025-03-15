import api from "@/axios/axios";
import { WorkStatus } from "@/app/main/tabs/work/work";

export interface ICurrentStatus {
	current: WorkStatus;
	next: WorkStatus;
}

export class GetCurrentStatus {
	async getCurrentStatus(): Promise<ICurrentStatus> {
		const response = await api.get("/work-report/current-status");
		return response.data.data;
	}
}