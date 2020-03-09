<!-- 业务类别新增修改 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="metaForm"
        :formRed="formRed"
        @sumitForm="commit"
        @getData="getData"
        @getButtonConfig="closeFun"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="metaForm" :rules="rules" label-width="120px">
      <div class="title-border">
         <span class="title-style"><i class="iconfont icon-jibenxinxi"></i>基本信息</span>
      <div class="conBox">
        <el-form-item label="业务名称" prop="v_BizName">
          <el-input v-model="metaForm.v_BizName" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
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
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'businessAddForm',
  mixins: [logMixin],
  props: {
    shareData: {
      type: Object
    },
    configData: {
      type: Object
    },
    ifDialog: Boolean
  },
  data () {
    return {
      metaForm: {
        i_Id: '0',
        // 业务类别名称
        v_BizName: '',
        // 父业务类别ID
        i_ParentBizID: '',
        // 类别描述
        v_Description: ''
      },
      rules: {
        v_BizName: [
          { required: true, message: '请输入业务类别名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
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
      // 小红点功能
      oldModAddData: {},
      formRed: false
    }
  },
  created () {
    if (this.buttonConfig.operationcode === 'add') {
      delete this.metaForm.i_ParentBizID
    } else {
      this.metaForm.i_ParentBizID = this.$store.state.fieTableData.i_BizID
    }
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
          cgiService.newAddBusinessCate(this.metaForm).then(res => {
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
        } else {
          return false
        }
      })
    },
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
      this.$emit('closeDialog', false)
    },
    // 刷新数据
    getData (params) {
      // this.$parent.$parent.$parent.$parent.$emit('getData', { commitFormData: this.metaForm })
      this.$listeners.getData({ commitFormData: this.metaForm })
    }
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
.add-modify-form {
   height: 100%;
  .el-form {
      padding: 20px 14px 18px 14px;
      overflow: auto;
      .title-border {
        padding: 20px 0 30px 0;
      }
      .conBox {
        margin: 0;
      }
  }
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form .conBox /deep/ .el-form-item textarea {
    height: 180px !important;
}
</style>
