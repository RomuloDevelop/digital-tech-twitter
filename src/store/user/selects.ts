import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

const posts = (state: RootState) => state.postReducer
const actualUser = (state: RootState) => state.userReducer.actualUser

export const selectPostsCount = createSelector(
  [posts, actualUser],
  (posts, actualUser) => {
    const postList = posts.filter((post) => post.author === actualUser?.id)
    return postList ? postList.length : 0
  }
)

export const selectUser = (state: RootState) => state.userReducer.actualUser
export const selectUsers = (state: RootState) => state.userReducer.users
