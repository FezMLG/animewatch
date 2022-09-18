import "react-native/tvos-types.d";
import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { RoutesNames } from "../routes/RoutesNames.enum";
import { useQuery } from "@apollo/client";
import { LIST_OF_ANIME } from "../api/graphql/anilist/listOfAnime";
import { IALListOfAnime, Media } from "../interfaces";
import { darkColor, darkStyle } from "../styles/darkMode.style";
import BrowseElement from "./BrowseElement";

const BrowsePage = ({ navigation }: any) => {
  const { loading, error, data } = useQuery<IALListOfAnime>(LIST_OF_ANIME);

  // if (loading) return null;
  // if (error) return `Error! ${error}`;
  return (
    <SafeAreaView style={[styles.container, darkStyle.background]}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data?.Page.media}
          renderItem={({ item }) => (
            <BrowseElement anime={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
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
  wrapperFocused: {
    borderColor: "purple",
    borderWidth: 1,
  },
});

export default BrowsePage;
