import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: number
  avatar?: string
  username: string
  name: string
  surname: string
}

export interface UserState {
  users: User[],
  actualUser: User | null
}

type UserUpdate = Partial<Omit<User, 'id'>> & Pick<User, 'id'>

const initialState: UserState = {
  users: [],
  actualUser: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const newId = state.users.length ? state.users[state.users.length - 1].id + 1 : 0
      state.users.push({...action.payload, id: newId})
    },
    update: (state, action: PayloadAction<UserUpdate>) => {
      return {
        ...state,
        users: [...state.users.map((user) =>
          user.id === action.payload.id ?
          {...user, ...action.payload} :
          user
        )]
      }
    },
    setActualUser: (state, action: PayloadAction<User | null>) => {
      state.actualUser = action.payload
    },
    updateActualUser: (state, action: PayloadAction<UserUpdate>) => {
      state.actualUser = state.actualUser ? {...state.actualUser, ...action.payload}: null
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, update, setActualUser, updateActualUser } = userSlice.actions

export default userSlice.reducer