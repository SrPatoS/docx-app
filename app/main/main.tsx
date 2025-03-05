import Work from "@/app/main/tabs/work/work";
import Cloud from "@/app/cloud/cloud";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "@/components/Themed";
import { styles } from "@/app/main/styles";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Profile } from "./tabs/profile/profile";

const Tab = createBottomTabNavigator();

interface ITab {
	name: string;
	icon: keyof typeof Ionicons.glyphMap;
	component: () => JSX.Element;
}

const tabs: ITab[] = [
	{ name: "Home", icon: "home", component: Work, },
	/* { name: "Profile", icon: "person", component: Profile }, */
	{ name: "Download", icon: "cloud-download", component: () => <Cloud manualDownload={true} /> }
];

export default function Main() {
	return (
		<View style={styles.container}>
			<Tab.Navigator
				screenOptions={() => ({
					tabBarActiveTintColor: "blue",
					tabBarInactiveTintColor: "gray",
					headerShown: false,
				})}
			>
				{tabs.map((tab) => (
					<Tab.Screen key={tab.name} name={tab.name} component={tab.component}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name={tab.icon} size={size} color={color} />
							)
						}}
					/>
				))}
			</Tab.Navigator>
		</View>
	);
}
