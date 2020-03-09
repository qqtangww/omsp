<template>
  <div class="echarts-list">
    <vdr
   :parent="true"
   :debug="false"
   :min-width="200"
   :min-height="200"
   :isConflictCheck="true"
   :snap="true"
   @dragging="onDragging"
   @resizing="onResize"
   :snapTolerance="20"
   v-for="echarts in echartsList"
          :key="echarts.text"
          :style="{'backgroundColor':echarts.text}"
          @click="click"
          :x='echarts.left'
          :y='echarts.top'
          :w="echarts.width"
          :h="echarts.height"
          @activated="onActivated(echarts.itemId)"
  >
    <div class="echarts-close">
      <i class="close-icon el-icon-close"></i>
    </div>
    <div class="echarts-item" :id="echarts.itemId"></div>
  </vdr>
</div>
</template>
<script>
import vdr from 'vue-draggable-resizable-gorkys'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
require('echarts/map/js/china')
export default {
  components: { vdr },
  data () {
    return {
      // echartsList: [{
      //   text: 'Aquamarine',
      //   top: 0,
      //   left: 0
      // }, {
      //   text: 'Hotpink',
      //   top: 0,
      //   left: 210
      // }, {
      //   text: 'Gold',
      //   top: 0,
      //   left: 420
      // }, {
      //   text: 'Crimson',
      //   top: 210,
      //   left: 0
      // }, {
      //   text: 'Blueviolet',
      //   top: 210,
      //   left: 210
      // }
      // ],
      echartsList: this.$store.state.echartsList,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      id: '',
      myChartlist: []
    }
  },
  mounted () {

  },
  watch: {
    echartsList: {
      handler (nv) {
        nv.forEach(item => {
          this.$nextTick(function () {
            this.drawLine(item.itemId, item.option)
          })
        })
      }
    },
    deep: true
  },
  methods: {
    click () {
    },
    onResize (x, y, width, height) {
      // console.log(id)
      console.log(width)
      console.log(height)
      this.width = width
      this.height = height
      this.myChartlist.forEach(val => {
        if (val.id === this.id) {
          val.myChart.resize({
            width: this.width,
            height: this.height
          })
        }
      })
      // this.myChart.resize({
      //   width: this.width,
      //   height: this.height
      // })
    },
    onActivated (id) {
      this.id = id
    },
    onDragging (x, y) {
      console.log(x)
      console.log(y)
      this.x = x
      this.y = y
    },
    drawLine (id, option) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(id))
      let myChartEle = {
        myChart: myChart,
        id: id
      }
      this.myChartlist.push(myChartEle)
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
  .echarts-item {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .echarts-list {
    position: relative;
    width: 100%;
    height: 100%;
    .echarts-close {
      cursor: pointer;
      .close-icon {
        font-size: 18px;
        position: absolute;
        top: 4px;
        right: 4px;
      }
    }

  }

</style>
