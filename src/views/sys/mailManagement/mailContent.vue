<!-- 邮件模板-新增/修改 表单 -->
<template>
  <div class="add-modify-form send-mail-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        @sumitForm="commit"
        v-on="$listeners"
        :formRed="formRed"
      ></action-bar>
    </div>
    <el-form
      inline-message
      label-position="right"
      label-width="85px"
      ref="ruleForm"
      :model="currentData"
      :rules="rules"
      class="send-mail">
      <div class="info-content" id="mail-template-baseinfo">
        <span class="form-title">
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="form-baseinfo clearfix">
          <div>
            <el-form-item label="模板编码" prop="v_TemplateCode" class="m-0">
              <el-input v-model="currentData.v_TemplateCode" :disabled="disabledCode" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="模板名称" prop="v_TemplateName">
              <el-input v-model="currentData.v_TemplateName" autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <div class="m-0">
            <el-form-item label="模板描述" prop="v_Description" label-width="100px" class='description-label'>
              <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                  v-model="currentData.v_Description"
                  placeholder="可填写相关描述，帮助用户记忆和了解"
              />
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="info-content" id="mail-template-content">
        <div>
            <span class="form-title">
            <i class="iconfont icon-jibenxinxi"></i> 邮件内容
            </span>
          <el-form-item label="邮件主题" class="h-30 m-0" prop="v_Title">
            <el-input v-model="currentData.v_Title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮件正文" class="h-30">
            <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
              <span class="flexibleIcon1">
                <i class="iconfont icon-dongcanbiaoshi"></i>
              </span>
            </el-tooltip>
          </el-form-item>
          <quill-editor
            v-model="currentData.v_Content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'notification',
  mixins: [logMixin, windowRed],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      rules: {
        v_TemplateCode: [
          { required: true, message: '请选择模板编码', trigger: 'blur' }
        ],
        v_TemplateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        v_Title: [
          { required: true, message: '请输入邮件主题', trigger: 'blur' }
        ]
      },
      editorOption: {
        debug: 'info',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      },
      placeholder: 'Compose an epic...',
      readOnly: true,
      theme: 'snow',
      content: '',
      // 当前行的数据
      currentData: {
        v_TemplateCode: '',
        v_TemplateName: '',
        v_Description: '',
        v_Title: '',
        v_Content: ''
      },
      // icon背景色list
      mailList: [{ value: 'red', label: '红色' }],
      oldModAddData: {
        v_TemplateCode: '',
        v_TemplateName: '',
        v_Description: '',
        v_Title: '',
        v_Content: ''
      },
      formRed: false,
      disabledCode: false
    }
  },
  watch: {
    currentData: {
      deep: true,
      handler (nVal) {
        if (nVal.hasOwnProperty('i_Id')) {
          this.$set(this.oldModAddData, 'i_Id', Number(this.oldModAddData.i_Id))
          this.$set(nVal, 'i_Id', Number(nVal.i_Id))
        }
        if (JSON.stringify(nVal) !== JSON.stringify(this.oldModAddData)) {
          // 小红点
          this.formRed = true
        }
      }
    }
  },
  created () {
    if (this.buttonConfig.operationcode === 'modify') {
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.currentData.v_TemplateCode = formData.v_TemplateCode
      this.currentData.v_TemplateName = formData.v_TemplateName
      this.currentData.v_Description = formData.v_Description
      this.currentData.v_Title = formData.v_Title
      this.currentData.v_Content = formData.v_Content
      this.currentData.i_Id = formData.i_Id
      this.disabledCode = true
    }
    this.oldModAddData = Object.assign({}, this.currentData)
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},
    saveHtml () {},
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.currentData.logParams = this.getLogParams()
          }
          cgiService.sysEmailSaveData1(this.currentData).then(res => {
            if (res.code === 0) {
              this.oldModAddData = Object.assign({}, this.currentData)
              this.formRed = false
              this.$message.success(res.msg)
              this.currentData.i_Id = res.iId
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_mailManagement'])
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

<style scoped lang='scss'>
.form-baseinfo{
  >div{
    float: left;
    width: 50%;
  }
}
#mail-template-baseinfo,#mail-template-content {
  .m-0 /deep/ .el-form-item, /deep/ .m-0.el-form-item {
    margin-top: 0;
  }
  &#mail-template-content {
    .flexibleIcon1{
      top: 0;
      left: -25px;
    }
    .warning-msg{
      color: #FF5757;
      margin: 0;
    }
  }
}
.send-mail {
  padding: 18px 16px;
  .h-30{
    /deep/ .el-form-item__content{
      height: 30px;
    }
  }
  .mail-data-pick{
      /deep/ .el-input__inner{
          padding-left: 30px;
      }
  }
  .form-title {
    position: absolute;
    top: -10px;
    left: 8px;
    padding: 0 8px;
    background: #ffffff;
    font-size: 14px;
  }
  .info-content {
    position: relative;
    padding: 16px 40px;
    border: 1px solid #bfbfbf;
    &:last-of-type{
        margin-top: 16px;
    }
  }
  .send-radio {
    /deep/ .el-radio {
      margin-right: 18px;
    }
  }
  .mail-title {
    display: inline-block;
    margin: 16px 0 8px;
    i {
      margin-left: 5px;
    }
  }
  /deep/ .ql-editor {
    height: 325px;
  }
  #mail-data-pick{
      /deep/ .el-input__inner{
          padding-left: 30px;
      }
  }
}
</style>
