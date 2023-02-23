import Request from './request'

const request = new Request({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 1000,
  interceptor: {
    requestInterceptor: (config) => {
      console.log('实例：拦截请求成功')

      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (response) => {
      console.log('实例：拦截返回成功')

      return response
    },
    responseInterceptorCatch(error) {
      return error
    }
  }
})

export { request }
