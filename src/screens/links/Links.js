import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import Footer from "../../components/Footer/Footer";
import { colors, fontSize } from "../../theme";

export default function Links() {
  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.label}>関連リンク</Text>
        <Footer/>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: fontSize.large,
    fontWeight: '700'
  }
})