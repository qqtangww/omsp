<!-- 进程管理新增 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="formData"
        @sumitForm="commit"
        :formRed="formRed"
        @getButtonConfig="closeFun"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="modAddData" :model="modAddData" :rules="rules" label-width="120px">
      <div class="border-box">
        <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本信息
          </span>
      <div class="conBox">
        <el-form-item label="进程编码" prop="v_ProcessCode">
          <el-input v-model="modAddData.v_ProcessCode" :disabled="isDisabled" placeholder="请按照对应编码规范输入"/>
        </el-form-item>
        <el-form-item label="进程名称" prop="v_ProcessName">
          <el-input v-model="modAddData.v_ProcessName" />
        </el-form-item>
        <el-form-item label="进程接口" prop="v_InterfaceApi">
          <el-input v-model="modAddData.v_InterfaceApi" />
        </el-form-item>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="开始时间" prop="v_StartTime" class="startTime">
              <el-date-picker
                v-model="modAddData.v_StartTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="间隔时间" prop="i_RangeTime" class="rangeTime" label-width="90px">
              <el-input-number v-model="modAddData.i_RangeTime" controls-position="right"  size="small"></el-input-number>&nbsp;&nbsp;秒
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='6'>
            <el-form-item label="记录执行日志" class="w-50">
              <el-switch
                v-model="modAddData.i_IsRecordLog"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="监控其他进程" class="w-50">
              <el-switch
                v-model="modAddData.i_IsMonitorTask"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span='8'>
            <el-form-item label="不被其他进程监控" class="w-50">
              <el-switch
                v-model="modAddData.i_IsAllowMonitorTask"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="进程描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="modAddData.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 6 }"
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
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'addProgress',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    ifDialog: Boolean
  },
  data () {
    var commonCode = (rule, value, callback) => {
      let codeVerify = /^\w+$/
      setTimeout(() => {
        if (!codeVerify.test(value)) {
          callback(new Error('请输入由数字,英文,下划线组合'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      modAddData: {
        v_ProcessCode: '',
        v_ProcessName: '',
        v_InterfaceApi: '',
        v_StartTime: '',
        i_RangeTime: undefined,
        i_IsRecordLog: '0',
        i_IsMonitorTask: '0',
        i_IsAllowMonitorTask: '0',
        v_Description: ''
      },
      // 是否禁用
      isDisabled: false,
      rules: {
        v_ProcessCode: [
          { required: true, message: '请输入进程编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_ProcessName: [
          { required: true, message: '请输入进程名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_InterfaceApi: [{ required: true, message: '请输入进程接口', trigger: 'blur' }],
        v_StartTime: [{ required: true, message: '请选择值开始时间', trigger: 'blur' }]
      },
      oldModAddData: {
        v_ProcessCode: '',
        v_ProcessName: '',
        v_InterfaceApi: '',
        v_StartTime: '',
        i_RangeTime: undefined,
        i_IsRecordLog: '0',
        i_IsMonitorTask: '0',
        i_IsAllowMonitorTask: '0',
        v_Description: ''
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
  methods: {
    commit () {
      this.$refs.modAddData.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.progressSaveData1(this.modAddData).then(res => {
            if (res.code === 0) {
              this.formRed = false
              this.$message.success(res.msg)
              if (res.iId) {
                this.modAddData.i_Id = res.iId
              }
              this.$emit('getTableData')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
      this.$emit('closeDialog', false)
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
  .el-form {
    height: 100%;
    padding: 20px 10px 10px 10px !important;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      .conBox {
        margin-left: 20px;
        .startTime /deep/ .el-form-item__content {
          width: 180px;
          input{
            padding-left: 30px;
            padding-right: 30px;
          }
        }
        .rangeTime /deep/ .el-form-item__content,.allow-monitor-task /deep/ .el-form-item__content {
          width: 130px;
        }
        .w-50 /deep/ .el-form-item__content{
          width: 50px;
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
