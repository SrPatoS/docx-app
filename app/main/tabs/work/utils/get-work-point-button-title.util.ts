import { WorkStatus } from "@/app/main/tabs/work/work";

export default function getWorkPointButtonTitleUtil(status: WorkStatus): { title: string, enabled: boolean } {
	let enabled: boolean = true;

	const statusMap: Record<WorkStatus, string> = {
		[WorkStatus.WaitingStart]: "Bater Ponto",
		[WorkStatus.Started]: "Iniciar Almoço",
		[WorkStatus.LunchStarted]: "Finalizar Almoço",
		[WorkStatus.LunchFinished]: "Finalizar Ponto",
		[WorkStatus.Finished]: "Expediente Finalizado"
	};

	if (status === WorkStatus.Finished) {
		enabled = false;
	}

	return {
		title: statusMap[status] || "Ação Desconhecida",
		enabled: enabled
	};
}
