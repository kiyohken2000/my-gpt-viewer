import React, { useState } from "react";
import { TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import DetaileView from "./DetailView/DetaileView";

const { width } = Dimensions.get('window')

export default function RenderImage(props) {
  const { item } = props
  const [visible, setVisible] = useState(false)
 
  return (
    <>
    <TouchableOpacity
      onPress={() => setVisible(!visible)}
    >
      <Image
        source={{ uri: item.thumb }}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
    <DetaileView
      item={item}
      visible={visible}
      onClose={() => setVisible(false)}
    />
    </>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: width / 5,
    height: width / 5,
    margin: 1,
    resizeMode: 'cover',
  }
})