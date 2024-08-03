import React from "react";
import { View, StyleSheet, Text, useWindowDimensions, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { fontSize, colors } from "../../../theme";
import Button from "../../../components/Button";
import BottomSheetHeader from "./BottomSheetHeader";

export default function BottomSheetContent(props) {
  const { tags, addTag, myPrompt, clearTag, copyToClipboard, requestClose } = props
  const { height } = useWindowDimensions()

  return (
    <View style={[styles.container, { height: height * 0.91}]}>
      <BottomSheetHeader
        onPress={requestClose}
      />
      <View style={styles.innerContainer}>
        <View style={{flex: 2}}>
          <FlatList
            data={tags}
            keyExtractor={item => item}
            numColumns={1}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.tagContainer}
                onPress={() => addTag({item})}
              >
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 10}}>
          <ScrollView style={styles.promptContainer}>
            <Text style={styles.tagText}>{myPrompt}</Text>
          </ScrollView>
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            <View style={{flex: 1}}>
              <Button
                label='クリア'
                color={colors.deeppink}
                labelColor={colors.white}
                onPress={clearTag}
                disable={!myPrompt}
              />
            </View>
            <View style={{paddingHorizontal: 10}} />
            <View style={{flex: 1}}>
              <Button
                label='コピー'
                color={colors.darkPurple}
                labelColor={colors.white}
                onPress={copyToClipboard}
                disable={!myPrompt}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  tagContainer: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 3,
    backgroundColor: colors.aquamarine
  },
  tagText: {
    fontSize: fontSize.middle,
  },
  promptContainer: {
    borderWidth: 1,
    borderColor: colors.purple,
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
})