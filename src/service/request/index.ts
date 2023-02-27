/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { RequestConfig, RequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'

const DEFAULT_LOADING = true
class Request {
  instance: AxiosInstance
  interceptor?: RequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.interceptor = config?.interceptor
    console.log(config)

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
            text: '请稍候'
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
        this.loading?.close()
        const data = response.data
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
  request<T>(payload: RequestConfig): Promise<T> {
    if (payload.interceptor?.requestInterceptor) {
      payload = payload.interceptor?.requestInterceptor(payload as any)
    }

    if (payload.showLoading === false) {
      this.showLoading = payload.showLoading
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(payload)
        .then((response) => {
          if (payload.interceptor?.responseInterceptor) {
            response = payload.interceptor?.responseInterceptor(response)
          }
          this.showLoading = DEFAULT_LOADING
          return resolve(response)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          return reject(err)
        })
    })
  }
  get<T>(payload: RequestConfig) {
    return this.instance.request<T>({ ...payload, method: 'GET' })
  }
  post<T>(payload: RequestConfig) {
    return this.instance.request<T>({ ...payload, method: 'POST' })
  }
  put<T>(payload: RequestConfig) {
    return this.instance.request<T>({ ...payload, method: 'PUT' })
  }
  delete<T>(payload: RequestConfig) {
    return this.instance.request<T>({ ...payload, method: 'DELETE' })
  }
}

export default Request
