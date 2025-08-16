import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from './store';

  
interface WalletState {
    value: string
}

const initialState: WalletState = {
    value: localStorage.getItem('wallet') ?? ""
}
  
export const walletReducer = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
      upload: (state, action: PayloadAction<string>) => {
        state.value = action.payload
      }
    }
});
  


export const { upload } = walletReducer.actions
export const selectWallet = (state: RootState) => state.wallet.value
export default walletReducer.reducer