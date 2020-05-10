import React from "react";
import { View, Text, StyleSheet } from "react-native";

// components
import Ingredient from "./Ingredient";
import Colors from "../assets/css/colors";

const ProductList = ({ data, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.between}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subText}>Pour 100mL</Text>
      </View>
      {data.map((ingredient) => {
        return (
          <View style={styles.data} key={ingredient.name}>
            <Ingredient ingredient={ingredient} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  between: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
  },
  data: {},
  name: {
    fontWeight: "500",
    fontSize: 18,
  },
  subText: {
    color: Colors.h2,
  },
});

export default ProductList;
