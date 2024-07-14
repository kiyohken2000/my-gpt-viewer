import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions, Image } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import RenderImage from "./RenderImage";

export default function Home() {
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchImages = async() => {
      const imagesCollectionRef = collection(db, "images")
      const q = query(imagesCollectionRef, orderBy("createdAt", "desc"), limit(50))
      const querySnapshot = await getDocs(q)
      const items = querySnapshot.docs.map((doc) => doc.data())
      setImages(items)
    }
    fetchImages()
  }, [])

  return (
    <ScreenTemplate>
      <FlatList 
        data={images}
        keyExtractor={(item, index) => item.id}
        numColumns={5}
        renderItem={({item}) => {
          return <RenderImage item={item} />
        }}
      />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
})