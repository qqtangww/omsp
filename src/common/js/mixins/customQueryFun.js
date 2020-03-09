// 封装自定义查询  用于自定义查询栏
import { mapState } from 'vuex'
export default {
  data () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapState({
      viewParams: state => state.paginations
    }),
    viewId () {
      return this.configData.confView.viewid
    }
  },
  methods: {
    searchtableData (formSerach, queryKeyObj, viewCode) {
      this.searchQuery = ''
      let params = {}
      for (const key in formSerach) {
        if (formSerach[key]) {
          params[key] = `${queryKeyObj[key]} LIKE '%${this.formSearch[key]}%'`
        }
      }
      for (const key in params) {
        if (params[key]) {
          this.searchQuery += 'AND ' + params[key]
        }
      }
      this.searchQuery = this.searchQuery.substring(3)

      // 存入 vuex 的查询条件
      let obj = {
        searchQuery: this.searchQuery,
        currentViewId: viewCode
      }
      // 用于：点击查询回到第一页
      this.$emit('changeIndex', '1')
      let temporaryObj = Object.assign({}, this.viewParams[viewCode], { index: 1 }, obj)
      this.$store.commit('modifypaginations', temporaryObj)
      // 调取接口
      this.$emit('getTableData')
    },
    resetPagnations (searchQuery, viewCode) {
      let obj = {
        searchQuery: searchQuery,
        currentViewId: viewCode
      }
      let temporaryObj = Object.assign({}, this.viewParams[viewCode], obj)
      this.$store.commit('modifypaginations', temporaryObj)
    },
    // 新查询数据方法
    serchTableData (formSerach, queryKeyObj) {
      let arr = []
      let num = 0
      for (const key in formSerach) {
        num++
        let obj = {}
        if (formSerach[key]) {
          obj.queryKey = queryKeyObj[key]
          obj.keywords = formSerach[key]
          obj.filtrateConditionVal = 'like'
          if (num > 1) {
            obj.andConditionVal = 'and'
          } else {
            obj.andConditionVal = ''
          }
        }
        if (JSON.stringify(obj) !== '{}') {
          arr.unshift(obj)
        }
      }
      this.modelArr = arr
      let params = {}
      let modelArr = JSON.stringify(arr)
      params.modelArr = modelArr
      if (arr.length === 0) {
        var currentPage = this.$store.state.paginations[this.configData.viewId]
        Object.assign(params, currentPage)
      }
      this.$emit('getQueryData', modelArr)
      this.$emit('getTableData', params)
    }
  }
}
