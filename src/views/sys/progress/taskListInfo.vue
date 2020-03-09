<!-- 进程管理 任务列表 修改 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        @sumitForm="commit"
        :formRed="formRed"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form ref="modAddData" :model="modAddData" label-width="120px">
      <div class="border-box">
        <span>
            <i class="iconfont icon-jibenxinxi"></i> 任务信息
          </span>
      <div class="conBox">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="任务规则编码：">{{ shareData.v_TaskRuleCode }}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="任务规则名称：">{{ shareData.v_TaskRuleName }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="任务ID：">{{ shareData.i_TaskID }}</el-form-item>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="生成时间：">{{ shareData.d_CreateTime }}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="预计执行时间：">{{ shareData.d_TaskDate }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="实际执行时间：">{{ shareData.d_TaskExecDate }}</el-form-item>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="实际错误次数：">{{ shareData.i_errorNums }}</el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="错误上限次数：">{{ shareData.i_SetErrorNum }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="任务备注：" class='description-label'>
          <el-input
            v-model="modAddData.v_ExecutionRemak"
            placeholder="请输入"
            type="textarea"
            :autosize="{ minRows: 7 }"
          />
        </el-form-item>
      </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'taskListInfo',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      modAddData: {
        v_ExecutionRemak: ''
      },
      oldModAddData: {
        v_ExecutionRemak: ''
      },
      formRed: false
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    this.modAddData.v_ExecutionRemak = this.oldModAddData.v_ExecutionRemak = this.currentTableRow.v_ExecutionRemak
  },
  methods: {
    commit () {
      let temporaryObj = {
        i_Id: this.shareData.i_Id,
        v_ExecutionRemak: this.modAddData.v_ExecutionRemak
      }
      cgiService.progressSaveData4(temporaryObj).then(res => {
        if (res.code === 0) {
          this.formRed = false
          this.$message({
            type: 'success',
            duration: '1000',
            message: res.msg
          })
          this.$emit('getTableData')
        } else {
          this.$message({
            type: 'error',
            duration: '1000',
            message: res.msg
          })
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
.add-modify-form {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  overflow: auto;
  /deep/ .el-form-item__content{
    width: auto;
  }
  .el-form {
    height: 100%;
    padding: 10px;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 8px 0;
      .conBox {
        margin: 0 20px;
        .startTime /deep/ .el-form-item__content {
              width: 130px;
          }
      }
      &:first-of-type {
        margin-top: 0;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
    }
  }
}
</style>
