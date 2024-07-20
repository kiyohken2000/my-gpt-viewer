import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RiArrowDownWideFill } from "react-icons/ri";

export default function BottomSheetHeader(props) {
  const { onPress } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <RiArrowDownWideFill size={40} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})