import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";
import { theme } from "@/theme/theme";

type CustomButtonProps = {
	title: string;
	onPress: () => void;
	loading?: boolean;
	disabled?: boolean;
	color?: string;
};

export default function CustomButton(
	{
		title,
		onPress,
		loading = false,
		disabled = false,
		color = theme.primary
	}: CustomButtonProps) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: disabled || loading ? "#D3D3D3" : color },
				(disabled || loading) && styles.disabledButton
			]}
			onPress={onPress}
			disabled={disabled || loading}
		>
			{loading ? (
				<ActivityIndicator size="small" color="#FFF" />
			) : (
				<Text style={styles.buttonText}>{title}</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: theme.primary,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		height: 50,
		width: "100%"
	},
	disabledButton: {
		backgroundColor: "#A9A9A9"
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold"
	}
});
