import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//css
import Colors from "./assets/css/colors";

//screens
import ProductsScreen from "./containers/ProductsScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [allProductsData, setAllProductsData] = useState(null);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Colors.yukaGreen} />
      <Stack.Navigator>
        <Stack.Screen options={{ header: () => null }} name="tab">
          {() => (
            <Tab.Navigator
              tabBarOptions={{
                showIcon: true,
                showLabel: false,
                indicatorStyle: { backgroundColor: "white" },
                tabStyle: { width: 200 },
                labelStyle: { fontSize: 16 },
                style: {
                  backgroundColor: Colors.yukaGreen,
                  height: 50,
                  //trying to get a shadow uncessfully :
                  borderBottomWidth: 0,
                  elevation: 8,
                  bottom: 1,
                  //tab bottom fixed :
                  justifyContent: "flex-end",
                },
              }}
            >
              <Tab.Screen
                name="home"
                options={{
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="food-apple"
                      size={26}
                      color="white"
                    />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="products">
                      {() => (
                        <ProductsScreen
                          allProductsData={allProductsData}
                          setAllProductsData={setAllProductsData}
                        />
                      )}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="favorites"
                options={{
                  tabBarIcon: () => (
                    <MaterialCommunityIcons
                      name="star"
                      size={26}
                      color="white"
                    />
                  ),
                }}
              >
                {() => (
                  <Stack.Navigator headerMode="none">
                    <Stack.Screen name="myfavorites">
                      {() => <FavoritesScreen />}
                    </Stack.Screen>
                  </Stack.Navigator>
                )}
              </Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="camera" options={{ header: () => null }}>
          {() => (
            <CameraScreen
              allProductsData={allProductsData}
              setAllProductsData={setAllProductsData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="product">{() => <ProductScreen />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
