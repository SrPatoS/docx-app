import { View } from "react-native";
import CustomInput from "@/components/CustomInput";
import styles from "./styles";
import { StatusBarThemed } from "@/components/Themed";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { LocalStorageCore } from "@/core/local-storage.core";
import { AuthUseCase } from "@/app/auth/auth.usecase";
import { showAlert } from "@/components/showAlert";
import { useRouter } from "expo-router";

export default function Auth() {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const onAuth = async () => {
		const storage = new LocalStorageCore();
		const useCase = new AuthUseCase();
		try {
			setLoading(true);
			const result = await useCase.auth(email, password);
			await storage.create("auth", result.data.token);
			setLoading(false);
			router.replace("/cloud/cloud");
		} catch (error: any) {
			setLoading(false);
			showAlert(error.data.message, "");
		}
	};

	return (
		<View style={styles.container}>
			<StatusBarThemed />
			<View style={styles.inputContainer}>
				<CustomInput setValueOutput={setEmail} label="Email" icon="mail" keyboardType="email-address"
										 placeholder="Digite seu email" />
				<CustomInput setValueOutput={setPassword} secureTextEntry={true} label="Senha" icon="key"
										 placeholder="Digite sua senha" />
				<CustomButton loading={loading} disabled={loading} title="Fazer Login" onPress={onAuth} />
			</View>
		</View>
	);
}