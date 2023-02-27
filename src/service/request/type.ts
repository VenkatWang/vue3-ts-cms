/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  // responseInterceptor?: (config: any) => any
  responseInterceptor?: (config: T) => T

  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: RequestInterceptors<T>
  showLoading?: boolean
}

export { RequestConfig, RequestInterceptors }
