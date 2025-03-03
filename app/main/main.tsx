import { StatusBarThemed, Text, View } from "@/components/Themed";
import MapView from "react-native-maps";
import { styles } from "@/app/main/styles";
import WorkToggle from "@/app/main/components/work-toggle";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
import Ionicons from "@expo/vector-icons/Ionicons";
import Work from "@/app/main/tabs/work/work";
import Cloud from "@/app/cloud/cloud";

export default function Main() {
	return (
		<View style={styles.container}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color, size }) => {
						return <Ionicons name="home" size={size} color={color} />;
					},
					tabBarActiveTintColor: "blue",
					tabBarInactiveTintColor: "gray",
					headerShown: false
				})}
			>
				<Tab.Screen name="Home" component={Work} />
				<Tab.Screen name="Download" component={() => {
					return <Cloud manualDownload={true} />;
				}} />
			</Tab.Navigator>
		</View>
	);
}