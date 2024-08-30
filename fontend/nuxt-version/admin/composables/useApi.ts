import { defu } from 'defu'
import type { UseFetchOptions } from 'nuxt/app'

export const useApi: typeof useFetch = <T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions<T> = {}) => {
  const auth = useAuth()

  const token = auth.getToken()

  const defaults: UseFetchOptions<T> = {
    baseURL: 'http://localhost:4000/',
    key: toValue(url),
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    method: 'POST',
  }

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults)

  return useFetch(url, params)
}
