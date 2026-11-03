import { combineReducers, configureStore } from '@reduxjs/toolkit'
import postReducer, { Post } from './post'
import userReducer, { UserState } from './user'
import searchReducer from './search'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  postReducer,
  userReducer,
  searchReducer
})

export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      blacklist: ['searchReducer'],
      storage
    },
    rootReducer
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState {
  postReducer: Post[]
  userReducer: UserState
  searchReducer: string
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);