import React, { useEffect, useState } from "react";
import { Text, StyleSheet, FlatList } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { collection, getDocs, query, limit, orderBy, startAfter } from "firebase/firestore";
import { db } from "../../firebase";
import RenderImage from "./RenderImage";

export default function Home() {
  const [images, setImages] = useState([])
  const [lastDoc, setLastDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)

  const fetchImages = async(lastVisible = null) => {
    if (loading || allLoaded) return
    setLoading(true)
    const imagesCollectionRef = collection(db, "images")
    let q = query(imagesCollectionRef, orderBy("createdAt", "desc"), limit(15))
    if (lastVisible) {
      q = query(imagesCollectionRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(15))
    }
    const querySnapshot = await getDocs(q)
    const items = querySnapshot.docs.map((doc) => doc.data())
    if (items.length < 15) {
      setAllLoaded(true)
    }
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setImages(prevImages => [...prevImages, ...items])
    setLoading(false)
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const loadMore = () => {
    if (!allLoaded) {
      fetchImages(lastDoc)
    }
  }

  return (
    <ScreenTemplate>
      <FlatList 
        data={images}
        keyExtractor={(item, index) => item.id}
        numColumns={5}
        renderItem={({item}) => {
          return <RenderImage item={item} />
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          loading ? <Text>Loading...</Text> : null
        )}
      />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
})