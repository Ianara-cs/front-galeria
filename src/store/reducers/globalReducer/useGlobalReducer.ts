import { useDispatch } from 'react-redux'

import { NotificationEnum } from '../../../shared/types/NotificationType'
import { PaginationType } from '../../../shared/types/PaginationType'
import { UserType } from '../../../shared/types/UserType'
import { useAppSelector } from '../../hooks'
import { setNotificationActions, setPaginateActions, setUserActions } from '.'

export const useGlobalReducer = () => {
  const dispatch = useDispatch()
  const { notification, user, paginate } = useAppSelector((state) => state.globalReducer)

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

  const setPaginate = (current: PaginationType) => {
    dispatch(setPaginateActions(current))
  }

  return {
    notification,
    user,
    paginate,
    setNotification,
    setUser,
    setPaginate,
  }
}
