import React from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from "react-native";
import { colors, fontSize } from "../../../theme";
import { AiOutlineLike } from "react-icons/ai";

export default function ReactionButtons(props) {
  const { like, onLikePress, isLoading } = props
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{like}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={onLikePress}
      >
        {!isLoading?
          <AiOutlineLike size={35} color={colors.black} />:
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
  labelContainer: {
    paddingRight: 10
  },
  button: {
    width: circleRatio,
    height: circleRatio,
    borderRadius: circleRatio/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow
  },
  labelContainer: {
    paddingRight: 10
  }
})