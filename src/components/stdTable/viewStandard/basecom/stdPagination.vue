<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 11:11:54
 * @LastEditTime: 2019-09-20 10:53:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div v-if="isshowonpage === '0'">
    <!-- 分页 -->
    <!-- :page-size="Number(pagination.newischoice)" -->
    <el-pagination
      class="viewPagination"
      :class="pagination.paginationtype === '1' ? 'paginationBoxSmall' : 'paginationBox'"
      :page-sizes="pagination.newpagesizes"
      :page-size="size"
      :current-page.sync="currentPage"
      :total="total"
      background
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click='prevClick'
      @next-click='nextClick'/>
  </div>
</template>

<script>
import Bus from '@/assets/js/bus.js'
import { mixin } from '@/assets/js/base.js'
export default {
  mixins: [mixin],
  props: {
    currentConfigData: Object,
    standardKey: String,
    totalCount: Number
  },
  watch: {
    currentConfigData: {
      immediate: true,
      handler (nv) {
        if (!nv || !nv.confView) return
        // 是否展示分页
        this.isshowonpage = nv.confView.isshowonpage
        // 获取分页配置
        this.pagination = JSON.parse(nv.confView.pageconfig || '{"maxdata":500,"paginationtype":"0","total":0,"jumper":1,"pagesizes":[{"sizes":10,"ischoice":"1"}],"newpagesizes":[10],"newischoice":10}')
        // 如果没有传分页数据 先默认显示10条每页
        if (!nv.confView.pageconfig) {
          this.pagination.newpagesizes = [10]
        }
        // 如果用户没有配置分页数据 给一个默认值
        if (this.pagination === '{}') {
          this.pagination = { maxdata: 500, paginationtype: '0', total: 0, jumper: 1, pagesizes: [{ sizes: 10, ischoice: '1' }], newpagesizes: [10], newischoice: 10 }
        }
        // 每页展示数据 排序
        this.pagination.newpagesizes.sort(function (a, b) { return a - b })
        if (this.pagination.total === '1') {
          this.layout += ',total'
        }
        if (this.pagination.jumper === '1') {
          this.layout += ',jumper'
        }
        this.size = Number(this.pagination.newischoice)
      }
    }
  },
  data () {
    return {
      // 是否显示分页
      isshowonpage: '1',
      // 每页展示多少条数据
      pageSize: 0,
      // 当前页数
      index: 1,
      size: 1,
      currentPage: 1,
      Bus,
      layout: 'sizes,prev,pager,next',
      // 分页配置项
      pagination: {}
    }
  },
  computed: {
    // 总页数
    total () {
      return this.totalCount
    },
    modelArr () {
      return this.$store.state.searchData.modelArr
    },
    currentViewId () {
      return this.currentConfigData.confView.viewid
    }
  },
  methods: {
    // 每页展示多少条数据
    handleSizeChange (val) {
      this.size = val
      let params = {
        size: val,
        index: this.index
      }
      // 点击分页 携带查询条件
      if (this.modelArr) {
        params.modelArr = this.modelArr
      }
      params.currentViewId = this.currentViewId
      // 把分页数据存到vuex
      this.$store.commit('modifypaginations', params)
      Bus.$emit('pagesize', val)
      params.sortColumn = this.$store.state.sortData.sortColumn
      params.sortBy = this.$store.state.sortData.sortBy
      this.$parent.getTableData(params)
    },
    // 当前是第几页
    handleCurrentChange (val) {
      // let flag = this.getQueryCondition()
      // if (flag === '1') return
      // if (flag !== '1') {
      this.index = val
      let params = {
        index: val,
        size: this.size
      }
      // 点击分页 携带查询条件
      if (this.modelArr) {
        params.modelArr = this.modelArr
      }
      // if (!flag) {
      //   params.modelArr = flag
      // }
      params.currentViewId = this.currentViewId
      // 把分页数据存到vuex
      this.$store.commit('modifypaginations', params)
      Bus.$emit('currentpage', val)
      params.sortColumn = this.$store.state.sortData.sortColumn
      params.sortBy = this.$store.state.sortData.sortBy
      this.$parent.getTableData(params)
      // }
    },
    // 点击上一页
    prevClick (val) {
      let params = {
        index: val,
        size: this.size
      }
      // 点击分页 携带查询条件
      if (this.modelArr) {
        params.modelArr = this.modelArr
      }
      params.currentViewId = this.currentViewId
      // 把分页数据存到vuex
      this.$store.commit('modifypaginations', params)
      Bus.$emit('currentpage', val)
      params.sortColumn = this.$store.state.sortData.sortColumn
      params.sortBy = this.$store.state.sortData.sortBy
      this.$parent.getTableData(params)
    },
    // 点击下一页
    nextClick (val) {
      let params = {
        index: val,
        size: this.size
      }
      params.currentViewId = this.currentViewId
      // 把分页数据存到vuex
      this.$store.commit('modifypaginations', params)
      Bus.$emit('currentpage', val)
      // 点击分页 携带查询条件
      if (this.modelArr) {
        params.modelArr = this.modelArr
      }
      params.sortColumn = this.$store.state.sortData.sortColumn
      params.sortBy = this.$store.state.sortData.sortBy
      this.$parent.getTableData(params)
    },
    // 获取查询数据
    getQueryCondition () {
      if (this.standardSearchKey) {
        let queryCondition = JSON.parse(this.standardSearchKey)
        // 循环提交的数据 提交的json 如果有一个对象属性值全为空就 删除这个对象
        let arr = []
        queryCondition.map(val => {
          let newObj = {}
          let flag = false
          // 删除showDateTime属性
          delete val.showDateTime
          for (var key in val) {
            newObj[key] = val[key]
          }
          for (var i in newObj) {
            if (newObj[i]) {
              flag = true
            }
          }
          if (flag) {
            arr.push(newObj)
          }
        })
        // 提交的对象中 每个字段不能为空 如果只有一个对象 则andConditionVal字段可以为空
        let flagNull = false
        if (arr.length <= 1) {
          for (var key in arr[0]) {
            if (!arr[0][key] && key !== 'andConditionVal') {
              flagNull = true
            }
          }
          // 如果数据为空
          if (!arr.length) {
            flagNull = false
          }
        } else {
        // 如果提交两个或两个对象 需要检测上一个对象的andConditionVal字段 不能为空
          arr.forEach((val, index) => {
            for (var i in val) {
              if (index < arr.length - 1) {
                if (!val[i]) {
                  flagNull = true
                }
              } else {
                if (!val[i] && i !== 'andConditionVal') {
                  flagNull = true
                }
              }
            }
          })
        }
        if (flagNull) {
          this.$message({
            message: '您的查询数据需要填写完整',
            type: 'warning'
          })
          return '1'
        } else {
          this.$parent.$refs.tableStandard.$refs.stdtable.clearSort()
          let params = {}
          delete params.sortBy
          delete params.sortColumn
          arr.forEach(val => {
            if (val.keywords instanceof Date) {
              val.keywords = this.$moment(val.keywords).format('YYYY-MM-DD ss-mm-ss')
            }
          })
          let modelArr = JSON.stringify(arr)
          params.modelArr = modelArr
          this.$store.commit('getSearchData', params)
          return modelArr
        }
      } else {
        return '1'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.paginationBox{
  .el-input--suffix{
    background: red;
  }
}
</style>
