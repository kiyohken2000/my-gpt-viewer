import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../components/Button";
import { colors, fontSize } from "../../theme";
import toast, { Toaster } from 'react-hot-toast';

const prompt = '1girl, chibi, green eyes, orange very long hair, messy hair, ahoge, hair between eyes, cat fluff ears, striped tail, white frilly blouse, black ribbon tie, beige long skirt,'

export default function Nimonyan() {

  const onButtonPress = async() => {
    await navigator.clipboard.writeText(prompt);
    toast('基本セットをコピーしました')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>にもにゃん基本セット</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{prompt}</Text>
      </View>
      <View style={styles.tipsContainer}>
        <Text style={styles.tips}>Tips</Text>
        <Text style={styles.text}>・必要に応じて、:3 や　fang を追加する</Text>
        <Text style={styles.text}>・chibi を除くと一般的な頭身になる</Text>
        <Text style={styles.text}>・white_frilly以降の3要素が服装に関するものなので着替えはここを変える</Text>
      </View>
      <View>
        <Button
          label='基本セットをコピー'
          color={colors.deeppink}
          labelColor={colors.white}
          onPress={onButtonPress}
          disable={false}
        />
      </View>
      <Toaster />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  label: {
    fontSize: fontSize.large,
  },
  text: {
    fontSize: fontSize.middle,
  },
  title: {
    fontSize: fontSize.xxLarge,
    fontWeight: '700'
  },
  tips: {
    fontSize: fontSize.middle,
    fontWeight: '700',
  },
  titleContainer: {
    paddingVertical: 10,
  },
  labelContainer: {
    borderWidth: 1,
    borderColor: colors.darkPurple,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tipsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
})