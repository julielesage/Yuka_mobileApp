import React from "react";
import {
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

//CSS
import Colors from "../assets/css/colors";

const ProductHeader = ({ image, title, brand, note, noteColor, noteText }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.img}
      />
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <View style={styles.notePart}>
          <View style={[styles.bubble, { backgroundColor: noteColor }]} />
          <View>
            <Text style={styles.note}>{note}/100</Text>
            <Text style={[styles.brand, { marginBottom: 0 }]}>{noteText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 165,
    flexDirection: "row",
    marginBottom: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
  },
  img: {
    marginRight: 20,
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.h1,
  },
  brand: {
    color: Colors.h2,
    marginBottom: 20,
    marginTop: 2,
  },
  notePart: {
    flexDirection: "row",
    alignItems: "center",
  },
  bubble: {
    borderRadius: 100,
    width: 15,
    height: 15,
    marginRight: 10,
  },
  note: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default ProductHeader;
