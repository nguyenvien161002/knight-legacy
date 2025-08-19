import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import knightApi from "../api/KnightApi"
import { DataKnight } from "../type"

type ListKnight = {
  value: DataKnight[]
}

const initialState: ListKnight = {
  value: [],
}

export const KnightsOwnerReducer = createSlice({
  name: "knights-of-owner",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<DataKnight[]>) => {
      state.value = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKnightsOfOwner.pending, (state, action) => {
        console.log(state)
      })
      .addCase(getKnightsOfOwner.fulfilled, (state, action) => {
        state.value = action.payload
      })
  },
})

export const getKnightsOfOwner = createAsyncThunk(
  "get-knights-of-owner",
  async (owner: string): Promise<DataKnight[]> => {
    if (owner == "") {
      return []
    } else {
      const knights = await knightApi
        .getAllKnightByOwner({ owner })
        .then((res: any) => {
          console.log(res.data)
          return res.data
        })
        .catch((error: any) => {
          console.log(error)
          return []
        })
      return knights
    }
  },
)

export const { update } = KnightsOwnerReducer.actions
export default KnightsOwnerReducer.reducer
