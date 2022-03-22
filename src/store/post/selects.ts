import { createSelector } from '@reduxjs/toolkit'
import produce from 'immer'
import { Post } from '.'
import type { RootState } from '../../store'
import { User } from '../user'

export interface PostUser extends Omit<Post, 'likes' | 'author'> {
  likes: User[]
  author: User
}

const posts = (state: RootState) => state.postReducer as unknown as (Omit<Post, 'likes' | 'author'> & {likes: User[] | number[], author: User | number})[]
const search = (state: RootState) => state.searchReducer
const users = (state: RootState) => state.userReducer.users

export const selectPosts = createSelector(
  [posts, search, users],
  (posts, search, users) => {
    return produce(posts, initialList => {
      let result = []
      if (!search) result = initialList
      result = initialList
      .map((post) => ({
        ...post,
        author: users.find((user) => user.id === post.author) as User
      }))
      .filter((post) => {
        const regex = new RegExp(search.toLowerCase())
        return post.status === 'published' && (regex.test(post.message.toLowerCase()) || regex.test(post.author.username.toLowerCase()))
      })
      return result
      .map((post) => ({
        ...post,
        likes: post.likes.map((id) => users.find((user) => user.id === id)) as User[]
      }))
      .sort((a, b) => new Date(b.create_at).getTime() - new Date(a.create_at).getTime())
    }) as PostUser[]
  }
)