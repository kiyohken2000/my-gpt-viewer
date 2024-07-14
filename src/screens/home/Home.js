import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import Button from '../../components/Button'
import { useNavigate } from "react-router-dom";
import { colors, fontSize } from "../../theme";
import { UserContext } from '../../contexts/UserContext'

export default function Home() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const onButtonPress = () => {
    navigate('/detail')
  }

  const onLogoutPress = () => {
    setUser('')
  }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Text style={styles.label}>Home</Text>
        <View style={{width: '50%'}}>
          <Button
            label='Go Detail'
            onPress={onButtonPress}
            color={colors.lightPurple}
            desable={false}
            labelColor={colors.white}
          />
          <View style={{paddingVertical: 10}} />
          <Button
            label='Logout'
            onPress={onLogoutPress}
            color={colors.aquamarine}
            desable={false}
            labelColor={colors.black}
          />
        </View>
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  label: {
    fontSize: fontSize.xxLarge,
    fontWeight: '500'
  }
})