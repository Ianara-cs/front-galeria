import { useCallback, useEffect, useState } from 'react'

import {
  URL_APPROVE_PHOTO,
  URL_DISAPPROVE_PHOTO,
  URL_PHOTOS,
  URL_USERS,
} from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PageQueryType } from '../../../shared/types/PageQueryType'
import { PhotoType } from '../../../shared/types/PhotoType'
import { useUsersReducer } from '../../../store/reducers/userReducer/useUsersReducer'

type FilterType = {
  aprovada: boolean | string
  usuario_id: string
}

const statusPhoto = [
  {
    value: '',
    label: 'Todas',
  },
  {
    value: 'true',
    label: 'Aprovadas',
  },
  {
    value: 'false',
    label: 'Desaprovadas',
  },
]

export const useApprovePhoto = () => {
  const { request } = useRequests()
  const [loading, setLoading] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [photos, setPhotos] = useState<PhotoType[]>([])
  const { participants: users, setParticipants: setUsers } = useUsersReducer()
  const [filter, setFilter] = useState<FilterType>({ aprovada: false, usuario_id: '' })
  const [page, setPage] = useState<PageQueryType>({
    page: 1,
  })

  const getPhotos = useCallback(async () => {
    let params = {}
    if (filter.aprovada !== '') {
      params = {
        ...filter,
      }
    }
    params = {
      usuario_id: filter.usuario_id ? Number(filter.usuario_id) : '',
      ...params,
      ...page,
    }

    await request({
      url: URL_PHOTOS,
      method: MethodsEnum.GET,
      isPaginate: true,
      saveGlobal: setPhotos,
      params: params,
    }).finally(() => setLoading(false))
  }, [filter, page])

  useEffect(() => {
    setLoading(true)
    getPhotos()
  }, [getPhotos])

  useEffect(() => {
    const getUsers = async () => {
      setLoadingUsers(true)

      await request({
        url: URL_USERS,
        method: MethodsEnum.GET,
        saveGlobal: setUsers,
        isPaginate: true,
      }).finally(() => setLoadingUsers(false))
    }

    getUsers()
  }, [])

  const handleChangeFilter = (value: React.ChangeEvent<HTMLSelectElement>, nameObject: string) => {
    setFilter({
      ...filter,
      [nameObject]: value,
    })
    setPage({
      page: 1,
    })
  }

  const onChangePage = (value: number) => {
    setPage({
      page: value,
    })
  }

  const handleApprovePhoto = async (photoId: number) => {
    await request({
      url: URL_APPROVE_PHOTO.replace('{fotoId}', `${photoId}` || ''),
      method: MethodsEnum.POST,
    })

    setLoading(true)
    await getPhotos()
  }

  const handleDisapprovePhoto = async (photoId: number) => {
    await request({
      url: URL_DISAPPROVE_PHOTO.replace('{fotoId}', `${photoId}` || ''),
      method: MethodsEnum.POST,
    })

    setLoading(true)
    await getPhotos()
  }

  return {
    photos,
    loading,
    filter,
    statusPhoto,
    page,
    users,
    loadingUsers,
    onChangePage,
    handleDisapprovePhoto,
    handleChangeFilter,
    handleApprovePhoto,
  }
}
