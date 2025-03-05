import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 60,
        padding: 16,
        backgroundColor: "#f2f2f2",
        gap: 16,
    },
    card: {
        width: "100%",
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
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    email: {
        fontSize: 16,
        color: "#fff",
    },
    pictureButton: {
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    
    addButton: {
        backgroundColor: "#4CAF50",
    },
    
    removeButton: {
        backgroundColor: "#FF7F7F", 
    },
    
    pictureButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});