import React, { useState } from "react";
import { TouchableOpacity, Image, Dimensions, StyleSheet, ActivityIndicator, View } from "react-native";
import { colors } from "../../theme";

const { width } = Dimensions.get('window')

export default function RenderImage(props) {
  const { item, onPress } = props
  const [isLoading, setIsLoading] = useState(true)
 
  return (
    <>
    <TouchableOpacity
      onPress={onPress}
    >
      <Image
        source={{ uri: item.thumb }}
        style={isLoading?styles.unloadImage:styles.imageStyle}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading?
        <View style={styles.container}>
          <ActivityIndicator
            size='large'
            color={colors.darkPurple}
          />
        </View>
        :null
      }
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
  },
  unloadImage: {
    width: 0,
    height: 0,
  },
  container: {
    width: width / 3,
    height: width / 3,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})