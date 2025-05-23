import { useCallback, useEffect, useState } from 'react'

import { URL_USERS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { PageQueryType } from '../../../shared/types/PageQueryType'
import { useUsersReducer } from '../../../store/reducers/userReducer/useUsersReducer'
import { useInsertUser } from './useInsertUser'

type FilterProps = {
  nome: string
  is_active: boolean | undefined
  is_staff: boolean | undefined
}

export const useUsers = () => {
  const { request, loading } = useRequests()
  const { participant: participantReducer, participants, setParticipants } = useUsersReducer()
  const [filters, setFilters] = useState<FilterProps>({
    nome: '',
    is_active: undefined,
    is_staff: undefined,
  })
  const [debouncedFilters, setDebouncedFilters] = useState<FilterProps>(filters)
  const [page, setPage] = useState<PageQueryType>({
    page: 1,
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

  // Debounce dos filtros
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedFilters({ ...filters })
    }, 500)

    return () => clearTimeout(timeout)
  }, [filters])

  const getUsers = useCallback(async () => {
    const params = { ...debouncedFilters, ...page }

    request({
      url: URL_USERS,
      method: MethodsEnum.GET,
      saveGlobal: setParticipants,
      isPaginate: true,
      params: params,
    })
  }, [debouncedFilters, page])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const handleChangeFilter = (value: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setFilters({
      ...filters,
      [nameObject]: value.target.value,
    })

    setPage({
      page: 1,
    })
  }

  const handleFilterSelect = (value: React.ChangeEvent<HTMLSelectElement>, nameObject: string) => {
    setFilters({
      ...filters,
      [nameObject]: value,
    })

    setPage({
      page: 1,
    })
  }

  const onChangePage = (value: number) => {
    setPage({
      page: value,
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

  const handleCancel = () => {
    if (!isEdit) {
      setParticipant(DEFAULT_USER)
      setCanSend(true)
    } else {
      if (participantReducer) {
        setParticipant({
          email: participantReducer.email,
          first_name: participantReducer.first_name,
          last_name: participantReducer.last_name,
          is_staff: participantReducer.is_staff,
          username: participantReducer.username,
          is_active: participantReducer.is_active,
          password: '',
          passwordAgain: '',
        })
      }
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
    onChangePage,
  }
}
