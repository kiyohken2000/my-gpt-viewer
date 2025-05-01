import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { fontSize, colors } from "../../theme";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { formatData } from "../../utils/functions";
import { googleSheetUrl } from "../../config";

export default function SearchArea(props) {
  const { searchPrompt, setSearchPrompt, onClear } = props
  const [isSearchEnable, setIsSearchEnable] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      try {
        const { data } = await axios.get(googleSheetUrl)
        const _data = formatData({data})
        setIsSearchEnable(_data[0].searchEnable === '1')
      } catch(e) {
        console.log('Search Area FetchData Error', e)
      }
    }
    fetchData()
  }, [])

  const onChangeText = (text) => {
    setSearchPrompt(text)
  }

  if(isSearchEnable) {
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={searchPrompt}
        placeholder='資金不足のため検索機能を無効にしています'
        maxLength={100}
        placeholderTextColor={colors.gray}
        editable={false}
      />
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