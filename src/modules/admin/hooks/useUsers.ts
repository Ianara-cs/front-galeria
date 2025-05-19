import { useCallback, useEffect, useState } from 'react'

import { URL_USERS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useUsersReducer } from '../../../store/reducers/userReducer/useUsersReducer'
import { useInsertUser } from './useInsertUser'

type FilterProps = {
  username: string
  first_name: string
  is_active: boolean | undefined
  is_staff: boolean | undefined
}

export const useUsers = () => {
  const { request, loading } = useRequests()
  const { participants, setParticipants } = useUsersReducer()
  const { participant: participantReducer } = useUsersReducer()
  const [filters, setFilters] = useState<FilterProps>({
    username: '',
    first_name: '',
    is_active: undefined,
    is_staff: undefined,
  })
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('')
  const {
    isEdit,
    loadingParticipant,
    participant,
    canSend,
    DEFAULT_USER,
    setCanSend,
    setParticipant,
    handleChangeSelect,
    onChangeInput,
    handleInsertParticipant,
  } = useInsertUser(userId)

  const getUsers = useCallback(async () => {
    const params = { ...filters }

    request({
      url: URL_USERS,
      method: MethodsEnum.GET,
      saveGlobal: setParticipants,
      params: params,
    })
  }, [filters])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleChangeFilter = (value: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setFilters({
      ...filters,
      [nameObject]: value.target.value,
    })
  }

  const handleFilterSelect = (value: React.ChangeEvent<HTMLSelectElement>, nameObject: string) => {
    setFilters({
      ...filters,
      [nameObject]: value,
    })
  }

  const showModal = (user?: number) => {
    setUserId(user ? `${user}` : '')
    setOpen(true)
  }

  const handleOk = async () => {
    await handleInsertParticipant()
    await getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleCancel = () => {
    if (!isEdit) {
      setParticipant(DEFAULT_USER)
      setCanSend(true)
    } else {
      if (participantReducer)
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
    setOpen(false)
  }

  return {
    loading,
    participants,
    open,
    isEdit,
    loadingParticipant,
    participant,
    canSend,
    handleChangeSelect,
    onChangeInput,
    showModal,
    handleOk,
    handleCancel,
    getUsers,
    handleChangeFilter,
    handleFilterSelect,
  }
}
