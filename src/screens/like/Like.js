import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import algoliasearch from 'algoliasearch/lite';
import { algoliaKey } from "../../apiKey";
import ReactGA from "react-ga4";
import RenderItem from "./RenderItem";
import toast, { Toaster } from 'react-hot-toast';

const searchClient = algoliasearch(
  algoliaKey.appID,
  algoliaKey.secret
);
const index = searchClient.initIndex('image_firestore_like');

export default function Like() {
  ReactGA.send({ hitType: "pageview", page: "/like" });
  const [images, setImages] = useState([])

  const fetchImages = async() => {
    try {
      const { hits } = await index.search('', {
        hitsPerPage: 50,
        cacheable: false,
      });
      const _hits = hits.filter((v) => v.like > 0)
      setImages(_hits)
      toast('いいねの多い最大50件を表示しています')
    } catch(e) {
      console.log('fetch images error', e)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <ScreenTemplate>
      <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <RenderItem item={item} rank={index + 1} />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      </View>
      <Toaster />
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})