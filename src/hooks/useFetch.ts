import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com'
})

const useFetch = <T = unknown>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api
      .get(url, options)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }, [url, options])

  return { data, isFetching, error }
}

export default useFetch
