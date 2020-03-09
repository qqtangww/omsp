<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 15:37:37
 * @LastEditTime: 2019-09-09 15:37:37
 * @LastEditors: your name
 -->
<template>
    <div class="tab-layout-left" ref="box">
        <div class="navigationBarBox" :style="{ width:leftWidth,minWidth: leftMinWidth}">
            <div class="navigationBar">
                <div class="title">
                <span><i class="iconfont icon-biaotibiao"></i> {{title}}</span>
                </div>
                <ul class='tabBox'>
                <li
                    :class="['tabs',{'indentation':item.i_IsSetBlank === '1'},{'pitchOn': index === TabsIndex },{'isBlank': isBlank === 0},{'isCursor': item.v_Code}]"
                    v-for="(item, index) in configData.regiondata "
                    :key="index"
                    @click="uploadData(item,index)">
                  <span><span v-html="item.v_space"></span> <i :class="item.v_IconURL" :style="{'color':item.v_IconColor}"></i> {{item.v_TabsFlagName }}</span>
                </li>
                </ul>
            </div>
        </div>
        <div class="layoutDrag" ref="layoutDrag"></div>
        <div class="con" :style="{width:rightstyleObj.width}">
          <template v-for="(item, index) in configData.regiondata">
            <handout-component
              :key="index"
              v-if="index === TabsIndex"
              :configData="configData.regiondata[TabsIndex]"
              v-on="$listeners"
              :shareData="requestData"
            />
          </template>
        </div>
    </div>
</template>
<script>
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
export default {
  name: 'verticalTabs',
  props: {
    configData: Object,
    shareData: Object
  },
  watch: {
    configData: {
      deep: true,
      handler (nv) {
        this.flag = Math.ceil(Math.random() * 10)
        if (nv.regionConf) {
          this.disableTab = nv.regionConf.v_defaultDisable === '1'
          // this.requestData.activeName = this.activeName
          this.requestData.activeName = this.activeName
          // this.$set(this.requestData, 'activeName', this.activeName)
        }
      }
    },
    flag: {
      deep: true,
      handler (nv) {
        // 替换输入空格
        setTimeout(() => {
          this.configData.regiondata.forEach((val, index) => {
            this.$set(val, 'v_space', '')
            if (val.v_TabsFlagName.indexOf(' ') >= 0) {
              let space = val.v_TabsFlagName.replace(/ /g, '&nbsp;').match(/&(\S*);/)[0]
              this.$set(val, 'v_space', space)
            }
          })
        }, 100)
      }
    },
    shareData: {
      deep: true,
      immediate: true,
      handler (nv) {
        this.requestData = Object.assign(nv, this.watchResponseData, { activeName: this.activeName })
        // this.requestData = Object.assign(nv, this.watchResponseData)
        // this.$set(this.requestData, 'activeName', this.activeName)
      }
    },
    watchResponseData: {
      deep: true,
      handler (nv) {
        this.requestData = Object.assign(nv, this.shareData)
      }
    },
    activeName (newV, oldV) {
      this.requestData = Object.assign(this.shareData, this.watchResponseData, { activeName: this.activeName })

      // this.requestData = Object.assign(this.shareData, this.watchResponseData)
      // this.$set(this.requestData, 'activeName', this.activeName)
    },
    navData (nv) {
      this.configData = nv
      this.configData.viewId = nv.v_InstanceCode
      this.$set(this.configData, 'isKeepAlive', true)
      this.$store.commit('tabData', nv)
      let data = {
        ...nv
      }
      data.viewid = nv.viewId
      // sessionStorage['refreshPageData'] = JSON.stringify(data)
    }
  },
  data () {
    return {
      flag: 1, // 用于监听是否重复调取配置项
      tabNavList: [],
      navData: {},
      title: '',
      TabsIndex: 0,
      isBlank: 0,
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
      activeName: 0,
      treeTabRowHeight: ''
    }
  },
  created () {
    // 替换输入空格
    this.configData.regiondata.forEach((val, index) => {
      this.$set(val, 'v_space', '')
      if (val.v_TabsFlagName.indexOf(' ') >= 0) {
        let space = val.v_TabsFlagName.replace(/ /g, '&nbsp;').match(/&(\S*);/)[0]
        this.$set(val, 'v_space', space)
      }
    })
    // 判断默认选择项
    this.configData.regiondata.some((val, index) => {
      if (val.v_Code) {
        // 2019/11/30 ly 把默认选中项数据存vuex
        this.$store.commit('tabData', this.configData.regiondata[index])
        this.TabsIndex = index
        return true
      }
    })
    this.title = this.configData.regionConf.v_TabTitle
  },
  computed: {
    leftWidth () {
      return this.styleObj.width + 'px'
    },
    leftMinWidth () {
      return this.styleObj.minWidth + 'px'
    }
  },
  mounted () {
    if (this.configData.regionConf.i_tabDefaultUnit === '1') {
      this.styleObj.width = parseInt(this.configData.regionConf.v_TabDefaultWidth * this.$refs.box.clientWidth * 0.01)
      this.styleObj.minWidth = parseInt(this.configData.regionConf.v_TabMinWidth * this.$refs.box.clientWidth * 0.01)
    } else {
      this.styleObj.width = parseInt(this.configData.regionConf.v_TabDefaultWidth)
      this.styleObj.minWidth = parseInt(this.configData.regionConf.v_TabMinWidth)
    }
    // 是否允许拖拽
    if (this.configData.regionConf.i_IsDropRegion === '1') {
      util.drapUtils(this.$refs.layoutDrag, this.styleObj)
    }
  },
  methods: {
    uploadData (data, index) {
      // 如果有实例数据就让点击tabs页
      if (data.v_Code) {
        this.$store.commit('tabData', this.configData.regiondata[index])
        this.TabsIndex = index
      }
    }
  },
  beforeDestroy () {
    this.$refs.layoutDrag.onmousedown = null
  }
}
</script>
<style lang="scss" scoped>
  .tab-layout-left {
    height: 100%;
    display: flex;
    box-sizing: border-box;
    padding-bottom: 2px;
    flex-direction: row;
    .layoutDrag {
      width: 3px;
      background-color: #abd6ff;
      cursor: w-resize;
      &:hover {
        background-color: #7FE7FC;
      }
      &:active {
        cursor: w-resize;
      }
    }
    .navigationBarBox {
        width: 200px;
        border: 1px solid #bfbfbf;
        box-sizing: border-box;
    }
    .con {
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      flex: 1;
    }
  }
  .navigationBar {
  width:100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabBox {
    list-style: none;
    padding: 2px 0px;
    margin: 0;
    // height: 100%;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    .tabs {
      width: 100%;
      height: 30px;
      border: none;
      line-height: 30px;
      margin-top: 2px;
      background: none;
      box-sizing: border-box;
      padding-left: 27px;
      &:hover {
        background-color: #c2ddfc;
      }
      > span {
        font-size: 12px;
        color: rgba(51, 51, 51, 1);
      }
      &.isCursor {
        cursor: pointer;
      }
    }
  }
  .indentation {
    padding-left: 8px !important;
  }
  .pitchOn {
    background:linear-gradient(180deg,rgba(239,245,252,1) 0%,rgba(169,208,253,1) 100%) !important;
  }
  .isBlank {
      padding-left: 8px !important;
  }
}
</style>
