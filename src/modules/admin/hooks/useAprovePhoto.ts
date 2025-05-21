import { useCallback, useEffect, useState } from 'react'

import { URL_APPROVE_PHOTO, URL_DISAPPROVE_PHOTO, URL_PHOTOS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PhotoType } from '../../../shared/types/PhotoType'

type FilterType = {
  aprovada: boolean | string
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
  const [photos, setPhotos] = useState<PhotoType[]>([])
  const [filter, setFilter] = useState<FilterType>({ aprovada: false })

  const getPhotos = useCallback(async () => {
    let params = {}
    if (filter.aprovada !== '') {
      params = {
        ...filter,
      }
    }

    await request({
      url: URL_PHOTOS,
      method: MethodsEnum.GET,
      saveGlobal: setPhotos,
      params: params,
    })
  }, [filter])

  useEffect(() => {
    setLoading(true)
    getPhotos()
    setLoading(false)
  }, [getPhotos])

  const handleChangeFilter = (value: React.ChangeEvent<HTMLSelectElement>, nameObject: string) => {
    setFilter({
      ...filter,
      [nameObject]: value,
    })
    console.log('D', filter)
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
      method: MethodsEnum.POST,
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
