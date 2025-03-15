import { Text, View, Image, ScrollView, Alert } from "react-native";
import { styles } from "./styles";
import { StatusBarThemed } from "@/components/Themed";
import { DateUtils } from "@/core/utils/date.utils";
import { useEffect, useState } from "react";
import { TableComponent } from "@/components/TableComponent";
import CustomButton from "@/components/CustomButton";
import { FindUserUseCase } from "@/core/utils/finduser.usecase";
import { IUser } from "@/app/interfaces/user.interface";
import { GetWorkWeekData, IWorkWeek } from "./usecase/getWorkWeekData";
import { MarkPointUseCase } from "./usecase/markPoint";
import { GetCurrentStatus, ICurrentStatus } from "@/app/main/tabs/work/usecase/getCurrentStatus";
import { getWorkPointButtonTitleUtil } from "@/app/main/tabs/work/utils/get-work-point-button-title.util";
import { GetWeekReport } from "@/app/main/tabs/work/usecase/getWeekReport";

export enum WorkStatus {
	WaitingStart = "waitingStart",
	Started = "started",
	Finished = "finished",
	LunchStarted = "lunchStarted",
	LunchFinished = "lunchFinished",
}

const columns = [
	{
		title: "Dia",
		key: "day"
	},
	{
		title: "Entrada",
		key: "start"
	},
	{
		title: "Almoço",
		key: "lunchStart"
	},
	{
		title: "Almoço",
		key: "lunchEnd"
	},
	{
		title: "Saída",
		key: "end"
	}
];

export default function Work() {
	const [dayName, setDayName] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<IUser | null>(null);
	const [currentTime, setCurrentTime] = useState<string>("");
	const [workWeekData, setWorkWeekData] = useState<IWorkWeek[]>([]);
	const [currentStatus, setCurrentStatus] = useState<ICurrentStatus | null>(null);
	const [currentButtonStatus, setCurrentButtonStatus] = useState<{ title: string, enabled: boolean }>({
		title: "",
		enabled: false
	});
	const [workWeekDataReport, setWorkWeekDataReport] = useState<IWorkWeek[]>([]);

	useEffect(() => {
		getUserData();
		getWorkWeekData();
		getCurrentStatus();
		getWeekReport();
		const interval = setInterval(() => {
			setDayName(DateUtils.getDayName());
			setCurrentTime(DateUtils.getCurrentTime());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	async function getUserData() {
		const findUser = new FindUserUseCase();
		const result = await findUser.handle();
		setUser(result);
	}

	async function getWorkWeekData() {
		const useCase = new GetWorkWeekData();
		const result = await useCase.handle();
		setWorkWeekData(result);
	}

	async function getCurrentStatus() {
		setLoading(true);
		const useCase = new GetCurrentStatus();
		const result = await useCase.getCurrentStatus();
		setCurrentStatus(result);
		setCurrentButtonStatus(getWorkPointButtonTitleUtil(result.current));
		setLoading(false);
	}

	async function getWeekReport() {
		const useCase = new GetWeekReport();
		const result = await useCase.handler();
		setWorkWeekDataReport(result);
	}

	async function markPoint() {
		setLoading(true);
		const usecase = new MarkPointUseCase();

		const result = await usecase.handle({
			status: currentStatus!.next,
			observation: ""
		});

		if (result.status === 200) {
			Alert.alert(
				"Ponto batido com sucesso!",
				"Você pode conferir o seu ponto no histórico de pontos!"
			);

			await Promise.all([
				getWeekReport(),
				getCurrentStatus()
			]);

			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<StatusBarThemed setPrimaryBackgroundColor={true} />
			<View style={styles.topCard}>
				<Text style={styles.dayName}>{dayName}</Text>
				<Text style={styles.hourName}>{currentTime}</Text>
			</View>
			<ScrollView style={{ width: "100%" }}>
				<View style={{ width: "100%", alignItems: "center" }}>
					<View style={styles.infoContainer}>
						<Image style={styles.imageProfile} src={user?.avatar}></Image>
						<View>
							<Text style={styles.profileName}>{user?.name}</Text>
							<Text style={styles.profileCode}>Email: {user?.email}</Text>
						</View>
					</View>
				</View>
				<View style={styles.markContainer}>
					<CustomButton
						title={currentButtonStatus.title}
						loading={loading}
						onPress={markPoint}
						disabled={!currentButtonStatus.enabled}
					/>
				</View>
				<View style={styles.weekReport}>
					<Text style={styles.titleChart}>Programação de Horários</Text>
					<TableComponent
						items={workWeekData}
						numberOfItemsPerPage={6}
						columns={columns}
					/>
				</View>
				<View style={styles.weekReport}>
					<Text style={styles.titleChart}>Relatório Semanal</Text>
					<TableComponent
						items={workWeekDataReport}
						numberOfItemsPerPage={6}
						columns={columns}
					/>
				</View>
			</ScrollView>
		</View>
	);
}