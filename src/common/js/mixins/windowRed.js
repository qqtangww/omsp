// tab小红点
export default {
  data () {
    return {
      // 红点提示
      isReminder: true
    }
  },
  created () {
  },
  watch: {
    isReminder: {
      // 监听表单数据变化，把true或者false传到 tab组件
      deep: true,
      handler (nv) {
        // console.log(this.configData)
        let currentTab = this.configData.tabConfig.regionConf.v_RegionCode
        this.$emit('warningToSaveData', { currentLabel: Number(this.shareData.activeName), unRedDot: nv, currentTab })
      }
    }
  }
}
