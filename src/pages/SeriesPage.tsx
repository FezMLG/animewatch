import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  Button,
} from "react-native";
import React from "react";
import { RoutesNames } from "../routes/RoutesNames.enum";
import { useQuery } from "@apollo/client";
import { IALTitleInfo } from "../interfaces";
import { TITLE_INFO } from "../api/graphql/anilist/titleInfo";
import WebView from "react-native-webview";

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
    console.log(data.Media.trailer);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data && (
          <>
            <Image
              style={styles.banner}
              source={{ uri: data.Media.bannerImage }}
            />
            <Button
              title={"List of episodes"}
              onPress={() => {
                navigation.navigate(RoutesNames.Episodes, {
                  title: data.Media.title.romaji,
                });
              }}
            />
            <Text>{data.Media.description}</Text>
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              source={{
                uri: `https://www.youtube.com/embed/${data.Media.trailer.id}`,
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    height: 400,
    width: "100%",
    maxWidth: 600,
    aspectRatio: 16 / 9,
  },
  scrollView: {
    // marginHorizontal: 20,
  },
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
