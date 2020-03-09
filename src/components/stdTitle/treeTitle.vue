<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 17:22:21
 * @LastEditTime: 2019-08-15 15:01:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :class="['title',configData.confView.titlestyle]">
    <i class="iconfont icon-biaotibiao"></i>
    {{ configData.confView.titlefont }}
    <div class="orgBtn-box">
      <!-- displaystyle：1-图标文字,2-仅图标,3-仅文字 -->
      <div v-for="(item,index) in configData.confOperation.tools" :key="index">
        <el-tooltip
          v-if="item.displaystyle === '2'"
          class="item"
          effect="dark"
          :content="item.operationname"
          placement="bottom">
          <!-- 仅图标 -->
          <el-button
            :disabled="item.isdisabled === '1'"
            @click.prevent.stop="getFunction(item)"
            type="text"
          ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i></el-button>
        </el-tooltip>
        <!-- 仅文字 -->
        <el-button
          v-else-if="item.displaystyle === '3'"
          :disabled="item.isdisabled === '1'"
          type="text"
          @click.prevent.stop="getFunction(item)"
        >{{ item.operationname }}</el-button>
        <!-- 图标文字 -->
        <el-button
          v-else
          :disabled="item.isdisabled === '1'"
          type="text"
          @click.prevent.stop="getFunction(item)"
        ><i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>{{item.operationname}}
        </el-button>
      </div>
    </div>
    <dialog-standard v-on="$listeners" v-if="ifDialog" :ifDialog='ifDialog' @getButtonConfig='getButtonConfig' :configData='btnConfigData' :shareData='currentData'></dialog-standard>
  </div>
</template>

<script>
import dialogStandard from '@/components/stdDialog/stdDialogAction'
import treeMixin from '@/common/js/mixins/treeMixin'
export default {
  name: 'treeTitle',
  mixins: [treeMixin],
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Array
    }
  },
  data () {
    return {
      ifDialog: false,
      btnConfigData: {}
    }
  },
  methods: {
    getFunction (item) {
      let configObj = {}
      configObj.interfaceData = item
      configObj.data = this.shareData
      this.buttonClick(configObj)
    },
    showTreeDialog (flag) {
      this.$emit('showTreeDialog', flag)
      this.$emit('getButtonConfig', true)
      this.$emit('btnConfigData', this.btnConfigData)
      this.$emit('customShareData', {})
    },
    getData (params) {
      this.$emit('getData', params)
    },
    // 接收到子组件传给父组件的值
    getButtonConfig (data) {
      this.ifDialog = data
    }
  },
  components: {
    dialogStandard
  }
}
</script>

<style scoped lang='scss'>
.title .orgBtn-box{
  >div{
    float: left;
  }
}
</style>
