import React, { useState } from "react";
import { ScrollView, View, Modal, StyleSheet, Image, Dimensions } from "react-native";
import { colors } from "../../../theme";
import Button from "../../../components/Button";
import Element from "./Element";
import ArrowButton from "./ArrowButton";
import ReactionButtons from "./ReactionButtons";
import { db } from "../../../firebase";
import { doc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { calculateDesktopWidth } from "../../../utils/functions";
import EroAds from "../../../components/EroAds";

const { height, width } = Dimensions.get('window')

export default function DetaileView(props) {
  const [isLoading, setIsLoading] = useState(false)
  const { item, visible, requestClose, currentIndex, lastImage, setCurrentIndex, searchPrompt, setImages } = props
  const { imageUrl, modelName, negativePrompt, prompt, viewerUrl, thumb, like, dislike, id } = item
  const isLast = lastImage.id === item.id
  
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
      const _res = await getDoc(docRef)
      const { like } = _res.data()
      setImages(prev => {
        const result = prev.map((item) => {
          if(item.id === id) {
            return {
              ...item,
              like,
            }
          } else {
            return item
          }
        })
        return result
      })
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
      transparent={true}
    >
      <View style={{flex: 1, paddingHorizontal: calculateDesktopWidth({}) * 0.01, alignItems: 'center'}}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
                  height: calculateDesktopWidth({}) * 0.9,
                  width: calculateDesktopWidth({}) * 0.9,
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
        <View style={{flexDirection: 'row', paddingBottom: 10, width: calculateDesktopWidth({}), backgroundColor: colors.white, paddingHorizontal: 10}}>
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
    width: calculateDesktopWidth({}),
    backgroundColor: colors.white
  },
  innerContainer: {
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
  },
})