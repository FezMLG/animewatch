import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";
import VideoPlayerPage from "../pages/VideoPlayerPage";
import { RoutesNames } from "./RoutesNames.enum";
import BrowsePage from "../pages/BrowsePage";
import SeriesPage from "../pages/SeriesPage";

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
        <Stack.Screen
          name={RoutesNames.Browse}
          component={BrowsePage}
          options={{
            title: RoutesNames.Browse,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name={RoutesNames.Series}
          component={SeriesPage}
          options={({ route }: any) => ({
            title: route.params.title,
            animation: "slide_from_right",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
