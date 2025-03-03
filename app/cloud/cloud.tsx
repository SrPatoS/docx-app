import { View, Text, TouchableOpacity } from "react-native";
import { StatusBarThemed } from "@/components/Themed";
import { styles } from "./styles";
import { ICloud } from "@/app/cloud/cloud.interface";
import { UserCloud } from "@/core/clouds/user/user.cloud";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { ProgressBar } from "react-native-paper";
import { theme } from "@/theme/theme";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { IDatabase } from "@/database/database.interface";
import { UserDatabase } from "@/database/user.database";
import { log } from "@/app/_layout";
import { AxiosCloud } from "@/core/clouds/axios.cloud";
import { useRouter } from "expo-router";
import { MemoryStorageCore } from "@/core/memory-storage.core";

const cloudList: ICloud[] = [
	new UserCloud()
];

const databaseList: IDatabase[] = [
	new UserDatabase()
];

interface IProps {
	manualDownload?: boolean;
}

export default function Cloud({ manualDownload }: IProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const dbName = "docx";
	const router = useRouter();

	async function setUpDatabase() {
		const database = await SQLite.openDatabaseAsync(dbName);

		for (let i = 0; i < databaseList.length; i++) {
			try {
				await databaseList[i].config(database);
			} catch (error: any) {
				setErrorMessage(`Erro ao configurar ${cloudList[i].title}: ${error.message}`);
			}
		}
	}

	async function deleteDatabase() {
		try {
			const db = await SQLite.openDatabaseAsync(dbName);
			await db.closeAsync();
			await SQLite.deleteDatabaseAsync(dbName);
			log.debug("database deleted successfully.");
		} catch (error) {
			console.error(error);
		}
	}

	async function downloadClouds() {
		setLoading(true);
		setErrorMessage(null);

		await deleteDatabase();
		await setUpDatabase();

		for (let i = 0; i < cloudList.length; i++) {
			setCurrentIndex(i);
			try {
				await cloudList[i].download();
			} catch (error: any) {
				setErrorMessage(`Erro ao baixar ${cloudList[i].title}: ${error.message || error.code}`);
			}
		}

		MemoryStorageCore.Instance.firstAccess = false;

		redirectToMain();

		setLoading(false);
	}

	async function check(): Promise<boolean> {
		try {
			const result = await AxiosCloud.Instance.post<{ download: boolean }>({
				date: new Date().toISOString()
			}, "/user/last-cloud-downloaded");
			if (result.data.download || MemoryStorageCore.Instance.firstAccess) {
				return true;
			}
		} catch (error: any) {
			log.error(error);
		}
		return false;
	}

	useEffect(() => {
		(async () => {
			if (!manualDownload) {
				await setUpDatabase();
			}
			if (await check()) {
				await downloadClouds();
			} else {
				if (!manualDownload) {
					redirectToMain();
				}
			}
		})();
	}, []);

	function redirectToMain() {
		router.replace("/main/main");
	}

	return (
		<View style={styles.container}>
			<StatusBarThemed />

			<TouchableOpacity onPress={() => !loading && downloadClouds()}>
				<MaterialCommunityIcons
					name={loading ? "cloud-sync-outline" : "cloud-download-outline"}
					size={RFValue(40)}
					color="black"
				/>
			</TouchableOpacity>

			<Text style={styles.downloadText}>
				{loading ? "Baixando dados da nuvem..." : errorMessage ? "Ops! Ocorreu um erro..." : "Download concluído!"}
			</Text>

			<ProgressBar style={{ width: RFValue(140) }} color={theme.primary} indeterminate={loading} />

			<Text style={styles.cloudText}>
				{loading ? `Atual: ${cloudList[currentIndex]?.title.toLowerCase()}` : "Nenhum download ativo"}
			</Text>

			{errorMessage && <Text style={styles.cloudErrorText}>{errorMessage}</Text>}
		</View>
	);
}
