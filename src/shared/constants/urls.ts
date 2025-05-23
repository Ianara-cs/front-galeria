const urlBase = import.meta.env.VITE_API_BASE_URL

export const URL_LOGIN = `${urlBase}/autenticacao/login/`
export const URL_ME = `${urlBase}/autenticacao/api/usuarios/me/`
export const URL_USERS = `${urlBase}/autenticacao/api/usuarios/`
export const URL_USER_ID = `${urlBase}/autenticacao/api/usuarios/{userId}/`

export const URL_PHOTOS = `${urlBase}/core/fotos`
export const URL_PHOTO_ID = `${urlBase}/core/fotos/{fotoId}/`
export const URL_SEND_PHOTOS = `${urlBase}/core/fotos/upload-multiplas/`
export const URL_APPROVE_PHOTO = `${urlBase}/core/fotos/{fotoId}/aprovar/`
export const URL_DISAPPROVE_PHOTO = `${urlBase}/core/fotos/{fotoId}/reprovar/`

export const URL_LIKE = `${urlBase}/core/curtidas/`
export const URL_DISLIKE = `${urlBase}/core/curtidas/foto/{fotoId}/`

export const URL_COMMENTS = `${urlBase}/core/comentarios/`
export const URL_COMMENT = `${urlBase}/core/comentarios/{commentId}/`
export const URL_EDIT_COMMENT = `${urlBase}/core/comentarios/{commentId}/`
