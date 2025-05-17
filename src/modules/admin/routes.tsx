import { RouteObject } from 'react-router'

import ApprovePhotoScreen from './screens/ApprovePhoto'
import UsersScreen from './screens/UsersScreen'

export enum AdminScreenRoutesEnum {
  APPROVE = '/admin/aprovar-fotos',
  USERS = '/admin/usuarios',
}

export const adminRoutes: RouteObject[] = [
  {
    path: AdminScreenRoutesEnum.APPROVE,
    element: <ApprovePhotoScreen />,
  },
  {
    path: AdminScreenRoutesEnum.USERS,
    element: <UsersScreen />,
  },
]
