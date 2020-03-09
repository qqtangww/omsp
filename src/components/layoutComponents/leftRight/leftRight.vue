<template>
  <div class="both-side-box" ref="box">
    <div class="bsb-left" :style="{ width:leftWidth,minWidth: leftMinWidth}">
      <div class="box-title" v-if="regiondata[0] && regiondata[0].v_regionalTitle" :class="regiondata[0].v_titleColor ? regiondata[0].v_titleColor : ''">
        <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[0].v_regionalTitle}}</span>
      </div>
      <!-- <span>{{regiondata[0]}}</span> -->
      <handout-component class="handout"
        :configData="regiondata[0]"
        @changeShareData="changeShareData1"
        :shareData="shareData0"
      />
    </div>
    <div class="drag-line" ref="dragLine"></div>
    <div class="bsb-right" :style="{width:rightstyleObj.width,minWidth: rightMinWidth}">
      <div class="box-title" v-if="regiondata[1] && regiondata[1].v_regionalTitle" :class="regiondata[1].v_titleColor ? regiondata[1].v_titleColor : ''">
        <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[1].v_regionalTitle}}</span>
      </div>
      <handout-component class="handout"
        :configData="regiondata[1]"
        @changeShareData="changeShareData2"
        :shareData="shareData1"
      />
    </div>
  </div>
</template>
<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
export default {
  name: 'leftRight',
  props: {
    configData: {
      type: Object,
      default () {}
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
  data () {
    return {
      styleObj: {
        width: 500,
        defaultWidth: 100,
        minWidth: 300
      },
      rightstyleObj: {
        width: 0,
        defaultWidth: 600,
        minWidth: 100
      },
      regiondata: [{}, {}], // 配置信息
      allShareData: [{}, {}], // 在父组件大家共享的状态
      handoutShareData: [{}, {}] // 根据配置实际分发下去的数据
    }
  },
  methods: {
    changeShareData1 (oldData) {
      this.allShareData[0] = oldData
      this.allShareData = this.allShareData.slice(0)
    },
    changeShareData2 (oldData) {
      this.allShareData[1] = oldData
      this.allShareData = this.allShareData.slice(0)
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
            this.styleObj.width = this.regiondata[0].v_DefaultWidth * this.$refs.box.clientWidth * 0.01
            this.styleObj.minWidth = this.regiondata[0].v_MinWidth * this.$refs.box.clientWidth * 0.01
          } else {
            this.styleObj.width = this.regiondata[0].v_DefaultWidth
            this.styleObj.minWidth = this.regiondata[0].v_MinWidth
          }
          if (this.regiondata[1].v_DefaultUnit === '1') {
            this.rightstyleObj.minWidth = this.regiondata[1].v_MinWidth * this.$refs.box.clientWidth * 0.01
          } else {
            this.rightstyleObj.minWidth = this.regiondata[1].v_MinWidth
          }
          // 是否允许拖拽
          if (regionConf.isdefaultdragregin === '1') {
            util.drapUtils(this.$refs.dragLine, this.styleObj)
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
      return this.styleObj.width + 'px'
    },
    leftMinWidth () {
      return this.styleObj.minWidth + 'px'
    },
    rightMinWidth () {
      return this.rightstyleObj.minWidth + 'px'
    },
    shareData0 () {
      if (!this.regiondata[0]) return
      let defaultResRegin = this.regiondata[0].i_DefaultResRegin || '0'
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.allShareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[0]
      }
    },
    shareData1 () {
      if (!this.regiondata[1]) return
      let defaultResRegin = this.regiondata[1].i_DefaultResRegin || '0'
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.allShareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[1]
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {
    this.$refs.dragLine.onmousedown = null
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
  flex-direction: row;
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
    flex: 1;
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    // background-color: red;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
  }
  // 兼容 火狐浏览器
  .handout {
    flex: 1 auto;
  }
}
</style>
