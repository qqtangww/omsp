<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 16:36:32
 * @LastEditTime: 2019-08-20 18:20:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="both-side-box" ref="box">
    <div class="bsb-left" :style="{width:leftWidth,minWidth: leftMinWidth}">
      <div class="box-title" v-if="regiondata[0] && regiondata[0].v_regionalTitle" :class="regiondata[0].v_titleColor ? regiondata[0].v_titleColor : ''">
          <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[0].v_regionalTitle}}</span>
        </div>
      <handout-component class="handout"
        :configData="regiondata[0]"
        @changeShareData="changeShareData1"
        :shareData="shareData0"
      />
    </div>
    <div class="drag-line" ref="lDragLine"></div>
    <div class="bsb-right" ref="rightBox" :style="{width:rightObj.width}">
      <div class="bsb-right-top" :style="{height:rightHeight,minHeight: rightMinHeight,maxHeight:rightMHeight}">
        <div class="box-title" v-if="regiondata[1] && regiondata[1].v_regionalTitle" :class="regiondata[1].v_titleColor ? regiondata[1].v_titleColor : ''">
          <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[1].v_regionalTitle}}</span>
        </div>
        <handout-component
          :configData="regiondata[1]" class="handout"
          @changeShareData="changeShareData2"
          :shareData="shareData1"
        />
      </div>
      <div class="drag-vertical" ref="uDragLine"></div>
      <div class="bsb-right-bottom" :style="{height:rightBHeight,minHeight:rightBMinHeight}">
        <div class="box-title" v-if="regiondata[2] && regiondata[2].v_regionalTitle" :class="regiondata[2].v_titleColor ? regiondata[2].v_titleColor : ''">
          <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[2].v_regionalTitle}}</span>
        </div>
        <handout-component class="handout"
          :configData="regiondata[2]"
          @changeShareData="changeShareData3"
          :shareData="shareData2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
export default {
  name: 'leftUpDown',
  props: {
    configData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      maxheight: '',
      leftRightObj: {
        width: 500,
        defaultWidth: 600,
        minWidth: 300
      },
      rightObj: {
        width: 0,
        defaultWidth: 600
      },
      upDownObj: {
        height: 500,
        defaultHeight: 600,
        minHeight: 400
      },
      downObj: {
        height: 0,
        minHeight: 0,
        defaultWidth: 500
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
            this.leftRightObj.width = this.regiondata[0].v_DefaultWidth * this.$refs.box.clientWidth * 0.01

            this.leftRightObj.minWidth = this.regiondata[0].v_MinWidth * this.$refs.box.clientWidth * 0.01
          } else {
            this.leftRightObj.width = this.regiondata[0].v_DefaultWidth

            this.leftRightObj.minWidth = this.regiondata[0].v_MinWidth
          }
          if (this.regiondata[1].v_DefaultUnit === '1') {
            this.upDownObj.height = this.regiondata[1].v_DefaultHeight * this.$refs.box.clientHeight * 0.01

            this.upDownObj.minHeight = this.regiondata[1].v_MinHeight * this.$refs.box.clientHeight * 0.01
          } else {
            this.upDownObj.height = this.regiondata[1].v_DefaultHeight

            this.upDownObj.minHeight = this.regiondata[1].v_MinHeight
          }
          if (this.regiondata[2].v_DefaultUnit === '1') {
            this.downObj.minHeight = this.regiondata[2].v_MinHeight * this.$refs.box.clientHeight * 0.01
          } else {
            this.downObj.minHeight = this.regiondata[2].v_MinHeight
          }
          // 是否允许拖拽
          if (regionConf.isdefaultdragregin === '1') {
            util.drapUtils(this.$refs.lDragLine, this.leftRightObj)
            util.drapUtils(this.$refs.uDragLine, this.upDownObj)
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
      return this.leftRightObj.width + 'px'
    },
    leftMinWidth () {
      return this.leftRightObj.minWidth + 'px'
    },
    rightHeight () {
      return this.upDownObj.height + 'px'
    },
    rightMinHeight () {
      return this.upDownObj.minHeight + 'px'
    },
    rightBHeight () {
      return this.downObj.height + 'px'
    },
    rightBMinHeight () {
      return this.downObj.minHeight + 'px'
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
    if (this.$refs.lDragLine) {
      this.$refs.lDragLine.onmousedown = null
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
  > div {
    // height: 100%;
  }
  .bsb-left {
    overflow: hidden;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
  }
  .drag-line {
    width: 3px;
    background-color: #abd6ff;
    cursor: w-resize;
    &:hover {
      background-color: #7FE7FC;
    }
  }
  .bsb-right {
    display: flex;
            height: 100%;
            box-orient:vertical;
            flex-direction:column;
    flex: 1;
    overflow: hidden;
    // background-color: red;
    .bsb-right-top {
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      // 兼容页面管理上方表单 的标题样式 19-10-14
      display: flex;
      height: 0;
      box-orient:vertical;
      flex-direction:column;
    }
    .bsb-right-bottom {
      z-index: 1;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 0;
      box-orient:vertical;
      flex-direction:column;
    }
  }
}
.table-wrapper {
        height: 100%;
      }
.drag-vertical {
  width: 100%;
  height: 3px;
  background-color: #abd6ff;
  cursor: s-resize;
  position: relative;
  &:hover {
    background-color: #7FE7FC;
  }
  .handout {
    flex: 1;
  }
}
</style>
