import api from "@/axios/axios";

interface IReport {
    date: Date;
    observation?: string;
}

export interface IWorkReport {
    startWork?: IReport;
    startLunch?: IReport;
    endLunch?: IReport;
    endWork?: IReport;
}

export class MarkPointUseCase {
    async handle(data: Partial<IWorkReport>) {
        const response = await api.post("/work-report/markpoint", data);
        return response;
    }
}