import React from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//components
import ProductCard from "../components/ProductCard";
import Colors from "../assets/css/colors";

const ProductsScreen = ({ allProductsData, setAllProductsData }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={allProductsData}
        keyExtractor={(item) => {
          String(item.id);
        }}
        renderItem={({ item }) => {
          <Link to="product" id={item.id}>
            <ProductCard {...item} />
          </Link>;
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("camera");
        }}
        style={styles.scanButton}
      >
        <MaterialCommunityIcons
          name="barcode-scan"
          size={46}
          color="white"
          style={{ paddingTop: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    position: "relative",
  },
  scanButton: {
    backgroundColor: Colors.yukaGreen,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default ProductsScreen;
