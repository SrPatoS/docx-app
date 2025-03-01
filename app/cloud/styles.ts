import { StyleSheet } from "react-native";
import { theme } from "@/theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.background,
		alignItems: "center",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		gap: 1
	},
	downloadText: {
		fontSize: RFValue(12)
	},
	cloudText: {
		fontSize: RFValue(10)
	},
	cloudErrorText: {
		fontSize: RFValue(11),
		color: theme.errorTextColor
	}
});