/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 14:27:12
 * @LastEditTime: 2019-09-26 14:33:04
 * @LastEditors: ly
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { log } from 'util'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rowTabData: {},
    // 嵌套视图 当前 节点/行的数据
    fieRowTableData: {},
    // 保存历史记录
    tabMenu: {},
    // 所有挂靠路由地址
    navList: [],
    // 用户的基本信息
    userInfo: {},
    pageTreeData: {},
    functions: {},
    // 树 函数体
    treeFunctions: {},
    // 表单 函数体
    formFunctions: {},
    tabHistorys: {},
    // 每 行/节点 数据
    fieTableData: {},
    // 字典表 当前操作
    dicNowConf: '',
    // 操作配置
    confsBtn: '',
    // 配置模板表格选中项
    checkedData: [],
    // 每页展示多少条数据，以及当前是第几页
    paginations: {},
    // 保存模板配置项
    temConf: {},
    // 保存 排序字段
    sortData: {},
    // 保存 操作弹框配置
    operationDialogConf: {},
    // 模板配置自定义操作 记录日志
    customLog: {},
    // 查询条件
    searchData: {},
    // 布局数据
    tabData: {},
    // 新-记录日志参数 2019-09-11
    commitLogParams: {},
    // 新-视图函数体
    viewFunctions: {},
    // 所有弹框id
    dialogIds: [],
    // 当前弹框id
    currentDialogId: [],
    // 用于tab小红点功能
    // false 代表 tab中有小红点
    // true 代表 tab中没有小红点
    tabFlag: {},
    // 用于dialog小红点关闭确认功能
    // false 代表 关闭弹框时候需要二次确认框
    // true 代表 可以直接关闭弹框
    dialogFlag: {},
    // 表单弹框小红点
    formFlag: false,
    // 表单弹框小红点
    parameter: {},
    // Tab嵌套的tab行数据
    repetitionRowTabData: {},
    // 特殊分页索引数据
    specialIndex: {},
    // 树节点id
    treeId: '',
    // 判断是否存储当前行数据
    rowDataFlag: false,
    // 左右结构tab小红点
    treeCode: [],
    // 视图中的表格 列表的数据
    viewData: {},
    moveSort: {},
    // 树当前行数据
    fieTreeData: {},
    paramNum: 0,
    closeViewId: [],
    // 关闭列链接关闭viewID
    closeViewid: '',
    // 定时器ID
    setInterval: '',
    echartsList: []
  },
  getters: {
    getFunctions: state => state.functions,
    getFieTableData: state => state.fieTableData,
    getFieTreeData: state => state.fieTreeData
  },
  mutations: {
    saveEchartsEle (state, data) {
      state.echartsList.push(data)
    },
    getCloseViewid (state, data) {
      state.closeViewid = data
    },
    // 定时器ID
    getSetInterval (state, data) {
      state.setInterval = data
    },
    // 改变特殊数据
    changeSpecialIndex (state, data) {
      state.specialIndex[data.currentViewId] = data.data
    },
    getParameterData (state, data) {
      state.parameter[data[1]] = data[0]
    },
    getparamNum (state, data) {
      state.paramNum = data
    },
    getFormFlag (state, data) {
      state.formFlag = data
    },
    // 获取tab
    getTabFlag (state, data) {
      state.tabFlag[data[0]] = []
      for (let i = 0; i < data[1]; i++) {
        state.tabFlag[data[0]].push(true)
      }
    },
    // 修改tab组件中-tab标签页 对应的小红点flag
    modifyTabFlag (state, data) {
      state.tabFlag[data.currentTab][Number(data.currentLabel)] = data.unRedDot
    },
    // 修改弹框状态
    getDialogFlag (state, data) {
      state.dialogFlag[data[0]] = data[1]
    },
    // 存储 嵌套视图 行的数据
    nestTableRowData (state, data) {
      state.fieRowTableData[[data.viewid]] = data
    },
    // 存储  当前Tab页修改后的数据
    changeRowTabData (state, data) {
      state.rowTabData = data
    },
    // 存储  当前Tab页修改后的数据 以i_Id的值来区分嵌套弹框Tab数据， 防止数据被覆盖
    changeRepetitionRowTabData (state, data) {
      state.repetitionRowTabData[data.regin] = data
    },
    // 记录自定义操作提交 数据
    getSearchData (state, data) {
      state.searchData[data.currentViewId] = {}
      state.searchData[data.currentViewId].searchQuery = data.searchQuery
    },
    // 记录自定义操作提交 数据
    logParams (state, data) {
      state.customLog = data
    },
    // 保存 操作弹框配置
    getOperationDialogConf (state, data) {
      state.operationDialogConf = data
    },
    // 保存 排序字段
    getSortData (state, data) {
      state.sortData[data[0]] = data[1]
    },
    // 保存 处理tab小红点code
    saveTreeCode (state, data) {
      state.treeCode.push(data)
    },
    // 视图传参：分页、查询、排序
    modifypaginations (state, data) {
      let paginationObj = {}
      paginationObj.index = data.index
      paginationObj.size = data.size
      // 判断传入的参数有没有带排序字段
      if (data.hasOwnProperty('sortInfo')) {
        paginationObj.sortInfo = data.sortInfo
      }
      // 判断传入的参数有没有带 搜索字段
      if (data.hasOwnProperty('searchQuery')) {
        paginationObj.searchQuery = data.searchQuery
      }
      state.paginations[[data.currentViewId]] = paginationObj
    },
    // 保存 当前分页数据
    deletePaginations (state, data) {
      delete state.paginations[data]
    },
    // 保存 视图模板配置数据
    temConfs (state, data) {
      state.temConf[data.confView.viewid ? data.confView.viewid : data.confView.v_ViewID] = data
    },
    // 视图 每行数据
    rowData (state, data) {
      state.fieTableData = data
    },
    // 树形 每行数据
    treeData (state, data) {
      state.fieTreeData[data[0]] = data[1]
    },
    // 布局组件 tab的数据
    tabData (state, data) {
      state.tabData = data
    },
    // 视图中表格 table列表的数据
    viewData (state, data) {
      state.viewData[data.flagViewId] = data
    },
    // 视图布局中的 调序字段
    moveSort (state, data) {
      state.moveSort[data.viewId] = data
    },
    // 视图 当前操作
    nowConf (state, data) {
      state.dicNowConf = data
    },
    // 操作配置
    confBtn (state, data) {
      state.confsBtn = data
    },
    // 清空操作配置
    clearConfBtn (state, data) {
      state.confsBtn = ''
    },
    // 修改表格选中项
    modifyCheckedData (state, data) {
      state.checkedData = data
    },
    // 添加函数体（兼容旧版本）
    addFunction (state, params) {
      state.functions[params[1]] = params[0]
    },
    // 添加 树函数体
    addTreeFunction (state, params) {
      state.treeFunctions[params[1]] = params[0]
    },
    // 添加 表单函数体
    addFormFunction (state, params) {
      state.formFunctions[params[1]] = params[0]
    },
    // 获取 所有弹框的id
    getTreeId (state, id) {
      state.treeId = id
    },
    // 获取 所有弹框的id
    getRowDataFlag (state, params) {
      state.rowDataFlag = params
    },
    // 添加菜单
    addTabMenu (state, menuItem) {
      state.tabMenu[menuItem.path] = menuItem
      sessionStorage['history'] = JSON.stringify(state.tabMenu)
    },
    addTabLink (state, tabLink) {
      Vue.set(state.tabHistorys, [tabLink.path], tabLink)
      sessionStorage['historyList'] = JSON.stringify(state.tabHistorys)
    },
    removeTabLink (state, tabLink) {
      Vue.delete(state.tabHistorys, tabLink.path)
      sessionStorage['historyList'] = JSON.stringify(state.tabHistorys)
    },
    removeTabMenuItem (state, menuItem) {
      Vue.delete(state.tabMenu, menuItem.path)
      sessionStorage['history'] = JSON.stringify(state.tabMenu)
    },
    closeViewId (state, viewid) {
      state.closeViewId.push(viewid)
    },
    // 把三级菜单路由以及路由对应的页面名称存到state里面的navList中
    setNavListMap (state, list) {
      let routerMap = {}
      state.pageTreeData = list
      list.map(item => {
        // 如果是一级菜单
        if (item.pageurl) {
          routerMap[item.pageurl] = item
        } else {
          if (item.children) {
            // 这里的val是二级菜单
            item.children.map(val => {
              if (val.children) {
                val.children.map(data => {
                  if (data.pageurl) {
                    routerMap[data.pageurl] = data
                  }
                })
              }
            })
          }
        }
      })
      state.navList = routerMap
    },
    // 拿到 日志参数
    getLogParams (state, data) {
      state.commitLogParams.templateCode = data.templateCode || ''
      state.commitLogParams.templateId = data.templateId || ''
      // 操作名称
      state.commitLogParams.operationname = data.operationname || ''
      // 操作代码
      state.commitLogParams.operationcode = data.operationcode || ''
      // 页面id
      state.commitLogParams.pageid = data.pageid || ''
      // 页面名称
      state.commitLogParams.pagename = data.pagename || ''
    },
    // 保存视图函数
    getViewFuns (state, params) {
      let key = params[0]
      let val = params[1]
      state.viewFunctions[key] = val
    },
    // 获取 所有弹框的id
    getDialogIds (state, id) {
      !state.dialogIds.includes(id) && state.dialogIds.push(id)
    },
    // 获取 当前弹框的id
    getDialogId (state, id) {
      state.currentDialogId[0] = id
    },
    // 获取弹框的id
    removeDialogIds (state, id) {
      state.dialogIds.pop()
    },
    removeCloseViewId (state, viewId) {
      let num = state.closeViewId.indexOf(viewId)
      state.closeViewId.splice(num, 1)
    }
  },
  actions: {
    addTabMenu (context) {
      context.commit('addTabMenu')
    },
    addTabLink (context) {
      context.commit('addTabLink')
    },
    removeTabMenuItem (context) {
      context.commit('removeTabMenuItem')
    },
    rowData (context) {
      context.commit('rowData')
    },
    nowConf (context) {
      context.commit('nowConf')
    },
    confBtn (context) {
      context.commit('confBtn')
    }
  }
})
