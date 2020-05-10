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
import SilenceButton from "../components/SilenceButton";

import ProductPart from "../components/ProductPart";
import Colors from "../assets/css/colors";

const height = Dimensions.get("window").height;

const Camera = ({ setAllProductsData, allProductsData }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [code, setCode] = useState();
  const [scroll, setScroll] = useState(false);
  console.log("scroll ==>", scroll);

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
    <ScrollView
      style={{ flex: 1 }}
      onScroll={() => {
        setScroll(true);
      }}
    >
      {scroll ? null : (
        <View style={styles.cameraContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <TorchButton />
          <SilenceButton />
          <View style={styles.scanFrame} />
        </View>
      )}

      {scanned && (
        <View style={[scroll ? { width: "100%" } : styles.modal]}>
          {scroll ? (
            <View style={styles.scanHeader}>
              <TouchableOpacity
                onPress={() => setScroll(false)}
                style={styles.scanButton}
              >
                <MaterialCommunityIcons
                  name="barcode-scan"
                  size={36}
                  color="white"
                  style={{ paddingTop: 5 }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.file}>
            <View style={styles.fileHandle} />
          </View>
          <ProductPart id={code} setAllProductsData={setAllProductsData} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  simulatorContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    width: "100%",
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "red",
  },
  scanFrame: {
    borderRadius: 25,
    height: 250,
    width: 300,
    borderWidth: 1,
    borderColor: "white",
  },
  scanButton: {
    backgroundColor: Colors.yukaGreen,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  scanHeader: {
    backgroundColor: "white",
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
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
    top: height - 180,
    width: "100%",
  },
});

export default Camera;
