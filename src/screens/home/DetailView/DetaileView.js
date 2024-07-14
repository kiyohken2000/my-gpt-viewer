import React from "react";
import { ScrollView, View, TouchableOpacity, Text, Modal, StyleSheet, Image, Dimensions } from "react-native";
import { colors } from "../../../theme";
import Button from "../../../components/Button";
import Element from "./Element";

const { height, width } = Dimensions.get('window')

export default function DetaileView(props) {
  const { item, visible, onClose } = props
  const { imageUrl, modelName, negativePrompt, prompt, viewerUrl, thumb } = item
  
  const onLinkPress = () => {
    window.open(viewerUrl, '_blank');
  }

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      animationType='fade'
      onRequestClose={onClose}
      transparent={false}
    >
      <View style={{flex: 1, paddingHorizontal: width * 0.01}}>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              source={{uri: imageUrl}}
              resizeMode='cover'
              style={{
                height: width * 0.9,
                width: width * 0.9
              }}
            />
            <View style={{flex: 1}}>
              <Element
                label='モデル'
                content={modelName}
              />
              <Element
                label='プロンプト'
                content={prompt}
              />
              <Element
                label='ネガティブプロンプト'
                content={negativePrompt}
              />
            </View>
          </View>
        </ScrollView>
        <Button
          label='アップローダで開く'
          color={colors.purple}
          labelColor={colors.white}
          onPress={onLinkPress}
          disable={false}
        />
        <View style={{paddingVertical: 5}} />
        <Button
          label='閉じる'
          color={colors.darkPurple}
          labelColor={colors.white}
          onPress={onClose}
          disable={false}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  linkText: {
    color: colors.purple,
    textDecorationLine: 'underline'
  }
})