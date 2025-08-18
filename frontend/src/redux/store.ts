import { configureStore } from "@reduxjs/toolkit"
import KnightsOwnerReducer from "./KnightsOwnerReducer"
import walletReducer from "./walletReducer"

const store = configureStore({
  reducer: {
    wallet: walletReducer,
    knightsOwner: KnightsOwnerReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
