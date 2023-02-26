/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { RequestConfig, RequestInterceptors } from './type'

class Request {
  instance: AxiosInstance
  interceptor?: RequestInterceptors
  constructor(config: RequestConfig) {
    this.instance = axios.create(config)

    this.interceptor = config?.interceptor

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

        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const data = response.data
        if (!data.success) {
          alert('请求失败')
        }
        return response.data
      },
      (error) => {
        if (error.response.status !== 200) {
          alert(error.code)
        }

        return Promise.reject(error)
      }
    )
  }
  async request(config: RequestConfig) {
    if (config.interceptor?.requestInterceptor) {
      config = config.interceptor?.requestInterceptor(config as any)
    }
    // return this.instance.request(config)
    if (config.interceptor?.responseInterceptor) {
      let response = await this.instance.request(config)
      response = config.interceptor?.responseInterceptor(response)
      return response
    }
    return this.instance.request(config)
  }
}

export default Request
