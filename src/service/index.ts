import Request from './request'

const request = new Request({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 1000
})

export { request }
