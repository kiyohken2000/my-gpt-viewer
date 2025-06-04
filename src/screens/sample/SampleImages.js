import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { sampleData } from "./sampleData";
import { colors, fontSize } from "../../theme";
import RenderItem from "./RenderItem";

export default function SampleImages() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>モデル別参考画像</Text>
        {sampleData.filter(v => v.visible).map((item, i) => {
          return (
            <RenderItem
              key={item.id}
              item={item}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  titleContainer: {
    paddingVertical: 10,
  },
  title: {
    fontSize: fontSize.xxLarge,
    fontWeight: '700'
  }
})