<template>
  <div class="both-side-box" ref="box">
    <div class="bsb-left" ref="leftBox" :style="{width:leftWidth,minWidth:leftMinHeight}">
      <div
        class="bsb-left-top"
        :style="{height:leftTopHeight,minHeight:leftTopMinHeight,maxHeight:rightMHeight}"
      >
        <div
          class="box-title"
          v-if="regiondata[0] && regiondata[0].v_regionalTitle"
          :class="regiondata[0].v_titleColor ? regiondata[0].v_titleColor : ''"
        >
          <span class="box-title-icon">
            <i class="iconfont icon-biaotibiao"></i>
            {{regiondata[0].v_regionalTitle}}
          </span>
        </div>
        <handout-component
          class="handout"
          :configData="regiondata[0]"
          @changeShareData="changeShareData1"
          :shareData="shareData0"
        />
      </div>
      <div class="drag-vertical" ref="uDragLine"></div>
      <div class="bsb-left-bottom" :style="{height:leftBottomHeight,minHeight:leftBottomMinHeight}">
        <div
          class="box-title"
          v-if="regiondata[1] && regiondata[1].v_regionalTitle"
          :class="regiondata[1].v_titleColor ? regiondata[1].v_titleColor : ''"
        >
          <span class="box-title-icon">
            <i class="iconfont icon-biaotibiao"></i>
            {{regiondata[1].v_regionalTitle}}
          </span>
        </div>
        <handout-component
          class="handout"
          :configData="regiondata[1]"
          @changeShareData="changeShareData2"
          :shareData="shareData1"
        />
      </div>
    </div>
    <div class="drag-line" ref="lDragLine"></div>
    <div class="bsb-right" :style="{width:rightWidth,minWidth:rightMinWidth}">
      <div
        class="box-title"
        v-if="regiondata[2] && regiondata[2].v_regionalTitle"
        :class="regiondata[2].v_titleColor ? regiondata[2].v_titleColor : ''"
      >
        <span class="box-title-icon">
          <i class="iconfont icon-biaotibiao"></i>
          {{regiondata[2].v_regionalTitle}}
        </span>
      </div>
      <handout-component
        class="handout"
        :configData="regiondata[2]"
        @changeShareData="changeShareData3"
        :shareData="shareData2"
      />
    </div>
  </div>
</template>
<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
export default {
  name: 'unDownRight',
  props: {
    configData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      maxheight: '',
      leftObj: {
        width: 800,
        defaultWidth: 600,
        minWidth: 200
      },
      rightObj: {
        width: 0,
        defaultHeight: 300,
        minWidth: 200
      },
      leftTopObj: {
        height: 300,
        defaultWidth: 300,
        minHeight: 200
      },
      leftBottomObj: {
        height: 0,
        defaultWidth: 600,
        minHeight: 100
      },

      regiondata: [{}, {}, {}], // 配置信息
      shareData: [{}, {}, {}], // 在父组件大家共享的状态
      handoutShareData: [{}, {}, {}] // 根据配置实际分发下去的数据
    }
  },
  methods: {
    changeShareData1 (oldData) {
      this.shareData[0] = oldData
      this.shareData = this.shareData.slice(0)
    },
    changeShareData2 (oldData) {
      this.shareData[1] = oldData
      this.shareData = this.shareData.slice(0)
    },
    changeShareData3 (oldData) {
      this.shareData[2] = oldData
      this.shareData = this.shareData.slice(0)
    },
    setHeigh () {
      // console.log(11)
      this.maxheight = this.$refs.box.clientHeight
    },
    getLayoutConfig (nv) {
      let currentItem = {}
      if (nv.hasOwnProperty('isDialog') && nv.isDialog) {
        currentItem.code = nv.v_Code
      } else {
        let refreshPageData = JSON.parse(sessionStorage.getItem('refreshPageData') || '{}')
        if (JSON.stringify(refreshPageData) !== '{}') {
          currentItem = refreshPageData
        } else {
          let fastMenuData = JSON.parse(sessionStorage.getItem('fastMenuData') || '{}')
          currentItem = fastMenuData[0]
        }
        if (!currentItem || !currentItem.hasOwnProperty('code')) return
      }
      cgiService.layout(currentItem.code).then(res => {
        if (res.code === 0) {
          this.regiondata = res.data.regiondata || []
          // 配置信息
          let regionConf = res.data.regionConf || {}
          if (this.regiondata[0].v_DefaultUnit === '1') {
            this.leftObj.width =
            this.regiondata[0].v_DefaultWidth *
            this.$refs.box.clientWidth *
            0.01

            this.leftObj.minWidth =
            this.regiondata[0].v_MinWidth * this.$refs.box.clientWidth * 0.01

            this.leftTopObj.height =
            this.regiondata[0].v_DefaultHeight *
            this.$refs.box.clientHeight *
            0.01

            this.leftTopObj.minHeight =
            this.regiondata[0].v_MinHeight * this.$refs.box.clientHeight * 0.01
          } else {
            this.leftObj.width = this.regiondata[0].v_DefaultWidth

            this.leftObj.minWidth = this.regiondata[0].v_MinWidth

            this.leftTopObj.height = this.regiondata[0].v_DefaultHeight

            this.leftTopObj.minHeight = this.regiondata[0].v_MinHeight
          }
          if (this.regiondata[1].v_DefaultUnit === '1') {
            this.leftBottomObj.minHeight =
            this.regiondata[1].v_MinHeight * this.$refs.box.clientHeight * 0.01
          } else {
            this.leftBottomObj.minHeight = this.regiondata[1].v_MinHeight
          }
          if (this.regiondata[2].v_DefaultUnit === '2') {
            this.rightObj.minHeight =
            this.regiondata[2].v_MinWidth * this.$refs.box.clientHeight * 0.01
          } else {
            this.rightObj.minHeight =
            this.regiondata[2].v_MinWidth * this.$refs.box.clientHeight * 0.01
          }
          // 是否允许拖拽
          if (regionConf.isdefaultdragregin === '1') {
            util.drapUtils(this.$refs.lDragLine, this.leftObj)
            util.drapUtils(this.$refs.uDragLine, this.leftTopObj)
          }
          this.regiondata.forEach(item => {
            if (item.v_CateCode === 'CC_VW') {
              item.viewId = item.v_Code
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  computed: {
    leftWidth () {
      return this.leftObj.width + 'px'
    },
    leftMinHeight () {
      return this.leftObj.minWidth + 'px'
    },
    rightWidth () {
      return this.rightObj.width + 'px'
    },
    rightMinWidth () {
      return this.rightObj.minWidth + 'px'
    },
    leftTopHeight () {
      return this.leftTopObj.height + 'px'
    },
    leftTopMinHeight () {
      return this.leftTopObj.minHeight + 'px'
    },
    leftBottomHeight () {
      return this.leftBottomObj.height + 'px'
    },
    leftBottomMinHeight () {
      return this.leftBottomObj.minHeight + 'px'
    },
    rightMHeight () {
      return this.maxheight - 5 + 'px'
    },
    shareData0 () {
      let defaultResRegin = '0'
      if (JSON.stringify(this.regiondata[0]) !== '{}' && this.regiondata[0]) {
        defaultResRegin = this.regiondata[0].i_DefaultResRegin
      }
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.shareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[0]
      }
    },
    shareData1 () {
      let defaultResRegin = '0'
      if (JSON.stringify(this.regiondata[1]) !== '{}' && this.regiondata[1]) {
        defaultResRegin = this.regiondata[1].i_DefaultResRegin
      }
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.shareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[1]
      }
    },
    shareData2 () {
      let defaultResRegin = '0'
      if (JSON.stringify(this.regiondata[2]) !== '{}' && this.regiondata[2]) {
        defaultResRegin = this.regiondata[2].i_DefaultResRegin
      }
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.shareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[2]
      }
    }
  },
  watch: {
    configData: {
      immediate: true,
      handler (nv) {
        this.getLayoutConfig(nv)
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.setHeigh)
    this.maxheight = this.$refs.box.clientHeight
  },
  beforeDestroy () {
    if (this.$refs.dragLine) {
      this.$refs.dragLine.onmousedown = null
    }
    window.removeEventListener('resize', this.setHeigh)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/configLayoutcss.scss";
.both-side-box {
  width: 100%;
  height: 100%;
  // height: 50px;
  display: flex;
  // > div {
  //   height: 100%;
  // }
  .box-title{
    min-height: 30px;
    // 标题图标对齐
    .box-title-icon {
      i {
        vertical-align: bottom;
      }
    }
  }
  // 兼容其它版本浏览器，区域标题不出现的bug
  .stdTableAction.handout-component {
    flex: 1;
    height: auto;
  }
  .bsb-right {
    overflow: hidden;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
    .table-wrapper {
      flex: 1;
    }
  }
  .drag-line {
    width: 3px;
    background-color: #abd6ff;
    cursor: w-resize;
    &:hover {
      background-color: #7fe7fc;
    }
  }
  .bsb-left {
    display: flex;
    height: 100%;
    box-orient: vertical;
    flex-direction: column;
    overflow: hidden;
    // background-color: red;
    .bsb-left-top {
      overflow: auto;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      display: flex;
      height: 0;
      box-orient: vertical;
      flex-direction: column;
      .table-wrapper {
        height: 0;
        flex: 1;
        .el-table {
          height: 100% !important;
        }
      }
    }
    .bsb-left-bottom {
      flex: 1;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      display: flex;
      height: 0;
      box-orient: vertical;
      flex-direction: column;
      .table-wrapper {
        flex: 1;
      }
    }
  }
}
.drag-vertical {
  width: 100%;
  height: 3px;
  background-color: #abd6ff;
  cursor: s-resize;
  position: relative;
  &:hover {
    background-color: #7fe7fc;
  }
  .handout {
    flex: 1;
  }
}
</style>
