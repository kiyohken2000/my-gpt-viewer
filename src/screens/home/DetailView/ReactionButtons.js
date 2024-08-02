import React from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { colors, fontSize } from "../../../theme";
import { AiOutlineLike } from "react-icons/ai";

export default function ReactionButtons(props) {
  const { onLikePress, isLikePressed, isLoading } = props
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: isLikePressed?colors.yellow:colors.lightPurple}]}
        disabled={isLikePressed}
        onPress={onLikePress}
      >
        {!isLoading?
          <AiOutlineLike size={35} color={isLikePressed?colors.black:colors.white} />:
          <ActivityIndicator size='small' color={colors.deeppink} />
        }
      </TouchableOpacity>
    </View>
  )
}

const circleRatio = 50
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20,
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  },
  button: {
    width: circleRatio,
    height: circleRatio,
    borderRadius: circleRatio/2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    paddingRight: 10
  }
})