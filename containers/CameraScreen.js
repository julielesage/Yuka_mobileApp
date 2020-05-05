import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//to use Camera
import { BarCodeScanner } from "expo-barcode-scanner";

//components
import TorchButton from "../components/TorchButton";
import ProductCard from "../components/ProductCard";
import SilenceButton from "../components/SilenceButton";

import ProductPart from "../components/ProductPart";
import Colors from "../assets/css/colors";

const height = Dimensions.get("window").height;

const Camera = ({ setAllProductsData, allProductsData }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [code, setCode] = useState();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setCode(data);
    setScanned(true);
    const tab = [...allProductsData];
    tab.push(data);
    setAllProductsData(tab);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.simulatorContainer}>
        <Text style={{ color: "white" }}>Requesting for camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.simulatorContainer}>
        <Text style={{ color: "white" }}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <TorchButton />
      <SilenceButton />
      <View style={styles.scanFrame} />
      {scanned && (
        <View style={styles.modal}>
          <View style={styles.file}>
            <View style={styles.fileHandle} />
          </View>
          <ProductPart id={code} setAllProductsData={setAllProductsData} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  simulatorContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "red",
    margin: 0,
    padding: 0,
    position: "relative",
  },
  scanFrame: {
    borderRadius: 25,
    height: 250,
    width: 300,
    borderWidth: 1,
    borderColor: "white",
  },
  file: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    width: "100%",
  },
  fileHandle: {
    backgroundColor: Colors.lightGrey,
    width: 40,
    height: 7,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  modal: {
    position: "absolute",
    width: "100%",
    top: height - 180,
  },
});

export default Camera;
