import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
import { log } from 'util'
export default {
  data () {
    return {

    }
  },
  methods: {
    // configObj: {
    //   interfaceData: 接口返回的配置数据
    //   currentData: 当前 行/节点 的数据
    //   data: 当前 table/tree 数据
    // }
    buttonClick (configObj) {
      if (configObj.interfaceData) {
        // 把这个按钮配置项按钮相关信息存vuex
        this.$store.commit('confBtn', configObj.interfaceData)
      }
      if (configObj.currentData) {
        // 当前 行/节点 的数据 存到vuex
        if (configObj.interfaceData.operationcode !== 'move') {
          this.$store.commit('rowData', configObj.currentData)
        }
      }
      // 判断当前操作按钮的执行方式
      // linkflag   1 函数 2 弹框 0 页面链接
      if (configObj.interfaceData.linkflag === '1') {
        // 函数体需要的参数
        let params = {
          that: this,
          cgiService,
          currentData: configObj.currentData,
          data: configObj.data
        }
        // 拿到解析完的函数体
        let treeFunctions = this.$store.state.treeFunctions[configObj.interfaceData.treecode]
        // inFunctions：是否存在于编程接口函数中
        let inFunctions = false
        let funData = {}
        let currentFuncName = ''
        funData = util.methodSplit(configObj.interfaceData.func)
        // 去除前后空格
        let customFunctionName = funData.fncName.replace(/(^\s*)|(\s*$)/g, '')
        for (var key in treeFunctions) {
          if (key === customFunctionName) {
            currentFuncName = key
            inFunctions = true
          }
        }
        // 预定义按钮 直接执行 相关方法
        if (configObj.interfaceData.buttype === '1') {
          // 判断：如果在编程接口函数中存在 与 预定义函数 函数名相同的函数，优先执行编程接口函数 2019/12/20 David确认
          inFunctions ? treeFunctions[currentFuncName](params) : this[configObj.interfaceData.func]()
        } else if (configObj.interfaceData.buttype === '2') {
          // 自定义按钮
          this.$store.commit('nowConf', funData.fncName)
          if (inFunctions) {
            // 函数自调用
            treeFunctions[currentFuncName](params)
          } else if (this.hasOwnProperty(customFunctionName)) {
            // 如果自定义按钮的函数名，在编程接口中没有找到对应的执行方法，判断当前vue实例中有没有对应的方法【就是相当于预定义按钮】，如果有就执行
            this[customFunctionName]()
          } else {
            return this.$message.warning('操作按钮方法名无效')
          }
        }
      } else if (configObj.interfaceData.linkflag === '2') {
        // 行内操作 直接赋值
        // 系统操作 需要进行传值
        this.btnConfigData.v_Code = configObj.interfaceData.code
        this.btnConfigData.v_CateCode = configObj.interfaceData.catecode
        this.btnConfigData.i_Cate = configObj.interfaceData.cate
        this.btnConfigData.operationcode = configObj.interfaceData.operationcode
        this.showTreeDialog(true)
      } else if (configObj.interfaceData.linkflag === '0') {
        // 页面链接
        if (configObj.interfaceData.linkpage.includes('http://') || configObj.interfaceData.linkpage.includes('https://')) {
          window.open(configObj.interfaceData.linkpage)
        } else {
          this.$message.warning('链接地址格式不正确')
        }
      }
    }
  }
}
