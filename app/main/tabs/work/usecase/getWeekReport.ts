import api from "@/axios/axios";

export class GetWeekReport {
	async handler() {
		const response = await api.get("/work-report/week-report");
		return response.data.data;
	}
}