import React from "react";
import { ScrollView, View, TouchableOpacity, Text, Modal, StyleSheet, Image, Dimensions } from "react-native";
import { colors } from "../../../theme";
import Button from "../../../components/Button";
import Element from "./Element";
import ArrowButton from "./ArrowButton";

const { height, width } = Dimensions.get('window')

export default function DetaileView(props) {
  const { item, visible, requestClose, currentIndex, lastImage, setCurrentIndex, searchPrompt } = props
  const { imageUrl, modelName, negativePrompt, prompt, viewerUrl, thumb } = item
  const isLast = lastImage.id === item.id
  
  const onLinkPress = () => {
    window.open(viewerUrl, '_blank');
  }

  const onArrowButtonPress = ({num}) => {
    setCurrentIndex(prev => prev + num)
  }

  return (
    <Modal
      visible={visible}
      onDismiss={requestClose}
      animationType='fade'
      onRequestClose={requestClose}
      transparent={false}
    >
      <View style={{flex: 1, paddingHorizontal: width * 0.01}}>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={{}}>
              <View style={[styles.arrowButtonContainer, {left: 1}]}>
                {currentIndex?
                  <ArrowButton
                    isLeft={true}
                    isRight={false}
                    onPress={() => onArrowButtonPress({num: -1})}
                  />:null
                }
              </View>
              <Image
                source={{uri: imageUrl}}
                resizeMode='cover'
                style={{
                  height: width * 0.9,
                  width: width * 0.9,
                  alignSelf: 'center',
                }}
              />
              <View style={[styles.arrowButtonContainer, {right: 1}]}>
                {!isLast?
                  <ArrowButton
                    isLeft={false}
                    isRight={true}
                    onPress={() => onArrowButtonPress({num: 1})}
                  />:null
                }
              </View>
            </View>
            <View style={{flex: 1}}>
              <Element
                label='モデル'
                content={modelName}
                searchPrompt=''
              />
              <Element
                label='プロンプト'
                content={prompt}
                searchPrompt={searchPrompt}
              />
              <Element
                label='ネガティブプロンプト'
                content={negativePrompt}
                searchPrompt=''
              />
            </View>
          </View>
        </ScrollView>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <View style={{flex: 1}}>
            <Button
              label='アップローダで開く'
              color={colors.purple}
              labelColor={colors.white}
              onPress={onLinkPress}
              disable={false}
            />
          </View>
          <View style={{paddingHorizontal: 10}} />
          <View style={{flex: 1}}>
            <Button
              label='閉じる'
              color={colors.darkPurple}
              labelColor={colors.white}
              onPress={requestClose}
              disable={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: colors.white,
  },
  linkText: {
    color: colors.purple,
    textDecorationLine: 'underline'
  },
  arrowButtonContainer: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    justifyContent: 'center' 
  }
})