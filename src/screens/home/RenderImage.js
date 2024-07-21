import React from "react";
import { TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window')

export default function RenderImage(props) {
  const { item, onPress } = props
 
  return (
    <>
    <TouchableOpacity
      onPress={onPress}
    >
      <Image
        source={{ uri: item.thumb }}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: width / 3,
    height: width / 3,
    margin: 1,
    resizeMode: 'cover',
  }
})