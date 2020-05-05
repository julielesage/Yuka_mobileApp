import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SilenceButton = () => {
  const [silenced, setSilenced] = useState(false);

  return (
    <TouchableOpacity
      style={styles.flashButton}
      onPress={() => {
        if (silenced) setSilenced(false);
        else setSilenced(true);
      }}
    >
      {silenced ? (
        <Ionicons name="md-notifications-off" size={40} color="black" />
      ) : (
        <Ionicons name="md-notifications" size={40} color="black" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flashButton: {
    backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 100,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 30,
    right: 30,
  },
});
export default SilenceButton;
