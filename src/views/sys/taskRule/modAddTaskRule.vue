<!-- 任务规则库  基本信息 -->
<template>
  <div class="add-org-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="modeAddData" :rules="rules" label-width="100px" id="task-rule">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>基本信息</span>
        </span>
        <div class="conBox">
          <el-form-item label="任务规则类型" prop="v_TaskRuleType">
            <el-select placeholder="请选择模板类型" v-model="modeAddData.v_TaskRuleType" clearable filterable>
              <el-option
                v-for="(item,index) in templateCategory"
                :key="index"
                :label="item.v_EnumValue"
                :value="item.v_EnumValueName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务规则编码" prop="v_TaskRuleCode">
            <el-input v-model="modeAddData.v_TaskRuleCode" :disabled="disableCode"/>
          </el-form-item>
          <el-form-item label="任务规则名称" prop="v_TaskRuleName">
            <el-input v-model="modeAddData.v_TaskRuleName" />
          </el-form-item>
          <el-form-item label="任务规则接口" >
            <el-input v-model="modeAddData.v_InterfaceApi" />
          </el-form-item>
          <el-form-item label="任务规则描述" class='description-label'>
            <el-input
              v-model="modeAddData.v_Description"
              placeholder="请输入"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
        </div>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>任务规则</span>
        </span>
        <div class="conBox">
          <el-form-item label="执行规则">
            <el-radio-group v-model="modeAddData.i_ExecRule" @change="changeExecRule">
              <el-radio label="2">定时执行</el-radio>
              <el-radio label="3">定期执行</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="定时执行" v-if="modeAddData.i_ExecRule === '2'" prop="d_RegularDate">
            <el-date-picker
              v-model="modeAddData.d_RegularDate"
              type="datetime"
              placeholder="选择日期时间"
              :picker-options="pickerOptions"
              default-time="08:00:00">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="定期执行规则" v-if="modeAddData.i_ExecRule === '3'" prop="v_RuleCode">
            <el-select placeholder="请选择" v-model="modeAddData.v_RuleCode" clearable filterable>
              <el-option
                v-for="(item,index) in ruleList"
                :key="index"
                :label="item.v_RuleName"
                :value="item.v_RuleCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="错误上限次数">
            <el-input-number
              v-model="modeAddData.i_SetErrorNum"
              controls-position="right"
              :min="1"
              size="small">
            </el-input-number>&nbsp;&nbsp;&nbsp;次
          </el-form-item>
          <el-form-item label="消息模板">
            <el-select placeholder="请选择模板类型" v-model="modeAddData.v_MsgsTemplateCode" clearable filterable>
              <el-option
                v-for="(item,index) in msgTemplateList"
                :key="index"
                :label="item.v_TemplateName"
                :value="item.v_TemplateCode">
              </el-option>
            </el-select>
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
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'regularlyEnforceRules',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [windowRed, logMixin],
  data () {
    // 编码正则匹配
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
      disableCode: false,
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
        }]
      },
      // 消息模板列表
      msgTemplateList: [],
      // 任务规则类型列表
      templateCategory: [],
      viewid: '',
      // 定期执行规则 列表
      ruleList: [],
      modeAddData: {
        i_Id: '',
        // 任务规则类型
        v_TaskRuleType: '',
        // 任务规则编码
        v_TaskRuleCode: '',
        // 任务规则名称
        v_TaskRuleName: '',
        // 任务规则接口
        v_InterfaceApi: '',
        // 任务规则描述
        v_Description: '',
        // 执行规则
        i_ExecRule: '2',
        // 任务规则接口
        d_RegularDate: '',
        // 定期执行规则
        v_RuleCode: '',
        // 错误上限次数
        i_SetErrorNum: '',
        // 消息模板
        v_MsgsTemplateCode: ''
      },
      rules: {
        v_TaskRuleType: [
          { required: true, message: '请选择任务规则类型', trigger: 'change' }
        ],
        v_TaskRuleCode: [
          { required: true, message: '请输入任务规则编码', trigger: 'blur' }
        ],
        v_TaskRuleName: [
          { required: true, message: '请输入任务规则名称', trigger: 'blur' }
        ],
        d_RegularDate: [
          { required: true, message: '请选择定时日期时间', trigger: 'blur' }
        ],
        v_RuleCode: [
          { required: true, message: '请选择定期执行规则', trigger: 'blur' }
        ]
      },
      // 小红点功能
      oldModAddData: {
        i_Id: '',
        // 任务规则类型
        v_TaskRuleType: '',
        // 任务规则编码
        v_TaskRuleCode: '',
        // 任务规则名称
        v_TaskRuleName: '',
        // 任务规则接口
        v_InterfaceApi: '',
        // 任务规则描述
        v_Description: '',
        // 执行规则
        i_ExecRule: '2',
        // 任务规则接口
        d_RegularDate: '',
        // 定期执行规则
        v_RuleCode: '',
        // 错误上限次数
        i_SetErrorNum: '',
        // 消息模板
        v_MsgsTemplateCode: ''
      }
    }
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        this.oldModAddData.i_SetErrorNum = Number(data.i_SetErrorNum)
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    // 获取当前表单对应视图得viewid
    this.viewid = this.buttonConfig.viewid
    // 调取枚举数据
    this.queryComponents({ enumCode: ['taskCategory'] })
    // 调取消息模板列表
    this.getMsgTemplateList()
    // 调取定期执行规则
    this.getSysRuleList()
    // type等于1为操作栏按钮【新增操作】，等于2为行内操作按钮【修改操作】
    if (this.buttonConfig.type === '2') {
      this.disableCode = true
      this.$set(this.modeAddData, 'i_Id', this.currentTableRow.i_Id)
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', this.modeAddData)
      util.initFormData(this.modeAddData, this.currentTableRow)
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = Object.assign({}, this.modeAddData)
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    changeExecRule () {
      this.$refs.metaForm.clearValidate(['d_RegularDate', 'v_RuleCode'])
    },
    getSysRuleList () {
      cgiService.getSysRuleList().then(res => {
        if (res.code === 0) {
          this.ruleList = res.data
        }
      })
    },
    getMsgTemplateList () {
      cgiService.getMsgTemplateList().then(res => {
        if (res.code === 0) {
          this.msgTemplateList = res.data
        }
      })
    },
    // 获取组件
    queryComponents (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            switch (key) {
              case 'taskCategory':
                // 模板类型
                this.templateCategory = res.data[key]
                break

              default:
                break
            }
          }
        }
      })
    },
    commit () {
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          let params = { ...this.modeAddData }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.taskSaveData5(params).then(res => {
            if (res.code === 0) {
              // tab取消置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.isReminder = true
              this.$message.success(res.msg)
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
              }
              this.oldModAddData = Object.assign({}, this.modeAddData)
              // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
              this.$store.commit('changeRowTabData', this.modeAddData)
              this.$set(params, 'viewid', this.viewid)
              this.$store.commit('nestTableRowData', params)
              this.$emit('getTableData')
            } else {
              this.$message.error(res.msg)
            }
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
<style lang="scss" scoped>
.add-org-form {
  .el-form {
    overflow-x: hidden;
    padding: 16px;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin: 15px 0 12px;
      padding: 8px 0 14px 0;
      &:first-of-type {
        margin-top: 0;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
        i{
          margin-right: 4px;
        }
      }
      .conBox {
        .el-input--prefix /deep/ .el-input__inner{
          padding-left: 30px;
        }
        /deep/ .el-checkbox {
          margin: 0 20px 0 0;
        }
      }
    }
    /deep/ .el-switch {
      width: 40px;
    }
  }
}
#task-rule{
  border: none;
}
</style>
