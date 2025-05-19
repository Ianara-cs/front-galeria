import { useDispatch } from 'react-redux'

import { CommentType } from '../../../shared/types/CommentType'
import { useAppSelector } from '../../hooks'
import { setCommentActions, setCommentsActions } from '.'

export const useCommentReducer = () => {
  const dispatch = useDispatch()
  const { comments, comment } = useAppSelector((state) => state.commentReducer)

  const setComments = (currentComments: CommentType[]) => {
    dispatch(setCommentsActions(currentComments))
  }

  const setComment = (currentComment?: CommentType) => {
    dispatch(setCommentActions(currentComment))
  }

  return {
    comments,
    comment,
    setComment,
    setComments,
  }
}
