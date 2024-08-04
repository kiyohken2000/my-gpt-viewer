import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import BottomTab from "./BottomTab";
import { colors } from "../theme";
import DesktopContainer from "./DesktopContainer";

export default function ScreenTemplate(props) {
  const { height, width } = useWindowDimensions()

  if(width >= 1024) {
    return (
      <DesktopContainer>
        <View style={{flex: 1}}>
          {props.children}
        </View>
        <BottomTab />
      </DesktopContainer>
    )
  }

  return (
    <View style={[styles.container, {height, width}]}>
      <View style={{flex: 1}}>
        {props.children}
      </View>
      <BottomTab />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }
})