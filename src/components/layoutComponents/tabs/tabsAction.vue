<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 11:01:03
 * @LastEditTime: 2019-09-25 15:48:41
 * @LastEditors: ly
 -->
<template>
    <!-- 竖形tab需要视图撑满 height:100% -->
    <div class='tabs'>
      <!-- <tabs-handout-component :configData="regiondata" v-bind="$attrs" class="std-tabs-action" /> -->
      <tabs-handout-component v-on="$listeners" :configData="responseData" :shareData="shareData" class="std-tabs-action" />
    </div>
</template>

<script>
import tabsHandoutComponent from '@/components/handoutComponent/tabsHandoutComponent'
import cgiService from '@/api/cgiService'
export default {
  name: 'tabsAction',
  props: {
    configData: Object,
    shareData: Object
  },
  watch: {
    configData: {
      handler: function (val) {
        if (JSON.stringify(val) !== '{}') {
          this.getTabLayout()
        }
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      responseData: {}
    }
  },
  components: {
    tabsHandoutComponent
  },
  methods: {
    getTabLayout () {
      let tabCode = ''
      if (JSON.stringify(this.configData) === '{}') {
        let refreshPageData = JSON.parse(sessionStorage.getItem('refreshPageData') || '{}')
        tabCode = refreshPageData.code
      } else {
        tabCode = this.configData.v_Code ? this.configData.v_Code : this.configData.code
      }
      if (!tabCode) return
      cgiService.newLayout(tabCode).then(res => {
        if (res.code === 0) {
          this.responseData = res.data || []
          this.responseData.regionConf.v_defaultDisable = '0'
          this.responseData.regiondata.forEach(item => {
            item.isTab = true
            if (item.v_CateCode === 'CC_VW') {
              item.viewId = item.v_Code
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.tabs{
  height: 100%;
  overflow: hidden;
}
</style>
