import { useDispatch } from 'react-redux'

import { NotificationEnum } from '../../../shared/types/NotificationType'
import { UserType } from '../../../shared/types/UserType'
import { useAppSelector } from '../../hooks'
import { setNotificationActions, setUserActions } from '.'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification, user } = useAppSelector((state) => state.globalReducer)

  const setNotification = (message: string, type: NotificationEnum, description?: string) => {
    dispatch(
      setNotificationActions({
        message,
        type,
        description,
      }),
    )
  }

  const setUser = (current: UserType) => {
    dispatch(setUserActions(current))
  }

  return {
    notification,
    user,
    setNotification,
    setUser,
  }
}
