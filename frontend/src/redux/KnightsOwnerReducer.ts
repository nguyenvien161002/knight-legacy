import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import knightApi from "../api/KnightApi";

interface DataKnight {
    _id: string
    name: string
    owner: string
    knightID: number
    tokenURI: string
    dna: string
    image: string
    createdAt:string
    updatedAt: string
    attackTime: number
    level: number
    lostCount: number
    sexTime: number
    winCount: number
}
type ListKnight = {
    value : DataKnight[]
}

const initialState: ListKnight = {
    value: []
}
  
export const KnightsOwnerReducer = createSlice({
    name: 'knights-of-owner',
    initialState,
    reducers: {
      update: (state, action: PayloadAction<DataKnight[]>) => {
        state.value = action.payload
      }
    },
    extraReducers: builder => {
      builder.addCase(getKnightsOfOwner.pending, (state, action) => {
                console.log(state);
              })
             .addCase(getKnightsOfOwner.fulfilled, (state, action) => {
              state.value = action.payload
             })
    }
});

export const getKnightsOfOwner = createAsyncThunk("get-knights-of-owner", async (owner: string): Promise<DataKnight[]> => {
    if(owner == "") {
      return []
    } else {
      const knights = await knightApi.getAll({owner})
        .then((res : any) => res.knightsOfOwner)
        .catch((error: any) => {
          console.log(error)
          return []
        });
      return knights
    }
});


export const { update } = KnightsOwnerReducer.actions
export default KnightsOwnerReducer.reducer