import React from "react";
import { Text, View, StyleSheet } from "react-native";

export const Timer = ({ time }) => {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;

  return (
    <View style={[styles.container]}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15,
    justifyContent: "center",
  },

  time: {
    fontSize: 80,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333333",
  },
});
