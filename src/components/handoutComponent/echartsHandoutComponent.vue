
<template>
  <!-- 图表 组件分发器 -->
  <component :is="routeName" v-on="$listeners" :configData="configData" :shareData="shareData" class="echarts-component"/>
</template>
<script>

// 标准tab
import standardEcharts from '@/components/stdEcharts/standardEcharts'

export default {
  name: 'echartsHandoutComponent',
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
    standardEcharts
  }
}
</script>

<style lang="scss" scoped>
.echarts-component{
  height: 100%;
}
</style>
