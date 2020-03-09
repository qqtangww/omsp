<template>
  <!-- 布局组件分发器 -->
  <component :is="routeName" :viewid="viewid" v-on="$listeners" :configData="configData" :shareData="shareData" class="handout-component"/>
</template>
<script>
// 表单 分发器
import standardForm from '@/components/stdForm/stdFormAction'

// 表格 分发器
import standardTable from '@/components/stdTable/stdTableAction'

// 树 分发器
import standardTree from '@/components/stdTree/stdTreeAction'
// 图表 分发器
import standardEcharts from '@/components/stdEcharts/stdEchartsAction'

// 自定义内容 组件
import custom from '@/components/customContent/custom'
// tab 分发器
import tabsAction from '@/components/layoutComponents/tabs/tabsAction'
// 添加左右布局
import layoutLeftRight from '@/components/layoutComponents/leftRight/leftRight'
// 添加左中右布局弹框
import layoutLeftCenterRight from '@/components/layoutComponents/leftCenterRight/leftCenterRight'
// 添加左上下布局弹框
import layoutLeftUpDown from '@/components/layoutComponents/leftUpDown/leftUpDown'
// 添加上下布局弹框
import layoutUpDown from '@/components/layoutComponents/upDown/upDown'
// 添加上下右布局弹框
import layoutUpDownRight from '@/components/layoutComponents/upDownRight/upDownRight'

import util from '@/common/js/util.js'
export default {
  name: 'handoutComponent',
  props: {
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
  watch: {
    configData: {
      immediate: true,
      deep: true,
      handler (nv) {
        this.routeName = util.transCompName(nv)
        this.viewid = nv.v_Code // 这里兼容老版本 ，之后建议删除
      }
    },
    shareData: {
      immediate: true,
      deep: true,
      handler (nv) {
        // console.log(nv, 'handout')
      }
    }
  },
  data () {
    return {
      viewid: '',
      routeName: '',
      receiveData: {}
    }
  },
  components: {
    standardForm,
    standardTable,
    standardTree,
    standardEcharts,
    custom,
    layoutLeftRight,
    layoutUpDown,
    layoutLeftCenterRight,
    tabsAction,
    layoutLeftUpDown,
    layoutUpDownRight
  },
  deactivated () {
    let setInterval = this.$store.state.setInterval
    window.clearTimeout(setInterval)
  }
}
</script>

<style lang="scss" scoped>
.handout-component{
  height: 100%;
  background: white;
}
</style>
