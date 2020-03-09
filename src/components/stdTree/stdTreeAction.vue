<template>
  <div :class="['std-tree-action',code]">
    <tree-handout-component :id="`stdTreeAction_${code}`" :configData="treeConfig" :shareData="shareData" v-on="$listeners" v-if="flag"></tree-handout-component>
  </div>
</template>

<script>
import treeHandoutComponent from '@/components/handoutComponent/treeHandoutComponent'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
export default {
  name: 'stdTreeAction',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      treeConfig: {},
      flag: false,
      // 缓存的标志
      // true 第一次进入 false 缓存激活
      isKeepAlive: true,
      treeRowHeight: '',
      code: ''
    }
  },
  watch: {
    configData: {
      immediate: true,
      handler (nv) {
        if (this.isKeepAlive) {
          this.getTreeConfig()
        }
      }
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
    // 调取树 配置
    getTreeConfig () {
      this.code = this.configData.code ? this.configData.code : this.configData.v_Code
      let code = this.configData.code ? this.configData.code : this.configData.v_Code
      cgiService.temGetTreeConf(code).then(res => {
        if (!res.code) {
          this.flag = true
          Object.assign(this.treeConfig, { response: res }, this.configData)
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
            argu.mutations = 'addTreeFunction'
            util.getFnc(argu, code)
          }
        }
      })
    }
  },
  components: {
    treeHandoutComponent
  }
}
</script>

<style scoped lang='scss'>
</style>
