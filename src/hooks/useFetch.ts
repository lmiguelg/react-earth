import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com'
})

interface ApiProps {
  url: string
  method?: 'get' | 'post' | 'put' | 'delete'
  body?: any
  options?: AxiosRequestConfig
}

const useFetch = <T>({ url, method = 'get', body, options }: ApiProps) => {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api[method](url, body, options)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [url, method, body, options])

  return { data, isFetching, error }
}

export default useFetch
