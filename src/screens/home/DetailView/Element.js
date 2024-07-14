import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontSize } from "../../../theme";

export default function Element(props) {
  const { label, content } = props

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  label: {
    fontSize: fontSize.xxLarge
  },
  content: {
    fontSize: fontSize.large
  }
})