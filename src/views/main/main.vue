<template>
  <div>main</div>
  <div>{{ $store.state.test.name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { request } from '@/service'

import { RequestConfig } from '@/service/request/type'

interface DataType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  success: boolean
  returnCode: string
}

export default defineComponent({
  setup() {
    const payload: RequestConfig<DataType> = {
      url: '/home/multidata',
      interceptor: {
        requestInterceptor: (config) => {
          console.log('单独请求的请求拦截')
          return config
        },
        responseInterceptor: (response) => {
          console.log('单独请求的响应拦截')
          return response
        }
      }
    }
    request.get<DataType>(payload).then((result) => {
      console.log(result)
    })
    return {}
  }
})
</script>

<style scoped></style>
