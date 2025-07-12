import { useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

const { height } = Dimensions.get('window')

const ExoClickAd = () => {
  const adContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  useEffect(() => {
    // ① JSスクリプト読み込み
    const script1 = document.createElement('script');
    script1.src = 'https://a.magsrv.com/ad-provider.js';
    script1.async = true;
    script1.type = 'application/javascript';
    document.body.appendChild(script1);

    // ② 広告読み込み命令（zone ID に注意）
    const script2 = document.createElement('script');
    script2.innerHTML = '(AdProvider = window.AdProvider || []).push({"serve": {}});';
    document.body.appendChild(script2);

    return () => {
      // オプション：クリーンアップ（任意）
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ins
        className="eas6a97888e10"
        data-zoneid="5673452"
        ref={adContainerRef}
        style={{ display: 'block', width: dimensions.width, height: dimensions.height }} // 広告サイズに応じて調整
      ></ins>
    </View>
  );
};

export default ExoClickAd;

const styles = StyleSheet.create({
  container: {
  }
})