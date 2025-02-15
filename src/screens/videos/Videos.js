import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ScreenTemplate from '../../components/ScreenTemplate'
import ReactGA from "react-ga4";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore"
import RenderVideo from "./RenderVideo";

export default function Videos() {
  ReactGA.send({ hitType: "pageview", page: "/videos" });
  const [videos, setVideos] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideos = async (isInitial = false) => {
    if (loading || (!isInitial && !hasMore)) return;

    try {
      setIsLoading(true);
      const videoCollectionRef = collection(db, 'videos');
      
      let q = query(
        videoCollectionRef,
        orderBy('timpstamp', 'desc'),
        limit(10)
      );

      // 2回目以降の読み込みでは、最後のドキュメントの後から取得
      if (!isInitial && lastDoc) {
        q = query(
          videoCollectionRef,
          orderBy('timpstamp', 'desc'),
          startAfter(lastDoc),
          limit(5)
        );
      }

      const result = await getDocs(q);
      const newVideos = result.docs.map(doc => ({
        ...doc.data(),
        id: doc.id  // documentのIDも保存
      }));

      // 最後のドキュメントを保存
      const lastVisible = result.docs[result.docs.length - 1];
      setLastDoc(lastVisible);
      
      // 新しいデータがない場合は hasMore を false に
      if (newVideos.length < 5) {
        setHasMore(false);
      }

      // 初回読み込みかどうかで、配列の更新方法を変える
      setVideos(prev => isInitial ? newVideos : [...prev, ...newVideos]);
    } catch(e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(true);  // 初回読み込み
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchVideos(false);
    }
  };

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <RenderVideo item={item} />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (
            loading ? <Text>Loading...</Text> : 
            !hasMore && videos.length > 0 ? <Text>No more videos</Text> : null
          )}
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