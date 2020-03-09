<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 20:14:36
 * @LastEditTime: 2019-09-19 17:53:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 标准化操作区 -->
    <select-standard
      @watchStdKey='watchStdKey'
      :currentConfigData='currentConfigData'
      v-if="showStdSelect">
    </select-standard>
    <!-- 自定义查询 -->
    <self-select
      :currentConfigData='currentConfigData'
      v-else
      :configData='configData'
      :shareData='shareData'
      @getButtonConfig='getButtonConfig'
      v-on="$listeners"
      @getTableData="getTableData"
      @watchKey='watchKey'>
    </self-select>
    <!-- 标准化工具条 -->
    <tools-standard
      :currentConfigData='currentConfigData'
      @getButtonConfig='getButtonConfig'
      @buttonConfig='buttonConfig'
      :configData='configData'
      :shareData='shareData'
      v-on="$listeners">
    </tools-standard>
    <!-- 视图列表 -->
    <table-standard
      :tableRowHeight='tableRowHeight'
      :currentConfigData='currentConfigData'
      :tableData='tableData'
      :configData='configData'
      :shareData='shareData'
      v-if="showChild"
      ref="tableStandard"
      @oldCloseDialog='oldCloseDialog'
      @getButtonConfig='getButtonConfig'
      @getTableData="getTableData"
      v-on="$listeners"
      @buttonConfig='buttonConfig'>
    </table-standard>
    <!-- 视图分页 -->
    <pagination-standard
      :standardKey='standardKey'
      :currentConfigData='currentConfigData'
      :totalCount='totalCount'
      :paramPageNum='paramPageNum'
      v-if="showChild">
    </pagination-standard>
    <!-- 引入弹框 -->
    <dialog-standard
      :currentConfigData='currentConfigData'
      v-if="ifDialog"
      :ifDialog='ifDialog'
      v-on="$listeners"
      :shareData="getFieTableData"
      :configData='btnConfigData'
      @getTableData="getTableData"
      @getDialogStatus='getDialogStatus'>
    </dialog-standard>
  </div>
</template>

<script>
import { API } from '@/api/basic'
// 弹框
import dialogStandard from '@/components/stdDialog/stdDialogAction'
// 标准工具条
import toolsStandard from '@/components/stdTable/stdTools'
// 表格
import tableStandard from '@/components/stdTable/upperCaseView/basecom/stdDataGrid'
// 分页
import paginationStandard from '@/components/stdTable/stdPagination'
// 标准查询
import selectStandard from '@/components/stdTable/upperCaseView/basecom/stdSelect'
// 自定义查询
import selfSelect from '@/components/stdTable/selfSelect'
import util from '@/common/js/util.js'
import { mapGetters } from 'vuex'
const stdCom = {
  name: 'upperCaseView',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    },
    paramPageNum: {
      type: Array
    },
    tableRowHeight: String
  },
  data () {
    return {
      // 保存viewid和viewpath
      viewData: {},
      // 页面操作 链接 数组
      linkPageArr: [],
      // 模板数据
      tableData: [],
      // 数据总条数
      totalCount: 0,
      showChild: false,
      // 获取默认排序字段
      sortField: [],
      // 是否显示标准查询
      showStdSelect: true,
      // 传递按钮的配置项 后续根据配置项调取接口
      btnConfigData: {},
      // 是否显示弹框
      ifDialog: false,
      // 是否显示 老弹框
      oldDialog: false,
      viewId: '',
      // 获取自定义查询组件中的搜索关键字
      keywords: {},
      // 获取标准 查询组件中的搜索关键字
      standardKey: ''
    }
  },
  watch: {
    configData: {
      immediate: true,
      // deep: true,
      handler (nv) {
        if (Object.keys(nv).length === 0) return
        this.initData()
        this.getDefaultSort()
        this.getTemConf()
      }
    },
    shareData: {
      immediate: true,
      handler (nv) {
        if (nv) {
          // 如果传下来数据中包含 customViewId 就用customViewId 作为viewId
          if (nv.hasOwnProperty('customViewId')) {
            this.viewId = nv.customViewId
          }
          this.getTemConf()
        }
      }
    }
  },
  computed: {
    // 拿到当前行的数据
    ...mapGetters(['getFieTableData']),
    // 当前视图的viewid
    currentViewId () {
      if (!this.configData.confView) return
      if (this.configData.confView.viewid) {
        return this.configData.confView.viewid
      } else if (this.configData.v_Code) {
        return this.configData.v_Code
      } else {
        // 快捷菜单登录
        return this.configData.viewid
      }
    },
    currentConfigData () {
      let flagViewId = this.viewId || this.currentViewId
      return this.$store.state.temConf[flagViewId]
    }
  },
  methods: {
    // 弹框关闭之后会 传一个false 过来
    getDialogStatus (flag) {
      this.ifDialog = flag
    },
    getButtonConfig (data, viewFlag) {
      this.ifDialog = data
    },
    // 监听标准查询 查询条件变化
    watchStdKey (params) {
      // this.standardKey = params
    },
    oldCloseDialog (params) {
      this.oldDialog = params
    },
    watchKey (keywords) {
      this.keywords = keywords
    },
    initData () {
      this.showChild = false
      this.ifDialog = false
      this.sortField = []
      this.tableData = []
      this.btnConfigData = {}
    },
    getTemConf () {
      let flagViewId = this.viewId || this.currentViewId
      // 判断是否显示自定义查询
      if (this.currentConfigData.confView.i_IsUDEnquiryPage === '1') {
        this.showStdSelect = false
      }
      // 如果需要默认显示数据
      if (this.currentConfigData.confView.i_IsDisplay === '1') {
        // 拉取默认分页配置
        let pageData = JSON.parse(this.currentConfigData.confView.v_PageConfig || '{}')
        // 设置默认显示多少条分页
        this.pagesize = pageData['newischoice'] === undefined
          ? 0
          : pageData['newischoice']
        // 调取数据
        // 如果 显示分页 就从这里调取数据
        let params = {}
        params.currentViewId = flagViewId
        if (this.currentConfigData.confView.i_IsShowOnPage !== '1') {
          params.index = 1
          params.size = pageData['newischoice']
          // 把分页数据存到vuex
          this.$store.commit('modifypaginations', params)
        } else {
          // 如果不显示分页 就调用阀值数据
          params.size = JSON.parse(this.currentConfigData.confView.v_PageConfig).maxdata
          // 把分页数据存到vuex
          params.index = 1
          this.$store.commit('modifypaginations', params)
        }
        // 如果this.currentConfigData.confView 等于 空
        // 就是没有设置调序字段
        if (this.currentConfigData.confView === '') {
          params.sortColumn = this.sortField[0].prop
          params.sortBy = this.sortField[0].order === '1' ? 'asc' : 'desc'
        }
        // params.catecode = 'CategoryView'
        this.getTableData(params)
      } else {
        this.tableData = []
      }
    },
    getDefaultSort () {
      let sortObj = {}
      let columnList = this.configData.confColumn || []
      columnList.forEach(item => {
        if (item.i_SortMode !== '0') {
          sortObj.prop = item.v_ColName
          sortObj.order = item.i_SortMode
          this.sortField.push(sortObj)
        }
      })
    },
    // 调取 列表数据
    getTableData (params) {
      let url = ''
      // 如果shareData有传入viewid  优先用shareData传入的
      let flagViewId = this.viewId || this.currentViewId
      // 如果有扩展接口
      if (this.currentConfigData.confView.v_SelectQueryInterFace) {
        url = this.currentConfigData.confView.v_SelectQueryInterFace
      } else {
        url = 'InterfaceGrid/getCategoryViewData/' + flagViewId
      }
      // 判断函数体中 有没有requestParams这个方法
      // requestParams 如果存在这个方法 就需要在调取模板数据的时候多加参数
      let key = 'requestParams' + '_' + flagViewId
      let functionObj = this.$store.state.viewFunctions[flagViewId]
      var valuesArr = []
      if (functionObj[key]) {
        // 把函数返回的对象 转化成数组
        let keysArr = Object.keys(functionObj[key]())
        valuesArr = keysArr.reduce((prev, cur) => {
          if (this.getFieTableData[cur]) {
            prev[cur] = this.getFieTableData[cur]
          }
          return prev
        }, {})
      }
      params = Object.assign(valuesArr, params, this.keywords)
      API.post(url, params).then(res => {
        if (!res.code) {
          this.showChild = true
          // 如果当前视图是作为tab的内容组件
          // 需要判断是否有特殊tab的函数体
          if (this.configData.isTab && this.configData.i_IsSpecialShow === '1') {
            let currentTabClassName = util.transformStr(this.configData.v_Func, res.data)
            this.$emit('specialTab', currentTabClassName)
          }
          this.tableData = res.data
          this.totalCount = res.totalCount
        }
      })
    },
    buttonConfig (obj) {
      this.btnConfigData = obj
    }
  },
  components: {
    selectStandard,
    toolsStandard,
    tableStandard,
    paginationStandard,
    selfSelect,
    dialogStandard
  }
}
export default stdCom
</script>
