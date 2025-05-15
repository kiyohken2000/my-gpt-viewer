import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import { InitializeContext } from '../../contexts/InitializeContext'
import { UserContext } from "../../contexts/UserContext";
import { loadStripe } from '@stripe/stripe-js';

export default function Initialize() {
  const { setIsInitialized } = useContext(InitializeContext)
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    const initialize = async () => {
      try {
        // ユーザー情報の設定
        const userData = {
          id: 'user-1234',
          userName: 'abcdef'
        };
        setUser(userData);

      } catch(e) {
        console.log('初期化エラー:', e);
      } finally {
        // すべての初期化処理が完了
        setIsInitialized(true);
      }
    };
    initialize();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  label: {
    fontSize: fontSize.xxLarge,
    fontWeight: '500'
  }
})