import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import {
  URL_COMMENT,
  URL_COMMENTS,
  URL_DISLIKE,
  URL_LIKE,
  URL_PHOTO_ID,
} from '../../../shared/constants/urls'
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
  const [loadingComment, setLoadingComment] = useState(false)
  const [loadingSendComment, setLoadingSendComment] = useState(false)
  const [photo, setPhoto] = useState<PhotoType | undefined>()
  const [verifyLike, setVerifyLike] = useState(false)
  const { request } = useRequests()
  const { comments, setComments } = useCommentReducer()
  const [insertComment, setInsertComment] = useState<InsertComment>({
    foto_id: Number(photoId),
    texto: '',
  })
  const [editComment, setEditComment] = useState<InsertComment>({
    foto_id: Number(photoId),
    texto: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [commentId, setCommentId] = useState<number | string>('')

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
        if (photo) {
          setPhoto({
            ...photo,
            curtido: true,
            quantidade_curtidas: photo.quantidade_curtidas + 1,
          })
        }
      })
      .catch(() => {
        setVerifyLike(false)
      })
  }

  const handleDislike = async () => {
    await connectionAPIDelete(URL_DISLIKE.replace('{fotoId}', `${photoId}` || ''))
      .then(() => {
        setVerifyLike(false)
        if (photo) {
          setPhoto({
            ...photo,
            curtido: false,
            quantidade_curtidas: photo.quantidade_curtidas - 1,
          })
        }
      })
      .catch(() => {
        setVerifyLike(true)
      })
  }

  const onChangeInputTextEdit = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment({
      ...editComment,
      texto: value.target.value,
    })
  }

  const onChangeInputText = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInsertComment({
      ...insertComment,
      texto: value.target.value,
    })
  }

  const handleComment = async () => {
    setLoadingSendComment(true)

    if (commentId) {
      await request({
        url: URL_COMMENT.replace('{commentId}', `${commentId}`),
        method: MethodsEnum.PATCH,
        body: editComment,
        saveGlobal: setEditComment,
      })

      handleCancel()
    }

    if (insertComment.texto && insertComment.foto_id) {
      await request({
        url: URL_COMMENTS,
        method: MethodsEnum.POST,
        body: insertComment,
        saveGlobal: setInsertComment,
      })

      setInsertComment({ ...insertComment, texto: '' })
    }

    await request({
      url: URL_COMMENTS,
      method: MethodsEnum.GET,
      saveGlobal: setComments,
      params: {
        foto_id: photoId,
      },
    })
    setLoadingSendComment(false)
  }

  const showModal = (id: number) => {
    setCommentId(id)
    setLoadingComment(true)
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setCommentId('')
    setIsModalOpen(false)
    setEditComment({ ...editComment, texto: '' })
  }

  useEffect(() => {
    if (isModalOpen && commentId) {
      request({
        url: URL_COMMENT.replace('{commentId}', `${commentId}`),
        method: MethodsEnum.GET,
        body: editComment,
        saveGlobal: setEditComment,
      }).finally(() => {
        setLoadingComment(false)
      })
    }
  }, [isModalOpen])

  return {
    loading,
    photo,
    verifyLike,
    comments,
    insertComment,
    loadingComments,
    loadingSendComment,
    isModalOpen,
    editComment,
    loadingComment,
    onChangeInputTextEdit,
    handleLike,
    handleComment,
    onChangeInputText,
    handleDislike,
    showModal,
    handleCancel,
  }
}
