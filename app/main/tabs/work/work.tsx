import { Text, View, Image, ScrollView } from "react-native";
import { styles } from "./styles";
import { StatusBarThemed } from "@/components/Themed";
import { DateUtils } from "@/core/utils/date.utils";
import { ReactNode, useEffect, useState } from "react";
import { TableComponent } from "@/components/TableComponent";
import CustomButton from "@/components/CustomButton";
import { IUser, UserDatabase } from "@/database/user.database";
import { UserData } from "@expo/config/build/getUserState";

const mockProfile = "https://avatars.githubusercontent.com/u/112360235?v=4";

const columns = [
	{
		title: "Dia",
		key: "day"
	},
	{
		title: "Início",
		key: "start"
	},
	{
		title: "Fim",
		key: "end"
	},
	{
		title: "Almoço",
		key: "dinerTime"
	},
	{
		title: "Trabalho",
		key: "workTime"
	}
];

const data = [
	{
		day: "Segunda",
		start: "08:00",
		end: "17:00",
		workTime: "9h",
		dinerTime: "12:00 - 13:00"
	},
	{
		day: "Terça",
		start: "09:00",
		end: "18:00",
		workTime: "9h",
		dinerTime: "12:30 - 13:30"
	},
	{
		day: "Quarta",
		start: "08:30",
		end: "17:30",
		workTime: "9h",
		dinerTime: "12:00 - 13:00"
	},
	{
		day: "Quinta",
		start: "07:00",
		end: "16:00",
		workTime: "9h",
		dinerTime: "11:30 - 12:30"
	},
	{
		day: "Sexta",
		start: "08:00",
		end: "12:00",
		workTime: "4h",
		dinerTime: "—"
	}
];


export default function Work() {
	const [dayName, setDayName] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<IUser | null>(null);

	async function getUserData() {
		const result = await UserDatabase.Instance.read();
		setUser(result);
	}

	useEffect(() => {
		(async () => {
			await getUserData();
		})();

		setDayName(DateUtils.getDayName());
	}, []);

	return (
		<View style={styles.container}>
			<StatusBarThemed setPrimaryBackgroundColor={true} />
			<View style={styles.topCard}>
				<Text style={styles.dayName}>{dayName}</Text>
				<Text style={styles.hourName}>08:00</Text>
			</View>
			<ScrollView style={{ width: "100%" }}>
				<View style={{ width: "100%", alignItems: "center" }}>
					<View style={styles.infoContainer}>
						<Image style={styles.imageProfile} src={user?.avatar ?? mockProfile}></Image>
						<View>
							<Text style={styles.profileName}>{user?.name}</Text>
							<Text style={styles.profileCode}>Email: {user?.email}</Text>
						</View>
					</View>
				</View>
				<View style={styles.weekReport}>
					<TableComponent numberOfItemsPerPage={3} columns={columns} items={data} />
				</View>
				<View style={styles.markContainer}>
					<CustomButton disabled={true} loading={false} title="" onPress={() => setLoading(true)} />
				</View>
			</ScrollView>
		</View>
	);
}