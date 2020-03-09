<!-- 内容组件-表单组件-基本信息 -->
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
    <el-form inline-message label-position="right" label-width="110px" :rules="rules" ref="ruleForm" :model="modAddData">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="conBox">
          <el-form-item label="表单编码" prop="v_FormCode">
            <el-input v-model="modAddData.v_FormCode" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="表单名称" prop="v_FormName">
            <el-input v-model="modAddData.v_FormName"></el-input>
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
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 配置
        </span>
        <div class="conBox">
          <el-form-item label="自定内容名称" prop="v_CustomName">
            <el-input v-model="modAddData.v_CustomName"></el-input>
          </el-form-item>
          <el-form-item label="模板名称" prop="v_TemplateCode">
            <el-select
              placeholder="默认"
              v-model="modAddData.v_TemplateCode"
              filterable
              clearable
              @focus="getTemplateUrl"
            >
              <el-option
                v-for="item in templateUrl"
                :key="item.i_Id"
                :label="item.v_TemplateName"
                :value="item.v_TemplateCode"
              >
                <span style="float: left">{{ item.v_TemplateName }}</span>
                <span
                  style="float: right; color: #8492a6; font-size: 13px"
                >{{ item.v_TemplateCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扩展接口" prop="v_ExtendedInterface">
            <el-input v-model="modAddData.v_ExtendedInterface"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'infoTab',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
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
        v_FormCode: '',
        // 名称
        v_FormName: '',
        // 描述
        v_Description: '',
        // 自定义内容
        v_CustomName: '',
        // 模板路径
        v_TemplateCode: '',
        // 扩展接口
        v_ExtendedInterface: ''
      },
      formData: {},
      // 模板路径
      templateUrl: [],
      rules: {
        v_FormCode: [
          { required: true, message: '请输入表单编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_FormName: [
          { required: true, message: '请输入表单名称', trigger: 'blur' }
        ],
        v_CustomName: [
          { required: true, message: '请输入自定义内容名称', trigger: 'blur' }
        ],
        v_TemplateCode: [
          { required: true, message: '请选择模板路径', trigger: 'change' }
        ]
      },
      oldModAddData: {},
      isDisabled: false,
      operationcode: ''
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
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
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', this.modAddData)
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_FormCode }, { v_ComponentType: 'CC_FM' })
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    } else {
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', {})
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = {}
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
    this.getTemplateUrl()
  },
  methods: {
    // 获取模板路径
    getTemplateUrl () {
      let id = 'CC_FM'
      cgiService.getTemplateUrl(id).then(res => {
        this.templateUrl = res.data
      })
    },
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveForm(this.modAddData).then(res => {
            if (res.code === 0) {
              if (this.operationcode === 'add') {
                // 如果是添加入口 让其它TAB数据调取新增这个实例的数据
                this.$store.commit('rowData', { v_FormCode: res.v_FormCode })
              }
              this.isDisabled = true
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$message.success(res.msg)
              // 把修改后的必填项数据  存入VUEX 中  方便其他Tab获取
              this.$store.commit('changeRowTabData', this.modAddData)
              // 把修改后的必填项数据  存入VUEX 中  方便其他Tab获取【方便组参数保存调取数据】
              let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_FormCode }, { v_ComponentType: 'CC_FM' })
              this.$set(currentTab, 'regin', 'regin1')
              this.$store.commit('changeRepetitionRowTabData', currentTab)
              if (Number(res.iId) > 0) {
                this.modAddData.i_Id = res.iId
              }
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_instanceForm'])
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
  mounted () {},
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
  .el-form {
    border: none !important;
    padding: 0px 16px !important;
    overflow: auto;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      box-sizing: border-box;
      &:first-of-type {
        margin-top: 10px;
      }
      &:last-of-type {
        margin-bottom: 10px;
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
