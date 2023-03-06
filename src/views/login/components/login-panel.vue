<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane label="User">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <User />
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <div>真好笑</div>
      </el-tab-pane>
      <el-tab-pane label="User">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon>
              <el-icon>
                <Cellphone />
              </el-icon>
            </el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <div>哦</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 200px;

  .title {
    text-align: center;
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
