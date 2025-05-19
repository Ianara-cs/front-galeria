import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommentType } from '../../../shared/types/CommentType'

export interface UserState {
  comments: CommentType[]
  comment?: CommentType
}

const initialState: UserState = {
  comments: [],
  comment: undefined,
}

export const commentSlice = createSlice({
  name: 'commentReducer',
  initialState,
  reducers: {
    setCommentsActions: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload
    },
    setCommentActions: (state, action: PayloadAction<CommentType | undefined>) => {
      state.comment = action.payload
    },
  },
})

export const { setCommentsActions, setCommentActions } = commentSlice.actions

export default commentSlice.reducer
