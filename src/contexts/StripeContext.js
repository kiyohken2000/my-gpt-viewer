import React, { createContext, useState } from 'react';

// 支払い状態を管理するためのコンテキスト
export const StripeContext = createContext({
  isReady: true,  // 常にtrueに設定
});

// コンテキストプロバイダーコンポーネント
export const StripeProvider = ({ children }) => {
  // 支払いリンク方式では特別な初期化は不要なので、常にreadyはtrue
  const contextValue = {
    isReady: true
  };
  
  return (
    <StripeContext.Provider value={contextValue}>
      {children}
    </StripeContext.Provider>
  );
};