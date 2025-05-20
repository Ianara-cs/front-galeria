import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { URL_COMMENTS, URL_DISLIKE, URL_LIKE, URL_PHOTO_ID } from '../../../shared/constants/urls'
import { InsertComment } from '../../../shared/dtos/insertComment.dto'
import { MethodsEnum } from '../../../shared/enums/methods'
import {
  connectionAPIDelete,
  connectionAPIPost,
} from '../../../shared/functions/connection/connectionAPI'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useCommentReducer } from '../../../store/reducers/commentReducer/useCommentReducer'

export const usePhoto = () => {
  const { photoId } = useParams<{ photoId: string }>()
  const [loading, setLoading] = useState(false)
  const [loadingComments, setLoadingComments] = useState(false)
  const [photo, setPhoto] = useState<PhotoType | undefined>()
  const [verifyLike, setVerifyLike] = useState(false)
  const { request } = useRequests()
  const { comments, setComments } = useCommentReducer()
  const [insertComment, setInsertComment] = useState<InsertComment>({
    foto_id: Number(photoId),
    texto: '',
  })

  useEffect(() => {
    const getPhoto = async () => {
      setLoading(true)
      await request({
        url: URL_PHOTO_ID.replace('{fotoId}', `${photoId}` || ''),
        method: MethodsEnum.GET,
        saveGlobal: setPhoto,
      })
      setLoading(false)
    }

    const getComments = async () => {
      setLoadingComments(true)
      await request({
        url: URL_COMMENTS,
        method: MethodsEnum.GET,
        saveGlobal: setComments,
        params: {
          foto_id: photoId,
        },
      })
      setLoadingComments(false)
    }

    getComments()
    getPhoto()
  }, [photoId])

  useEffect(() => {
    if (photo) setVerifyLike(photo.curtido)
  }, [photo])

  const handleLike = async () => {
    await connectionAPIPost(URL_LIKE, { foto_id: photoId })
      .then(() => {
        setVerifyLike(true)
      })
      .catch(() => {
        setVerifyLike(false)
      })
  }

  const handleDislike = async () => {
    await connectionAPIDelete(URL_DISLIKE.replace('{fotoId}', `${photoId}` || ''))
      .then(() => {
        setVerifyLike(false)
      })
      .catch(() => {
        setVerifyLike(true)
      })
  }

  const onChangeInputText = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInsertComment({
      ...insertComment,
      texto: value.target.value,
    })
  }

  const handleComment = async () => {
    if (insertComment.texto) {
      await request({
        url: URL_COMMENTS,
        method: MethodsEnum.POST,
        body: insertComment,
        saveGlobal: setInsertComment,
      })

      await request({
        url: URL_COMMENTS,
        method: MethodsEnum.GET,
        saveGlobal: setComments,
        params: {
          foto_id: photoId,
        },
      })

      setInsertComment({ ...insertComment, texto: '' })
    }
  }

  return {
    loading,
    photo,
    verifyLike,
    comments,
    insertComment,
    loadingComments,
    handleLike,
    handleComment,
    onChangeInputText,
    handleDislike,
  }
}
