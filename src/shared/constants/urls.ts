const urlBase = 'http://127.0.0.1:8000'

export const URL_LOGIN = `${urlBase}/autenticacao/login/`
export const URL_ME = `${urlBase}/autenticacao/api/usuarios/me/`
export const URL_USERS = `${urlBase}/autenticacao/api/usuarios/`
export const URL_USER_ID = `${urlBase}/autenticacao/api/usuarios/{userId}/`

export const URL_PHOTOS = `${urlBase}/core/fotos`
export const URL_SEND_PHOTOS = `${urlBase}/core/fotos/upload-multiplas/`
export const URL_APPROVE_PHOTO = `${urlBase}/core/fotos/{fotoId}/aprovar/`
export const URL_DISAPPROVE_PHOTO = `${urlBase}/core/fotos/{fotoId}/aprovar/`
