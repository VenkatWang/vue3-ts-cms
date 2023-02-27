/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InternalAxiosRequestConfig,
  AxiosRequestConfig
  // AxiosResponse
} from 'axios'
interface RequestInterceptors {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptor?: (config: any) => any

  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
  interceptor?: RequestInterceptors
  showLoading?: boolean
}

export { RequestConfig, RequestInterceptors }
