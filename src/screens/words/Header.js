import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontSize, colors } from "../../theme";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>NGワード</Text>
      <Text style={styles.caption}>これらが含まれていると画像生成できません</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkPurple,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  label: {
    fontSize: fontSize.xxxLarge,
    color: colors.white
  },
  caption: {
    fontSize: fontSize.middle,
    color: colors.floralwhite,
  }
})