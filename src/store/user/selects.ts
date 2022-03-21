import type { RootState } from '../../store'

export const selectUser = (state: RootState) => state.userReducer.actualUser
export const selectUsers = (state: RootState) => state.userReducer.users
export const selectUserById = (state: RootState, id: number) => state.userReducer.users.find(item => item.id === id)