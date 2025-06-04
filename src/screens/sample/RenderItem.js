import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors, fontSize } from "../../theme";
import { RiArrowUpWideFill, RiArrowDownWideFill } from "react-icons/ri";
import Element from "../home/DetailView/Element";
import { calculateDesktopWidth } from "../../utils/functions";

export default function RenderItem(props) {
  const { label, prompt, negativePrompt, imageUrl, baseModel } = props.item
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  if(!visible) {
    return (
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.invisibleContainer}
      >
        <View style={{flex: 1}}>
          <Text style={styles.title}>{label}</Text>
        </View>
        <View>
          <RiArrowDownWideFill size={35} color={colors.purple} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setVisible(false)}
        style={styles.header}
      >
        <View style={{flex: 1}}>
          <Text style={styles.title}>{label}</Text>
        </View>
        <View>
          <RiArrowUpWideFill size={35} color={colors.purple} />
        </View>
      </TouchableOpacity>
      <Image
        source={{uri: imageUrl}}
        resizeMode='contain'
        style={isLoading?styles.unloadImage:{width: calculateDesktopWidth({}), height: calculateDesktopWidth({})}}
        onLoad={() => setIsLoading(false)}
      />
      {isLoading?
        <View style={[styles.unloadContainer, {width: calculateDesktopWidth({}), height: calculateDesktopWidth({})}]}>
          <ActivityIndicator
            size='large'
            color={colors.darkPurple}
          />
        </View>
        :null
      }
      <Element
        label='モデル名'
        content={label}
        searchPrompt=''
      />
      <Element
        label='プロンプト'
        content={prompt}
        searchPrompt=''
      />
      <Element
        label='ネガティブプロンプト'
        content={negativePrompt}
        searchPrompt=''
      />
      <Element
        label='ベースモデル'
        content={baseModel}
        searchPrompt=''
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.blueLight,
  },
  invisibleContainer: {
    borderBottomWidth: 1,
    borderColor: colors.blueLight,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: '700'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  unloadImage: {
    width: 0,
    height: 0,
  },
  unloadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})