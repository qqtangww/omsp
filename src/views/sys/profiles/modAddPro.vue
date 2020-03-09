<template>
  <div class="mod-add-pro">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        @sumitForm="commit"
        :formRed="formRed"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      inline-message
      ref="ruleForm"
      :model="modeAddData"
      :rules="rules">
      <div class="border-box">
        <!-- <span><i class="iconfont icon-jibenxinxi"></i>基本信息</span> -->
          <el-form-item
            label="系统简码"
            :label-width="formLabelWidth"
            prop="v_SysID"
          >
            <el-input
              v-model="modeAddData.v_SysID"
              :disabled="isDisable"
              autocomplete="off"
              placeholder="可填写数字，英文,下划线组成"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="系统中文名称"
            :label-width="formLabelWidth"
            prop="v_SysName"
          >
            <el-input
              v-model="modeAddData.v_SysName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="系统英文名称"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="modeAddData.v_SysEnglishName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="10">
                <el-form-item
                label="系统开启"
                label-width="140px"
                prop="i_isOpen"
              >
                <el-switch
                  v-model="modeAddData.i_isOpen"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                 <el-form-item
                label="缺省"
                label-width="80px"
                prop="i_IsDefault"
              >
                <el-switch
                  v-model="modeAddData.i_IsDefault"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" :push="2">
               <el-form-item
                label="执行过期任务"
                label-width="100px"
                prop="i_IsExecExpireTask"
              >
                <el-switch
                  v-model="modeAddData.i_IsExecExpireTask"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="跳转的URL"
            :label-width="formLabelWidth"
            prop="v_JumpUrl"
          >
            <el-input
              v-model="modeAddData.v_JumpUrl"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="系统显示Logo"
            :label-width="formLabelWidth"
            prop="v_SysLogo"
          >
            <el-input
              v-model="modeAddData.v_SysLogo"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="v_Description"
            class='description-label'
          >
            <el-input
              v-model="modeAddData.v_Description"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>

      </div>
    </el-form>
  </div>
</template>
<script>
import { mixin } from '@/assets/js/base.js'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'modAddPro',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  mixins: [mixin, logMixin],
  data () {
    // 校验 编码输入格式
    let validCoding = (rule, value, callback) => {
      let CodingVerify = /^\w+$/
      // let mobileVerify =/^\w+$/
      setTimeout(() => {
        if (!CodingVerify.test(value)) {
          callback(new Error('请输入正确的简码'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      modeAddData: {
        i_AutoLogClear: '0',
        i_isOpen: '0',
        i_IsDefault: '0',
        i_IsExecExpireTask: '0'
      },
      fromData: {},
      // 表单印证
      rules: {
        v_SysName: [
          { required: true, message: '请输入系统名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_SysID: [
          { required: true, message: '请输入系统简码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出10个字符', trigger: 'blur' },
          { validator: validCoding, trigger: 'blur' }
        ],
        v_Description: [
          {
            min: 1,
            max: 200,
            message: '长度不可超出200个字符',
            trigger: 'blur'
          }
        ]
      },
      formLabelWidth: '140px',
      isDisable: false,
      isClear: true,
      formRed: false,
      // 小红点功能
      oldModAddData: {}
    }
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.isDisable = true
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.modeAddData = {
        ...formData
      }
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    // 提交
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = this.modeAddData
          if (this.modeAddData.i_Id > 0) {
            params.i_Id = this.modeAddData.i_Id
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.temProfileSaveData1(params).then(res => {
            // 如果数据提交成功
            if (!res.code) {
              this.$message.success(res.msg)
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
                this.stdFormData = Object.assign({}, params)
                this.$emit('title', '修改系统概要')
                this.isDisable = true
              }
              this.formRed = false
              let obj = this.$store.state.paginations
              this.$emit('getTableData', obj['CC_VW_profile'])
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    clearError () {
      this.$emit('getButtonConfig', false)
      this.modeAddData = {}
      this.isDisable = false
      this.$refs.ruleForm.resetFields()
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.auto-log-clear /deep/.el-form-item__content {
  width: 100%;
}
.mod-add-pro {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
    padding: 16px;
    .border-box {
      border: 1px solid #bfbfbf;
      position: relative;
      padding:10px 0;
      padding-right: 80px;
      > span {
        position: absolute;
        top: -10px;
        left: 20px;
        padding: 0 4px;
        background: #ffffff;
      }
    }
    .conBox {
      margin: 0;
    }
  }
}
.conBox /deep/  .el-form-item__content {
//  width: 100%;
}
</style>
