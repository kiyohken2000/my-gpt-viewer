import React, { useContext } from "react";
import { View } from "react-native";
import Contents from "./Contents";
import PreContents from "../home/PreContents";
import { UserContext } from "../../contexts/UserContext";

export default function Like() {
  const { homeVisible, setHomeVisible } = useContext(UserContext)

  if(homeVisible) {
    return (
      <Contents/>
    )
  }

  return (
    <PreContents
      onPress={() => setHomeVisible(true)}
    />
  )
}