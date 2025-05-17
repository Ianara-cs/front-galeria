import dayjs from 'dayjs'

export const formatDate = (date: string) => {
  const convertedDate = dayjs(date).format('DD/MM/YYYY HH:mm')
  return convertedDate
}
