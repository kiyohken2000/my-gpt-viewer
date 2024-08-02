import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import BottomTab from "./BottomTab";

export default function ScreenTemplate(props) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {props.children}
      </View>
      <BottomTab />
    </View>
  )
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width
  }
})