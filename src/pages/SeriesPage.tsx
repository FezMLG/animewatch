import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Button,
  View,
} from "react-native";
import React from "react";
import { RoutesNames } from "../routes/RoutesNames.enum";
import { useQuery } from "@apollo/client";
import { IALTitleInfo } from "../interfaces";
import { TITLE_INFO } from "../api/graphql/anilist/titleInfo";
import WebView from "react-native-webview";
import { darkStyle } from "../styles/darkMode.style";
import { globalStyle } from "../styles/global.style";

const SeriesPage = ({ navigation, route }: any) => {
  const { id, title } = route.params;
  const { loading, error, data } = useQuery<IALTitleInfo>(TITLE_INFO, {
    variables: {
      id,
    },
  });

  // if (loading) return null;
  // if (error) return `Error! ${error}`;
  if (loading) {
    console.log("loading");
  }

  if (data) {
  }

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      {data && (
        <ScrollView style={styles.scrollView}>
          <Image
            style={[styles.banner]}
            source={{ uri: data.Media.bannerImage }}
          />
          <View style={styles.body}>
            <View style={[globalStyle.spacer]}></View>
            <Button
              title={"List of episodes"}
              onPress={() => {
                navigation.navigate(RoutesNames.Episodes, {
                  title: data.Media.title.romaji,
                });
              }}
            />
            <Text style={[darkStyle.font, globalStyle.spacer]}>
              {data.Media.description}
            </Text>
            <WebView
              style={[styles.webview, globalStyle.spacer]}
              javaScriptEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${data.Media.trailer.id}`,
              }}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    width: "100%",
    maxWidth: 600,
    aspectRatio: 16 / 9,
  },
  scrollView: {},
  poster: {
    width: 200,
    height: 300,
  },
  title: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 30,
  },
  body: {
    paddingHorizontal: 20,
  },
  card: {
    height: 350,
    width: 200,
    backgroundColor: "red",
    marginVertical: 10,
  },
  banner: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
});

export default SeriesPage;
