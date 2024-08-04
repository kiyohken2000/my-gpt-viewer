import React from "react";
import { View, StyleSheet, useWindowDimensions, ImageBackground } from "react-native";
import { colors } from "../theme";
import { calculateWidth } from "../utils/functions";

export default function DesktopContainer(props) {
  const { height } = useWindowDimensions()

  return (
    <View style={[styles.container, {height}]}>
      <ImageBackground
        style={styles.sideContentContainer}
        resizeMode='cover'
        source={require('../assets/images/logo-lg.png')}
      >

      </ImageBackground>
      <View style={[styles.contentContainer, { width: calculateWidth({height}),}]}>
        {props.children}
      </View>
      <ImageBackground
        style={styles.sideContentContainer}
        resizeMode='cover'
        source={require('../assets/images/logo-lg.png')}
      >

      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    height: '100%',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRightColor: colors.white,
    borderLeftColor: colors.white,
    zIndex: 1
  },
  sideContentContainer: {
    flex: 1,
  }
})