import { RouteObject } from 'react-router'

import FirstScreen from './screens/FirstScreen'
import PageNotFoundScreen from './screens/PageNotFoundScreen'

export enum FirstScreenRoutesEnum {
  FIRST_SCREEN = '/',
}

export const firstRoutes: RouteObject[] = [
  {
    path: FirstScreenRoutesEnum.FIRST_SCREEN,
    element: <FirstScreen />,
    errorElement: <PageNotFoundScreen />,
  },
]
