import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy'

export const unsetAuthorizationToken = (key: string) => removeItemStorage(key)

export const setAuthorizationToken = (key: string, token?: string) => {
  if (token) {
    setItemStorage(key, token)
  }
}

export const getAuthorizationToken = (key: string) => getItemStorage(key)
