<!-- 业务类别新增修改 -->
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
    <div class="tabs-base-info">
    <el-form inline-message ref="modAddData" :model="modAddData" :rules="rules" label-width="120px">
      <div class="border-box">
        <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本信息
          </span>
      <div class="conBox">
        <el-form-item label="参数组编码" prop="v_GroupCode">
          <el-input v-model="modAddData.v_GroupCode" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="参数组名称" prop="v_GroupName">
          <el-input v-model="modAddData.v_GroupName" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="modAddData.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
      </div>
    </el-form>
    </div>
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
  name: 'parameterSetInfo',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    ifDialog: Boolean
  },
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
      modAddData: {
        // 编码
        v_GroupCode: '',
        // 名称
        v_GroupName: '',
        // 描述
        v_Description: ''
      },
      // 是否禁用
      isDisabled: false,
      rules: {
        v_GroupCode: [
          { required: true, message: '请输入参数组编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_GroupName: [
          { required: true, message: '请输入参数组名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ]
      },
      oldModAddData: {
        // 编码
        v_GroupCode: '',
        // 名称
        v_GroupName: '',
        // 描述
        v_Description: ''
      },
      operationcode: '',
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
    this.operationcode = this.$store.state.confsBtn.operationcode
    if (this.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.$set(this.modAddData, 'i_Id', formData.i_Id)
      this.$store.commit('changeRowTabData', this.modAddData)
    }
    // 给oldModAddData赋值
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      this.$refs.modAddData.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveParameterGrp(this.modAddData).then(res => {
            if (res.code === 0) {
              if (res.iId) {
                this.modAddData.i_Id = res.iId
              }
              this.$message.success(res.msg)
              // 重新调取接口渲染数据
              let param = this.$store.state.paginations['CC_VW_parameterGroup']
              this.$set(param, 'viewid', this.$store.state.fieRowTableData['CC_VW_parameterGroup'].viewid)
              this.$emit('getTableData', param)
              // 给oldModAddData赋值并且给formRed赋值true
              this.formRed = false
              this.oldModAddData = Object.assign({}, this.modAddData)
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
.tabs-base-info {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  overflow: auto;
  .el-form {
    height: 100%;
    max-width: 650px;
    margin: auto;
    padding: 10px;
    border: none !important;
    .border-box {
      height: 100%;
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      .conBox {
        margin-left: 20px;
      }
      &:first-of-type {
        margin-top: 0;
        height: 296px;
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
