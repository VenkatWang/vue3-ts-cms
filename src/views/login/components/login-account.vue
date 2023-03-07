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
      <el-input v-model="accountForm.password"></el-input>
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
      username: '',
      password: ''
    })
    const isRemberPassword = ref<boolean>(true)

    const submit = () => {
      if (!accountRef.value) return
      accountRef.value.validate((valid, fields) => {
        if (valid) {
          console.log('login account submit', accountForm)
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
