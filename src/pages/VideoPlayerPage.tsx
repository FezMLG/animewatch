import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import Controls from "../components/Controls";
import { getCDAVideoUrl } from "../api/getCDAVideoUrl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as ScreenOrientation from "expo-screen-orientation";

const VideoPlayerPage = ({ navigation, route }: any) => {
  const { title, uri } = route.params;
  const { isLoading, data } = useQuery(["episodes" + title], () =>
    getCDAVideoUrl(uri)
  );
  const DEBUG = false;
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  let { isTV } = Platform;
  if (DEBUG) {
    isTV = !isTV;
  }

  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  return (
    <View style={styles.container}>
      {data ? (
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: data
              ? data
              : "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls={!isTV}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay
          onPlaybackStatusUpdate={setStatus}
          onFullscreenUpdate={setOrientation}
        />
      ) : (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      )}
      {isTV && (
        <Controls
          status={status}
          video={video}
          title={route.params.videoTitle}
        />
      )}
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

export default VideoPlayerPage;
