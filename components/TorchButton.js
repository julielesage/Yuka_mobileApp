import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//to light Torch
import RNFlash from "react-native-flash";
import Torch from "react-native-torch";
import { Camera } from "expo-camera";

const TorchButton = () => {
  const [torchOn, setTorchOn] = useState(false);
  // const [hasPermission, setHasPermission] = useState(null);
  // const [type, setType] = useState(Camera.Constants.Type.back);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

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
    // <Camera style={{ flex: 1 }} type={type}>
    <TouchableOpacity
      style={styles.flashButton}
      onPress={() => {
        if (torchOn) {
          setTorchOn(false);
          // Torch.switchState(false);
          // Camera.Constants.FlashMode.Off;
        } else {
          setTorchOn(true);
          // Torch.switchState(true);
          // Camera.Constants.FlashMode.Torch;
        }
      }}
    >
      {torchOn ? (
        <MaterialCommunityIcons name="flashlight-off" size={40} color="black" />
      ) : (
        <MaterialCommunityIcons name="flashlight" size={40} color="black" />
      )}
    </TouchableOpacity>
    //{" "}
    // </Camera>
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
