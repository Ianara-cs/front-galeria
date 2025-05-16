import { createBrowserRouter, RouteObject } from 'react-router'

import { firstRoutes } from './modules/firstScreen/routes'
import { homeRoutes } from './modules/homeScreen/routes'
import { loginRoutes } from './modules/login/routes'
import { verifyLoggedIn } from './shared/functions/connection/auth'

const routes: RouteObject[] = [...loginRoutes]
const routesLoggedIn: RouteObject[] = [...firstRoutes, ...homeRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}))

export const router = createBrowserRouter([...routes, ...routesLoggedIn])
