import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize } from "../../../theme";

export default function Element(props) {
  const { label, content, searchPrompt } = props

  const highlightText = (text, highlight) => {
    if (!text || typeof text !== 'string') {
      return null; // または適切なフォールバック、例えば <Text>No content</Text>
    }
    
    if (!highlight || typeof highlight !== 'string' || !highlight.trim()) {
      return <Text style={styles.content}>{text}</Text>;
    }
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text style={styles.content}>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={i} style={styles.highlight}>
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {highlightText(content, searchPrompt)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: fontSize.xxLarge,
  },
  content: {
    fontSize: fontSize.large
  },
  highlight: {
    backgroundColor: colors.purple,
    color: colors.white,
    fontSize: fontSize.large
  }
})