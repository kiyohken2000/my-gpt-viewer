import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fontSize } from "../theme";
import { FaImages } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomTab() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigate('/')
        }}
        style={styles.item}
      >
        <FaImages size={fontSize.xxxLarge} color={location.pathname === '/'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate('/like')
        }}
        style={styles.item}
      >
        <AiOutlineLike size={fontSize.xxxLarge} color={location.pathname === '/like'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate('/links')
        }}
        style={styles.item}
      >
        <IoInformationCircleOutline size={fontSize.xxxLarge} color={location.pathname === '/links'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: colors.gray
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})