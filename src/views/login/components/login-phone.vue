<template>
  <el-form
    class="login-phone"
    :label-width="65"
    ref="phoneRef"
    :model="phoneForm"
    :rules="phoneRules"
  >
    <el-form-item label="手机" prop="num">
      <el-input v-model="phoneForm.num"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="code">
        <el-input v-model="phoneForm.code"></el-input>
        <el-button type="primary">获取验证码</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'

const phoneRules = reactive<FormRules>({
  num: [
    {
      required: true,
      message: '请输入手机号码'
    },
    {
      pattern:
        /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      message: '用户名由数字字母下划线组成'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码'
    }
  ]
})

export default defineComponent({
  setup() {
    const phoneRef = ref<FormInstance>()
    const phoneForm = reactive({
      num: '',
      code: ''
    })
    // # 被父组件通过ref调用
    const submit = () => {
      console.log('login phone submit')
    }
    return {
      phoneRef,
      phoneForm,
      phoneRules,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.login-phone {
  margin-top: 16px;
  // margin-bottom: 32px;
}

.code {
  display: flex;

  button {
    margin-left: 8px;
  }
}
</style>
