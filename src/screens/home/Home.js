import React, { useEffect, useState, useRef } from "react";
import { Text, FlatList, View } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import { collection, getDocs, query, limit, orderBy, startAfter, where } from "firebase/firestore";
import { db } from "../../firebase";
import RenderImage from "./RenderImage";
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css';
import OpenButton from "./BottomSheetContent/OpenButton";
import BottomSheetContent from "./BottomSheetContent/BottomSheetContent";
import { getTags } from "./functions";
import toast, { Toaster } from 'react-hot-toast';
import DetaileView from "./DetailView/DetaileView";
import SearchArea from "./SearchArea";
import algoliasearch from 'algoliasearch/lite';
import { algoliaKey } from "../../apiKey";

const searchClient = algoliasearch(
  algoliaKey.appID,
  algoliaKey.secret
);
const index = searchClient.initIndex('image_firestore');

const imageCadence = 18

export default function Home() {
  const flatListRef = useRef(null);
  const [images, setImages] = useState([])
  const [lastImage, setLastImage] = useState('')
  const [lastDoc, setLastDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allLoaded, setAllLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState([])
  const [myPrompt, setMyPrompt] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(null)
  const [searchPrompt, setSearchPrompt] = useState('')

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const fetchImages = async (page = 0, prompt = "") => {
  if (loading || allLoaded) return;
  setLoading(true);

  try {
    let searchParams = {
      hitsPerPage: imageCadence,
      page: page,
      attributesToRetrieve: ['id', 'imageUrl', 'modelName', 'negativePrompt', 'prompt', 'thumb', 'viewerUrl'],
      attributesToHighlight: ['prompt'],
      highlightPreTag: '<em>',
      highlightPostTag: '</em>',
    };

    if (prompt) {
      searchParams.restrictSearchableAttributes = ['prompt'];
    }

    const { hits, page: currentPage, nbPages } = await index.search(prompt, {
      ...searchParams,
      cacheable: false,
    });

    const items = hits.map(hit => ({
      ...hit,
      id: hit.objectID,
      highlightedPrompt: hit._highlightResult?.prompt?.value
    }));

    if (currentPage + 1 >= nbPages) {
      setAllLoaded(true);
    }

    setLastDoc(currentPage);
    setImages(prevImages => page === 0 ? items : [...prevImages, ...items]);
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    setAllLoaded(false);
    setLastDoc(-1);
    fetchImages(0, searchPrompt).then(() => {
      scrollToTop();
    });
  }, [searchPrompt])

  useEffect(() => {
    const tags = getTags({images})
    setTags(tags)
  }, [images])

  const loadMore = () => {
    if (!allLoaded) {
      fetchImages(lastDoc + 1, searchPrompt);
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

  useEffect(() => {
    const _currentImage = images[currentIndex]
    if(!_currentImage) return
    setCurrentImage(_currentImage)
    setModalVisible(true)
  }, [currentIndex])

  useEffect(() => {
    const _lastImage = images.slice(-1)[0]
    if(!_lastImage) return
    setLastImage(_lastImage)
  }, [images])

  const onImagePress = ({index}) => {
    setCurrentIndex(index)
  }

  const requestClose = () => {
    setCurrentImage('')
    setCurrentIndex(null)
    setModalVisible(false)
  }

  return (
    <ScreenTemplate>
      <SearchArea
        searchPrompt={searchPrompt}
        setSearchPrompt={setSearchPrompt}
        onClear={() => {
          setAllLoaded(false)
          setSearchPrompt('')
        }}
      />
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => item.id}
        numColumns={3}
        renderItem={({item, index}) => {
          return (
            <RenderImage 
              item={item} 
              onPress={() => onImagePress({index})}
            />
        )}}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          loading ? <Text>Loading...</Text> : null
        )}
      />
      <DetaileView
        item={currentImage}
        visible={modalVisible}
        requestClose={requestClose}
        currentIndex={currentIndex}
        lastImage={lastImage}
        setCurrentIndex={setCurrentIndex}
        searchPrompt={searchPrompt}
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
