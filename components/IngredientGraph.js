import React from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import Colors from "../assets/css/colors";

const IngredientGraph = ({ value, norms, duo, circleColor }) => {
  // to get graph responsive width to divide
  let graphWidth = Dimensions.get("window").width;
  graphWidth -= 105;

  const cursorPosition = (value * 100) / norms[norms.length - 1];

  const graph = () => {
    if (duo)
      return (
        <View style={{ flexDirection: "row", width: graphWidth }}>
          <View
            style={[styles.graphPart, { backgroundColor: Colors.yukaGreen }]}
          />
          <View
            style={[styles.graphPart, { backgroundColor: Colors.darkGreen }]}
          />
        </View>
      );
    else
      return (
        <>
          <View style={{ flexDirection: "row", width: graphWidth }}>
            <View
              style={[styles.graphPart, { backgroundColor: Colors.darkGreen }]}
            />
            <View
              style={[styles.graphPart, { backgroundColor: Colors.yukaGreen }]}
            />
            <View
              style={[styles.graphPart, { backgroundColor: Colors.orange }]}
            />
            <View style={[styles.graphPart, { backgroundColor: Colors.red }]} />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: graphWidth,
              position: "relative",
            }}
          >
            <Text style={styles.subText}>0</Text>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.subText}>{norms[1]}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                position: "absolute",
                left: 0,
                width: graphWidth / 2,
              }}
            >
              <Text style={styles.subText}>{norms[0]}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                position: "absolute",
                right: 0,
                width: graphWidth / 2,
              }}
            >
              <Text style={styles.subText}>{norms[2]}</Text>
            </View>

            <Text style={[styles.subText, { textAlign: "right" }]}>
              {norms[3]}
            </Text>
          </View>
        </>
      );
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.triangleCursor, { borderBottomColor: circleColor }]}
      ></View>
      <View>{graph()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
  },
  graphPart: {
    flex: 1,
    marginRight: 2,
    height: 5,
  },
  subText: {
    color: Colors.h2,
    fontSize: 16,
    textAlign: "center",
  },
  triangleCursor: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginBottom: 5,
    transform: [{ rotate: "180deg" }],
  },
});
export default IngredientGraph;
