import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    backgroundColor: "white",
  },
  inputContainer: {
    width: "90%",
    gap: 10,
    marginBottom: 20
  }
});

export default styles