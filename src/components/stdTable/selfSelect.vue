<template>
  <div>
    <component :is="componentId" :configData='configData' :shareData='shareData' v-on="$listeners" class="customQuery" :class="'customQuery-' + viewid" v-if="isshowenquirybar === '1'" v-show="isenquirybarexpand === '1'"></component>
  </div>
</template>
<script>
import customQuery from '@/common/js/mixins/customQuery'
import cgiService from '@/api/cgiService'
export default {
  name: 'selfSelect',
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
      componentId: '',
      viewid: '',
      // 是否显示查询栏
      isshowenquirybar: '0',
      // 缺省显示查询栏
      isenquirybarexpand: '0'
    }
  },
  mixins: [customQuery],
  watch: {
    configData: {
      deep: true,
      immediate: true,
      handler (nv) {
        if (Object.keys(nv).length === 0) return
        this.isshowenquirybar = nv.confView.isshowenquirybar
        this.isenquirybarexpand = nv.confView.isenquirybarexpand
        this.viewid = nv.confView.viewid
        if (nv.confView.isudenquirypage === '1') {
          this.componentId = nv.confView.udenquirypage ? nv.confView.udenquirypage : ''
        }
      }
    }
  }
}
</script>
