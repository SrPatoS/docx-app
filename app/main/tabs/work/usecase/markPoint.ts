import api from "@/axios/axios";
import { WorkStatus } from "@/app/main/tabs/work/work";

interface ICreateWorkReport {
	status: WorkStatus;
	observation: string;
}

export class MarkPointUseCase {
	async handle(data: ICreateWorkReport) {
		const response = await api.post("/work-report", data);
		return response;
	}
}