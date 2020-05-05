import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//to light Torch
import RNFlash from "react-native-flash";

const TorchButton = () => {
  const [torchOn, setTorchOn] = useState(false);

  const useFlash = () => {
    RNFlash.hasFlash(
      function () {
        if (torchOn) RNFlash.turnOffFlash();
        else RNFlash.turnOnFlash();
      },
      function () {
        alert("You do not have flash");
      }
    );
  };

  return (
    <TouchableOpacity
      style={styles.flashButton}
      onPress={() => {
        if (torchOn) setTorchOn(false);
        else setTorchOn(true);
        useFlash();
      }}
    >
      {torchOn ? (
        <MaterialCommunityIcons name="flashlight-off" size={40} color="black" />
      ) : (
        <MaterialCommunityIcons name="flashlight" size={40} color="black" />
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
    left: 30,
  },
});
export default TorchButton;
