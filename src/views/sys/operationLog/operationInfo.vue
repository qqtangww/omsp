<!-- 操作日志info -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      label-position="right"
      label-width="100px"
      ref="ruleForm"
      :model="currentData"
      inline-message
      class="operation-info">
      <div class="info-content border-box" id="m-0">
        <span class="form-title">
          <i class="iconfont icon-jibenxinxi"></i> 操作详情
        </span>
        <div class="form-content">
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="用户名:">{{currentData.v_UserName}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户帐号:">{{currentData.v_UserID}}</el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="操作时间:">{{currentData.d_ExecuteTime}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作页面:">{{currentData.v_PageName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="组件名称:">{{currentData.v_componentName}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="操作名称:">{{currentData.v_OperationName}}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="操作名称:" class="h-auto description-label">
            <el-input type="textarea" :autosize="{ minRows: 19, maxRows: 20}" v-model="currentStr" />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'operationInfo',
  props: {
    shareData: Object,
    configData: Object
  },
  computed: {
    currentData () {
      return this.shareData
    },
    currentStr () {
      return JSON.stringify(this.shareData)
    }
  },
  data () {
    return {
    }
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
.operation-info {
  padding: 30px 14px 20px 14px;
  .info-content{
    position: relative;
    padding: 16px 0 8px;
    border: 1px solid #bfbfbf;
  }
  /deep/ .el-form-item__content{
    font-size: 12px;
  }
  .form-title {
    position: absolute;
    top: -10px;
    left: 8px;
    padding: 0 8px;
    background: #ffffff;
    font-size: 14px;
  }
  #m-0 /deep/ .el-form-item{
      margin-top: 0;
  }
  .h-30 /deep/ .el-form-item__content{
      height: 30px;
  }
  .h-auto /deep/ .el-form-item__content{
      height: auto;
  }
  /deep/ .el-textarea{
      width: 380px;
  }
}
</style>
