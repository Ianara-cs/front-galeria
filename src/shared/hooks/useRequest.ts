import { useState } from 'react'
import { NavigateFunction } from 'react-router'

import { FirstScreenRoutesEnum } from '../../modules/firstScreen/routes'
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer'
import { AUTHORIZATION_KEY, REFRESH_TOKEN } from '../constants/localStorageConstants'
import { ERROR_INVALID_PASSWORD } from '../constants/messageErrors'
import { URL_LOGIN } from '../constants/urls'
import { MethodsEnum } from '../enums/methods'
import { setAuthorizationToken } from '../functions/connection/auth'
import ConnectionAPI, { connectionAPIPost, MethodType } from '../functions/connection/connectionAPI'
import { TokensType } from '../types/TokensType'

interface requestParams<T> {
  url: string
  method: MethodType
  saveGlobal?: (object: T) => void
  body?: unknown
  message?: string
  params?: Record<string, any>
}

interface uploadParams {
  url: string
  nameCampo: string
  body?: unknown
  message?: string
  params?: Record<string, any>
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
    params,
  }: requestParams<T>): Promise<T | undefined> => {
    setLoading(true)

    let fullUrl = url

    if (method === MethodsEnum.GET && params) {
      const query = new URLSearchParams(params).toString()
      fullUrl += `?${query}`
    }

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(fullUrl, method, body)
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

  const requestUpload = async <T>({
    url,
    body,
    nameCampo,
    message,
    params,
  }: uploadParams): Promise<T | undefined> => {
    setLoading(true)

    let fullUrl = url

    if (params) {
      const query = new URLSearchParams(params).toString()
      fullUrl += `?${query}`
    }

    if (!Array.isArray(body)) {
      setNotification('Erro', 'error', 'O corpo deve ser um array de arquivos.')
      setLoading(false)
      return undefined
    }

    const formData = new FormData()

    body.forEach((file, index) => {
      const f = file.originFileObj
      if (f instanceof File) {
        formData.append(nameCampo, f) // ex: imagens[]
      } else {
        setNotification('Erro', 'error', `Item ${index + 1} inválido.`)
      }
    })

    try {
      const result: T = await ConnectionAPI.connect<T>(fullUrl, MethodsEnum.POST, formData)

      if (message) setNotification('Sucesso!', 'success', message)

      return result
    } catch {
      setNotification('Erro ao enviar imagens', 'error')
      return undefined
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    authRequest,
    request,
    requestUpload,
  }
}
