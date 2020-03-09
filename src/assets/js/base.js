import Bus from '@/assets/js/bus.js'
import { API } from '@/api/basic'
import Sortable from 'sortablejs'
import logMixin from '@/common/js/mixins/getLogParams'
export const mixin = {
  data () {
    return {
      funcName: '',
      flag: true,
      API,
      viewID: '',
      // 排序完之后的数组
      sortData: [],
      defaultSort: {},
      // 自适应弹框高度数据
      dialogConf: {},
      isMagnify: true
    }
  },
  mixins: [logMixin],
  created () {
    if (this.$store.state.confsBtn) {
      let resConfigData = this.$store.state.confsBtn
      this.viewID = resConfigData.viewid
    } else {
      this.viewID = this.$route.params.viewid
    }
    Bus.$on('sortDataOld', res => {
      this.sortData = res
    })
  },
  methods: {
    // 视图按钮点击事件
    findFunc (val, data, rowIndex, tableData) {
      // 存日志需要的参数【方法在mixins中】
      this.saveLogParams(val)
      if (data) {
        // 把表格当前行的数据存到vuex
        this.$set(data, 'viewid', val.viewid)
        this.$store.commit('nestTableRowData', data)
        this.$store.commit('rowData', data)
      } else {
        let data = {}
        this.$set(data, 'viewid', val.viewid)
        this.$store.commit('nestTableRowData', data)
      }
      // 把这个按钮配置项按钮相关信息存vuex
      if (typeof val === 'object') {
        this.$store.commit('confBtn', val)
      }
      // 旧的配置接口走的是小写字段
      if (val.linkflag) {
        // 判断当前操作按钮的执行方式
        // linkflag   1 函数 2 弹框 0 页面链接
        if (val.linkflag === '1') {
          // 拿到解析完的函数体
          let viewFunctions = this.$store.state.viewFunctions[val.viewid]
          // 如果是行内
          if (val.type === '2') {
            let arr = []
            // 把行数据加到vuex
            arr.push(data)
            // 把行数据加到组件data
            this.checkSelectData = arr
          }
          // 定义好函数执行需要的参数
          let params = {
            that: this,
            data,
            rowIndex,
            tableData
          }
          let funData = {}
          if (!val.func) return this.$message.warning('操作按钮函数名为空')
          funData = this.methodSplit(val.func)
          // 去除前后空格
          let customFunctionName = funData.fncName.replace(/(^\s*)|(\s*$)/g, '')
          // inFunctions：是否存在于编程接口函数中
          let inFunctions = false
          let currentFuncName = ''
          for (var key in viewFunctions) {
            if (key === customFunctionName) {
              currentFuncName = key
              inFunctions = true
            }
          }
          // 预定义按钮 直接执行 相关方法
          if (val.buttype === '1') {
            // 判断：如果在编程接口函数中存在 与 预定义函数 函数名相同的函数，优先执行编程接口函数 2019/12/20 David确认
            inFunctions ? viewFunctions[currentFuncName](params) : this[val.func]()
          } else if (val.buttype === '2') {
            // 自定义按钮
            this.$store.commit('nowConf', funData.fncName)
            if (inFunctions) {
              // 函数自调用
              viewFunctions[currentFuncName](params)
            } else if (this.hasOwnProperty(customFunctionName)) {
              // 如果自定义按钮的函数名，在编程接口中没有找到对应的执行方法，判断当前vue实例中有没有对应的方法【就是相当于预定义按钮】，如果有就执行
              this[customFunctionName]()
            } else {
              return this.$message.warning('操作按钮方法名无效')
            }
          }
        } else if (val.linkflag === '2') {
          this.$set(this.btnConfigData, 'v_Code', val.code)
          this.$set(this.btnConfigData, 'v_CateCode', val.catecode)
          this.$set(this.btnConfigData, 'i_Cate', val.cate)
          this.$set(this.btnConfigData, 'operationcode', val.operationcode)
          this.$set(this.btnConfigData, 'keys', Math.ceil(Math.random() * 10))
          this.$emit('buttonConfig', this.btnConfigData)
          this.$emit('getButtonConfig', true)
        } else if (val.linkflag === '0') {
          // 页面链接
          if (val.linkpage.includes('http://') || val.linkpage.includes('https://')) {
            window.open(val.linkpage)
          } else {
            this.$message.warning('链接地址格式不正确')
          }
        }
      }
    },
    // 处理列类名
    specialcColFoo (params, funcName) {
      let funObj = this.$store.getters.getFunctions
      for (var key in funObj) {
        if (key === funcName) {
          return funObj[key](params)
        }
      }
    },
    // 索引分页不断
    indexMethod (index) {
      let param = this.$store.state.paginations
      // 如果当前页 为0 就让 当前页等于1
      // 不然运算会出错
      if (param.index - 1 < 0) {
        param.index = 1
      }
      if (param.index && param.size) {
        return (param.index - 1) * param.size + index + 1
      } else {
        return index + 1
      }
    },
    // 函数名和参数分割 function(data1,data1)
    methodSplit (data) {
      let obj = {}
      // 判断：如果传过来的参数没有带( ) 就证明没有带参数传过来
      if (Boolean(data.indexOf('(') !== -1) && Boolean(data.indexOf(')')) !== -1) {
        let fncName = data.split('(')[0]
        let fncArguments = []
        // 判断：如果带了括号，但是括号里面没值  就不往下执行
        if (data.split('(')[1]) {
          fncArguments = data.split('(')[1].replace(')', '').replace(/'/g, '').split(',')
        }
        obj.fncName = fncName
        obj.fncArguments = fncArguments
      } else {
        obj.fncName = data
      }
      return obj
    },
    // 把数组 字符串转化为 标准数字数组
    transformArr (str) {
      let arr = []
      let newArr = str.replace('[', '').replace(']', '').split(',')
      newArr.forEach(val => {
        arr.push(Number(val))
      })
      return arr
    },
    // 表格行拖动 (要拖动元素的父元素，数据)
    dragMethods (ele, data) {
      if (ele) {
        let that = this
        // 初始化拖Sortable.js插件
        Sortable.create(ele, {
          // 是否排序
          sort: true,
          // 拖动的延迟
          animation: 100,
          // 拖动结束事件
          onEnd: function (val) {
            // 把拖动的元素从原来索引中获取出来, 在插入新数组中  从新索引插入
            let newArry1 = []
            newArry1 = data.splice(val.oldIndex, 1)
            data.splice(val.newIndex, 0, newArry1[0])
            let newArry3 = data
            // 赋值前 先清空数组
            data = []
            // 进行赋值
            that.$nextTick(function () {
              data = newArry3
            })
          }
        })
      } else {
        this.$message.warning('元素获取失败')
      }
    },
    // 标准化排序
    commitSort () {
      let newArray = []
      this.sortData.forEach(val => {
        newArray.push(val.i_Id)
      })
      // 兼容传参数是  空数组  提交接口报错
      if (newArray.length !== 0) {
        // 获取需要传的数据
        let logParams = this.getLogParams()
        let resConfigData = this.$store.state.confsBtn
        this.viewID = resConfigData.viewid
        API.post('InterfaceGrid/sortData/' + this.viewID, { ids: newArray, logParams }).then(res => {
          if (!res.code) {
            this.shareData.formRed = false
            this.$message.success(res.msg)
            let param = this.$store.state.paginations[this.viewID]
            this.$parent.getTableData(param)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 导出
    exportData () {
      if (this.$store.state.confsBtn) {
        // this.viewID = JSON.parse(sessionStorage['refreshPageData']).viewid
        let resConfigData = this.$store.state.confsBtn
        this.viewID = resConfigData.viewid
      } else {
        this.viewID = this.$route.params.viewid
      }
      let params = []
      // 获取 导出选中的数据
      var ids = []
      var modelArr = ''
      let checkedData = this.checkSelectData
      if (checkedData.length > 0) {
        checkedData.forEach(val => {
          ids.push(val.i_Id)
        })
        // 获取到ids字符串
        var idStr = 'ids=' + ids.join(',')
        if (ids.length > 0) { params.push(idStr) }
      }
      // 获取 查询条件
      if (JSON.stringify(this.$store.state.searchData) !== '{}') {
        modelArr = this.$store.state.searchData.modelArr
        // 判断是不是空数组
        if (JSON.parse(modelArr).length > 0) {
          modelArr = 'modelArr=' + this.$store.state.searchData.modelArr
          params.push(modelArr)
        }
      }
      // 获取需要 记录日志的数据
      let logParamsObj = this.getLogParams()
      let logParamsStr = ''
      let logParamsArr = []
      for (var key in logParamsObj) {
        logParamsArr.push('logParams.' + key + '=' + logParamsObj[key])
      }
      logParamsStr = logParamsArr.join('&')
      params.push(logParamsStr)
      // 获取 排序
      let paginations = this.$store.state.paginations
      if (paginations.hasOwnProperty('sortBy')) {
        let sortByStr = 'sortBy=' + paginations.sortBy
        params.push(sortByStr)
      }
      // 获取 排序字段名
      if (paginations.hasOwnProperty('sortColumn')) {
        let sortColumn = 'sortColumn=' + paginations.sortColumn
        params.push(sortColumn)
      }
      window.open(API.defaults.baseURL + 'InterfaceGrid/exportApi/' + this.viewID + '?' + params.join('&'))
      // 导出示例：
      // xxx.com/viewId?logParams.pageid = ? & logParams.pagename =?& logParams.operationid = ? & logParams.operationcode =? &  logParams.operationname = ? & modelArr =  ? & ids = ?,?
    },
    // 删除
    del () {
      if (this.$store.state.confsBtn) {
        // this.viewID = JSON.parse(sessionStorage['refreshPageData']).viewid
        let resConfigData = this.$store.state.confsBtn
        this.viewID = resConfigData.viewid
      } else {
        this.viewID = this.$route.params.viewid
      }
      var ids = []
      let checkedData = this.checkSelectData
      // console.log(checkedData)
      if (!checkedData.length) {
        this.$message.warning('没有选中数据，请重试')
        return
      }
      checkedData.forEach(val => {
        ids.push(val.i_Id)
      })
      // 获取需要传的数据
      let logParams = this.getLogParams()
      this.$confirm('确定要删除此条数据?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'error'
      }).then(() => {
        this.viewID = this.viewID ? this.viewID : this.$store.state.confsBtn.viewid
        API.post('InterfaceGrid/deleteData/' + this.viewID, { ids, logParams }).then(res => {
          if (!res.code) {
            this.$message.success(res.msg)
            // 如果成功删除  需要重新调用接口
            // 先拿到当前分页数据
            let param = this.$store.state.paginations[this.viewID]
            this.$set(param, 'viewid', this.$store.state.fieRowTableData[this.viewID].viewid)
            this.$parent.getTableData(param)
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        // this.$store.commit('modifyCheckedData', [])
      })
    },
    // 设置合计行高度
    setSum () {
      // 设置合计行 位置
      // table总高度
      if (document.getElementsByClassName('el-table contentTable')[0]) {
        this.sumRowHeight = document.getElementsByClassName('el-table contentTable')[0].offsetHeight
      }
      // 默认表头高度
      let defaultHeaderHeight = 0
      if (document.querySelector('.el-table.contentTable .el-table__header-wrapper')) {
        defaultHeaderHeight = document.querySelector('.el-table.contentTable .el-table__header-wrapper').offsetHeight
      }
      // 表格底部高度
      let defaultTfootHeight = 0
      if (document.querySelector('.el-table.contentTable .el-table__footer-wrapper')) {
        defaultTfootHeight = document.querySelector('.el-table.contentTable .el-table__footer-wrapper').offsetHeight
      }
      // 表格内容
      let defaultTbodyHeight = document.querySelector('.el-table.contentTable .el-table__body-wrapper')
      defaultTbodyHeight.style.height = this.sumRowHeight - defaultHeaderHeight - defaultTfootHeight + 'px'
      defaultTbodyHeight.style.zIndex = 1
    },
    // 弹框配置项
    confTemDia (params) {
      // 视口高度
      let bodyHeight = document.body.clientHeight
      // 弹框
      let elDialog = document.querySelector('.confDialog .el-dialog')
      // 设置弹框的宽度
      elDialog.style.width = params.width + 'px'

      // 固定高度
      if (params.isFixation === '1') {
        // 判断：
        // 1、打开弹框时候 视口的高度 <= 弹框的高度
        //    设置弹框  为marign 0 auto；去除定位
        // 2、打开弹框时候 视口的高度 > 弹框的高度
        //    设置弹框  垂直居中，去除margin
        if (bodyHeight <= params.height) {
          elDialog.style.margin = '0 auto'
          elDialog.style.left = 'auto'
          elDialog.style.top = 'auto'
          elDialog.style.transform = 'none'
        } else {
          elDialog.style.margin = '0'
          elDialog.style.left = '50%'
          elDialog.style.top = '50%'
          elDialog.style.transform = 'translate(-50%, -50%)'
        }
        // elDialog.style.height = params.height + 'px'
        // 如果弹框内是表格
        if (params.table === '1') {
          this.$nextTick(() => {
            this.confTableHeight = params.height - params.toolsHeight - 25 + 'px'
          })
        } else {
          if (params.contentHeight !== null) {
            params.contentHeight.style.height = params.height - params.toolsHeight - 12 + 'px'
          }
        }
      } else if (params.isFixation === '0') {
        // 判断：
        // 1、刚打开弹框的时候  视口高度 <= 设置的最小高
        //    设置弹框  为marign 0 auto；去除定位
        // 2、刚打开弹框的时候  设置的最小高 <= 视口高度 <= 设置的最小高 + 80 + 80
        //    设置弹框  垂直居中，去除margin
        // 3、刚打开弹框的时候  视口高度 >= 设置的最小高 + 80 + 80
        //    设置弹框  margin 上下80去除定位
        if (bodyHeight <= params.minHeight) {
          elDialog.style.margin = '0 auto'
          elDialog.style.left = 'auto'
          elDialog.style.top = 'auto'
          elDialog.style.transform = 'none'
          // 如果弹框内是表格
          if (params.table === '1') {
            this.$nextTick(() => {
              this.confTableHeight = params.minHeight - params.toolsHeight - 25 + 'px'
            })
          } else {
            elDialog.style.height = params.minHeight + 'px'
            params.contentHeight.style.height = params.minHeight - params.toolsHeight - 12 + 'px'
          }
        } else if (bodyHeight <= (params.minHeight + 160)) {
          elDialog.style.margin = '0'
          elDialog.style.left = '50%'
          elDialog.style.top = '50%'
          elDialog.style.transform = 'translate(-50%, -50%)'
          // 如果弹框内是表格
          if (params.table === '1') {
            this.$nextTick(() => {
              this.confTableHeight = params.minHeight - params.toolsHeight - 25 + 'px'
            })
          } else {
            elDialog.style.height = params.minHeight + 'px'
            params.contentHeight.style.height = params.minHeight - params.toolsHeight - 12 + 'px'
          }
        } else if (bodyHeight > (params.minHeight + 160)) {
          elDialog.style.margin = '0'
          elDialog.style.left = '50%'
          elDialog.style.top = '50%'
          elDialog.style.transform = 'translate(-50%, -50%)'
          // 如果弹框内是表格
          if (params.table === '1') {
            this.$nextTick(() => {
              this.confTableHeight = 'calc(100vh - ' + (160 + params.toolsHeight + 25) + 'px)'
            })
          } else {
            elDialog.style.height = 'calc(100vh - ' + 160 + 'px)'
            params.contentHeight.style.height = 'calc(100vh - ' + (160 + params.toolsHeight + 5) + 'px)'
          }
        }
      }
    },
    // 弹框放大缩小
    changeSize () {
      let params = this.$store.state.operationDialogConf
      // 放大状态
      if (this.isMagnify && params.maxSize === '1') {
        // 获取 弹框元素
        let elDialog = document.querySelector('.confDialog .el-dialog')
        // 获取 内容视图元素
        let innerContent = document.querySelector('.inner-content')
        let innerContentData = innerContent.getBoundingClientRect()
        elDialog.style.width = innerContentData.width + 'px'
        elDialog.style.left = innerContentData.left + 'px'
        elDialog.style.top = innerContentData.top + 'px'
        elDialog.style.margin = '0'
        elDialog.style.transform = 'none'
        // 如果弹框内是表格
        if (params.table === '1') {
          this.$nextTick(() => {
            this.confTableHeight = 'calc(100vh - ' + (innerContentData.top + params.toolsHeight + 30) + 'px)'
          })
          params.contentHeight.style.height = 'calc(100vh - ' + (innerContentData.top + params.toolsHeight + 30) + 'px)'
        } else {
          elDialog.style.height = 'calc(100vh - ' + innerContentData.top + 'px)'
          params.contentHeight.style.height = 'calc(100vh - ' + (innerContentData.top + params.toolsHeight + 15) + 'px)'
        }
        this.isMagnify = false
      } else {
        // 缩小状态
        this.confTemDia(params)
        this.isMagnify = true
      }
      sessionStorage.setItem('flag', this.isMagnify)
    },
    resizeDia () {
      // 判断 1、放大：视口高度变化的时候，弹框放大之后也要跟着变化
      //      2、缩小：视口高度变化的时候，弹框跟着变化
      let flag = sessionStorage.getItem('flag')
      // 如果为true 那就是缩小状态
      if (flag === 'true') {
        let params = this.$store.state.operationDialogConf
        this.confTemDia(params)
      } else {
        // 放大状态
        let params = this.$store.state.operationDialogConf
        // 获取 弹框元素
        let elDialog = document.querySelector('.confDialog .el-dialog')
        // 获取 内容视图元素
        let innerContent = document.querySelector('.inner-content')
        let innerContentData = innerContent.getBoundingClientRect()
        if (elDialog) {
          elDialog.style.width = innerContentData.width + 'px'
          elDialog.style.left = innerContentData.left + 'px'
          elDialog.style.top = innerContentData.top + 'px'
          elDialog.style.transform = 'none'
        }

        // 判断：（待确认）
        // 1、视口的高度 - innerContentData.top <= 设置的最小高
        //    设置弹框  垂直居中
        // 1、视口的高度 <= 设置的最小高
        //    设置弹框  垂直居中

        // 如果弹框内是表格
        if (params.table === '1') {
          params.contentHeight.style.height = 'calc(100vh - ' + (innerContentData.top + params.toolsHeight + 30) + 'px)'
        } else {
          if (elDialog) elDialog.style.height = innerContentData.height + 'px'
        }
      }
    }
  }
}
