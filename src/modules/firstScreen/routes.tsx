import { RouteObject } from 'react-router'

import FirstScreen from './screens/FirstScreen'
import NotAuthorizedScreen from './screens/NotAuthorized'
import PageNotFoundScreen from './screens/PageNotFoundScreen'

export enum FirstScreenRoutesEnum {
  FIRST_SCREEN = '/',
  NOT_AUTHORIZED = '/acesso-negado',
}

export const firstRoutes: RouteObject[] = [
  {
    path: FirstScreenRoutesEnum.FIRST_SCREEN,
    element: <FirstScreen />,
    errorElement: <PageNotFoundScreen />,
  },
  {
    path: FirstScreenRoutesEnum.NOT_AUTHORIZED,
    element: <NotAuthorizedScreen />,
    errorElement: <PageNotFoundScreen />,
  },
]
