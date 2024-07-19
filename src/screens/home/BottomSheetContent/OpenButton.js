import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RiArrowUpWideFill } from "react-icons/ri";

export default function OpenButton(props) {
  const { onPress } = props

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <RiArrowUpWideFill size={40} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  }
})