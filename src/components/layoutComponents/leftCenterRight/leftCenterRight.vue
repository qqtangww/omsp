<template>
    <div class='both-side-box' ref="box">
        <div class="left-box" :style="{width: leftWidth,minWidth: leftMinWidth }">
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
        <div class="center-box" :style="{ width: centerWidth,minWidth: centerMinWidth}">
          <div class="box-title" v-if="regiondata[1] && regiondata[1].v_regionalTitle" :class="regiondata[1].v_titleColor ? regiondata[1].v_titleColor : ''">
            <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[1].v_regionalTitle}}</span>
          </div>
          <handout-component class="handout"
            :configData="regiondata[1]"
            @changeShareData="changeShareData2"
            :shareData="shareData1"
          />
        </div>
        <div class="drag-line" ref="cDragLine"></div>
        <div class="right-box" :style="{ width: rightObj.width, minWidth:rightMinWidth }">
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
</template>

<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
export default {
  name: 'leftCenterRight',
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
        width: 300,
        defaultWidth: 600,
        minWidth: 200
      },
      centerObj: {
        width: 800,
        defaultWidth: 600,
        minWidth: 300
      },
      rightObj: {
        width: 0,
        defaultWidth: 200,
        minWidth: 300
      },
      regiondata: [{}, {}, {}], // 配置信息
      shareData: [{}, {}, {}], // 在父组件大家共享的状态
      handoutShareData: [{}, {}, {}] // 根据配置实际分发下去的数据
    }
  },
  computed: {
    leftWidth () {
      return this.leftObj.width + 'px'
    },
    leftMinWidth () {
      return this.leftObj.minWidth + 'px'
    },
    centerWidth () {
      return this.centerObj.width + 'px'
    },
    centerMinWidth () {
      return this.centerObj.minWidth + 'px'
    },
    rightMinWidth () {
      return this.rightObj.minWidth + 'px'
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
            this.leftObj.width = this.regiondata[0].v_DefaultWidth * this.$refs.box.clientWidth * 0.01

            this.leftObj.minWidth = this.regiondata[0].v_MinWidth * this.$refs.box.clientWidth * 0.01
          } else {
            this.leftObj.width = this.regiondata[0].v_DefaultWidth

            this.leftObj.minWidth = this.regiondata[0].v_MinWidth
          }
          if (this.regiondata[1].v_DefaultUnit === '1') {
            this.centerObj.width = this.regiondata[1].v_DefaultWidth * this.$refs.box.clientWidth * 0.01

            this.centerObj.minWidth = this.regiondata[1].v_MinWidth * this.$refs.box.clientWidth * 0.01
          } else {
            this.centerObj.width = this.regiondata[1].v_DefaultWidth

            this.centerObj.minWidth = this.regiondata[1].v_MinWidth
          }
          if (this.regiondata[2].v_DefaultUnit === '1') {
            this.rightObj.minWidth = this.regiondata[2].v_MinWidth * this.$refs.box.clientWidth * 0.01
          } else {
            this.rightObj.minWidth = this.regiondata[2].v_MinWidth
          }
          // 是否允许拖拽
          if (regionConf.isdefaultdragregin === '1') {
            util.drapUtils(this.$refs.lDragLine, this.leftObj)
            util.drapUtils(this.$refs.cDragLine, this.centerObj)
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
  mounted () {
  },
  beforeDestroy () {
    this.$refs.lDragLine.onmousedown = null
    this.$refs.cDragLine.onmousedown = null
  }
}
</script>

<style scoped lang='scss'>
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
  .left-box {
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
  .center-box {
    overflow: hidden;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
    // background-color: red;
  }
  .right-box {
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
  }
  .handout {
    flex: 1;
  }
  .stdTableAction{
    flex: 1;
  }
}
</style>
