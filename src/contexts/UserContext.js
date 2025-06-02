import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState('')
  const [homeVisible, setHomeVisible] = useState(false)

  return (
    <UserContext.Provider
      value={{
        user, setUser,
        homeVisible, setHomeVisible,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}