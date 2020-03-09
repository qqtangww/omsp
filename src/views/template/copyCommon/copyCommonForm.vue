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
            :label="`副本${lableName}编码`"
            label-width="130px"
            prop="componentCode">
            <el-input
              v-model="modeAddData.componentCode"
              autocomplete="off"
              placeholder="可填写数字，英文,下划线组成"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label=" `副本${lableName}名称`"
            label-width="130px"
            prop="v_CopyName">
            <el-input
              v-model="modeAddData.v_CopyName"
              autocomplete="off"
              placeholder="请输入副本名称"
            ></el-input>
          </el-form-item>
          <el-form-item  label-width="130px" :label="`副本${lableName}描述`" prop="v_Description" class='description-label'>
              <el-input
                v-model="modeAddData.v_Description"
                placeholder="请输入副本描述"
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
          :label="`原${lableName}编码`"
            label-width="130px"
            prop="code">
            <el-input
              v-model="modeAddData.code"
              disabled
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="`原${lableName}名称`"
            label-width="130px"
            prop="componentName">
            <el-input
              v-model="modeAddData.componentName"
              disabled
              autocomplete="off"
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
import { mapState } from 'vuex'
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
        componentCode: '',
        v_CopyName: '',
        v_Description: '',
        code: ''
      },
      v_CateCode: '',
      lableName: '视图名称',
      fromData: {},
      // 表单印证
      rules: {
        componentCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: validCoding, trigger: 'blur' }
        ],
        v_CopyName: [ { required: true, message: '请输入名称', trigger: 'blur' } ]
      },
      formRed: false,
      // 小红点功能
      oldModAddData: {},
      viewCode: [
        {
          viewid: 'CC_VW_contentView',
          name: '视图',
          code: 'v_ViewID',
          codeName: 'v_ViewName'
        },
        {
          viewid: 'CC_VW_instanceTree',
          name: '树形',
          code: 'v_TreeCode',
          codeName: 'v_TreeName'
        },
        {
          viewid: 'CC_VW_instanceForm',
          name: '表单',
          code: 'v_FormCode',
          codeName: 'v_FormName'
        },
        {
          viewid: 'CC_VW_instanceleftRight',
          name: '布局',
          code: 'v_RegionCode',
          codeName: 'v_RegionName'
        },
        {
          viewid: 'CC_VW_instanceupDown',
          name: '布局',
          code: 'v_RegionCode',
          codeName: 'v_RegionName'
        },
        {
          viewid: 'CC_VW_instanceleftCenterRight',
          name: '布局',
          code: 'v_RegionCode',
          codeName: 'v_RegionName'
        },
        {
          viewid: 'CC_VW_instanceLeftUpDown',
          name: '布局',
          code: 'v_RegionCode',
          codeName: 'v_RegionName'
        },
        {
          viewid: 'CC_VW_instanceUpDownRight',
          name: '布局',
          code: 'v_RegionCode',
          codeName: 'v_RegionName'
        },
        {
          viewid: 'CC_VW_instanceTabs',
          name: 'Tab',
          code: 'v_RegionCode',
          codeName: 'v_RegionName'
        },
        {
          viewid: 'CC_VW_instanceDialog',
          name: '弹框',
          code: 'v_DialogCode',
          codeName: 'v_DialogName'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      currentVerticalTab: state => state.tabData.v_TabsFlagCode
    })
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
      // 遍历  viewCode 中的 数据  找出对应的名字
      this.viewCode.some(item => {
        if (item.viewid === formData.viewid) {
          this.lableName = item.name
          this.$set(this.modeAddData, 'code', formData[item.code])
          this.$set(this.modeAddData, 'componentName', formData[item.codeName])
          this.$set(this.modeAddData, 'v_CopyName', `${formData[item.codeName]}-副本`)
          //  因 视图组件描述字段与 其他组件、布局不一样  特殊处理
          if (formData.v_Description) {
            this.$set(this.modeAddData, 'v_Description', formData.v_Description)
          } else {
            this.$set(this.modeAddData, 'v_Description', formData.v_ViewCName)
          }
        }
      })
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    // 提交
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$set(this.modeAddData, 'v_CateCode', this.currentVerticalTab)
          cgiService.copyData(this.modeAddData).then(res => {
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
    },
    clearError () {
      this.$emit('getButtonConfig', false)
      this.modeAddData = {}
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
