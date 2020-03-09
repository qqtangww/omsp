<template>
    <div class="add-modify-form progress-info" id="progress-info">
        <div class="formOperateBox">
      <!-- 操作栏 -->
            <action-bar :configData="configData" :formRed="formRed"  @sumitForm="commit" v-on="$listeners"></action-bar>
        </div>
      <el-form
        inline-message
        label-position="right"
        label-width="110px"
        :rules="rules"
        ref="modAddData"
        :model="modAddData"
        >
          <div class="border-box">
            <span>
                <i class="iconfont icon-jibenxinxi"></i> 基本信息
            </span>
            <div class="conBox">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="进程编码" prop="v_ProcessCode">
                            <el-input v-model="modAddData.v_ProcessCode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="进程名称" prop="v_ProcessName">
                            <el-input v-model="modAddData.v_ProcessName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="进程接口" prop="v_InterfaceApi">
                    <el-input v-model="modAddData.v_InterfaceApi"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="开始时间" prop="v_StartTime" class="startTime">
                            <el-date-picker
                              @disabledDate="disabledDate"
                              v-model="modAddData.v_StartTime"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="datetime"
                              placeholder="选择日期时间"
                              align="right"
                              :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="记录执行日志" prop="i_IsRecordLog">
                            <el-switch
                            v-model="modAddData.i_IsRecordLog"
                            active-color="#32c5d2"
                            inactive-color="#e6e7e8"
                            active-value="1"
                            inactive-value="0"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span='12'>
                        <el-form-item label="间隔时间" prop="i_RangeTime">
                            <el-input-number v-model="modAddData.i_RangeTime" controls-position="right"  size="small"></el-input-number>&nbsp;&nbsp;秒
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label="监控其他进程" prop="i_IsMonitorTask">
                            <el-switch
                            v-model="modAddData.i_IsMonitorTask"
                            active-color="#32c5d2"
                            inactive-color="#e6e7e8"
                            active-value="1"
                            inactive-value="0"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span='6' >
                        <el-form-item label="不被其他进程监控" prop="i_IsAllowMonitorTask">
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
                <el-form-item label="进程描述" prop="v_Description" class="description-label">
                    <el-input
                        v-model="modAddData.v_Description"
                        placeholder="可填写相关描述，帮助用户记忆和了解"
                        type="textarea"
                        :autosize="{ minRows: 6 }"
                    />
                </el-form-item>
            </div>
        </div>
        <div class="border-box">
            <span>
                <i class="iconfont icon-gengxinjilu"></i> 更新记录
            </span>
            <div class="conBox">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="创建者 :">{{ modAddData.v_Creator}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建时间 :">{{modAddData.d_CreateTime }}</el-form-item>
                    </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="12">
                        <el-form-item label="最后修改者 :">{{modAddData.v_LastModifiedUser }}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最后修改时间 :">{{ modAddData.d_LastModifiedTime }}</el-form-item>
                    </el-col>
                </el-row>
            </div>
        </div>
      </el-form>
    </div>
</template>

<script>
import cgiService from '@/api/cgiService'
import windowRed from '@/common/js/mixins/windowRed'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'progressInfo',
  props: {
    shareData: {
      type: Object,
      default () {}
    },
    configData: {
      type: Object,
      default () {}
    }
  },
  mixins: [windowRed, logMixin],
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
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }],
        disabledDate (time) {
          // return time.getTime() <= Date.now() - 3600 * 1000 * 24
          return time.getTime() <= Date.now()
        }
      },
      formRed: false,
      modAddData: {
        i_Id: '',
        v_ProcessCode: '',
        v_ProcessName: '',
        v_InterfaceApi: '',
        v_StartTime: '',
        i_RangeTime: undefined,
        i_IsRecordLog: '0',
        i_IsMonitorTask: '0',
        i_IsAllowMonitorTask: '0',
        v_Description: '',
        v_Creator: '',
        d_CreateTime: '',
        v_LastModifiedUser: '',
        d_LastModifiedTime: ''
      },
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
      oldmodAddData: {
        i_Id: '',
        v_ProcessCode: '',
        v_ProcessName: '',
        v_InterfaceApi: '',
        v_StartTime: '',
        i_RangeTime: undefined,
        i_IsRecordLog: '0',
        i_IsMonitorTask: '0',
        i_IsAllowMonitorTask: '0',
        v_Description: '',
        v_Creator: '',
        d_CreateTime: '',
        v_LastModifiedUser: '',
        d_LastModifiedTime: ''
      }
    }
  },
  computed: {

  },
  watch: {
    shareData: {
      immediate: true,
      handler (nv) {
        let currentRow = this.$store.state.fieRowTableData['CC_VW_progress']
        if (!currentRow) return
        util.initFormData(this.modAddData, currentRow)
        this.oldModAddData = Object.assign({}, this.modAddData)
      }
    },
    modAddData: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        // this.$set(this.oldModAddData, 'i_RangeTime', Number(this.oldModAddData))

        this.oldModAddData.i_RangeTime = Number(this.oldModAddData.i_RangeTime)
        data.i_RangeTime = Number(data.i_RangeTime)
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
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
              this.$emit('changeShareData', { needUpdate: 1 })
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

<style lang="scss" scoped>
.add-modify-form {
  height: 100%;
  // overflow: auto;
  box-sizing: border-box;
  .formOperateBox {
    width: 100%;
    height: 31px;
    background-color: #e6feff;
    line-height: 28px;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: solid 3px #bfbfbf;
    .el-button {
      display: inline-block;
      height: 100%;
      color: #333333;
      border-radius: 0;
      padding: 0 4px;
      margin-right: 4px;
    }
  }
  .el-form {
    padding: 10px 16px 0 !important;
    overflow: auto;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 16px 16px 0;
      box-sizing: border-box;
      .conBox {
          /deep/ .el-form-item textarea {
            font-size: 12px;
          }
          /deep/ .el-form-item__content {
            font-size: 12px;
          }
          .el-input--prefix /deep/ .el-input__inner{
            padding-left: 30px;
          }
          .description-label {
              position: relative;
              /deep/ .el-form-item__label {
                // 兼容 描述间距 太大
                padding-right: 16px;
                // padding-right: 24px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
              }
          }

      }
      &:first-of-type {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      /deep/ .el-form-item__conten {
          width: auto;
      }
    }
  }
}
#progress-info /deep/ sup.el-badge__content{
  right: -5px !important;
}
.el-input-number.is-controls-right /deep/ .el-input__inner {
  padding-top: 2px;
}
.add-modify-form  .conBox /deep/ .el-form-item__content {
  font-size: 12px;
}
</style>
