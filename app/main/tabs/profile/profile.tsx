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
        const formData = new FormData();
        formData.append("avatar", {
            uri,
            name: "avatar.jpg",
            type: "image/jpeg",
        } as any);

        try {
            await api.put("/users", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Alert.alert("Sucesso", "Foto atualizada com sucesso!");
            await getUserData();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a foto.");
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
            <CustomButton title="Atualizar" onPress={() => handleUpdateImage(selectedImage)} />
        </View>
    );
}
