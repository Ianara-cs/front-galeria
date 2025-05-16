import axios, { AxiosRequestConfig } from 'axios'

import { AUTHORIZATION_KEY } from '../../constants/localStorageConstants'
import { ERROR_ACCESS_DENIED, ERROR_CONNECTION } from '../../constants/messageErrors'
import { MethodsEnum } from '../../enums/methods'
import { getAuthorizationToken } from './auth'

export type MethodType = 'get' | 'post' | 'put' | 'patch' | 'delete'

export default class ConnectionAPI {
  static async call<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: getAuthorizationToken(AUTHORIZATION_KEY),
        'Content-Type': 'application/json',
      },
    }

    switch (method) {
      case MethodsEnum.POST:
      case MethodsEnum.PUT:
      case MethodsEnum.PATCH:
        return (await axios[method]<T>(url, body, config)).data
      case MethodsEnum.DELETE:
      case MethodsEnum.GET:
      default:
        return (await axios[method]<T>(url, config)).data
    }
  }

  static async connect<T>(url: string, method: MethodType, body?: unknown): Promise<T> {
    return ConnectionAPI.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            throw new Error(ERROR_ACCESS_DENIED)
          default:
            throw new Error(ERROR_CONNECTION)
        }
      }
      throw new Error(ERROR_CONNECTION)
    })
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.GET)
}

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.DELETE)
}

export const connectionAPIPost = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.POST, body)
}

export const connectionAPIPut = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body)
}

export const connectionAPIPatch = async <T>(url: string, body: unknown): Promise<T> => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body)
}
