export interface DataPaginate<TData> {
  results: TData
  page_size: boolean
  count: number
  num_pages: number
  page: number
}

export function isDataPaginate<TData>(data: any): data is DataPaginate<TData> {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    'page_size' in data &&
    'count' in data &&
    'num_pages' in data &&
    'page' in data
  )
}
