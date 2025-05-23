import { useCallback, useEffect, useState } from 'react'

import { URL_APPROVE_PHOTO, URL_DISAPPROVE_PHOTO, URL_PHOTOS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PageQueryType } from '../../../shared/types/PageQueryType'
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
  const [page, setPage] = useState<PageQueryType>({
    page: 1,
  })

  const getPhotos = useCallback(async () => {
    let params = {}
    if (filter.aprovada !== '') {
      params = {
        ...filter,
        ...page,
      }
    }

    await request({
      url: URL_PHOTOS,
      method: MethodsEnum.GET,
      isPaginate: true,
      saveGlobal: setPhotos,
      params: params,
    })
  }, [filter, page])

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
    setPage({
      page: 1,
    })
  }

  const onChangePage = (value: number) => {
    setPage({
      page: value,
    })
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
    page,
    onChangePage,
    handleDisapprovePhoto,
    handleChangeFilter,
    handleApprovePhoto,
  }
}
