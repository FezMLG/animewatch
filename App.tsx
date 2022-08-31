import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoPlayerPage from "./src/pages/VideoPlayerPage";
import HomePage from "./src/pages/HomePage";
import { RoutesNames } from "./src/enums/RoutesNames.enum";

const Stack = createNativeStackNavigator();

const App = () => {
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

export default App;
