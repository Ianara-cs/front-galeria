import { NavigateFunction, redirect } from 'react-router'

import { LoginRoutesEnum } from '../../../modules/login/routes'
import { setUserActions } from '../../../store/reducers/globalReducer'
import { store } from '../../../store/store'
import { AUTHORIZATION_KEY, REFRESH_TOKEN } from '../../constants/localStorageConstants'
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
  const user = store.getState().globalReducer.user

  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  if (!user) {
    const fetchUser = await connectionAPIGet<UserType>(URL_ME).catch(() => {
      unsetAuthorizationToken(AUTHORIZATION_KEY)
    })

    if (!fetchUser) {
      return redirect(LoginRoutesEnum.LOGIN)
    }

    store.dispatch(setUserActions(fetchUser))
  }
  return null
}

export const logout = (navigate: NavigateFunction) => {
  store.dispatch(setUserActions(undefined))
  unsetAuthorizationToken(AUTHORIZATION_KEY)
  unsetAuthorizationToken(REFRESH_TOKEN)
  navigate(LoginRoutesEnum.LOGIN)
}
