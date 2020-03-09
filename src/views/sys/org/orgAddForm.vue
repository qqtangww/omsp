
<template>
  <div class="add-org-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        v-on="$listeners"
        :shareData="metaForm"
        :formRed="formRed"
        @sumitForm="commit"
        @getButtonConfig="closeFun"
      ></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="metaForm" :rules="rules" label-width="120px">
      <div class="title-border">
          <span class="title-style"><i class="iconfont icon-jibenxinxi"></i>基本信息</span>
      <div class="conBox">
        <el-form-item label="机构代码" prop="v_OrgCode">
          <el-input v-model="metaForm.v_OrgCode" :disabled="isDisabled" />
        </el-form-item>
        <el-form-item label="机构全称" prop="v_OrgFullName">
          <el-input v-model="metaForm.v_OrgFullName" />
        </el-form-item>
        <el-form-item label="机构简称" prop="v_OrgShortName">
          <el-input v-model="metaForm.v_OrgShortName" />
        </el-form-item>
        <el-form-item label="电子邮箱" prop="v_Email">
          <el-input v-model="metaForm.v_Email" />
        </el-form-item>
        <el-form-item label="CCC代码" prop="v_OrgCCC">
          <el-input v-model="metaForm.v_OrgCCC" />
        </el-form-item>
        <el-form-item label="负责人ID" prop="v_ManagerUserID">
          <el-input v-model="metaForm.v_ManagerUserID" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class="orgfullName description-label">
          <el-input
            v-model="metaForm.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'orgAddForm',
  props: {
    shareData: {
      type: Object
    },
    configData: {
      type: Object
    }
  },
  mixins: [logMixin],
  data () {
    let validateEmail = (rule, value, callback) => {
      let rulesEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!value) {
        callback()
      }
      if (!rulesEmail.test(value)) {
        callback(new Error('请输入正确的电子邮箱'))
      } else {
        callback()
      }
    }
    // 账户正则匹配
    let changeUserID = (rule, value, callback) => {
      let mobileVerify = /^[a-zA-Z][a-zA-Z0-9_]*$/
      // let mobileVerify =/^\w+$/
      setTimeout(() => {
        if (!value) {
          callback()
        }
        if (!mobileVerify.test(value)) {
          callback(new Error('请输入正确的用户账号'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      rules: {
        v_OrgCode: [
          { required: true, message: '请输入机构代码', trigger: 'blur' },
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_OrgFullName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_OrgShortName: [
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_Email: [{ validator: validateEmail, trigger: 'blur' }],
        v_OrgCCC: [
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_ManagerUserID: [{ required: true, message: '请输入负责人ID', trigger: 'blur' },
          { validator: changeUserID, trigger: 'blur' }
        ]
      },
      isDisabled: false,
      metaForm: {
        v_OrgFullName: '',
        v_OrgCode: '',
        v_Description: '',
        v_OrgShortName: '',
        v_Email: '',
        v_OrgCCC: '',
        v_ManagerUserID: '',
        i_ParentOrgID: 0
      },
      // 小红点功能
      oldModAddData: {},
      formRed: false
    }
  },
  created () {
    // 新增
    this.isDisabled = false
    // 新增需要把 父级的orgid  通过  parentorgid字段传过去
    this.metaForm.i_ParentOrgID = this.shareData.i_OrgID
    this.oldModAddData = Object.assign({}, this.metaForm)
  },
  watch: {
    metaForm: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  methods: {
    commit () {
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.metaForm.logParams = this.getLogParams()
          }
          cgiService.temOrgGroupSaveData1(this.metaForm).then(res => {
            if (res.code === 0) {
              this.formRed = false
              let cId = ''
              this.$message.success(res.msg)
              if (res.i_Cid && res.iId) {
                cId = res.i_Cid
                this.metaForm.i_Id = res.iId
                this.cId = res.i_Cid
              } else {
                cId = this.metaForm.i_Cid
              }
              this.$emit('changeShareData', { flag: true })
              this.$emit('getData', { commitFormData: JSON.parse(JSON.stringify(this.metaForm)), cId })
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
  },
  mounted () {
    if (this.configData.operationcode === 'add') {
      this.$refs.metaForm.resetFields()
    }
  }
}
</script>

<style scoped lang='scss'>
.add-org-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
      padding: 20px 14px 10px 14px;
      flex: 1;
      .title-border {
        padding: 20px 0  35px 10px;
        .conBox {
          margin: 0;
        }
      }
  }
}
</style>
