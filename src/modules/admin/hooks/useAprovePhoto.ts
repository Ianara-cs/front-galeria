import { useCallback, useEffect, useState } from 'react'

import { URL_APPROVE_PHOTO, URL_DISAPPROVE_PHOTO, URL_PHOTOS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PhotoType } from '../../../shared/types/PhotoType'

type FilterType = {
  value: string
  label: React.ReactNode
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
  const { loading, request } = useRequests()
  const [photos, setPhotos] = useState<PhotoType[]>([])
  const [filter, setFilter] = useState<FilterType>(statusPhoto[2])

  const getPhotos = useCallback(async () => {
    let params = {}
    if (filter.value !== '') {
      params = {
        ...params,
        aprovada: filter.value,
      }
    }

    request({
      url: URL_PHOTOS,
      method: MethodsEnum.GET,
      saveGlobal: setPhotos,
      params: params,
    })
  }, [filter])

  useEffect(() => {
    getPhotos()
  }, [getPhotos])

  const handleChangeFilter = (value: { value: string; label: React.ReactNode }) => {
    setFilter(value)
  }

  const handleApprovePhoto = (photoId: number) => {
    request({
      url: URL_APPROVE_PHOTO.replace('{fotoId}', `${photoId}` || ''),
      method: MethodsEnum.POST,
    })

    getPhotos()
  }

  const handleDisapprovePhoto = (photoId: number) => {
    request({
      url: URL_DISAPPROVE_PHOTO.replace('{fotoId}', `${photoId}` || ''),
      method: MethodsEnum.DELETE,
    })

    getPhotos()
  }

  return {
    photos,
    loading,
    filter,
    statusPhoto,
    handleDisapprovePhoto,
    handleChangeFilter,
    handleApprovePhoto,
  }
}
