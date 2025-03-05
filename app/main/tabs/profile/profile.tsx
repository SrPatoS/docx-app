import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { IUser, UserDatabase } from "@/database/user.database";
import { useFocusEffect } from "expo-router";
import { styles } from "./style";

export function Profile() {
    const [user, setUser] = useState<IUser>();

    async function getUserData() {
        const result = await UserDatabase.Instance.read();
        setUser(result);
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await getUserData();
            })();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.profilePictureContainer}>
                    {user?.avatar ? (
                        <Image source={{ uri: user.avatar }} style={styles.profilePicture} />
                    ) : (
                        <Text style={styles.addPictureText}>Sem Foto</Text>
                    )}
                </View>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
        </View>
    );
};