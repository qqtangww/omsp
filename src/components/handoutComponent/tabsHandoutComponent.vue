<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 11:06:15
 * @LastEditTime: 2019-09-23 11:41:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- tab 组件分发器 -->
  <component :is="routeName" v-on="$listeners" :configData="configData" :shareData="shareData" class="tree-component"/>
</template>
<script>

// 标准tab
import standardTabs from '@/components/layoutComponents/tabs/standardTabs'
import verticalTabs from '@/components/layoutComponents/tabs/verticalTabs'

export default {
  name: 'tabsHandout',
  props: {
    configData: {
      type: Object
    },
    shareData: Object
  },
  data () {
    return {
      routeName: ''
    }
  },
  watch: {
    configData: {
      deep: true,
      handler (nv) {
        this.routeName = nv.regionConf && nv.regionConf.hasOwnProperty('v_TemplateCode') ? nv.regionConf.v_TemplateCode : ''
      }
    }
  },
  components: {
    standardTabs,
    verticalTabs
  }
}
</script>

<style lang="scss" scoped>
.tree-component{
  height: 100%;
}
</style>
