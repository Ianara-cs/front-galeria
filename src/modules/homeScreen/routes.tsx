import { RouteObject } from 'react-router'

import HomeScreen from './screens/HomeScreen'
import UploadScreen from './screens/UploadScreen'

export enum HomeScreenRoutesEnum {
  HOME_SCREEN = '/home',
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
]
