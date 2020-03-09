<template>
  <!-- 字典表管理 -->
  <div class="pwdcontrol">
    <standard-table-view :viewNo="viewData.viewid"></standard-table-view>
  </div>
</template>
<script>
let viewpath = {}
const stdView = {
  data () {
    return {
      viewData: {}
    }
  },
  created () {
    this.viewData = JSON.parse(sessionStorage['refreshPageData'])
    viewpath.url = this.viewData.viewpath
    viewpath.id = this.viewData.viewid
  },
  components: {
    standardTableView: () => {
      return import('@/components/' + viewpath.url)
    }
  }
}
export default stdView
</script>
<style lang="scss" scope>
</style>
