import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ReactPlayer from "react-player";

export default function RenderVideo(props) {
  const { item } = props
  return(
    <View>
      <ReactPlayer
        url={item.videoUrl}
        width={"100%"}
        height={"100%"}
        playing={true} // 自動再生
        loop={false} // ループ再生
        controls={true} // 動画の操作が可能かどうか
      />
    </View>
  )
}