import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap:10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    stepContainer: {
        width: '100%',
        gap: 15,
        maxWidth: 400,
        padding: 20,

    },
    label: {
        fontSize: 16,
        marginLeft: 5,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: '#333',
    },
});