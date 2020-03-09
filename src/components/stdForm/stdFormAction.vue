<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 17:08:35
 * @LastEditTime: 2019-09-19 20:40:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :class="['std-form-action',code]">
    <form-handout-component :id="`stdFormAction_${code}`" :configData="formConfigData" :shareData="shareData" v-on="$listeners"></form-handout-component>
  </div>
</template>

<script>
import formHandoutComponent from '@/components/handoutComponent/formHandoutComponent'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
export default {
  name: 'stdFormAction',
  props: {
    configData: Object,
    shareData: Object
  },
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler (nv) {
        if (this.isKeepAlive) {
          setTimeout(() => {
            this.getFormConfig()
          }, 500)
        }
      }
    }
  },
  data () {
    return {
      // reFresh: true,
      formConfigData: {},
      // 缓存的标志
      // true 第一次进入 false 缓存激活
      isKeepAlive: true,
      formRowMargin: '',
      code: ''
    }
  },
  created () {
    this.isKeepAlive = true
  },
  activated () {
    this.isKeepAlive = false
  },
  deactivated () {
    this.isKeepAlive = false
  },
  methods: {
    getFormConfig () {
      this.code = this.configData.v_Code ? this.configData.v_Code : this.configData.code
      let templateId = this.configData.v_Code ? this.configData.v_Code : this.configData.code
      cgiService.temGetFormConf(templateId).then(res => {
        if (!res.code) {
          this.formConfigData = Object.assign({}, this.configData, res.data)
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
            argu.mutations = 'addFormFunction'
            util.getFnc(argu, templateId)
          }
        }
      })
    }
  },
  components: {
    formHandoutComponent
  }
}
</script>

<style scoped lang='scss'>
.std-form-action{
  height: 100%;
}
</style>
