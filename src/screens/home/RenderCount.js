import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";

export default function RenderCount(props) {
  const { images, recordCount } = props

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{images.length} / {recordCount} 表示中</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.middle
  }
})