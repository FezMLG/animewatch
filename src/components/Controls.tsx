import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

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
              <Button
                title="- 5"
                onPress={() =>
                  props.video.current.setPositionAsync(
                    props.status.positionMillis - skipValue
                  )
                }
              />
              <Button
                hasTVPreferredFocus={true}
                title={props.status.isPlaying ? "Pause" : "Play"}
                onPress={() =>
                  props.status.isPlaying
                    ? props.video.current.pauseAsync()
                    : props.video.current.playAsync()
                }
              />
              <Button
                title="+ 5"
                onPress={() =>
                  props.video.current.setPositionAsync(
                    props.status.positionMillis + skipValue
                  )
                }
              />
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  touchArea: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "#DDDDDD",
    flex: 1,
    height: "100%",
    width: "100%",
  },
  controls: {
    flexDirection: "row",
  },
});

export default Controls;
