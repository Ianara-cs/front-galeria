import { useState } from 'react'
import { NavigateFunction } from 'react-router'

import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes'
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer'
import { AUTHORIZATION_KEY, REFRESH_TOKEN } from '../constants/localStorageConstants'
import { ERROR_INVALID_PASSWORD } from '../constants/messageErrors'
import { URL_LOGIN } from '../constants/urls'
import { setAuthorizationToken } from '../functions/connection/auth'
import ConnectionAPI, { connectionAPIPost, MethodType } from '../functions/connection/connectionAPI'
import { TokensType } from '../types/TokensType'

interface requestParams<T> {
  url: string
  method: MethodType
  saveGlobal?: (object: T) => void
  body?: unknown
  message?: string
}

export const useRequests = () => {
  const [loading, setLoading] = useState(false)
  const { setNotification } = useGlobalReducer()

  const request = async <T>({
    url,
    method,
    saveGlobal,
    body,
    message,
  }: requestParams<T>): Promise<T | undefined> => {
    setLoading(true)

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result)
        }
        if (message) {
          setNotification('Sucesso!', 'success', message)
        }
        return result
      })

      .catch((error: Error) => {
        setNotification(error.message, 'error')
        return undefined
      })

    setLoading(false)
    console.log(returnObject)

    return returnObject
  }

  const authRequest = async (navigate: NavigateFunction, body: unknown): Promise<void> => {
    setLoading(true)

    await connectionAPIPost<TokensType>(URL_LOGIN, body)
      .then((result) => {
        setAuthorizationToken(AUTHORIZATION_KEY, result.access)
        setAuthorizationToken(REFRESH_TOKEN, result.refresh)
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN)
        return result
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error')
        return undefined
      })

    setLoading(false)
  }

  return {
    loading,
    authRequest,
    request,
  }
}
