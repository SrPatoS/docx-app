import api from "@/axios/axios";

export interface IWorkWeek {
	day: string;
	start: string;
	end: string;
	lunchStart: string;
	lunchEnd: string;
}

export interface DaySchedule {
	start: string;
	lunchStart: string;
	lunchEnd: string;
	end: string;
}

export class GetWorkWeekData {
	async handle(): Promise<IWorkWeek[]> {
		const response = await api.get("/work-week/get-by-user");
		return response.data.data;
	}
}