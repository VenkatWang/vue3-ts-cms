<template>
  <el-form
    class="login-account"
    :label-width="65"
    ref="accountRef"
    :model="accountForm"
    :rules="accountRules"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="accountForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        show-password
        v-model="accountForm.password"
      ></el-input>
    </el-form-item>
    <div class="bottom">
      <div>
        <el-checkbox label="记住密码" v-model="isRemberPassword"></el-checkbox>
      </div>
      <div>
        <el-link type="primary">忘记密码</el-link>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import localCache from '@/utils/cache'

const accountRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '请输入用户名'
    },
    {
      pattern: /^[0-9a-zA-Z_]{1,}$/,
      message: '用户名由数字字母下划线组成'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码'
    },
    {
      pattern: /^[0-9a-zA-Z_]{1,}$/,
      message: '密码由数字字母下划线组成'
    }
  ]
})

export default defineComponent({
  props: {
    accountTab: {
      type: String,
      default: ''
    }
  },
  setup() {
    const accountRef = ref<FormInstance>()
    const accountForm = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // 是否记住密码
    const isRemberPassword = ref<boolean>(true)

    const submit = () => {
      if (!accountRef.value) return
      accountRef.value.validate((valid, fields) => {
        if (valid) {
          if (isRemberPassword.value) {
            localCache.setCache('username', accountForm.username)
            localCache.setCache('password', accountForm.password)
          } else {
            localCache.deleteCache('username')
            localCache.deleteCache('password')
          }
          // 开始进行登录验证 47分钟
        } else {
          console.log('login account submit', fields)
        }
      })
    }
    return {
      accountRef,
      accountForm,
      accountRules,
      isRemberPassword,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.login-account {
  margin-top: 16px;
}

.bottom {
  display: flex;
  justify-content: space-between;
}
</style>
