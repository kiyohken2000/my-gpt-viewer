import React from "react";
import Routes from "./route/Routes";
import { InitializeContextProvider } from './contexts/InitializeContext'
import { UserContextProvider } from './contexts/UserContext'
import ReactGA from "react-ga4";

export default function App() {
  ReactGA.initialize("G-LGQ98DGFM0")

  return (
    <InitializeContextProvider>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </InitializeContextProvider>
  )
}