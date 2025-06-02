import React from "react";
import ScreenTemplate from '../../components/ScreenTemplate'
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { colors, fontSize } from "../../theme";

export default function PreContents(props) {
  const { onPress } = props

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.label}>※NSFW画像が含まれます</Text>
        </View>
        <Button
          label='画像を表示する'
          color={colors.darkPurple}
          labelColor={colors.white}
          onPress={onPress}
          disable={false}
        />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    paddingBottom: 10
  },
  label: {
    fontSize: fontSize.large,
    fontWeight: '700',
  }
})