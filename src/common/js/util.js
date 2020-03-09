
function initFormData (targetObj, sourceObj) {
  // console.log(targetObj)
  let keys = Object.keys(targetObj)
  keys.forEach(key => {
    targetObj[key] = sourceObj[key] || ''
  })
};

/**
 * @description: 根据传入的DOM改变传入的数据
 * @param
 * dom<String>:被拖拽的dom，
 * styleObj<Object>:一个style描述对象,
 * @return: void
 */
function drapUtils (dom, styleObj = {}, flag = true) {
  dom.onmousedown = (e) => {
    let widthX = e.clientX
    let heightX = e.clientY
    let originalWidth = styleObj.width || 0
    let originalHeight = styleObj.height || 0
    e.preventDefault()
    // document.body.onselectstart = document.body.ondrag = function () {
    //     e.preventDefault()
    //     return false
    // }
    let div = document.createElement('div')
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.position = 'fixed'
    div.style.zIndex = '9999'
    div.style.top = '0'
    div.style.left = '0'
    document.body.appendChild(div)
    div.onmousemove = function (e) {
      div.style.display = 'block'
      e.preventDefault()
      div.addEventListener('mouseleave', function (e) {
        if (e.clientX > window.innerWidth || e.clientX < 0 || e.clientY < 0 || e.clientY > window.innerHeight) {
          div.onmouseup(e)
        } else {
        }
      })
      if (flag) {
        let changeWidth = Math.round(e.clientX - widthX)
        if (changeWidth <= -originalWidth) {
          styleObj.width = 0
        } else {
          styleObj.width = originalWidth + changeWidth
        }
        let changeHeight = Math.round(e.clientY - heightX)
        if (changeHeight <= -originalHeight) {
          styleObj.height = 0
        } else {
          styleObj.height = originalHeight + changeHeight
        }
      } else {
        let changeWidth = Math.round(widthX - e.clientX)
        if (changeWidth <= -originalWidth) {
          styleObj.width = 0
        } else {
          styleObj.width = originalWidth + changeWidth
        }
        let changeHeight = Math.round(e.clientY - heightX)
        if (changeHeight <= -originalHeight) {
          styleObj.height = 0
        } else {
          styleObj.height = originalHeight + changeHeight
        }
      }
    }
    div.onmouseup = function (e) {
      div.onmousemove = null
      e.preventDefault()
      e.stopPropagation()
      // document.body.removeChild(div)
      div.style.display = 'none'
    }
  }
  // document.onmouseup = function (e) {
  //   document.onmousemove = null
  //   // // 拖动结束后是的文字可以选中
  //   // document.body.onselectstart = document.body.ondrag = function () {
  //   //     return true
  //   // }
  // }
}

/**
 * @description: 根据cate映射不同组件，再根据俄catecode找到不同的组件类型
 * @param {
 *    configData<Object> : configData
 * }
 * @return: <String>
 *
 */
function transCompName (configData) {
  switch (configData.v_CateCode) {
    case 'CC_VW':
      // return configData.v_TemplateCode
      // 如果弹框中是  视图组件
      return 'standardTable'
    case 'CC_FM':
      // 如果弹框中是  表单组件
      return 'standardForm'
    case 'CC_TR':
      // 如果弹框中是  树 组件
      return 'standardTree'
    case 'CC_ET':
      // 如果弹框中是  图标 组件
      return 'standardEcharts'
      // tabs标签页
    case 'CR_TAB':
      return 'tabsAction'
      // 左右
    case 'CR_LF':
      return 'layoutLeftRight'
      // 上下
    case 'CR_UD':
      return 'layoutUpDown'
      // 左中右
    case 'CR_LMR':
      return 'layoutLeftCenterRight'
      // 左上下
    case 'CR_LUD':
      return 'layoutLeftUpDown'
      // 上下右
    case 'CR_UDR':
      return 'layoutUpDownRight'
    case 'CT':
      // 自定义内容组件名称
      return 'custom'
    default:
      break
  }
}

/**
 * @description: 根据cate映射不同组件，再根据俄catecode找到不同的组件类型
 * @param {
 *    configData<Object> : configData
 * }
 * @return:<String>
 *
 */
function transContentCompName (contentName) {
  switch (contentName) {
    case 'viewStandard':
      return 'viewStandard'
    case 'viewCustomHeight':
      return 'viewCustomHeight'
    case 'viewSpecificLazyTable':
      return 'viewSpecificLazyTable'
    default:
      break
  }
}

/**
 * @description: 根据传入的catecode映射到不同的自定义内容组件
 * @param {String}
 * @return: String
 */
function transCustomCompName (cateCode) {
  switch (cateCode) {
    //    配置管理 - 字典表添加修改
    case 'modAddDic':
      return 'modAddDic'
    //    配置管理 - 数据字典 - 关联表
    case 'correlationForm':
      return 'correlationForm'
  }
}

/**
 * @description: 根据传入的catecode映射到不同的表单组件
 * @param {String}
 * @return: String
 */
function transFormCompName (cateCode) {
  switch (cateCode) {
    // 数据字典 - 字典表添加修改 内容
    case 'modAddDic':
      return 'modAddDic'
    // 数据字典 - 关联表 内容
    case 'correlationForm':
      return 'correlationForm'
    // 页面管理 页面操作按钮修改弹框
    case 'pageOperation':
      return 'pageOperation'
    // 组织机构右侧查看表单
    case 'orgListForm':
      return 'orgListForm'
    // 组织机构右侧查看表单
    case 'newOrgListForm':
      return 'newOrgListForm'
    // 组织机构新增弹框表单
    case 'orgAddForm':
      return 'orgAddForm'
    // 个人信息表单
    case 'userInfoForm':
      return 'userInfoForm'
    // 修改个人信息表单
    case 'modifyUserInfo':
      return 'modifyUserInfo'
    // 修改用户密码表单
    case 'modifyUserPassword':
      return 'modifyUserPassword'
    // 修改系统参数表单
    case 'addModifyParameter':
      return 'addModifyParameter'
    // 修改组织参数表单
    case 'addModifyOrgParameter':
      return 'addModifyOrgParameter'
    // 修改组织参数组
    case 'orgParameterSet':
      return 'orgParameterSet'
    // 修改个人参数表单
    case 'addModifyPerParameter':
      return 'addModifyPerParameter'
    // 修改组件参数表单
    case 'addModifyComParameter':
      return 'addModifyComParameter'
    // 修改接口参数表单
    case 'addModifyApiParameter':
      return 'addModifyApiParameter'
    // 修改个人参数组
    case 'perParameterSet':
      return 'perParameterSet'
    // 修改实例参数组
    case 'comParameterSet':
      return 'comParameterSet'
    // 添加/修改个参数组基本信息表单
    case 'parameterSetInfo':
      return 'parameterSetInfo'
    // 添加/修改个参数组表单
    case 'addModifyParameterSet':
      return 'addModifyParameterSet'
    // 添加/修改个参数组表单
    case 'setParameterSet':
      return 'setParameterSet'
      // 复制参数组功能表单
    case 'copyParamterGroup':
      return 'copyParamterGroup'
    // 添加/修改视图配置-基本信息表单
    case 'infoTabView':
      return 'infoTabView'
    // 添加/修改视图配置-添加基础字段-基本信息表单
    case 'baseInfoFiledView':
      return 'baseInfoFiledView'
    // 添加/修改视图配置-添加基础字段-权限信息表单
    case 'purviewFiledView':
      return 'purviewFiledView'
    // 添加/修改视图配置-添加基础字段-特殊列表单
    case 'specialRowFiledView':
      return 'specialRowFiledView'
    // 添加/修改视图配置-添加计算字段-公式表单
    case 'countFormulaFiledView':
      return 'countFormulaFiledView'
    // 添加/修改视图配置-批量添加
    case 'volumeAddFiledView':
      return 'volumeAddFiledView'
    // 添加/修改视图配置-视图配置表单
    case 'layoutView':
      return 'layoutView'
    // 添加视图配置-枚举类型表单
    case 'enumTypeAddForm':
      return 'enumTypeAddForm'
    // 添加 视图配置-枚举列表表单
    case 'enumListAddForm':
      return 'enumListAddForm'
    // 添加 视图配置-枚举值
    case 'enumValueAddForm':
      return 'enumValueAddForm'
    // 添加/修改视图配置-视图操作表单
    case 'operationsView':
      return 'operationsView'
    // 添加/修改视图配置-视图操作表单
    case 'pagingConfigView':
      return 'pagingConfigView'
    // 添加/修改视图配置-视图编程表单
    case 'functionsApi':
      return 'functionsApi'
    // 添加/修改视图配置-视图组件参数
    case 'addModifyComParView':
      return 'addModifyComParView'
    // 添加/修改视图配置-表单组件参数
    case 'comParameter':
      return 'comParameter'
    // 添加/修改视图配置-树形组件参数
    case 'comParameterTree':
      return 'comParameterTree'
    // 差旅管理-差旅查询区域
    case 'travelSearch':
      return 'travelSearch'
    // 差旅管理-新增差旅申请
    case 'addTravelApply':
      return 'addTravelApply'
    // 差旅管理-差旅查看Info
    case 'infoTravel':
      return 'infoTravel'
      // 业务类别表单
    case 'businessAddForm':
      return 'businessAddForm'
      // 业务类别详情表单
    case 'businessListForm':
      return 'businessListForm'
      // 用户分组 - 左中右布局  的我的分组  自定义组件
    case 'customGroupCate':
      return 'customGroupCate'
      // 用户分组 - 添加/修改用户分组
    case 'addModifyGroup':
      return 'addModifyGroup'
      // 用户分组 - 添加用户成员
    case 'addModifyUserForm':
      return 'addModifyUserForm'
      // 添加/修改 表单组件 - 基本信息
    case 'infoTabForm':
      return 'infoTabForm'
      // 添加/修改 表单组件 - 操作按钮
    case 'optionsFormTab':
      return 'optionsFormTab'
      // 添加/修改 表单组件 - 编程接口
    case 'funFormApi':
      return 'funFormApi'
      // 弹框容器 - 基本信息表单
    case 'infoTabDialog':
      return 'infoTabDialog'
      // 弹框容器 - 弹框样式表单
    case 'styleTabDialog':
      return 'styleTabDialog'
      // 树形组件 - 基本信息表单
    case 'infoTabTree':
      return 'infoTabTree'
      // 树形组件 - 树形布局表单
    case 'layoutTabTree':
      return 'layoutTabTree'
      // 树形组件 - 编程接口表单
    case 'functionTabTree':
      return 'functionTabTree'
      // 树形组件 - 添加/修改基础字段
    case 'modifyAddBasicsField':
      return 'modifyAddBasicsField'
      // 树形组件 - 添加/修改 字段-基本
    case 'treeFields':
      return 'treeFields'
      // 树形组件 - 添加/修改计算字段-公式
    case 'countColumFormula':
      return 'countColumFormula'
      // 树形组件 - 字段设置 - 批量添加
    case 'volumeAddColum':
      return 'volumeAddColum'
      // 树形组件 - 节点设置 - 基本信息
    case 'treeNodeInfo':
      return 'treeNodeInfo'
      // 树形组件 - 节点设置 - 特殊节点
    case 'treeSpecialNode':
      return 'treeSpecialNode'
      // 树形组件 -操作按钮
    case 'treeOperationTab':
      return 'treeOperationTab'
      // 布局组件 - tab表单
    case 'layoutTabsInfo':
      return 'layoutTabsInfo'
      // 布局组件 - tab页修改表单
    case 'addModifyTabs':
      return 'addModifyTabs'
      // 布局组件 - tab页修改权限
    case 'layoutTabsPower':
      return 'layoutTabsPower'
      // 布局组件 - 左右修改表单
    case 'layoutLeftRight':
      return 'layoutLeftRight'
      // 布局组件 - 上下修改表单
    case 'layoutUpDown':
      return 'layoutUpDown'
      // 布局组件 - 左中右修改表单
    case 'layoutLeftCenterRight':
      return 'layoutLeftCenterRight'
      // 布局组件 - 左上下修改表单
    case 'layoutLeftUpDown':
      return 'layoutLeftUpDown'
      // 布局组件 - 上下右修改表单
    case 'layoutUpDownRight':
      return 'layoutUpDownRight'
      // 组件类型-内容组件-基本信息表单
    case 'shareBaseInfo':
      return 'shareBaseInfo'
      // 组件类型-内容组件-系统按钮表单
    case 'operationTreeViews':
      return 'operationTreeViews'
      // 组件类型-内容组件-表单组件系统按钮表单
    case 'operationForm':
      return 'operationForm'
      // 组件类型-内容组件-组件预设表单
    case 'shareTemPreinstall':
      return 'shareTemPreinstall'
      // 组件类型-内容组件-模板路径表单
    case 'shareTempUrl':
      return 'shareTempUrl'
      // 配置管理-页面管理-操作视图基本表单
    case 'pageOperatInfo':
      return 'pageOperatInfo'
      // 配置管理-页面管理-操作视图权限表单
    case 'pageOperatPower':
      return 'pageOperatPower'
      // 用户代理 -修改/添加
    case 'modAddAgent':
      return 'modAddAgent'
      // 用户管理 -修改/添加
    case 'modAddUserControl':
      return 'modAddUserControl'
      // 用户管理 -角色授权
    case 'roleUserControl':
      return 'roleUserControl'
      // 角色管理 -添加/修改
    case 'modAddRoleControl':
      return 'modAddRoleControl'
      // 角色管理 -添加/修改
    case 'userRoleControl':
      return 'userRoleControl'
      // 角色管理 -授权页面
    case 'impowerRoleControl':
      return 'impowerRoleControl'
      // 系统概要 -添加/修改
    case 'modAddPro':
      return 'modAddPro'
      // 消息模板 -添加/修改
    case 'messageTemplateAddForm':
      return 'messageTemplateAddForm'
      // 消息模板接口参数 -添加/修改
    case 'messageApi':
      return 'messageApi'
      // 添加 视图配置-枚举值
    case 'newEnumValueAddForm':
      return 'newEnumValueAddForm'
      // 复制 公共复制表单
    case 'copyCommonForm':
      return 'copyCommonForm'
    //   // 导模板管理 -添加、修改-基本表单
    case 'modAddexportInfoTem':
      return 'modAddexportInfoTem'
      // 导模板管理 -添加、修改-基本表单
    case 'modAddexportPruview':
      return 'modAddexportPruview'
      // 定期执行规则 添加、修改表单
    case 'regularlyEnforceRules':
      return 'regularlyEnforceRules'
      // 进程管理--基本信息表单
    case 'progressInfo':
      return 'progressInfo'
      // 进程管理--添加进程表单
    case 'addProgress':
      return 'addProgress'
      // 进程管理--接口参数添加/修改
    case 'addPortParameter':
      return 'addPortParameter'
      // 任务规则库--接口参数添加/修改
    case 'taskRuleApi':
      return 'taskRuleApi'
      // 任务规则库--接口参数添加/修改
    case 'modAddTaskRule':
      return 'modAddTaskRule'
      // 样式管理--添加/修改表单
    case 'addStyle':
      return 'addStyle'
      // 开发预配置枚举类型复制表单
    case 'copyEnumTypeForm':
      return 'copyEnumTypeForm'
      // 开发预配置系统参数复制表单
    case 'copySysParameter':
      return 'copySysParameter'
      // 左右布局添加组件参数表单
    case 'comParameterLeftRight':
      return 'comParameterLeftRight'
      // 上下布局添加组件参数表单
    case 'comParameterUpDown':
      return 'comParameterUpDown'
      // 左中右布局添加组件参数表单
    case 'comParameterLeftCenterRight':
      return 'comParameterLeftCenterRight'
      // 左上下布局添加组件参数表单
    case 'comParameterLeftUpDown':
      return 'comParameterLeftUpDown'
      // 上下右布局添加组件参数表单
    case 'comParameterUpDownRight':
      return 'comParameterUpDownRight'
      //  tab布局添加组件参数表单
    case 'comParameterTab':
      return 'comParameterTab'
      //  弹框容器添加组件参数表单
    case 'comParameterDialog':
      return 'comParameterDialog'
      //  测试echarts表单
    case 'echarts':
      return 'echarts'
      //  测试echarts实例添加表单
    case 'echartsTabs':
      return 'echartsTabs'
    default:
      break
  }
}

/**
 * @description: 根据传入的函数体进行分割
 * @param {type: String}
 * @return: Object {fncName: '',fncArguments: ''}
 */
// 函数名和参数分割 function(data1,data1)
function methodSplit (data) {
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
}

/**
 * @description: 把传入的字符串解析成为函数体
 * @param {
 *    fooArr: 需要解析的函数字符串
 *    that: 组件实例
 *  }
 * @return:
 */
function getFnc (parameter, code) {
  if (gettype(parameter.data) === 'Array') {
    let temporaryObj = {}
    parameter.data.forEach(val => {
      for (var key in val) {
        let obj = {}
        eval('obj.' + key + ' = ' + val[key])
        temporaryObj[key] = obj[key]
      }
    })
    parameter.that.$store.commit(parameter.mutations, [temporaryObj, code])
  }
}

/**
 * @description: 判断数据类型
 * @param {params： 需要检测的数据}
 * @return: 数据类型
 */
function gettype (obj) {
  var type = typeof obj
  // 如果不是object类型的数据，直接用typeof就能判断出来
  if (type !== 'object') {
    return type
  } else {
    // 如果是object类型数据，准确判断类型必须使用Object.prototype.toString.call(obj)的方式才能判断
    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
  }
}

/**
 * @description: 把匿名函数解析成js代码
 * @param { key:字符串, value:函数体需要的参数 }
 * @return: 匿名函数中return的值
 */
function transformStr (key, value) {
  if (key) {
    let strFun = `${key}`
    return window.eval(strFun)(value)
  } else {
    // console.error('转化的函数体为空')
  }
}

/** 这个方法存在问题，暂未启用
 * @description: 根据传入的数据进行递归，根据传入的字段(field)进行表达式(expression)判断
 * @param {
 *    data: 数据
 *    field: 字段
 *    value: 值
 *  }
 * @return: Boolean
 */
function recursion (params) {
  if (gettype(params.data) === 'Array' && gettype(params) === 'Object') {
    params.data.forEach(item => {
      if (item.children) {
        let pendingData = {}
        pendingData.data = item.children
        pendingData.field = params.field
        pendingData.value = params.value
        recursion(pendingData)
      } else {
        if (item[params.field] === params.value) {
          return true
        }
      }
    })
  }
}

/**
 * @description: 根据传入的对象，进行正则匹配和截取
 * @param {
 *    data: 带动参数据
 *  }
 * @return {
 *    field: 字段
 *    keyWords: 待拼接的字段
 *  }
 */
function regExpressionCut (params) {
  // 是否传入了数据
  if (params.data) {
    let regObj = params.data.match(params.reg)
    if (regObj) {
      let index = params.data.indexOf('}')
      return { field: regObj[1], keyWords: params.data.substring(index + 1) }
    } else {
      return false
    }
  } else {
    return false
  }
}

export default {
  recursion,
  transCompName,
  gettype,
  transCustomCompName,
  getFnc,
  transContentCompName,
  transFormCompName,
  drapUtils,
  methodSplit,
  transformStr,
  regExpressionCut,
  initFormData
}
