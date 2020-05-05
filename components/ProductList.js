import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../assets/css/colors";

const ProductList = ({ qualities, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.between}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>Pour 100mL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    height: 165,
    flexDirection: "row",
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  between: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
  },
  name: {
    fontWeight: "300",
  },
  subText: {
    color: Colors.h2,
  },
});

export default ProductList;
