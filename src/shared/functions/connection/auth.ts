import { redirect } from 'react-router'

import { LoginRoutesEnum } from '../../../modules/login/routes'
import { store } from '../../../store/store'
import { AUTHORIZATION_KEY } from '../../constants/localStorageConstants'
import { URL_ME } from '../../constants/urls'
import { UserType } from '../../types/UserType'
import { connectionAPIGet } from './connectionAPI'
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy'

export const unsetAuthorizationToken = (key: string) => removeItemStorage(key)

export const setAuthorizationToken = (key: string, token?: string) => {
  if (token) {
    setItemStorage(key, token)
  }
}

export const getAuthorizationToken = (key: string) => getItemStorage(key)

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken(AUTHORIZATION_KEY)
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  const user = store.getState().globalReducer.user

  if (user) {
    return null
  }

  const fetchUser = await connectionAPIGet<UserType>(URL_ME).catch(() => {
    unsetAuthorizationToken(AUTHORIZATION_KEY)
  })

  if (!fetchUser) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  return null
}
