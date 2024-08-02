import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import algoliasearch from 'algoliasearch/lite';
import { algoliaKey } from "../../apiKey";
import ReactGA from "react-ga4";
import RenderItem from "./RenderItem";
import { PageContext } from "../../contexts/PageContext";

const searchClient = algoliasearch(
  algoliaKey.appID,
  algoliaKey.secret
);
const index = searchClient.initIndex('image_firestore_like');

export default function Like() {
  ReactGA.send({ hitType: "pageview", page: "/like" });
  const [images, setImages] = useState([])
  const { count } = useContext(PageContext)

  const fetchImages = async() => {
    try {
      const { hits } = await index.search('', {
        hitsPerPage: 50,
        cacheable: false,
      });
      setImages(hits)
    } catch(e) {
      console.log('fetch images error', e)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [count])

  return (
    <ScreenTemplate>
      <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <RenderItem item={item} />
        )}
        keyExtractor={item => item.id}
      />
      </View>
    </ScreenTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})