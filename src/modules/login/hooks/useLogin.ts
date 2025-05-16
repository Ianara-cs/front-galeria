import { useState } from 'react'
import { useNavigate } from 'react-router'

import { SignIn } from '../../../shared/dtos/signin.dto'
import { useRequests } from '../../../shared/hooks/useRequest'

export const useLogin = () => {
  const navigate = useNavigate()
  const { authRequest } = useRequests()
  const [signIn, setSignIn] = useState<SignIn>({
    username: '',
    password: '',
  })

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setSignIn({
      ...signIn,
      [nameObject]: event.target.value,
    })
  }

  const handleLogin = async () => {
    authRequest(navigate, {
      username: signIn.username,
      password: signIn.password,
    })
  }

  return {
    signIn,
    onChangeInput,
    handleLogin,
  }
}
