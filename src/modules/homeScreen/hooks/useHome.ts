import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { URL_PHOTOS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PhotoType } from '../../../shared/types/PhotoType'
import { HomeScreenRoutesEnum } from '../routes'

export const useHome = () => {
  const { request } = useRequests()
  const [photos, setPhotos] = useState<PhotoType[]>([])
  const navigate = useNavigate()

  const params = {
    aprovada: true,
  }

  useEffect(() => {
    request({
      url: URL_PHOTOS,
      method: MethodsEnum.GET,
      saveGlobal: setPhotos,
      params: params,
    })
  }, [])

  const handleSeePhoto = async (photoId: number) => {
    navigate(HomeScreenRoutesEnum.PHOTO_SCREEN.replace(':photoId', `${photoId}`))
  }

  return {
    photos,
    handleSeePhoto,
  }
}
