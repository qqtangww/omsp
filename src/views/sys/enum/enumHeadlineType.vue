<template>
<!-- 暂时未用到此组件  建议保留 -->
  <div class="enumHeadlineType">
    <div class="title"><i  class="el-icon-tickets"></i>
        枚举类型
    </div>
  </div>
</template>
<script>
export default {
  name: 'enumHeadlineType',
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
      keywords: ''
    }
  },
  watch: {
    configData: {
      handler: function (data) {
        // console.log(data)
      },
      immediate: true
    }
  },
  methods: {
    changEvents () {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
