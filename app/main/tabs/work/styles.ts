import { StyleSheet } from "react-native";
import { theme } from "@/theme/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.background,
		alignItems: "center"
	},
	topCard: {
		width: "100%",
		height: 180,
		backgroundColor: theme.primary,
		alignItems: "center",
		borderBottomEndRadius: RFValue(30),
		borderBottomLeftRadius: RFValue(30),
		borderColor: theme.borderColor,
		elevation: 5
	},
	dayName: {
		fontSize: RFValue(20),
		color: theme.textColorWhite,
		fontFamily: "RobotoRegular",
		marginTop: 15
	},
	hourName: {
		fontSize: RFValue(55),
		color: theme.textColorWhite,
		fontFamily: "RobotoBold",
		marginTop: RFValue(5)
	},
	infoContainer: {
		backgroundColor: theme.background,
		borderWidth: 1,
		height: RFValue(80),
		width: "97%",
		borderRadius: 20,
		borderColor: theme.borderColor,
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 5
	},
	imageProfile: {
		height: RFValue(65),
		width: RFValue(65),
		borderRadius: 15,
		borderColor: theme.borderColor,
		marginLeft: 7
	},
	profileName: {
		fontSize: RFValue(18),
		fontFamily: "RobotoRegular"
	},
	profileCode: {
		fontSize: RFValue(12),
		fontFamily: "RobotoRegular"
	},
	weekReport: {
		width: "97%",
		height: "auto",
		alignSelf: "center",
		borderRadius: 20,
		borderColor: theme.borderColor,
		borderWidth: 1,
		marginTop: 10
	},
	markContainer: {
		width: "97%",
		alignSelf: "center",
		marginTop: 10
	},
	titleChart: {
		fontSize: RFValue(12),
		fontFamily: "RobotoRegular",
		alignSelf: "center",
		fontWeight: "bold",
		marginTop: 10,
		color: theme.fontSubColor
	}
});