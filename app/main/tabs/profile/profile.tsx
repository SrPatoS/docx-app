import React, { useCallback, useState } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./style";
import api from "@/axios/axios";
import CustomButton from "@/components/CustomButton";
import { FindUserUseCase } from "../../../../core/utils/finduser.usecase";
import { IUser } from "@/app/interfaces/user.interface";

export function Profile() {
    const [user, setUser] = useState<IUser>();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function getUserData() {
        const findUser = new FindUserUseCase();
        const data = await findUser.handle();
        setUser(data);
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
                await getUserData();
            })();
        }, [])
    );

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Precisamos da permissão para acessar sua galeria.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
        }
    }

    function handleRemovePickerImage() {
        setSelectedImage('');
    }

    async function handleUpdateImage(uri: string) {
        if (!uri) return;

        setLoading(true);

        try {
            const pathUri = await fetch(uri);
            const blob = await pathUri.blob();

            const formData = new FormData();
            formData.append("image", {
                uri,
                buffer: blob,
                name: "avatar.jpg",
                type: "image/jpeg",
            } as any);

            const response = await api.post("/user/avatar/upload", formData);

            if (response.status === 200) {
                Alert.alert("Sucesso", "Foto atualizada com sucesso!");
            }

            setSelectedImage('');
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a foto.");
            setLoading(false);
        } finally {
            await getUserData();
            setLoading(false);
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.profilePictureContainer}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.profilePicture} />
                    ) : (
                        <Image source={{ uri: user?.avatar }} style={styles.profilePicture} />
                    )}
                </View>
                <TouchableOpacity
                    onPress={selectedImage ? handleRemovePickerImage : pickImage}
                    style={[
                        styles.pictureButton,
                        selectedImage ? styles.removeButton : styles.addButton,
                    ]}
                >
                    <Text style={styles.pictureButtonText}>
                        {selectedImage ? "Cancelar" : "Escolher Foto"}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
            <CustomButton
                title="Atualizar"
                loading={loading}
                disabled={!selectedImage}
                onPress={() => handleUpdateImage(selectedImage)}
            />
        </View>
    );
}
