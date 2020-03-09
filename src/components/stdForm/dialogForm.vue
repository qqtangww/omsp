<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 16:38:45
 * @LastEditTime: 2019-08-19 16:34:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- <div class="body-border-box"> -->
  <div class="bodyBorderBox">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <!-- <action-bar :configData='configData' v-on="$listeners" :shareData='shareData' @closeDialog='closeDialog' @getTableData='getTableData' @getButtonConfig='closeFun' @getData='getData' @changeData='changeData' @changeShareData='changeShareData' @handleClick='handleClick'></action-bar> -->
      <action-bar :configData='configData' v-on="$listeners" :shareData='shareData'></action-bar>
    </div>
    <!-- 内容组件 -->
    <component :is="routeName" :configData="formConfigData" :shareData="shareData" v-on="$listeners"></component>
  </div>
</template>

<script>
import formMixin from '@/common/js/mixins/formMixin'

import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
export default {
  name: 'standardForm',
  props: {
    shareData: {
      type: Object,
      default () {}
    },
    configData: {
      type: Object
    }
  },
  mixins: [formMixin],
  data () {
    return {
      routeName: '',
      // 控制弹框操作栏的渲染
      ifActionBar: false,
      // 把配置 传到form表单
      formConfigData: {}
    }
  },
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler (nv) {
        this.getButtonConfig()
      }
    }
  },
  methods: {
    getTableData (params) {
      this.$emit('getTableData', params)
    },
    // 获取操作按钮 配置数据 form-page-opera-modify
    getButtonConfig () {
      let templateId = this.configData.v_Code ? this.configData.v_Code : this.configData.code
      // cgiService.temGetFormConf(this.configData.v_Code).then(res => {
      cgiService.temGetFormConf(templateId).then(res => {
        if (!res.code) {
          this.formConfigData = Object.assign({}, this.configData, res.data.confOperation)
          let customname = res.data.confView.customname
          // 根据code 映射 组件
          this.routeName = util.transFormCompName(customname)

          if (res.data.confView.scriptbody) {
            let scriptbody = res.data.confView.scriptbody
            let funcArr = scriptbody.split('^^')
            let fooArr = funcArr.map(item => {
              item = item.match(/[' '](\S*)['(']/)
              let obj = {}
              obj[item[1]] = item.input.replace(item[1], '')
              return obj
            })
            // 解析函数体
            let argu = {}
            argu.data = fooArr
            argu.that = this
            argu.mutations = 'addFunction'
            util.getFnc(argu)
          }
        }
      })
    }
    // 关闭弹框(兼容旧版本)
    // closeFun () {
    //   alert(333)
    //   this.$emit('getButtonConfig', false)
    // },
    // // 关闭弹框（新版本）
    // closeDialog () {
    //   this.$emit('closeDialog', false)
    // },
    // // 刷新数据
    // getData (params) {
    //   // this.$emit('getData', params)
    // },
    // changeData (responseData) {
    //   this.$emit('changeData', responseData)
    // },
    // // 改变布局组件中的共享数据
    // changeShareData (responseData) {
    //   this.$emit('changeShareData', responseData)
    // },
    // handleClick (responseData) {
    //   this.$emit('handleClick', responseData)
    // }
  }
}
</script>

<style scoped lang="scss">
.body-border-box{
  box-sizing: border-box;
  height: 100%;
  .form-box{
    height: 100%;
  }
}
</style>
