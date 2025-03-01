import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { MemoryStorageCore } from "@/core/memory-storage.core";
import { PaperProvider } from "react-native-paper";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "auth/auth"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Satoshi: require("../assets/fonts/Satoshi-Variable.ttf"),
		RobotoRegular: require("../assets/fonts/roboto/Roboto-Regular.ttf"),
		RobotoBold: require("../assets/fonts/roboto/Roboto-Bold.ttf"),
		...FontAwesome.font
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		new MemoryStorageCore();
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<PaperProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<Stack initialRouteName="auth/auth">
					<Stack.Screen name="main/main" options={{ headerShown: false }} />
					<Stack.Screen name="auth/auth" options={{ headerShown: false }} />
				</Stack>
			</ThemeProvider>
		</PaperProvider>
	);
}
