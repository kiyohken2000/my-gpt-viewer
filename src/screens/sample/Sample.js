import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import Nimonyan from "./Nimonyan";
import SampleImages from "./SampleImages";

export default function Sample() {
  return (
    <ScreenTemplate>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Nimonyan/>
        <SampleImages/>
      </ScrollView>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})