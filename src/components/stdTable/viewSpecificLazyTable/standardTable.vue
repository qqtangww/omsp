<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 18:25:51
 * @LastEditTime: 2019-09-23 11:26:50
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 标准化操作区 -->
    <select-standard :currentConfigData="currentConfigData" v-if="showStdSelect"></select-standard>
    <self-select
      @getQueryData='getQueryData'
      :currentConfigData="currentConfigData"
      :configData="configData"
      @getTableData="getTableData"
      :shareData="shareData"
      @getButtonConfig="getButtonConfig"
      v-on="$listeners"
    ></self-select>
    <!-- 标准化工具条 -->
    <tools-standard
      @getQueryData='getQueryData'
      :currentConfigData="currentConfigData"
      @getButtonConfig="getButtonConfig"
      @buttonConfig="buttonConfig"
      :configData="configData"
      :shareData="shareData"
      :checkSelectData='checkSelectData'
      v-on="$listeners"
    ></tools-standard>
    <!-- 视图列表 -->
    <table-standard
      :tableRowHeight='tableRowHeight'
      :currentConfigData="currentConfigData"
      :tableData="tableData"
      :configData="configData"
      :shareData="shareData"
      :sortFlag='sortFlag'
      :selectTableRow='selectTableRow'
      v-if="showChild"
      ref="tableStandard"
      @getButtonConfig="getButtonConfig"
      v-on="$listeners"
      @getTableData="getTableData"
      @buttonConfig="buttonConfig"
      @getCheckSelectData='getCheckSelectData'
    ></table-standard>
    <!-- 视图分页 -->
    <pagination-standard
      :currentConfigData="currentConfigData"
      :totalCount="totalCount"
      :paramPageNum='paramPageNum'
      v-if="showChild"
    ></pagination-standard>
    <!-- 引入弹框 -->
    <dialog-standard
      :currentConfigData="currentConfigData"
      v-if="ifDialog"
      :ifDialog="ifDialog"
      v-on="$listeners"
      :configData="btnConfigData"
      :shareData="getFieTableData"
      @getTableData="getTableData"
      @getDialogStatus='getDialogStatus'
    ></dialog-standard>
  </div>
</template>

<script>
import { API } from '@/api/basic'
// 弹框
import dialogStandard from '@/components/stdDialog/stdDialogAction'
// 标准工具条
import toolsStandard from '@/components/stdTable/stdTools'
// 表格
import tableStandard from '@/components/stdTable/viewSpecificLazyTable/basecom/stdDataGrid'
// 分页
import paginationStandard from '@/components/stdTable/stdPagination'
// 标准查询
import selectStandard from '@/components/stdTable/viewStandard/basecom/stdSelect'
// 自定义查询
import selfSelect from '@/components/stdTable/selfSelect'
import util from '@/common/js/util.js'
import cgiService from '@/api/cgiService'
import { mapGetters, mapState } from 'vuex'
const stdCom = {
  name: 'standardTable',
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
      cgiService,
      viewData: {},
      // 是否已经进行了排序
      sortFlag: true,
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
      // 获取 查询组件中的搜索关键字
      queryStr: '',
      // 获取 自定义查询组件中的搜索关键字
      queryObj: {},
      // 选中的数据
      checkSelectData: [],
      // 选中行的数据
      selectTableRow: []
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
      // immediate: true,// 不重复调取数据接口
      handler (nv, ov) {
        // 枚举中右查询联动
        if (nv.enumValue) {
          this.getTableData()
          delete nv.enumValue
        }
        // 如果传下来数据中包含 customViewId 就用customViewId 作为viewId
        if (nv && nv.hasOwnProperty('customViewId')) {
          this.viewId = nv.customViewId
        }
        // 接收传递过来的数据，根据数据重新调取接口（比如说点击树节点，重新调取数据）
        // 不重复调取数据接口
        if (nv !== ov) {
          this.getTemConf()
        }
      }
    }
  },
  computed: {
    // 拿到当前行的数据
    ...mapGetters(['getFieTableData']),
    ...mapState({
      viewParams: state => state.paginations
    }),
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
  created () {
    this.refreshTableData()
  },
  methods: {
    // 弹框关闭之后会 传一个false 过来
    getDialogStatus (flag) {
      this.ifDialog = flag
    },
    getButtonConfig (data, viewFlag) {
      this.ifDialog = data
    },
    // 视图自动刷新配置
    refreshTableData () {
      let isautorefresh = this.currentConfigData.confView.isautorefresh
      let refreshrange = Number(this.currentConfigData.confView.refreshrange) * 1000
      if (isautorefresh === '1') {
        setInterval(() => {
          setTimeout(this.getTableData(), 0)
        }, refreshrange)
      }
    },
    // 接收子组件传过来的值
    getCheckSelectData (data) {
      this.checkSelectData = data
    },
    // 监听标准查询 查询条件变化
    getQueryData (queryData) {
      if (Object.prototype.toString.call(queryData).includes('Object')) {
        this.queryObj = queryData
      } else if (Object.prototype.toString.call(queryData).includes('String')) {
        this.queryStr = queryData
      }
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
      if (this.currentConfigData.confView.isudenquirypage === '1') {
        this.showStdSelect = false
      }
      // 如果需要默认显示数据
      if (this.currentConfigData.confView.isdisplay === '1') {
        // 拉取默认分页配置
        let pageData = JSON.parse(this.currentConfigData.confView.pageconfig)
        // 设置默认显示多少条分页
        this.pagesize =
          pageData['newischoice'] === undefined ? 0 : pageData['newischoice']
        // 调取数据
        // 如果 显示分页 就从这里调取数据
        let params = {}
        params.currentViewId = flagViewId
        if (this.currentConfigData.confView.isshowonpage !== '1') {
          params.index = 1
          params.size = pageData['newischoice']
          // 把分页数据存到vuex
          this.$store.commit('modifypaginations', params)
        } else {
          // 如果不显示分页 就调用阀值数据
          params.size = JSON.parse(
            this.currentConfigData.confView.pageconfig
          ).maxdata
          // 把分页数据存到vuex
          params.index = 1
          this.$store.commit('modifypaginations', params)
        }
        // 如果没有设置调序字段，就传递排序参数
        let sortArr = []
        if (this.currentConfigData.confView.orderfield === '' && this.currentConfigData.confView.isshowordercol === '0') {
          let columnList = this.currentConfigData.confColumn
          columnList.forEach(item => {
            // 如果此列排序未开启 就不执行
            if (item.issort === '0') return
            // sortmode 是显示默认排序 0是默认 1是升序 2是降序
            let temporaryObj = {}
            temporaryObj.column = item.colname
            temporaryObj.order = item.sortmode === '1' ? 'asc' : item.sortmode === '2' ? 'desc' : null
            sortArr.push(temporaryObj)
          })
          // 如果数组长度大于0 就证明调取过排序接口，不再进行调用
          this.sortFlag = !(sortArr.length > 0)
          params.sortInfo = sortArr
          // 把调序字段保存到vuex
          let temporaryObj = {}
          Object.assign(temporaryObj, this.viewParams[flagViewId], { sortInfo: sortArr }, { currentViewId: flagViewId })
          this.$store.commit('modifypaginations', temporaryObj)
        }
        this.getTableData(params)
      } else {
        this.tableData = []
      }
    },
    getDefaultSort () {
      let sortObj = {}
      let columnList = this.configData.confColumn || []
      columnList.forEach(item => {
        if (item.sortmode !== '0') {
          sortObj.prop = item.colname
          sortObj.order = item.sortmode
          this.sortField.push(sortObj)
        }
      })
    },
    // 调取 列表数据
    getTableData (params) {
      let temporaryObj = {}
      // 如果有传过来数据
      if (params) {
        temporaryObj = params
      }
      // 判断传入的参数中有没有changeTreeNodeData属性，改属性值用于改变指定树节点数据
      if (params && params.hasOwnProperty('changeSpecialNodeData') && params.changeSpecialNodeData) {
        var temporaryTreeNode = {}
        temporaryTreeNode.changeSpecialNodeData = JSON.parse(JSON.stringify(params.changeSpecialNodeData))
        delete temporaryObj.changeSpecialNodeData
      }
      if (this.configData.confView.viewid === temporaryObj.viewid || !temporaryObj.viewid) {
        let url = ''
        // 如果shareData有传入viewid  优先用shareData传入的
        let flagViewId = this.viewId || this.currentViewId
        // 如果有扩展接口
        if (this.currentConfigData.confView.selectqueryinterface) {
          url = this.currentConfigData.confView.selectqueryinterface
        } else {
          url = 'InterfaceGrid/getCategoryViewData/' + flagViewId
        }
        // 判断函数体中 有没有requestParams这个方法
        // requestParams 如果存在这个方法 就需要在调取模板数据的时候多加参数
        // console.log(this.$store.state.viewFunctions)
        // let viewFunctions = []
        // viewFunctions = Object.keys(this.$store.state.viewFunctions)
        // // console.log(viewFunctions)
        // let key = ''
        // viewFunctions.forEach(item => {
        //   if (item === 'CC_CW_newEnumCategory' || item === 'CC_VW_newEnumValue') {
        //     key = 'requestParams' + '_' + this.configData.viewId
        //   } else {
        //     key = 'requestParams'
        //   }
        // })
        // 12.6处理编程接口污染
        let key = 'requestParams' + '_' + flagViewId
        let functionObj = this.$store.state.viewFunctions[flagViewId]
        var valuesArr = []
        if (functionObj && functionObj[key]) {
          // 把函数返回的对象 转化成数组
          let keysArr = Object.keys(functionObj[key]({ that: this }))
          valuesArr = keysArr.reduce((prev, cur) => {
            if (this.getFieTableData[cur]) {
              prev[cur] = this.getFieTableData[cur]
            }
            return prev
          }, {})
        }

        let key1 = 'requestParams_tree' + '_' + flagViewId
        let functionObj1 = this.$store.state.viewFunctions[flagViewId]
        if (functionObj1 && functionObj1[key1]) {
          // // 把函数返回的对象 转化成数组
          let keysArr = Object.keys(functionObj1[key1]({ that: this })[0])
          let treeCode = functionObj1[key1]({ that: this })[1].treeCode
          valuesArr = keysArr.reduce((prev, cur) => {
            if (this.getFieTreeData[treeCode]) {
              prev[cur] = this.getFieTreeData[treeCode][cur]
            }
            return prev
          }, {})
        }
        // 合并需要传递的参数：分页、查询、排序、特殊字段
        Object.assign(temporaryObj, this.viewParams[flagViewId], valuesArr)
        API.post(url, temporaryObj).then(res => {
          if (!res.code) {
            // 判断是否 需要显示节点数字，如果需要显示，把视图数据总条数传过去
            if (temporaryTreeNode && temporaryTreeNode.changeSpecialNodeData.hasOwnProperty('shownumfield') && temporaryTreeNode.changeSpecialNodeData.shownumfield) {
              let customObj = Object.assign(temporaryTreeNode.changeSpecialNodeData, { shownumfield: res.totalCount })
              // 需要用changeSpecialNodeData作为key传递
              this.$emit('changeShareData', { changeSpecialNodeData: customObj })
            }
            this.showChild = true
            // 如果当前视图是作为tab的内容组件
            // 需要判断是否有特殊tab的函数体
            if (this.configData.isTab && this.configData.i_IsSpecialShow === '1') {
              let currentTabClassName = util.transformStr(this.configData.v_Func, res.data)
              this.$emit('specialTab', currentTabClassName)
            }
            this.tableData = res.data
            let tabObj = {}
            tabObj.tableData = this.tableData
            tabObj.flagViewId = flagViewId
            this.$store.commit('viewData', tabObj)
            this.totalCount = res.totalCount
          }
        })
      }
    },
    buttonConfig (obj) {
      this.btnConfigData = obj
    }
  },
  components: {
    selectStandard,
    toolsStandard,
    tableStandard,
    selfSelect,
    paginationStandard,
    dialogStandard
  },
  mounted () {
    // setTimeout(() => {
    //   console.log(this.selectTableRow)
    // }, 5000)
  }
}
export default stdCom
</script>
