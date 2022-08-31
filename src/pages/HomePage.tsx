import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { RoutesNames } from "../routes/RoutesNames.enum";

const HomePage = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Button
        title="Play video"
        onPress={() =>
          navigation.navigate(RoutesNames.Player, { videoTitle: "Jane" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});

export default HomePage;
