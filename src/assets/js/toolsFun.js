import Bus from '@/assets/js/bus.js'
import { API } from '@/api/basic'
import logMixin from '@/common/js/mixins/getLogParams'
export const toolsFun = {
  data () {
    return {
      API,
      viewID: '',
      // 排序完之后的数组
      sortData: [],
      // 传递按钮的配置项 后续根据配置项调取接口
      btnConfigData: {
        i_Cate: '',
        operationcode: '',
        v_CateCode: '',
        v_Code: ''
      }
    }
  },
  mixins: [logMixin],
  created () {
    Bus.$on('sortDataOld', res => {
      this.sortData = res
    })
  },
  methods: {
    // 视图按钮点击事件
    toolsFunc (val, data, rowIndex, tableData) {
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
          this.$emit('toolsButtonConfig', this.btnConfigData)
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
    }

  }
}
