import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/Home";
import DetailsScreen from "./screens/Details";
import { Root, Icon } from "native-base";
import { AppLoading } from "expo";
import * as Font from "expo-font";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Fitness Calculator" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontLoaded) {
    <AppLoading />;
  }

  return (
    <Root>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} type="AntDesign" />
              ),
            }}
          />
          <Tab.Screen
            name="Report"
            component={DetailsScreen}
            options={{
              tabBarLabel: "Report",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="barchart"
                  color={color}
                  size={size}
                  type="AntDesign"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Setting"
            component={DetailsScreen}
            options={{
              tabBarLabel: "Setting",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="setting"
                  color={color}
                  size={size}
                  type="AntDesign"
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Root>
  );
}
