import { useDispatch } from 'react-redux'

import { UserType } from '../../../shared/types/UserType'
import { useAppSelector } from '../../hooks'
import { setParticipantActions, setParticipantsActions } from '.'

export const useUsersReducer = () => {
  const dispatch = useDispatch()
  const { participants, participant } = useAppSelector((state) => state.userReducer)

  const setParticipants = (currentUsers: UserType[]) => {
    dispatch(setParticipantsActions(currentUsers))
  }

  const setParticipant = (currentUser?: UserType) => {
    dispatch(setParticipantActions(currentUser))
  }

  return {
    participants,
    participant,
    setParticipant,
    setParticipants,
  }
}
