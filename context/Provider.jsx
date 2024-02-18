"use client"
import React from "react"
import { persister, store } from "@/store/store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const ProviderContext = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}

export default ProviderContext
