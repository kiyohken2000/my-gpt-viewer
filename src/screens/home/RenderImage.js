import React, { useState } from "react";
import { TouchableOpacity, Image, Dimensions, StyleSheet, ActivityIndicator, View, Text } from "react-native";
import { colors, fontSize } from "../../theme";
import { AiOutlineLike } from "react-icons/ai";

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
      <View style={styles.likeContainer}>
        <View style={{paddingRight: 3}}>
          <Text style={styles.likeLabel}>{item.like}</Text>
        </View>
        <AiOutlineLike color={colors.black} size={15} />
      </View>
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
    width: width / 3.05,
    height: width / 3.05,
    margin: 1,
    resizeMode: 'cover',
  },
  unloadImage: {
    width: 0,
    height: 0,
  },
  container: {
    width: width / 3.05,
    height: width / 3.05,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  likeContainer: {
    backgroundColor: colors.yellow,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.floralwhite
  },
  likeLabel: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.black
  }
})