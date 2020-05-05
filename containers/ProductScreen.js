import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import axios from "axios";

//components
import ProductPart from "../components/ProductPart";

const ProductScreen = ({ id, newProduct }) => {
  return (
    <View>
      <ProductPart id={id} newProduct={newProduct} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductScreen;
