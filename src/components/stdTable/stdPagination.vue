<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 11:11:54
 * @LastEditTime: 2019-09-20 10:53:10
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div v-if="isshowonpage === '0'" class="pagination">
    <!-- 分页 -->
    <!-- :page-size="Number(pagination.newischoice)" -->
    <el-pagination
      class="viewPagination"
      :class="pagination.paginationtype === '1' ? 'paginationBoxSmall' : 'paginationBox'"
      :page-sizes="pagination.newpagesizes"
      :page-size="size"
      :current-page.sync="currentPage"
      background
      :total="total"
      popper-class='viewPagination_select'
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click='prevClick'
      @next-click='nextClick'/>
      <span v-if="pagination.total === '1' ? true :false" class="el-pagination__total_copy">共<span>{{total}}</span>条</span>
  </div>
</template>

<script>
import Bus from '@/assets/js/bus.js'
import { mixin } from '@/assets/js/base.js'
import cgiService from '@/api/cgiService'
import { mapState } from 'vuex'
export default {
  mixins: [mixin],
  props: {
    currentConfigData: Object,
    standardKey: String,
    totalCount: Number,
    currentIndex: String,
    paramPageNum: Array
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
    // 分页参数
    parameterPageArr () {
      let curstomArr = []
      // let pageData = state.parameter.parameterPage
      let pageData = this.paramPageNum
      // 如果分页参数不存在 返回空数组
      if (!pageData) return []
      if (pageData[0]) {
        !curstomArr.includes(Number(pageData[0])) && curstomArr.push(Number(pageData[0]))
      }
      if (pageData[1]) {
        !curstomArr.includes(Number(pageData[1])) && curstomArr.push(Number(pageData[1]))
      }
      if (pageData[2]) {
        !curstomArr.includes(Number(pageData[2])) && curstomArr.push(Number(pageData[2]))
      }
      if (pageData[3]) {
        !curstomArr.includes(Number(pageData[3])) && curstomArr.push(Number(pageData[3]))
      }
      if (pageData[4]) {
        !curstomArr.includes(Number(pageData[4])) && curstomArr.push(Number(pageData[4]))
      }
      return curstomArr
    },
    searchQuery () {
      return this.$store.state.searchData[this.currentViewId]
    },
    currentViewId () {
      if (!this.currentConfigData) return
      return this.currentConfigData.confView.viewid
    },
    ...mapState({
      viewParams: state => state.paginations
    })
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
        // 如果用户没有配置分页数据 给一个默认值
        if (this.pagination === '{}') {
          this.pagination = { maxdata: 500, paginationtype: '0', total: 0, jumper: 1, pagesizes: [{ sizes: 10, ischoice: '1' }], newpagesizes: [10], newischoice: 10 }
        }
        // 如果没有传分页数据 先默认显示10条每页
        if (!nv.confView.pageconfig) {
          this.pagination.newpagesizes = [10]
        }
        // 判断参数中是否有对应的分页数据
        if (this.parameterPageArr.length > 0) {
          // 循环参数中的数据 合并当前的 分页配置
          this.parameterPageArr.forEach(item => {
            !this.pagination.newpagesizes.includes(Number(item)) && this.pagination.newpagesizes.push(Number(item))
          })
        }
        // 每页展示数据 排序
        this.pagination.newpagesizes.sort(function (a, b) { return a - b })
        if (this.pagination.total === '1') {
          this.layout += ',total'
        }
        if (this.pagination.jumper === '1') {
          this.layout += ',jumper'
        }
        // 默认显示多少条每页
        this.size = Number(this.pagination.newischoice)
      }
    },
    // 监听：如果有传下来当前分页
    currentIndex (nVal) {
      // 接收到了值，再出发传值的方法，避免下次监听不到
      this.$emit('changeIndex', '')
      if (nVal) {
        if (this.currentPage !== Number(nVal)) {
          this.currentPage = Number(nVal)
        }
      }
    }

  },
  destroyed () {
    // 用于销毁组件的时候，下次打开重新回到第一页
    if (this.viewParams.hasOwnProperty(this.currentViewId)) {
      this.$store.commit('deletePaginations', this.currentViewId)
    }
  },
  mounted () {
    let totalList = document.querySelectorAll('.std-table-action .viewPagination .el-pagination__total')
    for (let i = 0; i < totalList.length; i++) {
      totalList[i].style.display = 'none'
    }
  },
  methods: {
    // 每页展示多少条数据
    handleSizeChange (val) {
      this.currentPage = 1
      this.changePagination({ size: val, index: 1 })
    },
    // 当前是第几页
    handleCurrentChange (val) {
      this.changePagination({ index: val })
    },
    // 点击上一页
    prevClick (val) {
      this.changePagination({ index: val })
    },
    // 点击下一页
    nextClick (val) {
      this.changePagination({ index: val })
    },
    changePagination (temporaryObj) {
      temporaryObj.currentViewId = this.currentViewId
      // 把分页 数据存到vuex
      Object.assign(this.viewParams[this.currentViewId], temporaryObj)
      this.$store.commit('modifypaginations', this.viewParams[this.currentViewId])
      this.$parent.getTableData()
    }
  }
}
</script>
<style scoped lang="scss">
.pagination {
  position: relative;
}
.paginationBox{
  .el-input--suffix{
    background: red;
  }
  /deep/ .el-input__inner{
    padding-right: 20px !important;
  }
}
.viewPagination{
  padding: 8px;
}
.el-pagination__total_copy {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%)
}
</style>
