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
import { ITitleInfo } from "../interfaces";
import { TITLE_INFO } from "../graphql/api/anilist/titleInfo";

const SeriesPage = ({ navigation, route }: any) => {
  const { id, title } = route.params;
  const { loading, error, data } = useQuery<ITitleInfo>(TITLE_INFO, {
    variables: {
      id,
    },
  });

  // if (loading) return null;
  // if (error) return `Error! ${error}`;
  if (loading) {
    console.log("loading");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data && (
          <Pressable
            style={styles.card}
            onPress={() => {
              navigation.navigate(RoutesNames.Watch, {
                title: data.Media.title.romaji,
              });
            }}
          >
            <Image
              style={styles.poster}
              source={{ uri: data.Media.coverImage.extraLarge }}
            />
            <Text numberOfLines={2} style={styles.title}>
              {data.Media.title.romaji}
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  poster: {
    width: 200,
    height: 300,
  },
  title: {
    width: 200,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  card: {
    height: 350,
    width: 200,
    backgroundColor: "red",
    marginVertical: 10,
  },
});

export default SeriesPage;
