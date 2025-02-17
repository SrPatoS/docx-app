import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export default function WorkToggle() {
  const [stage, setStage] = useState(0);
  const stages = [
    { title: "Início", color: "rgba(52,190,28,0.80)", border: "rgba(52,190,28,0.99)" },
    { title: "Almoço", color: "rgba(245,124,29,0.80)", border: "rgba(245,124,29,0.90)" },
    { title: "Fim", color: "rgba(217,20,20,0.80)", border: "rgba(217,20,20,0.90)" }
  ];

  const toggleWidth = RFValue(330);
  const buttonWidth = (toggleWidth / stages.length) * 0.995;

  return (
    <View style={styles.container}>
      <View style={[styles.toggleContainer, { width: toggleWidth }]}>
        <Animated.View
          style={[
            styles.toggleIndicator,
            {
              left: stage * buttonWidth,
              width: buttonWidth,
              backgroundColor: stages[stage].color,
              borderColor: stages[stage].border,
              borderWidth: 1
            },
          ]}
        />

        {stages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.toggleButton]}
            onPress={() => setStage(index)}
          >
            <Text style={[styles.text, stage === index && { color: "white" }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: "80%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  toggleIndicator: {
    position: "absolute",
    height: "98%",
    borderRadius: 50,
    marginLeft: 1,
  },
  toggleButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    zIndex: 2,
  },
  text: {
    fontSize: RFValue(18),
    fontWeight: "bold",
    color: "#ececec",
  },
});
