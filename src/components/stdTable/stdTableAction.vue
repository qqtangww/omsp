<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-30 16:57:58
 * @LastEditTime: 2019-09-26 10:49:16
 * @LastEditors: ly
 -->
<template>
  <div :class="['stdTableAction',viewId]">
    <view-handout-component
      :id="`stdTableAction_${viewId}`"
      :configData="temConfData"
      :shareData="shareData"
      class="std-table-action"
      v-on="$listeners"
      :tableStyle='tableStyle'
    />
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
import global from '@/views/global/global'
import viewHandoutComponent from '@/components/handoutComponent/viewHandoutComponent'
const stdView = {
  name: 'stdTableAction',
  props: {
    // 接收外部传过来的数据
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    },
    tableStyle: {
      type: Object
    }
  },
  watch: {
    configData: {
      immediate: true,
      // deep: true,
      handler (nv) {
        if (nv.hasOwnProperty('isKeepAlive') || this.isKeepAlive) {
          this.initData()
          if (Object.keys(nv).length > 0) {
            this.viewId = nv.viewId || nv.v_Code || nv.code
            this.getTemplateConf(nv)
          } else {
            //  暂时性解决  打开新窗口白屏问题
            setTimeout(() => {
              let fastMenuData = JSON.parse(sessionStorage.getItem('fastMenuData') || '{}')
              if (JSON.stringify(fastMenuData) !== '{}') {
                this.viewId = fastMenuData[0].code
                this.getTemplateConf(fastMenuData[0])
              }
            }, 1000)
          }
        }
      }
    },
    shareData: {
      immediate: true,
      handler (nv) {
        if (nv) {
          if (nv.hasOwnProperty('customViewId')) {
            this.viewId = nv.customViewId
          }
        }
      }
    }
  },
  data () {
    return {
      temConfData: {},
      viewId: '',
      // 缓存的标志
      // true 第一次进入 false 缓存激活
      isKeepAlive: true,
      stdToolsColor: ''
    }
  },
  created () {
    this.isKeepAlive = true
  },
  mounted () {

  },
  activated () {
    this.isKeepAlive = false
  },
  deactivated () {
    this.isKeepAlive = false
  },
  methods: {
    // 获取模板配置
    getTemplateConf () {
      // 如果有v_TemplateCode字段就证明是 布局组件
      if (this.configData.v_TemplateCode === 'upperCaseView') {
        cgiService.newTemGetTableConf(this.viewId).then(res => {
          if (!res.code) {
            this.temConfData.v_CateCode = 'CC_VW'
            this.temConfData = Object.assign(this.configData, res.data, this.temConfData)
            this.$store.commit('temConfs', res.data)
            // 拿到函数体 处理成json样式
            let functionArr = []
            if (res.data.confView.v_TRSpecialRow) {
              functionArr.push(res.data.confView.v_TRSpecialRow)
            }
            if (res.data.confView.v_ScriptBody) {
              functionArr.push(res.data.confView.v_ScriptBody)
            }
            let funcArr = functionArr.join('^^')
            if (functionArr.length > 0) {
              funcArr = funcArr.split('^^')
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
              global.getFnc(argu)
            }
          }
        })
      } else {
        // 兼容老版本
        cgiService.temGetTableConf(this.viewId).then(res => {
          if (!res.code) {
            this.temConfData = Object.assign(this.configData, res.data, this.temConfData)
            this.$store.commit('temConfs', res.data)
            // 拿到函数体 处理成json样式
            let functionArr = []
            if (res.data.confView.trspecialrow) {
              functionArr.push(res.data.confView.trspecialrow)
            }
            if (res.data.confView.scriptbody) {
              functionArr.push(res.data.confView.scriptbody)
            }
            let funcArr = functionArr.join('^^')
            if (functionArr.length > 0) {
              funcArr = funcArr.split('^^')
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
              argu.viewCode = this.viewId
              global.getFnc(argu)
            }
          }
        })
      }
    },
    // 初始化数据
    initData () {
      this.temConfData = Object.create(null)
      this.viewId = ''
    }
  },
  components: {
    viewHandoutComponent
  }
}
export default stdView
</script>
<style lang="scss" scoped>
.stdTableAction {
  height: 100%;
  .std-table-action {
    height: 100%;
    // 视图控制排序箭头的高度
    /deep/ .caret-wrapper{
      height: 30px;
      .ascending{
        top: 3px;
      }
      .descending{
        bottom: 4px;
      }
    }
  }
}
</style>
