import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { RoutesNames } from "../routes/RoutesNames.enum";
import { useQuery } from "@apollo/client";
import { LIST_OF_ANIME } from "../api/graphql/anilist/listOfAnime";
import { IALListOfAnime } from "../interfaces";
import { darkStyle } from "../styles/darkMode.style";

const BrowsePage = ({ navigation }: any) => {
  const { loading, error, data } = useQuery<IALListOfAnime>(LIST_OF_ANIME);

  // if (loading) return null;
  // if (error) return `Error! ${error}`;
  if (loading) {
    console.log("loading");
  }

  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      <ScrollView style={styles.scrollView}>
        {data &&
          data.Page.media.map((anime, index) => {
            return (
              <Pressable
                key={index}
                style={[styles.card, darkStyle.card]}
                onPress={() => {
                  navigation.navigate(RoutesNames.Series, {
                    id: anime.id,
                    title: anime.title.romaji,
                  });
                }}
              >
                <Image
                  style={styles.poster}
                  source={{ uri: anime.coverImage.extraLarge }}
                />
                <Text numberOfLines={2} style={[styles.title, darkStyle.font]}>
                  {anime.title.romaji}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: 200,
    height: 300,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: 350,
    width: 200,
    marginVertical: 10,
  },
});

export default BrowsePage;
