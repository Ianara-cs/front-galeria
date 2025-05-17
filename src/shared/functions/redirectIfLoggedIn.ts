import { redirect } from 'react-router'

import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes'
import { AUTHORIZATION_KEY } from '../constants/localStorageConstants'
import { getAuthorizationToken } from './connection/auth'

export const redirectIfLoggedIn = () => {
  const token = getAuthorizationToken(AUTHORIZATION_KEY)

  if (token) {
    return redirect(FirstScreenRoutesEnum.FIRST_SCREEN)
  }

  return null
}
