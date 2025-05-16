import { useDispatch } from 'react-redux'

import { UserType } from '../../../shared/types/UserType'
import { useAppSelector } from '../../hooks'
import { setUsersActions } from '.'

export const useUserReducer = () => {
  const dispatch = useDispatch()
  const { users } = useAppSelector((state) => state.userReducer)

  const setUsers = (currentUsers: UserType[]) => {
    dispatch(setUsersActions(currentUsers))
  }

  return {
    users,
    setUsers,
  }
}
