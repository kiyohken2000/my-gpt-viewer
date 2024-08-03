import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { colors, fontSize } from "../../theme";
import { AiOutlineLike } from "react-icons/ai";
import { RiArrowUpWideFill, RiArrowDownWideFill } from "react-icons/ri";
import Element from "../home/DetailView/Element";

const { width } = Dimensions.get('window')

export default function RenderItem(props) {
  const { like, id, imageUrl, modelName, negativePrompt, prompt } = props.item
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={{uri: imageUrl}}
          resizeMode='contain'
          style={isLoading?styles.unloadImage:styles.image}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading?
          <View style={styles.unloadContainer}>
            <ActivityIndicator
              size='large'
              color={colors.darkPurple}
            />
          </View>
          :null
        }
        <TouchableOpacity
          onPress={() => setIsOpen(!isOpen)}
          style={styles.button}
        >
          {!isOpen?
            <RiArrowDownWideFill size={35} color={colors.purple} />:
            <RiArrowUpWideFill size={35} color={colors.deeppink} />
          }
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{paddingRight: 10}}>
              <Text style={styles.like}>{like}</Text>
            </View>
            <View style={styles.likeIcon}>
              <AiOutlineLike size={35} color={colors.black} />
            </View>
          </View>
        </TouchableOpacity>
        {isOpen?
          <View style={{}}>
            <Element
              label='モデル'
              content={modelName}
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
          </View>
          :null
        }
      </View>
    </View>
  )
}

const circleRatio = 50
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  innerContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colors.gray
  },
  image: {
    height: width,
    width: width
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  like: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700'
  },
  likeIcon: {
    width: circleRatio,
    height: circleRatio,
    borderRadius: circleRatio/2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow
  },
  unloadImage: {
    width: 0,
    height: 0,
  },
  unloadContainer: {
    height: width,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  }
})