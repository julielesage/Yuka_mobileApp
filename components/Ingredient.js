import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import {
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";

// css
import Colors from "../assets/css/colors";

// components
import IngredientGraph from "./IngredientGraph";

const Ingredient = ({ ingredient }) => {
  const [circleColor, setCircleColor] = useState("grey");
  const [norms, setNorms] = useState([]);
  const [duo, setDuo] = useState(false);
  const [message, setMessage] = useState("");
  const [units, setUnits] = useState("");
  const [more, setMore] = useState(true);
  const name = ingredient.name;
  const value = ingredient.value;

  const whichIcon = () => {
    switch (name) {
      case "Fibres":
        return <MaterialCommunityIcons name="tree" size={36} color="grey" />;
        break;
      case "Sucre":
        return (
          <Ionicons
            name="ios-cube"
            size={30}
            color="grey"
            style={{ marginRight: 50 }}
          />
        );
        break;
      case "Graisses saturées":
        return <Entypo name="drop" size={36} color="grey" />;
        break;
      case "Sel":
        return (
          <MaterialCommunityIcons
            name="dots-horizontal-circle"
            size={30}
            color="grey"
            style={{ marginRight: 5 }}
          />
        );
        break;
      case "Protéines":
        return <FontAwesome5 name="fish" size={30} color="grey" />;
        break;
      case "Calories":
        return <MaterialCommunityIcons name="fire" size={36} color="grey" />;
        break;
      case "Fruits et Légumes":
        return (
          <MaterialCommunityIcons name="food-apple" size={36} color="grey" />
        );
        break;
    }
  };

  useEffect(() => {
    // SUGAR
    if (name === "Sucre") {
      setNorms([9, 18, 31, 45]);
      setUnits(" g");
      if (value < 9) {
        setCircleColor(Colors.darkGreen);
        setMessage("Peu de sucre");
      } else if (value < 18) {
        setCircleColor(Colors.yukaGreen);
        setMessage("Faible impact");
      } else if (value < 31) {
        setCircleColor(Colors.orange);
        setMessage("Un peu trop sucré");
      } else if (value >= 31) {
        setCircleColor(Colors.red);
        setMessage("Trop sucré");
      }

      //  PROTEINS;
    } else if (name === "Protéines") {
      setNorms([8, 16]);
      setDuo(true);
      if (value < 8) {
        setCircleColor(Colors.yukaGreen);
        setMessage("Quelques protéines");
      } else if (value >= 8) {
        setCircleColor(Colors.darkGreen);
        setMessage("Excellente quantité");
      }

      // FIBERS
    } else if (name === "Fibres") {
      setNorms([3.5, 7]);
      setUnits(" g");
      setDuo(true);
      if (value < 3.5) {
        setCircleColor(Colors.yukaGreen);
        setMessage("Quelques fibres");
      } else if (value >= 3.5) {
        setCircleColor(Colors.darkGreen);
        setMessage("Excellente quantité");
      }

      // FATS
    } else if (name === "Graisses saturées") {
      setNorms([2, 4, 7, 10]);
      setUnits(" g");
      if (value < 2) {
        setCircleColor(Colors.darkGreen);
        setMessage("Peu de graisses sat.");
      } else if (value < 4) {
        setCircleColor(Colors.yukaGreen);
        setMessage("Faible impact");
      } else if (value < 7) {
        setCircleColor(Colors.orange);
        setMessage("Un peu trop gras");
      } else if (value >= 7) {
        setCircleColor(Colors.red);
        setMessage("Trop gras");
      }

      // CAL
    } else if (name === "Calories") {
      setNorms([160, 360, 560, 800]);
      setUnits(" kcal");
      if (value < 160) {
        setCircleColor(Colors.darkGreen);
        setMessage("Peu calorique");
      } else if (value < 360) {
        setCircleColor(Colors.yukaGreen);
        setMessage("Faible impact");
      } else if (value < 560) {
        setCircleColor(Colors.orange);
        setMessage("Un peu trop calorique");
      } else if (value >= 560) {
        setCircleColor(Colors.red);
        setMessage("Trop calorique");
      }

      // SALT
    } else if (name === "Sel") {
      setNorms([0.46, 0.92, 1.62, 2.3]);
      setUnits(" g");
      if (value < 0.46) {
        setCircleColor(Colors.darkGreen);
        setMessage("Peu de sel");
      } else if ((value < 0, 92)) {
        setCircleColor(Colors.yukaGreen);
        setMessage("Faible impact");
      } else if (value < 1.62) {
        setCircleColor(Colors.orange);
        setMessage("Un peu trop salé");
      } else if (value >= 1.62) {
        setCircleColor(Colors.red);
        setMessage("Trop salé");
      }

      // FRUITS;
    } else if (name === "Fruits et Légumes") {
      setNorms([80, 100]);
      setUnits(" %");
      if (value > 80) {
        setCircleColor(Colors.darkGreen);
        setMessage("Excellente quantité");
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Text>{whichIcon()}</Text>
      </View>
      <View style={styles.rightPart}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            // height: 80,
          }}
        >
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subText}>{message}</Text>
          </View>
          <View style={styles.notationView}>
            <Text style={styles.subText}>
              {value}
              {units}
            </Text>
            <View style={[styles.circle, { backgroundColor: circleColor }]} />
            {more ? (
              <AntDesign
                name="up"
                size={18}
                onPress={() => {
                  setMore(false);
                }}
              />
            ) : (
              <AntDesign
                name="down"
                size={18}
                onPress={() => {
                  setMore(true);
                }}
              />
            )}
          </View>
        </View>
        {more ? (
          <IngredientGraph
            value={value}
            norms={norms}
            duo={duo}
            circleColor={circleColor}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  circle: {
    borderRadius: 100,
    width: 18,
    height: 18,
    marginHorizontal: 10,
  },
  icon: {
    paddingVertical: 10,
    marginRight: 10,
  },
  iconView: {
    width: 45,
    alignItems: "center",
    paddingVertical: 10,
  },
  name: {
    fontWeight: "500",
    marginBottom: 5,
    fontSize: 16,
  },
  notationView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightPart: {
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    marginLeft: 20,
    paddingVertical: 10,
    flex: 1,
  },
  subText: {
    color: Colors.h2,
    fontSize: 16,
  },
});

export default Ingredient;
