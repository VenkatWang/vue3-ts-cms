<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="accountTab">
      <el-tab-pane name="user">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <User />
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account
          ref="loginAccountRef"
          :account-tab="accountTab"
        ></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <el-icon>
                <Cellphone />
              </el-icon>
            </el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone
          ref="loginPhoneRef"
          :account-tab="accountTab"
        ></login-phone>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" class="submit-btn" @click="submit"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAccount,
    loginPhone
  },
  setup() {
    const accountTab = ref('user')
    type loginAccountType = InstanceType<typeof loginAccount>
    const loginAccountRef = ref<loginAccountType>()

    type loginPhoneType = InstanceType<typeof loginPhone>
    const loginPhoneRef = ref<loginPhoneType>()
    const submit = () => {
      if (accountTab.value === 'user') {
        loginAccountRef.value?.submit()
      }
      if (accountTab.value === 'phone') {
        loginPhoneRef.value?.submit()
      }
    }
    return {
      accountTab,
      loginAccountRef,
      loginPhoneRef,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 350px;
  margin-bottom: 200px;

  .title {
    text-align: center;
  }

  .submit-btn {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
<style lang="less">
.login-panel {
  .custom-tabs-label {
    .el-icon {
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }
  }
}
</style>
