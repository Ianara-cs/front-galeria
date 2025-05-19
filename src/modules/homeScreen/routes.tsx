import { RouteObject } from 'react-router'

import HomeScreen from './screens/HomeScreen'
import PhotoScreen from './screens/photoScreen'
import UploadScreen from './screens/UploadScreen'

export enum HomeScreenRoutesEnum {
  HOME_SCREEN = '/home',
  PHOTO_SCREEN = '/home/foto/:photoId',
  UPLOAD_SCREEN = '/enviar-foto',
}

export const homeRoutes: RouteObject[] = [
  {
    path: HomeScreenRoutesEnum.HOME_SCREEN,
    element: <HomeScreen />,
  },
  {
    path: HomeScreenRoutesEnum.UPLOAD_SCREEN,
    element: <UploadScreen />,
  },
  {
    path: HomeScreenRoutesEnum.PHOTO_SCREEN,
    element: <PhotoScreen />,
  },
]
