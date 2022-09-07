import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { darkColor, darkStyle } from "../styles/darkMode.style";

const fontSize = 20;

const Controls = (props: { status: any; video: any; title?: string }) => {
  const skipValue = 5 * 1000;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showControls = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  return (
    <TouchableWithoutFeedback onPress={showControls}>
      <View style={styles.touchArea}>
        {isVisible && (
          <>
            <Text>{props.title}</Text>
            <View style={styles.controls}>
              <Pressable
                style={[styles.controlButton, darkStyle.background]}
                onPress={() =>
                  props.video.current.setPositionAsync(
                    props.status.positionMillis - skipValue
                  )
                }
              >
                <Text style={[darkStyle.font, styles.controlText]}>
                  <Ionicons
                    name="play-back"
                    size={fontSize}
                    color={darkColor.Font}
                  />{" "}
                  - 5
                </Text>
              </Pressable>
              <Pressable
                style={[styles.controlButton, darkStyle.background]}
                hasTVPreferredFocus={true}
                onPress={() =>
                  props.status.isPlaying
                    ? props.video.current.pauseAsync()
                    : props.video.current.playAsync()
                }
              >
                <Text style={[darkStyle.font, styles.controlText]}>
                  {props.status.isPlaying ? (
                    <Ionicons
                      name="pause"
                      size={fontSize}
                      color={darkColor.Font}
                    />
                  ) : (
                    <Ionicons
                      name="play"
                      size={fontSize}
                      color={darkColor.Font}
                    />
                  )}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.controlButton, darkStyle.background]}
                onPress={() =>
                  props.video.current.setPositionAsync(
                    props.status.positionMillis + skipValue
                  )
                }
              >
                <Text style={[darkStyle.font, styles.controlText]}>
                  + 5{" "}
                  <Ionicons
                    name="play-forward"
                    size={fontSize}
                    color={darkColor.Font}
                  />
                </Text>
              </Pressable>
              <Pressable
                style={[styles.controlButton, darkStyle.background]}
                onPress={() =>
                  props.video.current.setPositionAsync(
                    props.status.positionMillis + 80000
                  )
                }
              >
                <Text style={[darkStyle.font, styles.controlText]}>
                  Skip intro{" "}
                  <Ionicons
                    name="play-skip-forward"
                    size={fontSize}
                    color={darkColor.Font}
                  />
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  controlText: {
    fontSize,
  },
  controlButton: {
    minWidth: 100,
    minHeight: 40,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  touchArea: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "#DDDDDD",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Controls;
