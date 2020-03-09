<template>
  <div class="both-side-box" ref="box">
    <div class="bsb-top"  :style="{height:topHeight,minHeight:topMinHeight,maxHeight:topMaxHeight}">
      <div class="box-title" v-if="regiondata[0] && regiondata[0].v_regionalTitle" :class="regiondata[0].v_titleColor ? regiondata[0].v_titleColor : ''">
          <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[0].v_regionalTitle}}</span>
        </div>
      <handout-component class="handout" :configData="regiondata[0]" @changeShareData="changeShareData1" :shareData="shareData0"/>
    </div>
    <div class="drag-vertical" ref="dragLine"></div>
    <div class="bsb-down" :style="{height:downObj.height,minHeight:downMinHeight}">
      <div class="box-title" v-if="regiondata[1] && regiondata[1].v_regionalTitle" :class="regiondata[1].v_titleColor ? regiondata[1].v_titleColor : ''">
          <span class="box-title-icon"><i class="iconfont icon-biaotibiao"></i> {{regiondata[1].v_regionalTitle}}</span>
        </div>
      <handout-component class="handout" :configData="regiondata[1]" @changeShareData="changeShareData2" :shareData="shareData1"/>
    </div>
  </div>
</template>

<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
export default {
  name: 'layoutUpDown',
  props: {
    configData: {
      type: Object,
      default () {}
    }
  },
  data () {
    return {
      upDownObj: {
        height: 100,
        defaultHeight: 200,
        minHeight: 100
      },
      downObj: {
        height: 0,
        defaultWidth: 200,
        minHeight: 100
      },
      regiondata: [{}, {}], // 配置信息
      shareData: [{}, {}], // 在父组件大家共享的状态
      handoutShareData: [{}, {}], // 根据配置实际分发下去的数据
      currentItem: {}
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
            this.upDownObj.height = this.regiondata[0].v_defaultHeight * this.$refs.box.clientHeight * 0.01

            this.upDownObj.minHeight = this.regiondata[0].v_MinHeight * this.$refs.box.clientHeight * 0.01
          } else {
            this.upDownObj.height = this.regiondata[0].v_defaultHeight

            this.upDownObj.minHeight = this.regiondata[0].v_MinHeight
          }
          if (this.regiondata[1].v_DefaultUnit === '1') {
            this.downObj.minHeight = this.regiondata[1].v_MinHeight * this.$refs.box.clientHeight * 0.01
          } else {
            this.downObj.minHeight = this.regiondata[1].v_MinHeight
          }
          // 是否允许拖拽
          if (regionConf.isdefaultdragregin === '1') {
            util.drapUtils(this.$refs.dragLine, this.upDownObj)
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
    topHeight () {
      return this.upDownObj.height + 'px'
    },
    topMinHeight () {
      return this.upDownObj.minHeight + 'px'
    },
    topMaxHeight () {
      return this.maxheight - 5 + 'px'
    },
    downMinHeight () {
      return this.downObj.minHeight + 'px'
    },
    shareData0 () {
      if (!this.regiondata[0]) return
      let defaultResRegin = this.regiondata[0].i_DefaultResRegin || '0'
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.shareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[0]
      }
    },
    shareData1 () {
      if (!this.regiondata[1]) return
      let defaultResRegin = this.regiondata[1].i_DefaultResRegin || '0'
      if (defaultResRegin && Number(defaultResRegin)) {
        return this.shareData[defaultResRegin - 1]
      } else {
        return this.handoutShareData[1]
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
  components: {},
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
  overflow: hidden;
  flex-direction: column;
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
  // > div {
  //   height: 100%;
  // }
  .bsb-top {
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
            height: 0;
            box-orient:vertical;
            flex-direction:column;
  }
  .drag-vertical {
    width: 100%;
    height: 3px;
    min-height: 3px;
    background-color: #abd6ff;
    cursor: n-resize;
    &:hover{
      background-color: #7FE7FC;
    }
  }
  .bsb-down {
    border: 1px solid #bfbfbf;
    box-sizing: border-box;
    flex: 1;
    display: flex;
            height: 0;
            box-orient:vertical;
            flex-direction:column;
    .table-wrapper {
      flex: 1;
      .el-table {
        height: 95%;
      }
    }
  }
  .handout {
    flex: 1;
  }
}
</style>
