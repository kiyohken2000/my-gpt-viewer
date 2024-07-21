import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";
import { colors } from "../../../theme";

export default function ArrowButton(props) {
  const { isLeft, isRight, onPress } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      {isLeft?
        <RiArrowLeftWideFill size={40} color={colors.white} />
        :null
      }
      {isRight?
        <RiArrowRightWideFill size={40} color={colors.white} />
        :null
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 44/2,
    backgroundColor: colors.darkPurple,
    alignItems: 'center',
    justifyContent: 'center'
  }
})