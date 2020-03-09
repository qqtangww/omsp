<!-- 此组件仅用于表单操作按钮操作栏！ -->
<template>
  <div class="action-bar">
    <span
      v-for="(item,index) in configData.confOperation.tools"
      :key="index">
    <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
      <el-button
        type="text"
        :disabled="item.isdisabled === '1'"
        v-if="(item.specialdisplayfunc ? transformStr(item, shareData) : true) && item.displaystyle === '1'"
        @click="dialogButtonClick(item)"
        ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{item.operationname}}
      </el-button>
     <el-badge :is-dot="item.operationcode === 'save' && formRed" class="item" :class="'dot-' + pointData">
        <el-button
          type="text"
          :disabled="item.isdisabled === '1'"
          v-if="(item.specialdisplayfunc ? transformStr(item, shareData) : true) && item.displaystyle === '2'"
          @click="dialogButtonClick(item)"
          ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
      </el-badge>
      <el-button
        type="text"
        :disabled="item.isdisabled === '1'"
        v-if="(item.specialdisplayfunc ? transformStr(item, shareData) : true) && item.displaystyle === '3'"
        @click="dialogButtonClick(item)"
        >{{item.operationname}}
      </el-button>
    </span>
  </div>
</template>

<script>
import buttonClick from '@/common/js/mixins/buttonClick'
import util from '@/common/js/util.js'
import { mapState } from 'vuex'
export default {
  name: 'actionBar',
  mixins: [buttonClick],
  props: {
    configData: Object,
    shareData: Object,
    formRed: Boolean
  },
  data () {
    return {
      btnConfigData: {},
      ifDialog: false,
      isDot: false
    }
  },
  computed: {
    ...mapState({
      // 小红点颜色（参数）
      pointData: state => state.parameter.windowRed.v_ParamValue
    })
  },
  watch: {
    formRed: {
      handler (nv) {
        this.$store.commit('getFormFlag', nv)
      },
      deep: true
    }
  },
  methods: {
    // 操作栏 按钮点击事件
    dialogButtonClick (interfaceData) {
      // 保存日志需要的参数 页面id、页面名称、操作id、操作代码
      let pageid = JSON.parse(sessionStorage['refreshPageData']).pageid
      let pagename = JSON.parse(sessionStorage['refreshPageData']).name || JSON.parse(sessionStorage['refreshPageData']).pagename
      this.$store.commit('getLogParams', { templateCode: 'formcode', templateId: interfaceData.formcode, pageid, pagename, operationname: interfaceData.operationname, operationcode: interfaceData.operationcode })
      let configObj = {}
      configObj.interfaceData = interfaceData
      configObj.currentData = this.shareData

      this.buttonClick(configObj)
      // 黑白名单操作栏
      if (interfaceData.formcode === 'CC_FM_accessBlackList' || interfaceData.formcode === 'CC_FM_accessWhiteList') {
        this.$store.state.confsBtn.func = this.$store.state.confsBtn.func + Math.ceil(Math.random() * 10)
      }
    },
    // 解析匿名函数体
    transformStr (item, shareData) {
      let params = {
        shareData,
        that: this
      }
      return util.transformStr(item.specialdisplayfunc, params)
    },
    // 关闭弹框（新版本）
    closeDialog (data) {
      this.$emit('closeDialog', false)
    },
    // 关闭弹框
    close () {
      // 判断当前关闭的弹框 是Form还是Tab页  传对应的code
      let code = ''
      if (this.configData.tabConfig) {
        code = this.configData.tabConfig.regionConf.v_RegionCode
      } else {
        code = this.configData.confView.formcode
      }
      // 获取当前的 code 传值上去做对比
      let params = {
        code: code,
        flag: false
      }
      this.$emit('close', params)
    },
    // 保存【兼容老版本】
    sumitForm (params) {
      this.$emit('sumitForm', params)
    },
    // 保存【新版本用save】
    save (params) {
      this.$emit('sumitForm', params)
    },
    // 刪除
    del (params) {
      this.$emit('del', params)
    },
    // 刷新数据
    getData (params) {
      this.$emit('getData', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-bar{
  /deep/ i{
    margin-right: 4px;
  }
  /deep/ sup.el-badge__content{
    right: 2px !important;
    position: absolute !important;
  }
}
</style>
