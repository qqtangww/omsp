<!-- 内容组件-树形组件-基本信息 -->
<template>
  <div class="info-Tab-tree">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="dataForm" :rules="rules" :model="modAddData">
      <div class="conBox">
        <el-form-item label="树形编码" label-width="110px" prop="v_TreeCode">
          <el-input v-model="modAddData.v_TreeCode" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="树形名称" label-width="110px" prop="v_TreeName">
          <el-input v-model="modAddData.v_TreeName"></el-input>
        </el-form-item>
        <el-form-item label="描述" label-width="110px" prop="v_Description" class='description-label'>
          <el-input
            class="textareaBox"
            v-model="modAddData.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="SQL查询" id="viewText" label-width="110px" class="sqlBox description-label" prop="v_SQLString">
          <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
            <span class="flexibleIcon1">
              <i class="iconfont icon-dongcanbiaoshi"></i>
            </span>
          </el-tooltip>
          <el-input
            v-model="modAddData.v_SQLString"
            placeholder="请输入SQL语句"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="查询条件" id="viewText" label-width="110px" class="sqlBox description-label" prop="v_PreCondition">
          <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
            <span class="flexibleIcon1">
              <i class="iconfont icon-dongcanbiaoshi"></i>
            </span>
          </el-tooltip>
          <el-input
            v-model="modAddData.v_PreCondition"
            placeholder
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="模板名称" label-width="110px" prop="v_TemplateCode">
          <el-select
            v-model="modAddData.v_TemplateCode"
            placeholder="请选择模板路径"
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
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.v_TemplateCode }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="扩展接口" label-width="110px" prop="v_ExtendedInterface">
          <el-input v-model="modAddData.v_ExtendedInterface"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import util from '@/common/js/util'
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'infoTab_tree',
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
        v_TreeCode: '',
        // 树形组件名称
        v_TreeName: '',
        // 描述
        v_Description: '',
        // SQL查询
        v_SQLString: '',
        // 查询条件
        v_PreCondition: '',
        // 模板路径
        v_TemplateCode: '',
        // 扩展接口
        v_ExtendedInterface: ''
      },
      isDisabled: false,
      rules: {
        v_TreeCode: [
          { required: true, message: '请输入编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_TreeName: [
          { required: true, message: '请输入树形组件名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_SQLString: [
          { required: true, message: '请输入SQL', trigger: 'blur' }
        ],
        // v_PreCondition: [
        //   { required: true, message: '请输入查询条件', trigger: 'blur' }
        // ],
        v_TemplateCode: [
          { required: true, message: '请选择模板路径', trigger: 'change' }
        ]
      },
      // 模板路径
      templateUrl: [],
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
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData
    })
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    if (this.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.$set(this.modAddData, 'i_Id', formData.i_Id)
      let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_TreeCode }, { v_ComponentType: 'CC_TR' })
      this.$set(currentTab, 'regin', 'regin1')
      // 把修改的数据存入vuex中  方便返回给其他的Tab页
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    } else {
      let currentTab = {}
      this.$set(currentTab, 'regin', 'regin1')
      // 把修改的数据存入vuex中  方便返回给其他的Tab页
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
    this.getTemplateUrl()
  },
  methods: {
    commit () {
      this.$refs.dataForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveTree(this.modAddData).then(res => {
            if (res.code === 0) {
              if (this.operationcode === 'add') {
                // 如果是添加入口 让其它TAB数据调取新增这个实例的数据
                this.$store.commit('rowData', { v_TreeCode: res.v_TreeCode, v_TreeName: this.modAddData })
              }
              // 置灰 编码
              this.isDisabled = true
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$message.success(res.msg)
              if (Number(res.iId) > 0) {
                this.modAddData.i_Id = res.iId
                // this.$store.commit('rowData', res.data)
              }
              let param = this.$store.state.paginations
              this.$emit('getTableData', param['CC_VW_instanceTree'])
              // 把修改后的必填项数据  存入VUEX 中  方便其他Tab获取
              let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_TreeCode }, { v_ComponentType: 'CC_TR' })
              this.$set(currentTab, 'regin', 'regin1')
              this.$store.commit('changeRepetitionRowTabData', currentTab)
              this.$set(currentTab, 'viewid', currentTab.v_TreeCode)
              this.$store.commit('nestTableRowData', currentTab)
              // 保存后设置小红点消失
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 获取模板路径
    getTemplateUrl () {
      let id = 'CC_TR'
      cgiService.getTemplateUrl(id).then(res => {
        this.templateUrl = res.data
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
.info-Tab-tree {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  > .el-form {
    height: 100%;
    overflow: auto;
    border: none !important;
    flex: 1;
    .conBox {
      padding: 10px 0;
      .flexibleIcon1 {
        left: -30px;
      }
    }
  }
}
.formBox .conBox /deep/ .el-form-item__content {
  width: 613px;
}
.formBox .conBox /deep/ .sqlBox .el-form-item__label {
  padding-left: 10px;
}
#viewText {
  /deep/ .el-textarea textarea {
    min-height: 200px!important;
  }
}
.el-form .el-form-item .flexibleIcon1   {
  top: 50%;
  transform: translateY(-50%)
}
</style>
