import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { colors, fontSize } from "../../theme";
import { storeLinks, version } from "../../config";

export default function Links() {

  const onLinkPress = ({url}) => {
    window.open(url, '_blank');
  }

  return (
    <ScreenTemplate>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.itemContainer}>
          <Text style={styles.label}>ガチ有能AI助手画像ビューア</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>スマホアプリ「ガチ有能AI助手」で生成された画像はこのウェブサイトに掲載されます。</Text>
          <View style={styles.elementContainer}>
            <TouchableOpacity
              onPress={() => onLinkPress({url: storeLinks.appStore})}
            >
              <Image
                source={require('../../assets/images/appstore.png')}
                resizeMode='contain'
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={{paddingHorizontal: 10}} />
            <TouchableOpacity
              onPress={() => onLinkPress({url: storeLinks.googlePlay})}
            >
              <Image
                source={require('../../assets/images/googleplay.png')}
                resizeMode='contain'
                style={styles.image2}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>アプリ内で生成された楽曲はSunoで一覧できます。</Text>
          <TouchableOpacity
            onPress={() => onLinkPress({url: storeLinks.suno})}
          >
            <Image
              source={require('../../assets/images/suno.png')}
              resizeMode='contain'
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>アプリのサーバー使用料はご支援いただいた寄付金で賄っています。Buy me a coffeeよりご支援いただけますと幸いです。</Text>
          <TouchableOpacity
            onPress={() => onLinkPress({url: storeLinks.bmc})}
          >
            <Image
              source={require('../../assets/images/bmc-button.png')}
              resizeMode='contain'
              style={styles.image3}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>感想・要望はXへどうぞ</Text>
          <TouchableOpacity
            onPress={() => onLinkPress({url: storeLinks.twitter})}
          >
            <Text style={styles.linkText}>@votepurchase</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionLabel}>version: {version}</Text>
        </View>
      </ScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: colors.lightsteelblue,
    paddingVertical: 10,
    width: '100%'
  },
  elementContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.large,
    textAlign: 'center'
  },
  label: {
    fontSize: fontSize.xxxLarge,
    fontWeight: '700',
    textAlign: 'center'
  },
  linkText: {
    fontSize: fontSize.large,
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: colors.blueLight
  },
  versionLabel: {
    fontSize: fontSize.small
  },
  versionContainer: {
    alignItems: 'center'
  },
  image: {
    height: 70,
    width: 150
  },
  image2: {
    height: 70,
    width: 180
  },
  image3: {
    height: 70,
    width: 170
  },
})