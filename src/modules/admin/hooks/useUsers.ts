import { useCallback, useEffect, useState } from 'react'

import { URL_USERS } from '../../../shared/constants/urls'
import { MethodsEnum } from '../../../shared/enums/methods'
import { useRequests } from '../../../shared/hooks/useRequest'
import { useUsersReducer } from '../../../store/reducers/userReducer/useUsersReducer'

type FilterProps = {
  username: string
  firstName: string
}

export const useUsers = () => {
  const { request } = useRequests()
  const { participants, setParticipants } = useUsersReducer()
  const [filters, setFilters] = useState<FilterProps>({
    username: '',
    firstName: '',
  })

  const getUsers = useCallback(async () => {
    const params = { first_name: filters.firstName, username: filters.username }

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

  const handleChangeFilter = (filters: FilterProps) => {
    setFilters(filters)
  }

  return {
    participants,
    filters,
    getUsers,
    handleChangeFilter,
  }
}
