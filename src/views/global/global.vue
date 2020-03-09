<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-11 14:27:12
 * @LastEditTime: 2019-09-16 11:27:43
 * @LastEditors: Please set LastEditors
 -->
<script>
// 组件暂不确定 是否用到   确认
import cgiService from '@/api/cgiService'
import Vue from 'vue'

// 获取当前用户  在当前页面的操作权限
const getPageId = function (_this) {
  let pageId = ''
  setTimeout(() => {
    pageId = localStorage['pageid']
    // 获取用户管理权限接口
    cgiService.getUserJurisdiction(pageId).then(res => {
      if (!res.code) {
        _this.opretion = res.opretion
        _this.opretion.map((item, index) => {
          if (item.operationcode === 'add') {
            _this.addObj = item
          } else if (item.operationcode === 'modify') {
            _this.modifyObj = item
          } else if (item.operationcode === 'del') {
            _this.delObj = item
          } else if (item.operationcode === 'search') {
            _this.searchObj = item
          } else if (item.operationcode === 'commit') {
            _this.commitObj = item
          } else if (item.operationcode === 'authPage') {
            _this.authPageObj = item
          } else if (item.operationcode === 'userList') {
            _this.userListObj = item
          } else if (item.operationcode === 'roles') {
            _this.rolesObj = item
          } else if (item.operationcode === 'syncCache') {
            _this.synCashe = item
          }
        })
      }
    })
  }, 200)
}

// 把传入的字符串解析成为函数体
const getFnc = function (parameter) {
  let viewFuncObj = {}
  if (gettype(parameter.data) === 'Array') {
    parameter.data.forEach(val => {
      for (var key in val) {
        let obj = {}
        eval('obj.' + key + ' = ' + val[key])
        // 把方法体注入到实例中
        // Vue.set(temP, key, obj[key])
        parameter.that.$store.commit('addFunction', [key, obj[key]])
        viewFuncObj[key] = obj[key]
      }
    })
  }

  parameter.that.$store.commit('getViewFuns', [parameter.viewCode, viewFuncObj])
}

// 判断数据类型
const gettype = function (obj) {
  var type = typeof obj
  // 如果不是object类型的数据，直接用typeof就能判断出来
  if (type !== 'object') {
    return type
  } else {
    // 如果是object类型数据，准确判断类型必须使用Object.prototype.toString.call(obj)的方式才能判断
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
  }
}

// 保留两位小数并每三位加逗号
function number (data) {
  if (data != null) {
    return data.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
  } else {

  }
}
// 保留两位小数
function percent (data, num) {
  if (data != null) {
    return Number(data).toFixed(num)
  } else {

  }
}
// Number公共方法
function numberCommon (type, data, format) {
  // 如果是需要转换为千分位并保留小数位
  if (format === '0,000.00' || format === '0,000.000') {
    let lengNum = format.split('.')[1].length
    return number(data, lengNum)
  } else if (format === '0.00' || format === '0.000') {
    // 获取是保留几位小数
    let lengNum = format.split('.')[1].length
    return percent(data, lengNum)
  } else if (format.indexOf('Math') >= 0) {
    let way = format.split('Math.')[1].replace('()', '')
    return Math[way](data)
  } else if (format === '[0]') {
    // 如果是'[0]' 这一值为0的就不显示
    return String(data) === '0' ? '' : data
  }
}
// String封装公共方法
function stringCommon (type, data, format) {
  // 如果是数字才 转换
  if (!Number(data)) {
    return data
  }
  if (format.indexOf('+=') >= 0) {
    data += format.replace('+=', '')
    return data
  } else if (format.split('(')[0] === 'substring') {
    let arr = format.split('(')[1].replace(')', '').split(',')
    return data[format.split('(')[0]](arr[0], arr[1])
  }
}
// 处理格式化串
const formatData = function (type, data, format) {
  switch (type) {
    case 'Number':
      // 数据类型
      return numberCommon(type, data, format)
    case 'date' || 'time' || 'datetime':
      // ---日期类型
      return this.$moment(data).format(format)
    case 'String':
      // ---字符串类型
      return stringCommon(type, data, format)
    case 'default':
      // ---默认显示
      return data

    default:
      break
  }
}
export default {
  getPageId,
  getFnc,
  gettype,
  formatData
}
</script>
