import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '../../../shared/types/UserType'

export interface UserState {
  users: UserType[]
}

const initialState: UserState = {
  users: [],
}

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUsersActions: (state, action: PayloadAction<UserType[]>) => {
      state.users = action.payload
    },
  },
})

export const { setUsersActions } = userSlice.actions

export default userSlice.reducer
