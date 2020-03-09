<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 17:09:11
 * @LastEditTime: 2019-09-26 10:39:40
 * @LastEditors: ly
 -->
<template>
  <!-- 树 组件分发器 -->
  <component :is="routeName" v-on="$listeners" :configData="configData" :shareData="shareData" class="form-component"/>
</template>
<script>

// 标准 表单模板
import standardForm from '@/components/stdForm/standardForm'

export default {
  name: 'formHandoutComponent',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  watch: {
    configData: {
      deep: true,
      handler (nv) {
        if (nv.confParams && nv.confParams.formOperationBarHeight) {
          let style = document.getElementsByName('formStyle')[0]
          let code = ''
          if (nv.v_Code) {
            code = nv.v_Code
          } else {
            code = nv.code
          }
          if (Object.keys(nv).length > 0) {
            if (nv.v_TemplateCode) {
              this.routeName = nv.v_TemplateCode
            } else if (nv.confView.templatecode) {
              this.routeName = nv.confView.templatecode
            }
          }
          //   表单操作栏高度
          let formOperationBarHeight = nv.confParams.formOperationBarHeight ? nv.confParams.formOperationBarHeight.v_ParamValue : ''
          //  表单行间距
          let formRowMargin = nv.confParams.formRowMargin ? nv.confParams.formRowMargin.v_ParamValue : ''
          style.innerHTML += `.${code} #stdFormAction_${code} .formOperateBox{height: ${formOperationBarHeight}px !important;line-height: ${formOperationBarHeight}px !important;}
                             .${code} #stdFormAction_${code} .el-form .el-form-item{ margin-top: ${formRowMargin}px !important;margin-bottom: 0px !important}`
          // 表单分类边框颜色
          let formGroupBorderColor = nv.confParams.formGroupBorderColor ? nv.confParams.formGroupBorderColor.v_ParamValue.split(' ') : []
          // 表单输入框边框默认颜色
          let formInputBorderDefaultColor = nv.confParams.formInputBorderDefaultColor ? nv.confParams.formInputBorderDefaultColor.v_ParamValue.split(' ') : []
          // 表单输入框边框激活颜色
          let formInputBorderFocusColor = nv.confParams.formInputBorderFocusColor ? nv.confParams.formInputBorderFocusColor.v_ParamValue.split(' ') : []
          // 表单输入框边框验证出错颜色
          let formInputBorderInvalidColor = nv.confParams.formInputBorderInvalidColor ? nv.confParams.formInputBorderInvalidColor.v_ParamValue.split(' ') : []
          // 表单输入框边框验证正确颜色
          let formInputBorderValidColor = nv.confParams.formInputBorderValidColor ? nv.confParams.formInputBorderValidColor.v_ParamValue.split(' ') : []
          style.innerHTML += `.${code} #stdFormAction_${code} .el-form .border-box{ border-color: ${formGroupBorderColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item__content .el-input__inner{ border-color: ${formInputBorderDefaultColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item__content .el-textarea__inner{ border-color: ${formInputBorderDefaultColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item__content .el-input__inner:focus{ border-color: ${formInputBorderFocusColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item__content .el-textarea__inner:focus{ border-color: ${formInputBorderFocusColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-error .el-input__inner{ border-color: ${formInputBorderInvalidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-error .el-input__inner:focus{ border-color: ${formInputBorderInvalidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-error .el-textarea__inner{ border-color: ${formInputBorderInvalidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-error .el-textarea__inner:focus{ border-color: ${formInputBorderInvalidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-success .el-input__inner{ border-color: ${formInputBorderValidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-success .el-input__inner:focus{ border-color: ${formInputBorderValidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-success .el-textarea__inner{ border-color: ${formInputBorderValidColor[0]}!important}
                              .${code} #stdFormAction_${code} .el-form /deep/ .el-form-item.is-success .el-textarea__inner:focus{ border-color: ${formInputBorderValidColor[0]}!important}`
          // 表单操作栏颜色
          let formOperationBarColor = nv.confParams.formOperationBarColor ? nv.confParams.formOperationBarColor.v_ParamValue.split(' ') : []
          if (formOperationBarColor[1]) {
            style.innerHTML += `.${code} #stdFormAction_${code} .formOperateBox{ background:linear-gradient(${formOperationBarColor[2]}deg,${formOperationBarColor[0]} 0%,${formOperationBarColor[1]} 100%) !important;}`
          } else {
            style.innerHTML += `.${code} #stdFormAction_${code} .formOperateBox{ background: ${formOperationBarColor[0]}!important}`
          }
          // 表单操作按钮文字样式
          let formButtonStyle = nv.confParams.formButtonStyle ? nv.confParams.formButtonStyle.v_ParamValue : ''
          // 表单描述文字样式
          let formDesriptionStyle = nv.confParams.formDesriptionStyle ? nv.confParams.formDesriptionStyle.v_ParamValue : ''
          // 编辑表单标签文字
          let formLabelStyle = nv.confParams.formLabelStyle ? nv.confParams.formLabelStyle.v_ParamValue : ''
          // 表单正文样式
          let formTextStyle = nv.confParams.formTextStyle ? nv.confParams.formTextStyle.v_ParamValue : ''
          // 表单提示文字样式
          let formWarningStyle = nv.confParams.formWarningStyle ? nv.confParams.formWarningStyle.v_ParamValue : ''
          // 表单分类标题文字
          let groupTitleStyle = nv.confParams.groupTitleStyle ? nv.confParams.groupTitleStyle.v_ParamValue : ''
          // 查看表单标签文字
          let infoLabelStyle = nv.confParams.infoLabelStyle ? nv.confParams.infoLabelStyle.v_ParamValue : ''
          this.$nextTick(() => {
            setTimeout(() => {
              let formStyle = document.getElementById(`stdFormAction_${code}`)
              if (formButtonStyle) {
                formStyle.classList.add(formButtonStyle)
              }
              if (formDesriptionStyle) {
                formStyle.classList.add(formDesriptionStyle)
              }
              if (formLabelStyle) {
                formStyle.classList.add(formLabelStyle)
              }
              if (formTextStyle) {
                formStyle.classList.add(formTextStyle)
              }
              if (formWarningStyle) {
                formStyle.classList.add(formWarningStyle)
              }
              if (groupTitleStyle) {
                formStyle.classList.add(groupTitleStyle)
              }
              if (infoLabelStyle) {
                formStyle.classList.add(infoLabelStyle)
              }
            }, 100)
          })
        }
      }
    }
  },
  data () {
    return {
      routeName: ''
    }
  },
  components: {
    standardForm
  }
}
</script>

<style lang="scss" scoped>
.form-component{
  height: 100%;
}
</style>
