import { StyleSheet, View, Platform } from "react-native";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import Controls from "../components/Controls";

const VideoPlayerPage = ({ navigation, route }: any) => {
  const DEBUG = false;
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});
  let { isTV } = Platform;
  if (DEBUG) {
    isTV = !isTV;
  }

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        useNativeControls={!isTV}
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        shouldPlay
        onPlaybackStatusUpdate={setStatus}
      />
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
