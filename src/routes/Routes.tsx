import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import VideoPlayerPage from "../pages/VideoPlayerPage";
import { RoutesNames } from "./RoutesNames.enum";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RoutesNames.Home}
          component={HomePage}
          options={{ title: RoutesNames.Home, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name={RoutesNames.Player}
          component={VideoPlayerPage}
          options={{
            animation: "slide_from_right",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
