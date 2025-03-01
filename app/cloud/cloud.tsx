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

const cloudList: ICloud[] = [new UserCloud()];

export default function Cloud() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function downloadClouds() {
		setLoading(true);
		setErrorMessage(null);

		for (let i = 0; i < cloudList.length; i++) {
			setCurrentIndex(i);
			try {
				await cloudList[i].download();
			} catch (error: any) {
				setErrorMessage(`Erro ao baixar ${cloudList[i].title}: ${error.message || error.code}`);
			}
		}

		setLoading(false);
	}

	useEffect(() => {
		(async () => {
			await downloadClouds();
		})();
	}, []);

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
