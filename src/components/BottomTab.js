import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fontSize } from "../theme";
import { FaImages } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { PageContext } from "../contexts/PageContext";

export default function BottomTab() {
  const location = useLocation()
  const navigate = useNavigate()
  const { setCount } = useContext(PageContext)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCount(prev => prev + 1)
          navigate('/')
        }}
      >
        <FaImages size={fontSize.xxxLarge} color={location.pathname === '/'?colors.purple:colors.darkPurple} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCount(prev => prev + 1)
          navigate('/like')
        }}
      >
        <AiOutlineLike size={fontSize.xxxLarge} color={location.pathname === '/like'?colors.purple:colors.darkPurple} />
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