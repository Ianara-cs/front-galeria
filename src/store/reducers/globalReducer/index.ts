import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationType } from '../../../shared/types/NotificationType'
import { UserType } from '../../../shared/types/UserType'

export interface GlobalState {
  notification?: NotificationType
  user?: UserType
}

const initialState: GlobalState = {
  notification: undefined,
  user: undefined,
}

export const globalSlice = createSlice({
  name: 'globalReduce',
  initialState,
  reducers: {
    setNotificationActions: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload
    },
    setUserActions: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload
    },
  },
})

export const { setNotificationActions, setUserActions } = globalSlice.actions

export default globalSlice.reducer
