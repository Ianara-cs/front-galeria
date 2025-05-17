import { createBrowserRouter, RouteObject } from 'react-router'

import { adminRoutes } from './modules/admin/routes'
import { firstRoutes } from './modules/firstScreen/routes'
import { homeRoutes } from './modules/homeScreen/routes'
import { loginRoutes } from './modules/login/routes'
import { verifyLoggedIn } from './shared/functions/connection/auth'
import { redirectIfLoggedIn } from './shared/functions/redirectIfLoggedIn'
import { verifyIsAdmin } from './shared/functions/verifyIsAdmin'

const routes: RouteObject[] = [...loginRoutes].map((route) => ({
  ...route,
  loader: redirectIfLoggedIn,
}))

const routesAdmin: RouteObject[] = adminRoutes.map((route) => ({
  ...route,
  loader: verifyIsAdmin,
}))

const routesLoggedIn: RouteObject[] = [...firstRoutes, ...homeRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}))

export const router = createBrowserRouter([...routes, ...routesLoggedIn, ...routesAdmin])
