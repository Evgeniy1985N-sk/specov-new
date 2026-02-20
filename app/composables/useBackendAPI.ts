//replaces the usage of useAsyncData
//
import type { FetchError } from 'ofetch'
import type { UseFetchOptions } from 'nuxt/app'

interface CustomError {
  message: string
  status: number
}

export function useBackendAPI<T> (
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  return useFetch<T, FetchError<CustomError>>(url, {
    ...options,
    $fetch: useNuxtApp().$backendAPI,
  })
}
