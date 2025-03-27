import { TouchableOpacity, View } from "react-native";
import CustomInput from "@/components/CustomInput";
import styles from "./styles";
import { StatusBarThemed, Text } from "@/components/Themed";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { LocalStorageCore } from "@/core/local-storage.core";
import { AuthUseCase } from "@/app/auth/auth.usecase";
import { showAlert } from "@/components/showAlert";
import { useRouter } from "expo-router";
import api from "@/axios/axios";

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const onAuth = async () => {
		const useCase = new AuthUseCase();
		const localStorage = new LocalStorageCore();

		try {
			setLoading(true);
			const result = await useCase.auth(email, password);

			if (result.data.token) {
				await localStorage.create("auth", result.data.token);
				api.defaults.headers["Authorization"] = `Bearer ${result.data.token ?? ""}`;
			}

			setLoading(false);
			router.replace("/main/main");
		} catch (error: any) {
			setLoading(false);
			showAlert(error.data.message, "");
		}
	};

	const goToRecoveryPassword = () => {
		router.push("/main/recovery/recoveryPassword")
	}

	return (
		<View style={styles.container}>
			<StatusBarThemed />
			<View style={styles.inputContainer}>
				<CustomInput
					setValueOutput={setEmail}
					label="Email"
					icon="mail"
					keyboardType="email-address"
					placeholder="Digite seu email"
				/>
				<CustomInput
					setValueOutput={setPassword}
					secureTextEntry={true}
					label="Senha"
					icon="key"
					placeholder="Digite sua senha"
				/>
				<CustomButton
					loading={loading}
					disabled={loading}
					title="Fazer Login"
					onPress={onAuth}
				/>
			</View>
			<TouchableOpacity onPress={goToRecoveryPassword}>
				<Text style={styles.recoveryText}>Esqueceu a senha?</Text>
			</TouchableOpacity>
		</View>
	);
}