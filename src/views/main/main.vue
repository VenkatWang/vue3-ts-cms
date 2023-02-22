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
      .request({ method: 'get', url: '/home/multidata' })
      .then((result) => {
        console.log(result)
      })
    return {}
  }
})
</script>

<style scoped></style>
