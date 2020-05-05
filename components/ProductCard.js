import React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/core";

const ProductCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("product", { id: 3596710416882 });
      }}
    >
      <Text>one product</Text>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;
