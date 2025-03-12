import api from "@/axios/axios";

export interface IWorkWeek {
    domingo: DaySchedule;
    segunda: DaySchedule;
    terca: DaySchedule;
    quarta: DaySchedule;
    quinta: DaySchedule;
    sexta: DaySchedule;
    sabado: DaySchedule;
}

export interface DaySchedule {
    start: string;
    lunchStart: string;
    lunchEnd: string;
    end: string;
}

export class GetWorkWeekData {
    async handle(): Promise<IWorkWeek[]> {
        const response = await api.get("/week");
        return response.data.data;
    }
}