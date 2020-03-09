<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 14:59:56
 * @LastEditTime: 2019-09-05 14:59:56
 * @LastEditors: your name
 -->
<template>
    <component :is="routerName" @getData='getData' @getButtonConfig='closeFun' @getTableData='getTableData' :configData="configData" :shareData="shareData" v-on="$listeners"></component>
</template>

<script>

// 数据字典 - 关联表 内容
import correlationForm from '@/views/sys/dictionaries/correlationForm'

import util from '@/common/js/util.js'
export default {
  name: 'custom',
  props: {
    routeName: String,
    configData: {
      type: Object,
      default () {
        return {
          viewid: ''
        }
      }
    },
    shareData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      routerName: ''
    }
  },
  watch: {
    configData: {
      deep: true,
      handler (nv) {
        if (nv && nv.hasOwnProperty('v_contentName')) {
          this.routerName = nv.v_contentName
        }
      }
    }
  },
  created () {
    this.getComponent()
  },
  methods: {
    getTableData (params) {
      this.$emit('getTableData', params)
    },
    getComponent () {
      let confsBtn = this.$store.state.confsBtn
      // 拿到自定义内容的组件名字
      this.routerName = util.transCustomCompName(confsBtn.customname)
    },
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
    },
    // 刷新数据
    getData (params) {
      this.$emit('getData', params)
    }
  },
  components: {
    correlationForm
  }
}
</script>

<style scoped lang='scss'>

</style>
