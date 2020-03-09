<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 09:47:38
 * @LastEditTime: 2019-10-09 15:26:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 标准tab结构 -->
  <div class='tabs-handout'>
    <el-tabs v-model="activeName" type="border-card" id="standard-tabs" class="configTabs">
      <!-- <el-tab-pane :name="item.i_IsSpecialShow === '1' ? specialTabName : String(index)" v-for="(item,index) in configData.regiondata" :key='index' :disabled="tabsCode === item.v_TabsFlagCode || ((item.v_IsDependFirst === '0' ? false : true) && isDisabled)"> -->
      <el-tab-pane :name="item.i_IsSpecialShow === '1' ? specialTabName : String(index)" v-for="(item,index) in configData.regiondata" :key='index' :disabled="item.v_IsDependFirst !== '0' && (tabsCode === item.v_TabsFlagCode || isDisabled) ">
        <el-badge slot="label" :is-dot="currentLabel.includes(index) && redWarning.currentTab === item.v_RegionCode" id="tab-label" :class="'dot-' + pointData">
          <span class="tab-title"><i :class="item.v_IconURL" :style="{'color':item.v_IconColor}" v-if="item.v_IconURL"></i>{{ item.v_TabsFlagName  }}</span>
        </el-badge>
        <handout-component v-loading="loading"
          element-loading-text="加载中"
          :configData="Object.assign( item, {tabConfig: configData})"
          v-on="$listeners"
          :class="item.viewId"
          :shareData="requestData"
          @changeLoading="changeLoading"
          @specialTab='specialTab'
          @changeFlag='changeFlag'
          @warningToSaveData='warningToSaveData'
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'standardTabs',
  props: {
    configData: Object,
    shareData: Object
  },
  watch: {
    configData: {
      deep: true,
      handler (nv) {
        if (nv.regionConf) {
          this.requestData.activeName = this.activeName
        }
      }
    },
    shareData: {
      deep: true,
      immediate: true,
      handler (nv) {
        // 这里注释 是防止做死循环监听 2020/1/8 ly
        this.requestData = Object.assign(nv, { activeName: this.activeName })
        // this.requestData = Object.assign(this.requestData, nv)
      }
    },
    activeName (newV, oldV) {
      this.requestData = Object.assign(this.shareData, { activeName: this.activeName })
      // this.$set(this.requestData, 'activeName', this.activeName)
    },
    specialTabName (newV, oldV) {
      if (newV) {
        if (this.configData.regiondata[0].i_IsSpecialShow === '1') {
          this.activeName = newV
        } else {
          this.activeName = '0'
        }
      }
    }
  },
  data () {
    return {
      activeName: '',
      // 需要传递下去的数据
      requestData: {},
      specialTabName: '',
      // 红色小红点 数据
      redWarning: {},
      isDisabled: true,
      loading: false,
      tabsCode: ''
    }
  },
  computed: {
    ...mapState({
      tabFlag: state => state.tabFlag,
      currentDialogId: state => state.currentDialogId,
      // 小红点颜色（参数）
      pointData: state => state.parameter.windowRed.v_ParamValue
    }),
    currentLabel () {
      // 判断小红点应该出现在哪个tab标签上
      let allTabFlag = this.tabFlag[this.redWarning.currentTab]
      if (allTabFlag) {
        let tabFlag = []
        allTabFlag.forEach((item, index) => {
          if (!item) {
            tabFlag.push(index)
          }
        })
        return tabFlag
      } else {
        return []
      }
    }
  },
  created () {
    this.$store.commit('getTabFlag', [this.configData.regionConf.v_RegionCode, this.configData.regiondata.length])
    let operationcode = this.$store.state.confsBtn.operationcode || ''
    if (operationcode.indexOf('modify') !== -1) {
      this.isDisabled = false
    }
    // 判断tab是否是弹框
    if (this.configData.regiondata[0].v_CateCode === 'CC_FM') {
      this.loading = true
    }
  },
  methods: {
    changeFlag (params) {
      // 判断：
      // 1、如果有传过来tabsCode，把指定的tabsCode做置灰
      // 2、如果没有传，就全部 取消置灰
      if (params.hasOwnProperty('tabsCode') && params.tabsCode) {
        // this.tabsCode = params.tabsCode

      } else {
        this.isDisabled = params.isDisabled
      }
    },
    // 特殊tab类名
    specialTab (classname) {
      this.specialTabName = classname
    },
    // 设置tab内容高度
    setTabContent () {
      let standardTabs = document.getElementById('standard-tabs')
      let tabsHeader = 30
      let tabsContent = standardTabs.getElementsByClassName('el-tabs__content')[0]
      tabsContent.style.height = standardTabs.offsetHeight - tabsHeader + 'px'
    },
    // 警告用户保存表单信息
    warningToSaveData (redDotData) {
      if (this.configData.regionConf.v_RegionCode === redDotData.currentTab) {
        this.redWarning = redDotData
        // 拿到表单传上来的数据 往VX中修改对应tab组件-对应tab标签页的值
        this.$store.commit('modifyTabFlag', redDotData)

        // 判断：当前tab组件中所有tab标签页是否存在false，如果存在，证明该弹框需要二次确认
        let currentTabLabelFlag = this.tabFlag[redDotData.currentTab]
        if (currentTabLabelFlag.includes(false)) {
          this.$store.commit('getDialogFlag', [this.currentDialogId[0], false])
        } else {
          this.$store.commit('getDialogFlag', [this.currentDialogId[0], true])
        }
      }
    },
    changeLoading () {
      this.loading = false
    }
  }
}
</script>

<style scoped lang='scss'>
@import "@/assets/css/configTab.scss";
// 小红点的样式
#tab-label{
  /deep/ .is-dot{
    width: 6px;
    height: 6px;
    right: 0;
  }
}
#standard-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 3px;
  box-sizing: border-box;
  /deep/ .el-tabs__nav-wrap .el-tabs__nav .el-tabs__item.is-active{
    height: 30px;
    border-top: 1px solid #3792d8;
    border-left: 1px solid #3792d8;
    margin-left: 0;
  }
  /deep/ .el-tabs__content{
    flex: 1;
    >div {
      height: 100%;
    }
    // tab中表单不需要变宽线 2019-12-2 ly
    // .form-component{
    //   border: 5px solid #ABD6FF;
    // }
    .formOperateBox{
      border-bottom: 2px solid #B8B8B8;
    }
    .tabs-base-info{
      border: none;
    }
  }
}
.tab-title{
  display: flex;
  >i{
    margin-right: 5px;
    color: #333333;
  }
}
#app .tabs-handout /deep/ .el-tabs__item{
  margin: 0;
  &.is-active{
    color: #333333;
    .tab-title{
      i{
        color: #5892f6;
        font-weight: normal;
      }
    }
  }
}
#app .tabs-handout /deep/ .el-tabs__header{
  border: none;
  border-bottom: 1px solid #5892f6;
}
#app .tabs-handout /deep/ .el-tabs__item{
  height: 29px;
}
#app .tabs-handout /deep/ .el-tabs__item.is-active{
  height: 30px;
}
</style>
