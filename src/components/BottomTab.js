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
      >
        <FaImages size={fontSize.xxxLarge} color={location.pathname === '/'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate('/like')
        }}
      >
        <AiOutlineLike size={fontSize.xxxLarge} color={location.pathname === '/like'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate('/links')
        }}
      >
        <IoInformationCircleOutline size={fontSize.xxxLarge} color={location.pathname === '/links'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: colors.gray
  }
})