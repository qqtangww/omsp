<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 17:22:21
 * @LastEditTime: 2019-09-19 16:58:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="title">
    <i class="iconfont icon-biaotibiao"></i>
    {{ title }}
    <span class="orgBtn-box">
      <el-button
        type="text"
        v-for="(item,index) in configData.confOperation.tools"
        :key="index"
        @click="getFunction(item)"
        :icon="item.iconurl"
      >{{ item.operationname }}</el-button>
    </span>
    <dialog-standard v-on="$listeners" v-if="ifDialog" :ifDialog='ifDialog' :configData='btnConfigData' @closeDialog='closeDialog' :shareData='shareData'></dialog-standard>
    <!-- <dialog-standard v-on="$listeners" v-if="ifDialog" :ifDialog='ifDialog' @getButtonConfig='getButtonConfig' :configData='btnConfigData' :shareData='currentData'></dialog-standard> -->
  </div>
</template>

<script>
import dialogStandard from '@/components/stdDialog/stdDialogAction'
import buttonClick from '@/common/js/mixins/buttonClick'
export default {
  name: 'standardTitle',
  mixins: [buttonClick],
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  data () {
    return {
      ifDialog: false,
      btnConfigData: {}
    }
  },
  computed: {
    title () {
      return this.configData.title
    }
  },
  methods: {
    getFunction (item) {
      let configObj = {}
      configObj.interfaceData = item
      configObj.data = this.shareData
      this.buttonClick(configObj)
    },
    // getData (params) {
    //   this.$emit('getData', params)
    // },
    // 接收到子组件传给父组件的值
    closeDialog (data) {
      if (data === true) {
        this.ifDialog = data
      } else {
        let dialogIds = this.$store.state.dialogIds
        // 拿到当前的 弹框id
        let currentDialogId = this.$store.state.currentDialogId[0]
        if (currentDialogId === dialogIds[dialogIds.length - 1]) {
          this.$store.commit('removeDialogIds')
          this.ifDialog = false
        } else {
          this.$store.commit('getDialogId', dialogIds[dialogIds.length - 1])
        }
      }
    }
  },
  components: {
    dialogStandard
  }
}
</script>

<style scoped lang='scss'>

</style>
