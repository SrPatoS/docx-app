import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 60,
        padding: 16,
        backgroundColor: "#f2f2f2",
    },
    card: {
        width: "100%",
        maxWidth: 350,
        backgroundColor: "#5B5EB4",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        elevation: 5,
        gap: 5,
    },
    profilePictureContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        overflow: "hidden",
    },
    profilePicture: {
        width: "100%",
        height: "100%",
    },
    addPictureText: {
        color: "#aaa",
        fontSize: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    email: {
        fontSize: 16,
        color: "#fff",
    },
});