<!-- 样式类名新增修改 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :formRed="formRed"
        :shareData="shareData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="metaForm" :rules="rules" label-width="120px">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 样式信息
        </span>
        <div class="conBox">
            <el-form-item label="样式类名" prop="v_StyleClassName">
                <el-input v-model="metaForm.v_StyleClassName" placeholder="可填写英文,横线,数字组成" />
            </el-form-item>
            <el-form-item label="作用域类名">
                <el-input v-model="metaForm.v_ScopeClassName" placeholder="多层类名请以空格间隔" />
            </el-form-item>
            <el-form-item label="样式css" prop="v_StyleCContent" class='description-label'>
                <el-input
                    v-model="metaForm.v_StyleCContent"
                    placeholder="请输入CSS样式,因权重问题请加!important"
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 4}"
                />
            </el-form-item>
            <el-form-item label="样式预览" class="preview">
                <div class="preview-box" :style="`{ ;${metaForm.v_StyleCContent}}`">样式预览</div>
            </el-form-item>
            <el-form-item label="样式描述" prop="v_Description" class='description-label'>
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

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://osmp.pactera.com:1001/public/css/styleClass.css' : 'http://test.osmp.com/public/css/styleClass.css'
export default {
  name: 'addStyle',
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
    var commonCode = (rule, value, callback) => {
      let codeVerify = /^[A-Za-z0-9-]+$/
      setTimeout(() => {
        if (!codeVerify.test(value)) {
          callback(new Error('请输入由数字,英文,横线组合'))
        } else {
          callback()
        }
      }, 200)
    }
    var commonCode1 = (rule, value, callback) => {
      let codeVerify = /^([a-zA-Z-.\/\s+0-9]+)$/
      setTimeout(() => {
        if (!codeVerify.test(value)) {
          callback(new Error('请输入由小点,数字,英文,横线,空格组合'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      metaForm: {
        // 样式类名
        v_StyleClassName: '',
        // 作用域类名
        v_ScopeClassName: '',
        // 样式CSS
        v_StyleCContent: '',
        // 样式描述
        v_Description: ''
      },
      rules: {
        v_StyleClassName: [
          { required: true, message: '请输入样式类名', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_StyleCContent: [
          { required: true, message: '请输入样式CSS', trigger: 'blur' }
        ]
      },
      // 小红点功能
      oldMetaForm: {
        // 样式类名
        v_StyleClassName: '',
        // 作用域类名
        v_ScopeClassName: '',
        // 样式CSS
        v_StyleCContent: '',
        // 样式描述
        v_Description: ''
      },
      formRed: false
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.metaForm = {
        ...formData
      }
    }
    this.oldMetaForm = Object.assign({}, this.metaForm)
  },
  watch: {
    metaForm: {
      handler: function (data) {
        if (JSON.stringify(this.oldMetaForm) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  methods: {
    commit () {
      let content = '.' + this.metaForm.v_StyleClassName + '.style-box,' + '.' + this.metaForm.v_StyleClassName + ' ' + this.metaForm.v_ScopeClassName + '{' + this.metaForm.v_StyleCContent + '}'
      let params = {
        ...this.metaForm
      }
      this.$set(params, 'v_StyleContent', content)
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.saveStyleClass(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.metaForm.i_Id = res.iId
              }
              this.oldMetaForm = Object.assign({}, this.metaForm)
              this.$message.success(res.msg)
              let params = this.$store.state.paginations['CC_VW_styleManagement']
              this.$emit('getTableData', params)
              document.getElementsByName('styleClass')[0].href = `${baseUrl}?date=${new Date().getTime()}`
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

<style scoped lang='scss'>
.add-modify-form {
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  overflow: auto;
  .el-form {
    height: 100%;
    margin: 0;
    padding: 20px 10px 10px 10px !important;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      .preview {
          position: relative;
          /deep/ .el-form-item__label {
              position: absolute;
              top: 50%;
              transform: translateY(-50%)
          }
          .preview-box {
            width: 100%;
            height: 90px;
            line-height: 90px;
            text-align: center;
            color: #999999;
            border-radius: 4px;
            border: 1px solid #E6E6E6;
        }
      }

      &:first-of-type {
        margin-top: 0;
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
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form .conBox /deep/ .el-form-item textarea {
    height: 120px !important;
}
</style>
