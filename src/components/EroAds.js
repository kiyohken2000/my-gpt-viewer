import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

const EroAds = ({ 
  spaceId = "8173173", 
  width = "300", 
  height = "50",
  className = "",
  style = {}
}) => {
  const adContainerRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  useEffect(() => {
    // スクリプトが既に読み込まれている場合は広告を表示
    if (window.eaCtrl) {
      displayAd();
      return;
    }

    // スクリプトがまだ読み込まれていない場合は読み込む
    if (!scriptLoadedRef.current) {
      loadEroAdsScript();
      scriptLoadedRef.current = true;
    }
  }, [spaceId]);

  const loadEroAdsScript = () => {
    // 既存のスクリプトタグをチェック
    const existingScript = document.querySelector('script[src*="go.easrv.cl"]');
    if (existingScript) {
      // スクリプトが既に存在する場合は、読み込み完了を待つ
      existingScript.onload = displayAd;
      return;
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = `//go.easrv.cl/loadeactrl.go?pid=152118&spaceid=${spaceId}&ctrlid=798192`;
    script.onload = displayAd;
    script.onerror = () => {
      console.error('Ero-Ads script failed to load');
    };
    
    document.head.appendChild(script);
  };

  const displayAd = () => {
    if (window.eaCtrl && adContainerRef.current) {
      try {
        window.eaCtrl.add({
          "display": `sp_${spaceId}_node`,
          "sid": parseInt(spaceId),
          "plugin": "banner"
        });
      } catch (error) {
        console.error('Error displaying Ero-Ads:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <div 
        ref={adContainerRef}
        id={`sp_${spaceId}_node`}
        className={className} 
        style={{ 
          width: width + 'px', 
          height: height + 'px', 
          ...style 
        }}
      >
        &nbsp;
      </div>
    </View>
  );
};

export default EroAds;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})