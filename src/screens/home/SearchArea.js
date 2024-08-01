import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { fontSize, colors } from "../../theme";
import { IoIosCloseCircle } from "react-icons/io";

export default function SearchArea(props) {
  const { searchPrompt, setSearchPrompt, onClear } = props

  const onChangeText = (text) => {
    setSearchPrompt(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={searchPrompt}
        placeholder='プロンプトを検索'
        maxLength={100}
        placeholderTextColor={colors.gray}
      />
      {searchPrompt?
        <TouchableOpacity
          onPress={onClear}
          style={{paddingLeft: 10}}
        >
          <IoIosCloseCircle size={40} />
        </TouchableOpacity>
        :null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: colors.darkPurple,
    fontSize: fontSize.middle,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1
  }
})