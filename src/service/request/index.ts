/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

import { RequestConfig, RequestInterceptors } from './type'

const DEFAULT_LOADING = true
class Request {
  instance: AxiosInstance
  interceptor?: RequestInterceptors

  loading?: LoadingInstance
  showLoading?: boolean

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.interceptor = config?.interceptor

    this.showLoading = DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '请稍后...'
          })
        }

        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const data = response.data
        this.loading?.close()
        if (!data.success) {
          alert('请求失败')
        }
        return response.data
      },
      (error) => {
        this.loading?.close()
        if (error.response.status !== 200) {
          alert(error.code)
        }

        return Promise.reject(error)
      }
    )
  }
  request<T>(payload: RequestConfig<T>): Promise<T> {
    if (payload.interceptor?.requestInterceptor) {
      payload = payload.interceptor?.requestInterceptor(payload as any)
    }

    if (payload.showLoading === false) {
      this.showLoading = payload.showLoading
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(payload)
        .then((result) => {
          this.showLoading = DEFAULT_LOADING
          console.log(result)
          if (payload.interceptor?.responseInterceptor) {
            result = payload.interceptor.responseInterceptor(result)
          }
          resolve(result)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }
  get<T>(payload: RequestConfig<T>) {
    return this.request<T>({ ...payload, method: 'GET' })
  }
  post<T>(payload: RequestConfig<T>) {
    return this.request<T>({ ...payload, method: 'POST' })
  }
  put<T>(payload: RequestConfig<T>) {
    return this.request<T>({ ...payload, method: 'PUT' })
  }
  delete<T>(payload: RequestConfig<T>) {
    return this.request<T>({ ...payload, method: 'DELETE' })
  }
}

export default Request
