// USING EXPO BARCODE SCANNER FLASH DO NOT WORK *******

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
// TorchButton not working because of BarCodeScanner
import TorchButton from "../components/TorchButton";
import SilenceButton from "../components/SilenceButton";

import ProductPart from "../components/ProductPart";
import Colors from "../assets/css/colors";

const height = Dimensions.get("window").height;

const Camera = ({ setAllProductsData, allProductsData }) => {
  const [torchOn, setTorchOn] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState();
  const [scroll, setScroll] = useState(false);

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
          <TorchButton torchOn={torchOn} setTorchOn={setTorchOn} />
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
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    width: "100%",
  },
  cameraContainer: {
    height: height,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "black",
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

// NEW TRY WITH RNCAMERA

// import React, { Component } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import { RNCamera } from "react-native-camera";
// // import SvgUri from 'react-native-svg-uri';
// // import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// class Camera extends Component {
//   constructor(props) {
//     super(props);
//     this.camera = null;
//     this.state = {
//       camera: {
//         type: RNCamera.Constants.Type.back,
//         barcodeFinderVisible: true,
//       },
//       flashMode: RNCamera.Constants.FlashMode.off,
//       flashOn: false,
//     };
//   }

//   async togleFlash() {
//     await this.setState({ flashOn: !this.state.flashOn });
//     if (this.state.flashOn) {
//       this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
//     } else {
//       this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
//     }
//   }

//   onBarCodeRead(scanResult) {
//     if (scanResult.data != null) {
//       console.warn({ data: scanResult.data });
//       this.props.navigation.navigate("Detail", { ScanDetail: scanResult.data });
//     }
//     return;
//   }

//   async takePicture() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   }

//   pendingView() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "lightgreen",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Text>Waiting</Text>
//       </View>
//     );
//   }
//   render() {
//     const { height, width } = Dimensions.get("window");
//     const maskRowHeight = Math.round((height - 200) / 20);
//     const maskColWidth = (width - 250) / 2;

//     return (
//       <View style={styles.container}>
//         {/* <View style={styles.cameraView}> */}
//         <RNCamera
//           ref={(ref) => {
//             this.camera = ref;
//           }}
//           barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
//           barcodeFinderWidth={280}
//           barcodeFinderHeight={220}
//           // barcodeFinderBorderColor="white"
//           // barcodeFinderBorderWidth={2}
//           defaultTouchToFocus
//           flashMode={this.state.flashMode}
//           mirrorImage={false}
//           onBarCodeRead={this.onBarCodeRead.bind(this)}
//           onFocusChanged={() => {}}
//           onZoomChanged={() => {}}
//           permissionDialogTitle={"Permission to use camera"}
//           permissionDialogMessage={
//             "We need your permission to use your camera phone"
//           }
//           style={styles.cameraView}
//           type={this.state.camera.type}
//         >
//           {/* <View style={styles.maskOutter}>
//             <View
//               style={[
//                 { flex: maskRowHeight },
//                 styles.maskRow,
//                 styles.maskFrame
//               ]}
//             />
//             <View style={[{ flex: 30 }, styles.maskCenter]}>
//               <View style={[{ width: maskColWidth }, styles.maskFrame]} />
//               <View style={styles.maskInner} />
//               <View style={[{ width: maskColWidth }, styles.maskFrame]} />
//             </View>
//             <View
//               style={[
//                 { flex: maskRowHeight },
//                 styles.maskRow,
//                 styles.maskFrame
//               ]}
//             />
//           </View> */}
//         </RNCamera>
//         <Image
//           style={{ position: "absolute" }}
//           height={"100%"}
//           width={"100%"}
//           source={require("../assets/img/camera.png")}
//           resizeMode={"stretch"}
//         />
//         <View
//           style={{
//             flex: 1,
//             position: "absolute",
//             alignItems: "center",
//             flexDirection: "row",
//             margin: 40,
//           }}
//         >
//           <View
//             elevation={20}
//             style={{
//               width: "100%",
//               backgroundColor: "white",
//               borderRadius: 10,
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontFamily: "Roboto-Medium",
//               }}
//             >
//               Position the QR code within the frame
//             </Text>
//           </View>
//         </View>
//         {/*  */}
//         <View
//           style={{
//             flex: 1,
//             position: "absolute",
//             height: "90%",
//             // backgroundColor: "red",
//             width: "100%",
//             justifyContent: "flex-end",
//           }}
//         >
//           <View>
//             <View
//               style={{
//                 alignItems: "center",
//                 width: "100%",
//                 bottom: "50%",
//                 // backgroundColor: "red"
//               }}
//             >
//               <TouchableOpacity
//                 style={{ backgroundColor: "red" }}
//                 onPress={() => this.togleFlash()}
//               >
//                 {/* <Icon
//                   name={
//                     this.state.flashOn === true
//                       ? "flashlight"
//                       : "flashlight-off"
//                   }
//                   style={[
//                     this.state.flashOn === true
//                       ? { color: "blue" }
//                       : { color: "black" },
//                     { fontSize: 30 }
//                   ]}
//                 /> */}
//                 <Text>Flash</Text>
//               </TouchableOpacity>
//             </View>
//             <View
//               elevation={20}
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: 10,
//                 margin: 40,
//                 marginTop: 0,
//                 marginBottom: 0,
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontFamily: "Roboto-Medium",
//                 }}
//               >
//                 Problem Scanning? Tap on the torch icon
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   cameraView: {
//     flex: 1,
//     justifyContent: "flex-start",
//   },
//   maskOutter: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   maskInner: {
//     width: 250,
//     backgroundColor: "transparent",
//     // borderColor: "white",
//     // borderWidth: 1
//   },
//   maskFrame: {
//     backgroundColor: "rgba(0,0,0,0.6)",
//   },
//   maskRow: {
//     width: "100%",
//   },
//   maskCenter: { flexDirection: "row" },
// });

// export default Camera;
