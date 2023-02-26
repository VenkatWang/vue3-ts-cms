<template>
  <div>main</div>
  <div>{{ $store.state.test.name }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { request } from '@/service/index'

export default defineComponent({
  setup() {
    request
      .request({
        method: 'get',
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
      })
      .then((result) => {
        console.log(result)
      })
    return {}
  }
})
</script>

<style scoped></style>
