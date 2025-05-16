import { RouterProvider } from 'react-router'

import { router } from './routes'
import { useNotification } from './shared/hooks/useNotification'

function App() {
  const { contextHolder } = useNotification()

  return (
    <>
      {contextHolder}
      <RouterProvider router={router} />
    </>
  )
}

export default App
