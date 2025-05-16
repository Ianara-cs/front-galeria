import { RouteObject } from 'react-router'

import HomeScreen from './screens/HomeScreen'

export enum HomeScreenRoutesEnum {
  HOME_SCREEN = '/home',
}

export const homeRoutes: RouteObject[] = [
  {
    path: HomeScreenRoutesEnum.HOME_SCREEN,
    element: <HomeScreen />,
  },
]
