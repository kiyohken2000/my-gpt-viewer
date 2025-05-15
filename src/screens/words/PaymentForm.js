import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fontSize } from "../../theme";
import Button from "../../components/Button";
import { stripeLink } from "../../config";

// 支払いフォームコンポーネント
export default function PaymentForm({ item, onPaymentCancel }) {
  const [isProcess, setIsProcess] = useState(false);

  // Stripe Checkoutを開始
  const handlePayment = async () => {

    console.log("支払い処理開始 - 支払いリンクへリダイレクト");
    
    // ローカルストレージに現在の項目を保存（リダイレクト後も状態を維持するため）
    try {
      localStorage.setItem('currentPaymentItem', item);
    } catch (e) {
      console.warn("ローカルストレージへの保存に失敗:", e);
    }
    window.location.href = stripeLink;
    // 注意: この後のコードはリダイレクトにより実行されません
  };

  return (
    <View style={styles.paymentContainer}>
      <Text style={styles.paymentTitle}>「{item}」の削除料金をお支払いください</Text>
      <Text style={styles.paymentDescription}>
        「削除を実行」ボタンをクリックすると、Stripeの安全な決済ページに移動します。
        支払いが完了すると、自動的にこのページに戻ります。
      </Text>
      <View style={styles.buttonGroup}>
        <Button
          label={isProcess ? '処理中...' : '削除を実行（¥50）'}
          color={colors.deeppink}
          labelColor={colors.white}
          onPress={handlePayment}
          disable={isProcess}
        />
        <Button
          label='キャンセル'
          color={colors.lightPurple}
          labelColor={colors.white}
          onPress={onPaymentCancel}
          disable={isProcess}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 8,
    margin: 10,
  },
  paymentTitle: {
    fontSize: fontSize.medium,
    fontWeight: '600',
    marginBottom: 15,
  },
  cardElementContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.lightgray,
    borderRadius: 4,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});