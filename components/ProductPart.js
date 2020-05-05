import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

import axios from "axios";

//components
import ProductHeader from "../components/ProductHeader";
import ProductList from "../components/ProductList";
import Colors from "../assets/css/colors";

const ProductPart = ({ id }) => {
  const [data, setData] = useState(null);
  const [note, setNote] = useState(null);
  const [noteColor, setNoteColor] = useState("grey");
  const [noteText, setNoteText] = useState("inconnu");
  const [isLoading, setIsLoading] = useState(true);
  const [qualities, setQualities] = useState([]);
  const [problems, setProblems] = useState([]);

  //get data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/3596710416882.json`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    //get wrongs and bads
    const selection = () => {
      if (data !== null) {
        const db = { ...data.product.nutriments };
        //conversion kjoul to kcal:
        let kcal = 0;
        if (db.energy !== undefined)
          kcal = Math.round((db.energy * 239.120038259) / 1000);
        let rightTab = [];
        let wrongTab = [];

        let tabToAnalyze = [
          {
            name: "Fruits et Légumes",
            value: db["fruits-vegetables-nuts_100g"],
          },
          {
            name: "Fibres",
            value: db.fiber,
          },
          {
            name: "Sucre",
            value: db.sugars,
          },
          {
            name: "Graisses saturées",
            value: db["saturated-fat_100g"],
          },
          {
            name: "Sel",
            value: db.salt,
          },
          {
            name: "Protéines",
            value: db.proteins_100g,
          },
          {
            name: "Calories",
            value: kcal,
          },
        ];
        if (db["fruits-vegetables-nuts_100g"] !== undefined)
          rightTab.push(tabToAnalyze[0]);
        if (db.fiber !== undefined) rightTab.push(tabToAnalyze[1]);
        if (db.sugars === undefined || db.sugars < 18)
          rightTab.push(tabToAnalyze[2]);
        else if (db.sugars >= 18) wrongTab.push(tabToAnalyze[2]);
        if (
          db["saturated-fat_100g"] === undefined ||
          db["saturated-fat_100g"] < 4
        )
          rightTab.push(tabToAnalyze[3]);
        else if (db["saturated-fat_100g"] >= 4) wrongTab.push(tabToAnalyze[3]);
        if (db.salt === undefined || db.salt < 0.92)
          rightTab.push(tabToAnalyze[4]);
        else wrongTab.push(tabToAnalyze[4]);
        if (db.proteins_100g !== undefined) rightTab.push(tabToAnalyze[5]);
        if (kcal !== 0 && kcal < 360) rightTab.push(tabToAnalyze[6]);
        else if (kcal !== 0 && kcal >= 360) wrongTab.push(tabToAnalyze[6]);

        setQualities(rightTab);
        setProblems(wrongTab);

        // calculate note here in order to register it into history DB
        let calculate = 30;
        if (data.product.nutrition_grade_fr === "a") calculate += 60;
        if (data.product.nutrition_grade_fr === "b") calculate += 45;
        if (data.product.nutrition_grade_fr === "c") calculate += 25;

        //if additif -30, if bio +10

        setNote(calculate);

        // note color & text here for history DB
        if (calculate < 25) {
          setNoteColor(Colors.red);
          setNoteText("Mauvais");
        } else if (calculate < 50) {
          setNoteColor(Colors.orange);
          setNoteText("Médiocre");
        } else if (calculate < 75) {
          setNoteColor(Colors.yukaGreen);
          setNoteText("Bon");
        } else if (calculate <= 100) {
          setNoteColor(Colors.darkGreen);
          setNoteText("Excellent");
        }
      }
    };
    selection();
  }, [data]);

  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={{ backgroundColor: Colors.lightGrey }}>
      <ProductHeader
        title={data.product.product_name}
        brand={data.product.brands}
        note={note}
        image={data.product.image_front_small_url}
        noteColor={noteColor}
        noteText={noteText}
      />
      {note > 50 ? (
        <>
          <ProductList data={qualities} name="Qualités" />
          <ProductList data={problems} name="Défault" />
        </>
      ) : (
        <>
          <ProductList data={problems} name="Défault" />
          <ProductList data={qualities} name="Qualités" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductPart;
