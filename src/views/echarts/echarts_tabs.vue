<template>
    <div class="echarts-examples">
        <el-tabs class="echarts-tabs" tab-position="left">

        <el-tab-pane ><span slot="label"><el-tooltip class="item" effect="dark" content="图表容器" placement="bottom"><i class="eltab-icon el-icon-tickets"></i></el-tooltip></span>
        </el-tab-pane>
        <el-tab-pane ><span slot="label"><el-tooltip class="item" effect="dark" content="图表元素" placement="bottom"><i class="eltab-icon el-icon-pie-chart"></i></el-tooltip></span>
            <etsElement></etsElement>
        </el-tab-pane>
        <el-tab-pane ><span slot="label"><el-tooltip class="item" effect="dark" content="元素基本信息" placement="bottom"><i class="eltab-icon el-icon-document"></i></el-tooltip></span></el-tab-pane>
        <el-tab-pane ><span slot="label"><el-tooltip class="item" effect="dark" content="元素数据设置" placement="bottom"><i class="eltab-icon el-icon-discount"></i></el-tooltip></span></el-tab-pane>
  </el-tabs>
    </div>
</template>
<script>
import etsElement from '@/views/echarts/echarts_element'
export default {
  components: { etsElement },
  name: 'echarts_tabs',
  data () {
    return {
      activeName: '1'
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.echarts-examples {
    height: 100%;
    .echarts-tabs {
        height: 100%;
        width: 100%;
        .eltab-icon {
            font-size: 18px;
        }
        /deep/ .el-tabs__header.is-left {
            margin-right: 0px;
        }
        /deep/ .el-tabs__item {
            height: 40px;
            line-height: 40px;
        }
        /deep/ .el-tabs__item.is-active {
            background-color: #a9d0fd;
            color: #2b8ed1 ;
        }
    }
}
</style>
