import React, { createContext, useState } from "react";

export const PageContext = createContext();

export const PageContextProvider = (props) => {
  const [count, setCount] = useState(0)

  return (
    <PageContext.Provider
      value={{
        count, setCount
      }}
    >
      {props.children}
    </PageContext.Provider>
  )
}