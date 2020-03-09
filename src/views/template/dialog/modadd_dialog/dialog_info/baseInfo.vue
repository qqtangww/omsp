<!-- 容器组件-弹框容器-基本信息 -->
<template>
  <!-- 弹框基本信息 -->
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="formData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class="infoBox">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <el-form
          label-position="right"
          label-width="100px"
          inline-message
          :rules="rules"
          ref="ruleForm"
          :model="modAddData"
        >
          <div class="conBox">
            <el-form-item label="弹框编码" prop="v_DialogCode">
              <el-input v-model="modAddData.v_DialogCode" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="弹框名称" prop="v_DialogName">
              <el-input v-model="modAddData.v_DialogName"></el-input>
            </el-form-item>
            <el-form-item label="弹框标题" prop="v_DialogTitle">
              <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
                <span class="flexibleIcon">
                  <i class="iconfont icon-dongcanbiaoshi"></i>
                </span>
              </el-tooltip>
              <el-input v-model="modAddData.v_DialogTitle"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="v_Description" class='description-label'>
              <el-input
                v-model="modAddData.v_Description"
                placeholder="请输入表关系描述"
                type="textarea"
                class="minInput"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
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
  name: 'dialogBaseInfo',
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
        v_DialogCode: '',
        // 名称
        v_DialogName: '',
        // 标题
        v_DialogTitle: '',
        // 描述
        v_Description: ''
      },
      // 是否禁用
      isDisabled: false,
      rules: {
        v_DialogCode: [
          { required: true, message: '请输入弹框编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_DialogName: [
          { required: true, message: '请输入弹框名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_DialogTitle: [
          { required: true, message: '请输入弹框标题', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ]
      },
      oldModAddData: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.modAddData.i_Id = formData.i_Id
      this.$store.commit('changeRowTabData', this.modAddData)
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_DialogCode }, { v_ComponentType: 'CF_DL' })
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    // 给oldModAddData赋值
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveDialog(this.modAddData).then(res => {
            if (res.code === 0) {
              if (res.iId) {
                this.modAddData.i_Id = res.iId
              }
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$store.commit('changeRowTabData', this.modAddData)
              this.$message.success(res.msg)
              this.stdFormData = Object.assign({}, this.modeAddDialog)
              this.isTitleDisabled = false
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_instanceDialog'])
              // 给oldModAddData赋值并且给isReminder赋值true
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
              // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
              let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_DialogCode }, { v_ComponentType: 'CF_DL' })
              this.$set(currentTab, 'regin', 'regin1')
              this.$store.commit('changeRepetitionRowTabData', currentTab)
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
.add-modify-form {
  .infoBox {
    padding: 16px;
    overflow: auto;
    // border: 4px solid #abd6ff;
    box-sizing: border-box;
    height: 100%;
    .border-box {
      // height: 260px;
      position: relative;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      .el-form {
        padding: 16px 80px 16px 0;
        border: none !important;
        box-sizing: border-box;
        margin: auto;
        overflow: auto;
        .flexibleIcon {
            left: -30px;
         }
      }
    }
  }
}
.add-modify-form /deep/ .el-form-item__label {
    padding: 0px 15px 0 0;
}
.formBox  .el-dialog .add-modify-form /deep/ .description-label .minInput .el-textarea__inner {
    height: 156px !important;
}
</style>
