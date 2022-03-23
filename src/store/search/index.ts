import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      return action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = searchSlice.actions

export default searchSlice.reducer