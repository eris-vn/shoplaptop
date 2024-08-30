import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
// import { RootState } from '../store'; // Thay đổi đường dẫn theo cấu trúc dự án của bạn

interface UseFetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: { [key: string]: string }
  body?: any
}

const useFetch = (url: string, options: UseFetchOptions = {}) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<number | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        headers: {
          ...options.headers
        },
        data: options.body,
        baseURL: process.env.API_URL
      })
      setData(response.data)
      setStatus(response.status)
    } catch (err: any) {
      setError(err.message || 'An error occurred')
      setStatus(err.response?.status || 500)
    }
  }, [url, options.method, options.headers, options.body])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, error, status, refresh: fetchData }
}

export default useFetch
