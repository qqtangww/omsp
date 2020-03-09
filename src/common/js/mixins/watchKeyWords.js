export default {
  data () {
    return {

    }
  },
  watch: {
    keywords (newVal) {
      this.$emit('watchKey', { keywords: newVal })
    }
  }
}
