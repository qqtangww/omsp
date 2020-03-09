<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 17:43:15
 * @LastEditTime: 2019-09-02 17:18:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <component :is="componentId" :configData='configData' :shareData='shareData' v-on="$listeners"></component>
  </div>
</template>
<script>
import enumHeadlineType from '@/views/sys/enum/enumHeadlineType'
import selfParameterSearch from '@/views/sys/parameter/selfParameterSearch'
import selParameterSerachOrg from '@/views/sys/parameter/selParameterSerachOrg'
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
      componentId: ''
    }
  },
  watch: {
    shareData: {
      deep: true,
      immediate: true,
      handler (nv) {
      }
    },
    configData: {
      deep: true,
      immediate: true,
      handler (nv) {
        if (nv.confView.isudenquirypage === '1') {
          this.componentId = nv.confView.udenquirypage ? nv.confView.udenquirypage : ''
        }
      }
    }
  },
  components: {
    enumHeadlineType,
    selfParameterSearch,
    selParameterSerachOrg
  }
}
</script>
