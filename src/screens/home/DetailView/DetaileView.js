import React, { useState, useEffect } from "react";
import { ScrollView, View, TouchableOpacity, Text, Modal, StyleSheet, Image, Dimensions } from "react-native";
import { colors } from "../../../theme";
import Button from "../../../components/Button";
import Element from "./Element";
import ArrowButton from "./ArrowButton";
import ReactionButtons from "./ReactionButtons";
import { db } from "../../../firebase";
import { doc, updateDoc, increment } from 'firebase/firestore';

const { height, width } = Dimensions.get('window')

export default function DetaileView(props) {
  const [isLikePressed, setIsLikePressed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { item, visible, requestClose, currentIndex, lastImage, setCurrentIndex, searchPrompt } = props
  const { imageUrl, modelName, negativePrompt, prompt, viewerUrl, thumb, like, dislike, id } = item
  const isLast = lastImage.id === item.id

  useEffect(() => {
    setIsLikePressed(false)
  }, [item])
  
  const onLinkPress = () => {
    window.open(viewerUrl, '_blank');
  }

  const onArrowButtonPress = ({num}) => {
    setCurrentIndex(prev => prev + num)
  }

  const onLikePress = async() => {
    try {
      setIsLoading(true)
      const docRef = doc(db, 'images', id);
      await updateDoc(docRef, {
        like: increment(1)
      });
      setIsLikePressed(true)
    } catch(e) {
      console.log('on like press error', e)
    } finally {
      setIsLoading(false)
    }
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
              <ReactionButtons
                like={like}
                onLikePress={onLikePress}
                isLikePressed={isLikePressed}
                isLoading={isLoading}
              />
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