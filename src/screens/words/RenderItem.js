import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontSize, colors } from "../../theme";
import Button from "../../components/Button";
import { StripeContext } from "../../contexts/StripeContext";
import PaymentForm from "./PaymentForm";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";

export default function RenderItem(props) {
  const { item } = props
  const [isProcess, setIsProcess] = useState(false)
  const { isReady } = useContext(StripeContext);  // 簡略化したコンテキストを使用
  const [showPayment, setShowPayment] = useState(false);

  // コンポーネントのマウント時とアンマウント時の処理
  useEffect(() => {
    console.log("PaymentForm マウント: 定期チェックを開始します");
    checkUrlParams();
  }, []);

  // URLパラメータを確認する関数
  const checkUrlParams = async() => {
    try {
      // URLからパラメータを取得
      const url = window.location.href;
      const query = new URLSearchParams(window.location.search);
      const success = query.get('success');
      
      console.log("現在のURL:", url);
      console.log("検出されたURLパラメータ:", {
        success: success,
        rawQuery: window.location.search
      });
      
      // ローカルストレージから保存されたアイテムを取得
      const storedItem = localStorage.getItem('currentPaymentItem');
      console.log("ローカルストレージのアイテム:", storedItem);
      
      // 支払い完了後の処理
      if (success === 'true' && storedItem === item) {
        console.log('支払い成功パラメータを検出! 削除処理を実行します');
        
        // URLパラメータをクリア（履歴を残さないように）
        window.history.replaceState({}, document.title, window.location.pathname);
        
        setIsProcess(true);
        
        // 少し遅延させて確実に実行
        try {
          await removeWordFromWordList();
          // 成功したらローカルストレージをクリア
          localStorage.removeItem('currentPaymentItem');
          
        } catch (error) {
          console.error("削除処理中にエラーが発生:", error);
        } finally {
          setIsProcess(false);
        }
      } else if (success === 'false') {
        console.log('支払いキャンセルパラメータを検出');
        
        // ローカルストレージをクリア
        localStorage.removeItem('currentPaymentItem');
        
        // URLパラメータをクリア
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        console.log('通常表示 - 決済処理は実行しません');
      }
    } catch (error) {
      console.error("URLパラメータ解析エラー:", error);
    } finally {
    }
  };
    
  const removeWordFromWordList = async() => {
    try {
      const wordsDocRef = doc(db, "ngwords", "words");
      const docSnap = await getDoc(wordsDocRef);
      if (!docSnap.exists()) {
        console.log("ドキュメントが存在しません");
        return;
      }
      await updateDoc(wordsDocRef, {
        word_list: arrayRemove(item)
      });
      
      console.log(`"${item}" をword_listから削除しました`);
    } catch (error) {
      console.log("単語の削除中にエラーが発生しました:", error);
    }
  };

  const onButtonPress = async () => {
    // 支払いフォームを表示
    setShowPayment(true);
  };

  // 支払い成功時の処理
  const handlePaymentSuccess = async () => {
  };

  // 支払いキャンセル時の処理
  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  return (
    <View style={styles.container}>
      {!showPayment ? (
        // 通常表示時
        <View style={styles.innerContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>{item}</Text>
          </View>
          <View>
            <Button
              label='解除'
              color={colors.deeppink}
              labelColor={colors.white}
              onPress={onButtonPress}
              disable={isProcess}
            />
          </View>
        </View>
      ) : (
        // 支払いフォーム表示時
        <PaymentForm 
          item={item}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentCancel={handlePaymentCancel}
        />
      )}
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  innerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    width: '100%',
    backgroundColor: colors.gray,
    height: 1,
  },
  label: {
    fontSize: fontSize.large,
    fontWeight: '700'
  }
})