import { redirect } from 'react-router'

import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes'
import { LoginRoutesEnum } from '../../modules/login/routes'
import { store } from '../../store/store'
import { AUTHORIZATION_KEY } from '../constants/localStorageConstants'
import { getAuthorizationToken } from './connection/auth'

export const verifyIsAdmin = () => {
  const token = getAuthorizationToken(AUTHORIZATION_KEY)
  const user = store.getState().globalReducer.user

  if (!token || !user) {
    return redirect(LoginRoutesEnum.LOGIN)
  }

  if (!user.is_staff) {
    return redirect(FirstScreenRoutesEnum.NOT_AUTHORIZED)
  }

  return null
}
