import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { storeLinks } from "../../config";

export default function Footer() {

  const onLinkPress = ({url}) => {
    window.open(url, '_blank');
  }

  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.container}>
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
      <TouchableOpacity
        onPress={() => onLinkPress({url: storeLinks.bmc})}
      >
        <Image
          source={require('../../assets/images/bmc-button.png')}
          resizeMode='contain'
          style={styles.image2}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 150
  },
  image2: {
    height: 70,
    width: 180
  }
})