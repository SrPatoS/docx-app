import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, TextInputProps, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = TextInputProps & {
  label?: string;
  icon: any;
  secureTextEntry?: boolean;
  setValueOutput: (value: string) => void;
};

export default function CustomInput({ label, icon, secureTextEntry = false, setValueOutput, ...props }: Props) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      {icon && <Feather name={icon} size={18} color={isFocused ? "#007bff" : "#888"} style={styles.icon}/>}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: isFocused ? "#007bff" : "#888" }]}>
          {label}
        </Text>
        <TextInput
          {...props}
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onEndEditing={() => setIsFocused(false)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(value) => {
            setValue(value);
            setValueOutput(value);
          }}
          value={value}
        />
      </View>
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsPasswordVisible((prev) => !prev)}>
          <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={18} color="#888"/>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 70,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    left: 0,
    fontSize: 13,
  },
  input: {
    fontSize: 16,
    height: 30,
    paddingVertical: 5,
    color: "#333",
  },
});
