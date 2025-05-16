import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import Loading from '../../../shared/components/loading/loading'
import { AUTHORIZATION_KEY } from '../../../shared/constants/localStorageConstants'
import { URL_ME } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { getAuthorizationToken } from '../../../shared/functions/connection/auth'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { HomeScreenRoutesEnum } from '../../homeScreen/routes'

const FirstScreen = () => {
  const { user, setUser } = useGlobalReducer()
  const { request } = useRequests()
  const navigate = useNavigate()

  useEffect(() => {
    const token = getAuthorizationToken(AUTHORIZATION_KEY)
    if (token && !user) {
      request({ url: URL_ME, method: MethodsEnum.GET, saveGlobal: setUser })
    }
    navigate(HomeScreenRoutesEnum.HOME_SCREEN)
  }, [user])

  return (
    <div className="h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default FirstScreen
