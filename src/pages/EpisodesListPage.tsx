import {
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RoutesNames } from "../routes/RoutesNames.enum";
import { LIST_OF_ANIME } from "../api/graphql/anilist/listOfAnime";
import { IALListOfAnime, IFrixySeries } from "../interfaces";
import { searchForTitle } from "../api/rest/frixy/searchForTitle";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTitle } from "../api/rest/frixy/getTitle";
export interface Episode {
  id: string;
  title: string;
  description: string;
  number: number;
  banner: string;
  players: LinkElement[];
  added_at: string;
  last_edit: string;
  poster: string;
}

export interface LinkElement {
  name: string;
  link: string;
}

const EpisodesListPage = ({ navigation, route }: any) => {
  // const data = searchForTitle(route.params.title);
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery([route.params.title], () =>
    getTitle(route.params.title)
  );
  const [series, setSeries] = useState<IFrixySeries>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data &&
          data.episodes.map((episode: Episode) => {
            return (
              <Pressable
                key={episode.id}
                style={styles.card}
                // onPress={() => {
                //   navigation.navigate(RoutesNames.Series, {
                //     id: anime.id,
                //     title: anime.title.romaji,
                //   });
                // }}
              >
                <Image style={styles.poster} source={{ uri: episode.poster }} />
                <Text numberOfLines={2} style={styles.title}>
                  {episode.title}
                </Text>
                {episode.players.map((player: LinkElement) => {
                  return (
                    <Pressable
                      key={episode.id}
                      style={styles.card}
                      // onPress={() => {
                      //   navigation.navigate(RoutesNames.Series, {
                      //     id: anime.id,
                      //     title: anime.title.romaji,
                      //   });
                      // }}
                    >
                      <Text style={styles.title}>{player.name}</Text>
                      <Text style={styles.title}>{player.link}</Text>
                    </Pressable>
                  );
                })}
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
    height: 450,
    width: 200,
    backgroundColor: "red",
    marginVertical: 10,
  },
});

export default EpisodesListPage;
