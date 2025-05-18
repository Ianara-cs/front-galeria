import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserType } from '../../../shared/types/UserType'

export interface UserState {
  participants: UserType[]
  participant?: UserType
}

const initialState: UserState = {
  participants: [],
  participant: undefined,
}

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setParticipantsActions: (state, action: PayloadAction<UserType[]>) => {
      state.participants = action.payload
    },
    setParticipantActions: (state, action: PayloadAction<UserType | undefined>) => {
      state.participant = action.payload
    },
  },
})

export const { setParticipantsActions, setParticipantActions } = userSlice.actions

export default userSlice.reducer
