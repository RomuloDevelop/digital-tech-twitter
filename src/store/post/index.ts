import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../user';

export interface Post {
  id: number
  image?: string
  message: string
  likes: Array<number>
  author: number
  create_at: Date
  location: string
  status: 'drafted' | 'deleted' | 'published';
}

const initialState: Post[] = []

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<Post, 'id'>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const newId = state.length ? state[state.length - 1].id + 1: 0
      state.push({...action.payload, id: newId})
    },
    remove: (state, action: PayloadAction<number>) => {
      state = state.filter((post) => post.id !== action.payload)
    },
    addLike: (state, action: PayloadAction<{postId: number, userId: number}>) => {
      const {postId, userId} = action.payload
      return state.map((post) => post.id === postId ? {
          ...post,
          likes: [...post.likes, userId]
        }:
        post
      )
    },
    removeLike: (state, action: PayloadAction<{postId: number, userId: number}>) => {
      const {postId, userId} = action.payload
      return state.map((post) => post.id === postId ? {
          ...post,
          likes: post.likes.filter((like) => like !== userId)
        }:
        post
      )
    }
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, addLike, removeLike } = postSlice.actions

export default postSlice.reducer