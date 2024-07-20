import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { collection, getDocs, query, limit, orderBy, startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import RenderImage from "./RenderImage";
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css';
import OpenButton from "./BottomSheetContent/OpenButton";
import BottomSheetContent from "./BottomSheetContent/BottomSheetContent";
import { getTags } from "./functions";
import toast, { Toaster } from 'react-hot-toast';

const imageCadence = 18

export default function Home() {
  const [images, setImages] = useState([])
  const [lastDoc, setLastDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState([])
  const [myPrompt, setMyPrompt] = useState('')

  const fetchImages = async(lastVisible = null) => {
    if (loading || allLoaded) return
    setLoading(true)
    const imagesCollectionRef = collection(db, "images")
    let q = query(imagesCollectionRef, orderBy("createdAt", "desc"), limit(imageCadence))
    if (lastVisible) {
      q = query(imagesCollectionRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(imageCadence))
    }
    const querySnapshot = await getDocs(q)
    const items = querySnapshot.docs.map((doc) => doc.data())
    if (items.length < imageCadence) {
      setAllLoaded(true)
    }
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setImages(prevImages => [...prevImages, ...items])
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    const tags = getTags({images})
    setTags(tags)
  }, [images])

  const loadMore = () => {
    if (!allLoaded) {
      fetchImages(lastDoc)
    }
  }

  const addTag = ({item}) => {
    if(myPrompt) {
      setMyPrompt(prev => `${prev}, ${item}`)
    } else {
      // 最初のタグ
      setMyPrompt(item)
    }
  }

  const clearTag = () => {
    setMyPrompt('')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myPrompt);
      toast('プロンプトをコピーしました')
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <ScreenTemplate>
      <FlatList 
        data={images}
        keyExtractor={(item, index) => item.id}
        numColumns={3}
        renderItem={({item}) => {
          return <RenderImage item={item} />
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          loading ? <Text>Loading...</Text> : null
        )}
      />
      <OpenButton onPress={() => setOpen(true)} />
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.95
        ]}
        expandOnContentDrag={false}
        blocking={false}
        scrollLocking={false}
        header={false}
      >
        <BottomSheetContent
          tags={tags}
          addTag={addTag}
          myPrompt={myPrompt}
          clearTag={clearTag}
          copyToClipboard={copyToClipboard}
          requestClose={() => setOpen(false)}
        />
        <Toaster />
      </BottomSheet>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
})