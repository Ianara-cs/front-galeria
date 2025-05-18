import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { URL_USER_ID, URL_USERS } from '../../../shared/constants/urls'
import { InsertUser } from '../../../shared/dtos/insertUser.dto'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer'
import { useUsersReducer } from '../../../store/reducers/userReducer/useUsersReducer'

const DEFAULT_USER = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  passwordAgain: '',
  username: '',
  is_staff: false,
  is_active: true,
}

export const useInsertUser = (userId?: string) => {
  const { request } = useRequests()
  const { setNotification } = useGlobalReducer()
  const { participant: participantReducer, setParticipant: setParticipantReducer } =
    useUsersReducer()
  const [participant, setParticipant] = useState<InsertUser>(DEFAULT_USER)
  const [isEdit, setIsEdit] = useState(false)
  const [loadingParticipant, setLoadingParticipant] = useState(false)

  useEffect(() => {
    if (participantReducer) {
      setParticipant({
        email: participantReducer.email,
        first_name: participantReducer.first_name,
        last_name: participantReducer.last_name,
        is_staff: participantReducer.is_staff,
        username: participantReducer.username,
        password: participantReducer.password,
        is_active: participantReducer.is_active,
      })
    }
  }, [participantReducer])

  useEffect(() => {
    const getUser = async () => {
      setLoadingParticipant(true)
      request({
        url: URL_USER_ID.replace('{userId}', `${userId}` || ''),
        method: MethodsEnum.GET,
        saveGlobal: setParticipant,
      })
      setLoadingParticipant(false)
    }

    if (userId) {
      setIsEdit(true)
      getUser()
    } else {
      setIsEdit(false)
      setParticipantReducer(undefined)
      setParticipant(DEFAULT_USER)
    }
  }, [userId])

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setParticipant({
      ...participant,
      [nameObject]: event.target.value,
    })
  }

  const handleChangeSelect = (value: React.ChangeEvent<HTMLSelectElement>, nameObject: string) => {
    console.log(value)
    setParticipant({
      ...participant,
      [nameObject]: value,
    })
  }

  const handleInsertParticipant = async () => {
    const { passwordAgain, ...body } = participant

    if (userId) {
      await request({
        url: URL_USER_ID.replace('{userId}', `${userId}`),
        method: MethodsEnum.PATCH,
        body: body,
        message: 'Usuário modificado!',
      })
    } else {
      if (passwordAgain != body.password) {
        setNotification('Senha diferentes', 'warning')
      } else {
        await request({
          url: URL_USERS,
          method: MethodsEnum.POST,
          body: body,
          message: 'Usuário criado!',
        })
      }
    }
  }

  return {
    loadingParticipant,
    participant,
    isEdit,
    onChangeInput,
    handleChangeSelect,
    handleInsertParticipant,
  }
}
