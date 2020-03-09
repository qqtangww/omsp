<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-17 09:47:38
 * @LastEditTime: 2019-10-09 15:26:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
      <div class="echarts-item" :id="echarts.itemId"></div>
  </div>
</template>

<script>
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

        }
      }
    },
    shareData: {
      deep: true,
      immediate: true,
      handler (nv) {

      }
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped lang='scss'>

</style>
