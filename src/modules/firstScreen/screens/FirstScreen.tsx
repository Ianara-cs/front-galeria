import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import Loading from '../../../shared/components/loading/loading'
import { AUTHORIZATION_KEY } from '../../../shared/constants/localStorageConstants'
import { getAuthorizationToken } from '../../../shared/functions/connection/auth'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { HomeScreenRoutesEnum } from '../../homeScreen/routes'
import { LoginRoutesEnum } from '../../login/routes'

const FirstScreen = () => {
  const { user } = useGlobalReducer()
  const navigate = useNavigate()

  useEffect(() => {
    const token = getAuthorizationToken(AUTHORIZATION_KEY)
    if (token && user) {
      navigate(HomeScreenRoutesEnum.HOME_SCREEN)
    } else {
      console.log('FIRST', user)
      navigate(LoginRoutesEnum.LOGIN)
    }
  }, [user])

  return (
    <div className="h-screen flex justify-center items-center">
      <Loading />
    </div>
  )
}

export default FirstScreen
