<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-25 20:14:36
 * @LastEditTime: 2019-09-26 10:51:23
 * @LastEditors: ly
 -->
<template>
  <div>
    <!-- 标准化操作区 -->
    <select-standard
      @changeIndex='changeIndex'
      @getQueryData='getQueryData'
      :currentConfigData='currentConfigData'
      v-if="showStdSelect">
    </select-standard>
    <!-- 自定义查询 -->
    <self-select
      @changeIndex='changeIndex'
      :currentConfigData='currentConfigData'
      v-else
      :configData='configData'
      :shareData='shareData'
      v-on="$listeners"
      @getQueryData='getQueryData'
      @getButtonConfig='getButtonConfig'
      @getTableData="getTableData">
    </self-select>
    <!-- 标准化工具条 -->
    <tools-standard
      :currentConfigData='currentConfigData'
      @getButtonConfig='getButtonConfig'
      @toolsButtonConfig='toolsButtonConfig'
      :configData='configData'
      :shareData='shareData'
      :checkSelectData='checkSelectData'
      v-on="$listeners">
    </tools-standard>
    <!-- 视图列表 -->
    <table-standard
      :tableRowHeight='tableRowHeight'
      :currentConfigData='currentConfigData'
      :tableData='tableData'
      :key="currentViewId"
      :configData='configData'
      :shareData='shareData'
      :sortFlag='sortFlag'
      ref="tableStandard"
      v-on="$listeners"
      @oldCloseDialog='oldCloseDialog'
      @getButtonConfig='getButtonConfig'
      @getTableData="getTableData"
      @buttonConfig='buttonConfig'
      @getCheckSelectData='getCheckSelectData'>
    </table-standard>
    <!-- 视图分页 -->
    <pagination-standard
      :currentConfigData='currentConfigData'
      :totalCount='totalCount'
      :paramPageNum='paramPageNum'
      :currentIndex='currentIndex'
      @changeIndex="changeIndex"
      v-if="showChild">
    </pagination-standard>
    <!-- 引入弹框 -->
    <dialog-standard
      v-on="$listeners"
      v-if="ifDialog"
      :currentConfigData='currentConfigData'
      :shareData="getFieTableData"
      :ifDialog='ifDialog'
      :configData='btnConfigData'
      @getDialogStatus='getDialogStatus'
      @getTableData="getTableData">
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
import tableStandard from '@/components/stdTable/viewStandard/basecom/stdDataGrid'
// 分页
import paginationStandard from '@/components/stdTable/stdPagination'
// 标准查询
import selectStandard from '@/components/stdTable/viewStandard/basecom/stdSelect'
// 自定义查询
import selfSelect from '@/components/stdTable/selfSelect'
import util from '@/common/js/util.js'
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
      // 保存viewid和viewpath
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
      // 传递按钮的配置项 后续根据配置项调取接口 此数据在base.js 跟 toolsFun.js  中进行赋值操作  两个js文件对应 工具条 跟 视图操作
      btnConfigData: {},
      // 是否显示弹框
      ifDialog: false,
      // 是否显示 老弹框
      oldDialog: false,
      viewId: '',
      // 获取 查询组件中的搜索关键字
      queryStr: '',
      // 获取 自定义查询组件中的搜索关键字
      queryObj: {},
      searchTableData: {},
      currentIndex: '',
      // 选中的数据
      checkSelectData: [],
      // 定时器ID
      setIntervalId: ''
    }
  },
  watch: {
    configData: {
      immediate: true,
      // deep: true,
      handler (nv) {
        // 监听定时刷新
        if (nv.confView.isautorefresh === '1') {
          this.refreshTableData()
        }
        this.viewId = nv.confView.viewid
        this.$store.commit('getCloseViewid', nv.confView.viewid)
        // 刷新指定的参数组视图,指定视图编码可自定义如:CC_VW_parameterGroupList
        if (nv.viewId === 'CC_VW_parameterGroupList') {
          window.CC_VW = this
        }
        if (Object.keys(nv).length === 0) return
        this.initData()
        this.getDefaultSort()
        this.getTemConf()
      }
    },
    // 监听查询条件
    searchData: {
      immediate: true,
      // deep: true,
      handler (nv) {
        this.searchTableData = nv
      }
    },
    shareData: {
      handler (nv, ov) {
        if (nv && nv.hasOwnProperty('resetIndex')) {
          let temporaryObj = Object.assign({}, this.viewParams[this.viewId], { index: 1, currentViewId: this.viewId })
          this.currentIndex = '1'
          this.$store.commit('modifypaginations', temporaryObj)
        }
        // 如果需要重新调取数据【例：枚举类型的编程接口】
        if (nv && nv.hasOwnProperty('needUpdate')) {
          this.getTableData()
        }
        if (nv) {
          // 如果传下来数据中包含 customViewId 就用customViewId 作为viewId
          if (nv.hasOwnProperty('customViewId')) {
            this.viewId = nv.customViewId
          }
          // 接收传递过来的数据，根据数据重新调取接口（比如说点击树节点，重新调取数据）
          // 不重复调取数据接口
          if (nv !== ov) {
            this.getTemConf()
          }
        }
      }
    }
  },
  computed: {
    // 拿到当前行的数据
    ...mapGetters(['getFieTableData', 'getFieTreeData']),
    // ...mapState(['paginations']),
    ...mapState({
      viewParams: state => state.paginations,
      viewFunctions: state => state.viewFunctions,
      dialogFlag: state => state.dialogFlag,
      treeRowData: state => state.fieTreeData
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
    },
    // 按区获取查询条件
    searchData () {
      let flagViewId = this.viewId || this.currentViewId
      return this.$store.state.searchData[flagViewId]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 弹框关闭之后会 传一个false 过来
    getDialogStatus (params) {
      // console.log(params)
      // 如果params.code 的值 为columLink 代表就是列链接 直接关闭弹框 值为写死  后期待优化
      if (this.currentViewId === params.code || params.code === 'columLink') {
        this.ifDialog = params.flag
      }
    },
    getButtonConfig (data, viewFlag) {
      this.ifDialog = data
    },
    // 视图自动刷新配置
    refreshTableData () {
      let isautorefresh = this.currentConfigData.confView.isautorefresh
      let refreshrange = Number(this.currentConfigData.confView.refreshrange) * 1000
      if (isautorefresh === '1') {
        this.setIntervalId = setInterval(() => {
          setTimeout(this.getTableData(), 0)
        }, refreshrange)
        this.$store.commit('getSetInterval', this.setIntervalId)
      }
    },
    // 接收子组件传过来的值
    getCheckSelectData (data) {
      this.checkSelectData = data
    },
    // 如果当前有传递当前分页的值
    changeIndex (val) {
      this.currentIndex = String(val)
    },
    // 监听标准查询 查询条件变化
    getQueryData (queryData) {
      if (Object.prototype.toString.call(queryData).includes('Object')) {
        this.queryObj = queryData
      } else if (Object.prototype.toString.call(queryData).includes('String')) {
        this.queryStr = queryData
      }
    },
    oldCloseDialog (params) {
      this.oldDialog = params
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
        let pageData = JSON.parse(this.currentConfigData.confView.pageconfig || '{}')
        // 设置默认显示多少条分页
        this.pagesize = pageData['newischoice'] === undefined ? 0 : pageData['newischoice']
        // 调取数据
        // 如果 显示分页 就从这里调取数据
        let params = {}
        params.currentViewId = flagViewId
        if (this.currentConfigData.confView.isshowonpage !== '1') {
          if (this.viewParams[flagViewId]) {
            params.index = this.viewParams[flagViewId].index
            params.size = this.viewParams[flagViewId].size
            // 如果分页有查询条件，那么查询条件也需要带上
            if (this.viewParams[flagViewId].searchQuery) {
              params.searchQuery = this.viewParams[flagViewId].searchQuery
            }
          } else {
            params.index = 1
            params.size = pageData['newischoice']

            // if (this.viewParams[flagViewId].searchQuery) {
            //   params.searchQuery = this.viewParams[flagViewId].searchQuery
            // }
          }
          // 把分页数据存到vuex
          this.$store.commit('modifypaginations', params)
        } else {
          // 如果不显示分页 就调用阀值数据
          params.size = JSON.parse(this.currentConfigData.confView.pageconfig).maxdata
          // 把分页数据存到vuex
          params.index = 1
          // if (this.viewParams[flagViewId].searchQuery) {
          //   params.searchQuery = this.viewParams[flagViewId].searchQuery
          // }

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
        delete params.currentViewId
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
      if (this.currentConfigData.confView.isdisplay !== '1') return
      let temporaryObj = {}
      // 如果有传过来数据 2020/1/21 合并数据后 会造成，带查询条件打开弹框视图，添加新数据，刷新页面报错
      if (params) {
        if (!params.index) {
          temporaryObj = params
        }
      }
      // 判断传入的参数中有没有changeTreeNodeData属性，改属性值用于改变指定树节点数据
      if (params && params.hasOwnProperty('changeSpecialNodeData') && params.changeSpecialNodeData) {
        var temporaryTreeNode = {}
        temporaryTreeNode.changeSpecialNodeData = params.changeSpecialNodeData
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
          // console.log(flagViewId)
        }
        // 12.6处理编程接口污染
        let relyOnView = 'requestParams' + '_' + flagViewId
        let relyOnTree = 'requestParams_tree' + '_' + flagViewId
        let functionObj = this.viewFunctions[flagViewId]
        var valuesObj = {}
        if (functionObj && functionObj[relyOnView]) {
          // 依赖视图当前行的数据
          let funcData = functionObj[relyOnView]({ that: this })
          let keysArr = Object.keys(funcData)
          // 判断函数返回值是对象还是数组
          // 如果是对象，就从getFieTableData中取值【兼容之前的业务】
          if (util.gettype(funcData) === 'Object') {
            valuesObj = keysArr.reduce((prev, cur) => {
              if (this.getFieTableData[cur]) {
                prev[cur] = this.getFieTableData[cur]
              }
              return prev
            }, {})
          } else if (util.gettype(funcData) === 'Array') {
            // 如果是数组，就按业务场景拿值【新版本】数据必须是json格式
            funcData.forEach(item => {
              for (let key in item) {
                valuesObj[key] = item[key]
              }
            })
          }
        }
        if (functionObj && functionObj[relyOnTree]) {
          // 如果是依赖树节点数据
          let funcData = functionObj[relyOnTree]({ that: this })
          let keysArr = Object.keys(funcData[0])
          let treeCode = funcData[1].treeCode
          valuesObj = keysArr.reduce((prev, cur) => {
            if (this.getFieTreeData[treeCode]) {
              prev[cur] = this.getFieTreeData[treeCode][cur]
            }
            return prev
          }, {})
          // 如果返回的数组中有三个值，第三个值是处理当前树节点没有的值
          if (funcData[2]) {
            Object.assign(valuesObj, funcData[2])
          }
        }
        // 合并需要传递的参数：分页、查询、排序、特殊字段
        Object.assign(temporaryObj, this.viewParams[flagViewId], valuesObj)
        // console.log(temporaryObj)

        API.post(url, temporaryObj).then(res => {
          if (!res.code) {
            // 判断是否 需要显示节点数字，如果需要显示，把视图数据总条数传过去
            if (temporaryTreeNode && temporaryTreeNode.changeSpecialNodeData.length > 0) {
              let temporaryArr = temporaryTreeNode.changeSpecialNodeData
              temporaryArr.forEach(item => {
                if (item.isCurrentNode) {
                  Object.assign(item, { countNumber: res.totalCount })
                }
              })
              // let customObj = Object.assign(temporaryTreeNode.changeSpecialNodeData, { shownumfield: res.totalCount })
              // 需要用changeSpecialNodeData作为key传递
              this.$emit('changeShareData', { changeSpecialNodeData: temporaryTreeNode.changeSpecialNodeData })
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
    // 视图传过来的数据
    buttonConfig (obj) {
      if (JSON.stringify(obj) !== '{}') {
        this.btnConfigData = obj
      }
    },
    //  工具条传过来的配置数据
    toolsButtonConfig (obj) {
      if (JSON.stringify(obj) !== '{}') {
        this.btnConfigData = obj
      }
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
