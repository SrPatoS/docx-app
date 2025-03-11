import { Text, View } from "@/components/Themed";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Cloud from "@/app/cloud/cloud";
import { useState } from "react";
import { useRouter } from "expo-router";
import { LocalStorageCore } from "@/core/local-storage.core";

interface IMenuOption {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
    path: () => void;
}

export function Menu() {
    const router = useRouter();
    const [menuOptions, setMenuOptions] = useState<IMenuOption[]>([
        { name: "Atualizar Dados", icon: "cloud-download", path: () => handleLogout() },
        { name: "Sair", icon: "log-out", path: () => router.push('/auth/auth') },
    ]);

    const handleLogout = () => {
        const storage = new LocalStorageCore();
        storage.clear()
        router.push('/auth/auth');
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={menuOptions}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.menuItem} onPress={item.path}>
                        <Ionicons name={item.icon} size={24} color="blue" />
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    flatListContainer: {
        marginTop: 40,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    text: {
        fontSize: 18,
    },
});
