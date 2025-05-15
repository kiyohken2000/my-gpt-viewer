import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Button from "../../components/Button";
import { fontSize, colors } from "../../theme";
import { isAddButtonCondition } from "./functions";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { stripeLinkAdd } from "../../config";

export default function AddWord(props) {
  const { safeWords } = props
  const [text, setText] = useState('')
  const [isProcess, setIsProcess] = useState(false)

  const onChangeText = (input) => {
    setText(input)
  }
  
  // コンポーネントのマウント時とアンマウント時の処理
  useEffect(() => {
    console.log("AddWord マウント: 定期チェックを開始します");
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
      const storedItem = localStorage.getItem('currentAddingWord');
      console.log("ローカルストレージのアイテム:", storedItem);
      
      // 支払い完了後の処理
      if (success === 'add' && storedItem) {
        console.log('支払い成功パラメータを検出! 削除処理を実行します');
        
        // URLパラメータをクリア（履歴を残さないように）
        window.history.replaceState({}, document.title, window.location.pathname);
        
        setIsProcess(true);
        
        // 少し遅延させて確実に実行
        try {
          await addWordToSafeWordList(storedItem);
          // 成功したらローカルストレージをクリア
          localStorage.removeItem('currentAddingWord');
          
        } catch (error) {
          console.error("削除処理中にエラーが発生:", error);
        } finally {
          setIsProcess(false);
        }
      } else if (success === 'false') {
        console.log('支払いキャンセルパラメータを検出');
        
        // ローカルストレージをクリア
        localStorage.removeItem('currentAddingWord');
        
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

  // Stripe Checkoutを開始
  const handlePayment = async () => {
    setIsProcess(true)
    console.log("支払い処理開始 - 支払いリンクへリダイレクト");
    // ローカルストレージに現在の項目を保存（リダイレクト後も状態を維持するため）
    try {
      localStorage.setItem('currentAddingWord', text);
    } catch (e) {
      console.log("ローカルストレージへの保存に失敗:", e);
    }
    window.location.href = stripeLinkAdd;
    // 注意: この後のコードはリダイレクトにより実行されません
    setIsProcess(false)
  };

  const addWordToSafeWordList = async(storedItem) => {
      try {
        const wordsDocRef = doc(db, "ngwords", "words");
        const docSnap = await getDoc(wordsDocRef);
        if (!docSnap.exists()) {
          console.log("ドキュメントが存在しません");
          return;
        }
        await updateDoc(wordsDocRef, {
          word_list: arrayUnion(storedItem)
        });
        toast('NGワードを追加しました')
        setText('')
      } catch (error) {
        console.log("単語の削除中にエラーが発生しました:", error);
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>NGワードを追加します</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          maxLength={15}
          placeholder="10〜15文字"
          placeholderTextColor={colors.gray}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label='追加(¥50)'
          color={colors.purple}
          labelColor={colors.white}
          onPress={handlePayment}
          disable={isProcess || isAddButtonCondition({text, safeWords})}
        />
      </View>
      <Toaster />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontSize.middle,
  },
  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    paddingHorizontal: 10,
  }
})