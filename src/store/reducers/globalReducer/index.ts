import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NotificationType } from '../../../shared/types/NotificationType'
import { PaginationType } from '../../../shared/types/PaginationType'
import { UserType } from '../../../shared/types/UserType'

export interface GlobalState {
  notification?: NotificationType
  user?: UserType
  paginate?: PaginationType
}

const initialState: GlobalState = {
  notification: undefined,
  user: undefined,
  paginate: { totalData: 0 },
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
    setPaginateActions: (state, action: PayloadAction<PaginationType>) => {
      state.paginate = action.payload
    },
  },
})

export const { setNotificationActions, setUserActions, setPaginateActions } = globalSlice.actions

export default globalSlice.reducer
