import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import ReactGA from "react-ga4";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore"
import RenderItem from "./RenderItem";
import Header from "./Header";
import AddWord from "./AddWord";

export default function Words() {
  ReactGA.send({ hitType: "pageview", page: "/like" });
  const [words, setWords] = useState([]);
  const [safeWords, setSafeWords] = useState([])

  useEffect(() => {
    const wordsDocRef = doc(db, "ngwords", "words");
    
    const unsubscribe = onSnapshot(wordsDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const wordsData = docSnapshot.data();
        setWords(wordsData.word_list);
        setSafeWords(wordsData.safe_word_list)
      } else {
        // ドキュメントが存在しない場合
        console.log("No such document!");
        setWords([]);
        setSafeWords([])
      }
    }, (error) => {
      console.log("Error listening to document: ", error);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <Header/>
        <FlatList
          data={words}
          renderItem={({item, index}) => (
            <RenderItem item={item} />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <AddWord safeWords={safeWords} />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})