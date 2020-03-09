<template>
  <div :class="['std-echarts-action',code]">
    <echarts-handout-component :id="`stdechartsAction_${code}`" :configData="echartsConfig" :shareData="shareData" v-on="$listeners" v-if="flag"></echarts-handout-component>
  </div>
</template>

<script>
import echartsHandoutComponent from '@/components/handoutComponent/echartsHandoutComponent'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
export default {
  name: 'stdEchartsAction',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      echartsConfig: {},
      flag: false,
      // 缓存的标志
      // true 第一次进入 false 缓存激活
      isKeepAlive: true,
      code: ''
    }
  },
  watch: {
    configData: {
      immediate: true,
      handler (nv) {
        if (this.isKeepAlive) {
          this.getEchartsConfig()
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
    // 调取图表 配置
    getEchartsConfig () {

    }
  },
  components: {
    echartsHandoutComponent
  }
}
</script>

<style scoped lang='scss'>
</style>
