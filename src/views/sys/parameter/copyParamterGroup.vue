<!-- 复制参数组的表单 -->
<template>
  <div class="copy-common-form">
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
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 副本信息
        </span>
          <el-form-item
            label="副本参数组编码"
            label-width="110px"
            prop="code"
          >
            <el-input
              v-model="modeAddData.code"
              autocomplete="off"
              placeholder="可填写数字，英文,下划线组成"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="副本参数组名称"
            label-width="110px"
            prop="v_GroupName"
          >
            <el-input
              v-model="modeAddData.v_GroupName"
              autocomplete="off"
              placeholder="请输入副本参数组名称"
            ></el-input>
          </el-form-item>
              <el-form-item  label-width="110px" label="副本参数组描述" prop="v_Description" class='description-label'>
              <el-input
                v-model="modeAddData.v_Description"
                placeholder="请输入副本参数组描述"
                type="textarea"
                class="minInput"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
           </el-form-item>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 原文件信息
        </span>
          <el-form-item
            label="原参数组编码"
            label-width="110px"
            prop="v_GroupCode"
          >
            <el-input
              v-model="modeAddData.v_GroupCode"
              disabled
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="原参数组名称"
            label-width="110px"
            prop="componentName"
          >
            <el-input
              v-model="componentName"
              autocomplete="off"
              disabled
              placeholder="请输入"
            ></el-input>
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
  name: 'copyCommonForm',
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
        code: '',
        v_GroupName: '',
        v_Description: '',
        v_GroupCode: ''
      },
      v_CateCode: '',
      // 表单印证
      rules: {
        code: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: validCoding, trigger: 'blur' }
        ],
        v_GroupName: [ { required: true, message: '请输入名称', trigger: 'blur' } ]
      },
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
    // 获取当配置操作数据
    let confsBtn = this.$store.state.confsBtn
    // 获取 当前行的数据
    let formData = this.$store.state.fieTableData
    if (confsBtn.operationcode === 'copyData') {
      this.$set(this.modeAddData, 'v_GroupCode', formData.v_GroupCode)
      // this.$set(this.modeAddData, 'componentName', formData.v_EnumName)
      this.componentName = formData.v_GroupName
      this.$set(this.modeAddData, 'v_Description', formData.v_Description)
      this.$set(this.modeAddData, 'v_GroupName', `${formData.v_GroupName}-副本`)
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    // 提交
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          cgiService.copyParameterGroup(this.modeAddData).then(res => {
            if (!res.code) {
              this.$message.success(res.msg)
              this.formRed = false
              this.$emit('getTableData')
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
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
.auto-log-clear /deep/.el-form-item__content {
  width: 100%;
}
.copy-common-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
    padding: 16px;
    box-sizing: border-box;
    .border-box {
      border: 1px solid #bfbfbf;
      position: relative;
      padding:15px 0;
      padding-right: 80px;
      padding-left: 30px;
      box-sizing: border-box;
      > span {
        position: absolute;
        top: -10px;
        left: 20px;
        padding: 0 4px;
        background: #ffffff;
      }
      &:last-of-type {
        margin-top: 15px;
      }
      .hint-text {
        border: 1px solid #5892F6;
        line-height: 30px;
        text-align: center;
        background: #E3EEFF;
        color: #333333;
        font-size: 12px;
      }
    }
  }
}
.formBox .el-dialog div.el-dialog__body .copy-common-form .el-form .el-form-item.description-label /deep/ textarea {
    height: 120px !important;
}
</style>
