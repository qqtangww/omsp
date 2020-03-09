/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 16:04:29
 * @LastEditTime: 2019-08-19 16:06:43
 * @LastEditors: Please set LastEditors
 */
// 数据字典 - 字典表添加修改 内容
import modAddDic from '@/views/sys/dictionaries/modAddDic'
// 数据字典 - 关联表 内容
import correlationForm from '@/views/sys/dictionaries/correlationForm'
// 组织机构 右侧表单
import orgListForm from '@/views/sys/org/orgListForm'
// 组织机构 右侧新 查看带编辑表单
import newOrgListForm from '@/views/sys/org/newOrgListForm'
// 组织机构 新增、修改表单
import orgAddForm from '@/views/sys/org/orgAddForm'
//  个人信息表单
import userInfoForm from '@/views/user/userInfoControl/userInfoForm'
// 修改 个人信息表单
import modifyUserInfo from '@/views/user/userInfoControl/modifyUserInfo'
// 修改 用户密码表单
import modifyUserPassword from '@/views/user/userPassword/modifyUserPassword'
// 修改/添加 参数管理系统参数弹框表单
import addModifyParameter from '@/views/sys/parameter/addModifyParameter'
// 修改/添加 参数管理组织参数弹框表单
import addModifyOrgParameter from '@/views/sys/parameter/addModifyOrgParameter'
// 修改/添加 参数管理组织参数组
import orgParameterSet from '@/views/sys/parameter/orgParameterSet'
// 修改/添加 参数管理实例参数组
import comParameterSet from '@/views/sys/parameter/comParameterSet'
// 修改/添加 参数管理个人参数弹框表单
import addModifyPerParameter from '@/views/sys/parameter/addModifyPerParameter'
// 修改/添加 参数管理组件参数弹框表单
import addModifyComParameter from '@/views/sys/parameter/addModifyComParameter'
// 修改/添加 参数管理接口参数弹框表单
import addModifyApiParameter from '@/views/sys/parameter/addModifyApiParameter'
// 修改/添加 参数管理个人参数组
import perParameterSet from '@/views/sys/parameter/perParameterSet'
// 参数管理 复制系统参数
import copySysParameter from '@/views/sys/parameter/copySysParameter'
// 修改/添加 参数管理参数组基本信息表单
import parameterSetInfo from '@/views/sys/parameter/parameterSetInfo'
// 修改/添加 参数管理参数组视图表单
import addModifyParameterSet from '@/views/sys/parameter/addModifyParameterSet'
// 修改/添加 参数管理参数组视图应用参数组
import setParameterSet from '@/views/sys/parameter/setParameterSet'
// 复制参数组 功能表单
import copyParamterGroup from '@/views/sys/parameter/copyParamterGroup'
// 修改/添加 视图配置-基本信息表单
import infoTabView from '@/views/template/viewConfig/infoTab_View'
// 修改/添加 视图配置-添加基础字段 -基本信息表单
import baseInfoFiledView from '@/views/template/viewConfig/baseInfoFiled_View'
// 修改/添加 视图配置-添加基础字段-权限表单
import purviewFiledView from '@/views/template/viewConfig/purviewFiled_View'
// 修改/添加 视图配置-添加基础字段 -权限字段表单
import specialRowFiledView from '@/views/template/viewConfig/specialRowFiled_view'
// 修改/添加 视图配置-添加计算字段 -公式表单
import countFormulaFiledView from '@/views/template/viewConfig/countFormulaFiled_View'
// 修改/添加 视图配置-视图布局表单
import layoutView from '@/views/template/viewConfig/layout_View'
// 修改/添加 视图配置-批量添加字段 表单
import volumeAddFiledView from '@/views/template/viewConfig/volumeAddFiled_view'
// 修改/添加 视图配置-视图操作表单
import operationsView from '@/views/template/viewConfig/operations_View'
// 修改/添加 视图配置-视图分页表单
import pagingConfigView from '@/views/template/viewConfig/pagingConfig_View'
// 修改/添加 视图配置-视图编程接口表单
import functionsApi from '@/views/template/viewConfig/functionsApi'
// 修改/添加 视图配置-视图组件参数表单
import addModifyComParView from '@/views/template/viewConfig/addModifyComPar_View'
// 修改/添加 表单配置-表单组件参数表单
import comParameter from '@/views/template/form/modifyAdd_form/comParameter'
// 修改/添加 树形配置-表单组件参数表单
import comParameterTree from '@/views/template/tree/modifyAdd_tree/comParameter_tree'
// 差旅管理-差旅查询区域
import travelSearch from '@/views/buss/travel/travelSearch'
// 差旅管理-新增差旅申请
import addTravelApply from '@/views/buss/travel/addTravelApply'
// 差旅管理-差旅查看Info
import infoTravel from '@/views/buss/travel/infoTravel'
// 添加 视图配置-枚举类型表单
import enumTypeAddForm from '@/views/sys/enum/enumForm/enumTypeAddForm'
// 添加 视图配置-枚举列表表单
import enumListAddForm from '@/views/sys/enum/enumForm/enumListAddForm'
// 添加 枚举复制表单
import copyEnumTypeForm from '@/views/sys/enum/enumForm/copyEnumTypeForm'
// 添加 视图配置-枚举值
import enumValueAddForm from '@/views/sys/enum/enumForm/enumValueAddForm'
// 添加 参数与枚举管理-业务类别表单
import businessAddForm from '@/views/sys/business/businessAddForm'
// 添加 参数与枚举管理-业务类别详情表单
import businessListForm from '@/views/sys/business/businessListForm'
// 用户中心  - 用户分组 - 自定义用户分组  的分类
import customGroupCate from '@/views/user/groupControl/customGroupCate'
// 用户中心  - 用户分组 - 添加/修改用户分组
import addModifyGroup from '@/views/user/groupControl/addModifyGroup'
// 用户中心  - 用户分组 - 添加用户成员
import addModifyUserForm from '@/views/user/groupControl/addModifyUserForm'

// 修改/添加  - 表单组件 - 基本信息
import infoTabForm from '@/views/template/form/modifyAdd_form/infoTab'
// 修改/添加  - 表单组件 - 操作按钮
import optionsFormTab from '@/views/template/form/modifyAdd_form/operationsTab'
// 修改/添加  - 表单组件 - 编程接口
import funFormApi from '@/views/template/form/modifyAdd_form/funApi'

// 修改/添加 弹框容器-基本信息表单
import infoTabDialog from '@/views/template/dialog/modadd_dialog/dialog_info/baseInfo'
// 修改/添加 弹框容器-弹框样式表单
import styleTabDialog from '@/views/template/dialog/modadd_dialog/dialog_style/baseStyle'

// 修改/添加 树形组件-基本信息
import infoTabTree from '@/views/template/tree/modifyAdd_tree/infoTab_tree'
// 修改/添加 树形组件-树形布局
import layoutTabTree from '@/views/template/tree/modifyAdd_tree/layoutTab_tree'
// 修改/添加 树形组件-编程接口
import functionTabTree from '@/views/template/tree/modifyAdd_tree/functionTab_tree'
// 修改/添加 树形组件-添加/修改 字段设置-基本
import treeFields from '@/views/template/tree/modifyAdd_tree/modifyAddField/treeFields.vue'
// 修改/添加 树形组件-添加/修改计算字段设置 -公式
import countColumFormula from '@/views/template/tree/modifyAdd_tree/modifyAddField/countColumFormula.vue'
// 修改/添加 树形组件-添加/修改计算字段设置 -批量添加
import volumeAddColum from '@/views/template/tree/modifyAdd_tree/modifyAddField/volumeAddColum.vue'
// 修改/添加 树形组件-添加/修改节点设置 -基本信息
import treeNodeInfo from '@/views/template/tree/modifyAdd_tree/modifyAddNode/nodeInfo'
// 修改/添加 树形组件-添加/修改节点设置 -特殊节点
import treeSpecialNode from '@/views/template/tree/modifyAdd_tree/modifyAddNode/specialNode'
// 修改/添加 树形组件-操作按钮
import treeOperationTab from '@/views/template/tree/modifyAdd_tree/operationTab_tree'

// 修改/添加 布局组件-tab表单
import layoutTabsInfo from '@/views/template/layoutComponents/layoutTabsInfo'
// 布局组件-tab页修改表单
import addModifyTabs from '@/views/template/layoutComponents/addModifyTabs'
// 布局组件-tab页修改权限
import layoutTabsPower from '@/views/template/layoutComponents/layoutTabsPower'

// 组件类型-左右布局-修改弹框-基本信息表单
import leftRightInfo from '@/views/template/componentsType/compLayoutType/leftRightInfo'
// 组件类型-上下布局-修改弹框-基本信息表单
import upDownInfo from '@/views/template/componentsType/compLayoutType/upDownInfo'
// 组件类型-左中右布局-修改弹框-基本信息表单
import leftCentreRight from '@/views/template/componentsType/compLayoutType/leftCentreRight'
// 组件类型-左上下布局-修改弹框-基本信息表单
import leftUpDownInfo from '@/views/template/componentsType/compLayoutType/leftUpDownInfo'
// 组件类型-上下右布局-修改弹框-基本信息表单
import upDownRightInfo from '@/views/template/componentsType/compLayoutType/upDownRightInfo'

// 访问策略-基本信息表单
import acessBaseInfo from '@/views/sys/access/acessBaseInfo'
// 访问策略-黑名单表单
import blackList from '@/views/sys/access/blackList'
// 访问策略-白名单表单
import whiteList from '@/views/sys/access/whiteList'
// 布局组件-左右修改表单
import layoutLeftRight from '@/views/template/layoutComponents/layoutLeftRight'
// 布局组件-上下修改表单
import layoutUpDown from '@/views/template/layoutComponents/layoutUpDown'
// 布局组件-左中右修改表单
import layoutLeftCenterRight from '@/views/template/layoutComponents/layoutLeftCenterRight'
// 布局组件-左上下修改表单
import layoutLeftUpDown from '@/views/template/layoutComponents/layoutLeftUpDown'
// 布局组件-上下右修改表单
import layoutUpDownRight from '@/views/template/layoutComponents/layoutUpDownRight'

// 修改/添加 组件类型-内容组件-基本信息表单
import shareBaseInfo from '@/views/template/componentsType/shareCompType/shareBaseInfo'
// 修改/添加 组件类型-内容组件-系统按钮表单
import operationTreeViews from '@/views/template/componentsType/compOperationType/operationTreeViews'
// 修改/添加 组件类型-内容组件-表单组件系统按钮表单
import operationForm from '@/views/template/componentsType/compOperationType/operationForm'
// 修改/添加 组件类型-内容组件-组件预设表单
import shareTemPreinstall from '@/views/template/componentsType/shareCompType/shareTemPreinstall'
// 修改 组件类型-内容组件-模板路径表单
import shareTempUrl from '@/views/template/componentsType/shareCompType/shareTempUrl'

// 修改 配置管理-页面管理-操作视图基本表单
import pageOperatInfo from '@/views/user/pageControl/pageOperation/pageOperatInfo'
// 修改 配置管理-页面管理-操作视图权限表单
import pageOperatPower from '@/views/user/pageControl/pageOperation/pageOperatPower'
// 修改 配置管理-页面管理-操作视图权限表单
import pageBaseInfo from '@/views/user/pageControl/pageBaseInfo'
// 修改 配置管理-页面管理-操作视图权限表单
import pagePower from '@/views/user/pageControl/pagePower'

// 用户代理 - 添加修改
import modAddAgent from '@/views/sys/agent/modAddAgent'

// 用户管理 - 添加修改
import modAddUserControl from '@/views/sys/userControl/modAddUserControl'
// 用户管理 - 角色授权
import roleUserControl from '@/views/sys/userControl/roleUserControl'
// 用户管理 - 查看表单
import userInfoView from '@/views/sys/userControl/userInfoView'

// 角色管理 - 添加修改
import modAddRoleControl from '@/views/sys/roleControl/modAddRoleControl'
// 角色管理 - 用户列表
import userRoleControl from '@/views/sys/roleControl/userRoleControl'
// 角色管理 - 授权页面
import impowerRoleControl from '@/views/sys/roleControl/impowerRoleControl'

// 系统概要 - 添加修改
import modAddPro from '@/views/sys/profiles/modAddPro'

// 密码策略 - 添加修改
import modAddPwd from '@/views/sys/pwd/modAddPwd'

// 数据字典 - 字段设置 - 基本信息
import dictionariesForm from '@/views/sys/dictionaries/dictionariesForm'
// 数据字典 - 字段设置 - 默认配置
import dictionariesDefault from '@/views/sys/dictionaries/dictionariesDefault'

// 数据字典 - 字段设置 - 默认配置
import mailContent from '@/views/sys/mailManagement/mailContent'

// 操作日志-详情
import operationInfo from '@/views/sys/operationLog/operationInfo'
// 添加/修改--消息模板
import messageTemplateAddForm from '@/views/sys/messageTemplate/messageTemplateAddForm'
// 添加/修改--消息模板接口参数
import messageApi from '@/views/sys/messageTemplate/messageApi'
// 添加/修改--消息模板 - 发送日志视图 - 查看表单
import lookIngAtMsg from '@/views/sys/messageTemplate/lookIngAtMsg'

// 通知发布 - 新增修改表单
import notification from '@/views/sys/msgNotification/notification'
// 通知发布 - 查看info表单
import noticeInfo from '@/views/sys/msgNotification/noticeInfo'

// 通知详情 - 查看info表单
import detailsInfo from '@/views/sys/detailsInfo/detailsInfo'

// 邮件发送 - 新增、修改
import sendMail from '@/views/sys/sendMail/sendMail'
// 邮件发送 - info
import sendMailInfo from '@/views/sys/sendMail/sendMailInfo'

// 添加 视图配置-枚举值
import newEnumValueAddForm from '@/views/sys/enum/enumForm/newEnumValueAddForm'

// 复制  公共表单
import copyCommonForm from '@/views/template/copyCommon/copyCommonForm'

// 导入导出  添加、修改表单-基本
import modAddexportInfoTem from '@/views/sys/exportTem/modAddexportInfoTem'
// 导入导出  添加、修改表单-角色权限
import modAddexportPruview from '@/views/sys/exportTem/modAddexportPruview'
// 导入导出  添加、修改表单-数据权限
import modAddDataPower from '@/views/sys/exportTem/modAddDataPower'

// 定期执行规则 添加、修改表单
import regularlyEnforceRules from '@/views/sys/regularlyEnforceRules/regularlyEnforceRules'

// 进程管理--基本信息表单
import progressInfo from '@/views/sys/progress/progress_info'
// 进程管理  任务列表  修改表单
import taskListInfo from '@/views/sys/progress/taskListInfo'
// 进程管理  任务列表  修改表单
import operationLogInfo from '@/views/sys/progress/operationLogInfo'

// 进程管理--添加进程表单
import addProgress from '@/views/sys/progress/addProgress'

// 进程管理--接口参数添加/修改
import addPortParameter from '@/views/sys/progress/addPortParameter'

// 任务规则库 添加/修改
import modAddTaskRule from '@/views/sys/taskRule/modAddTaskRule'
// 任务规则库接口参数 添加/修改
import taskRuleApi from '@/views/sys/taskRule/taskRuleApi'

// 样式管理  添加/修改
import addStyle from '@/views/sys/styleManagement/addStyle'

// 左右布局添加组件参数表单
import comParameterLeftRight from '@/views/template/layoutComponents/comParameter_leftRight'
// 上下布局添加组件参数表单
import comParameterUpDown from '@/views/template/layoutComponents/comParameter_upDown'
// 左中右布局添加组件参数表单
import comParameterLeftCenterRight from '@/views/template/layoutComponents/comParameter_leftCenterRight'
// 左上下布局添加组件参数表单
import comParameterLeftUpDown from '@/views/template/layoutComponents/comParameter_leftUpDown'
// 上下右布局添加组件参数表单
import comParameterUpDownRight from '@/views/template/layoutComponents/comParameter_upDownRight'
// tab布局添加组件参数表单
import comParameterTab from '@/views/template/layoutComponents/comParameter_tab'
// 弹框容器添加组件参数表单
import comParameterDialog from '@/views/template/dialog/modadd_dialog/comParameter_dialog'

// 测试echarts表单
import echarts from '@/views/echarts/echarts'
// 测试echarts实例添加表单
import echartsTabs from '@/views/echarts/echarts_tabs'

export default {
  data () {
    return {}
  },
  components: {
    modAddTaskRule,
    taskRuleApi,
    addProgress,
    operationLogInfo,
    taskListInfo,
    lookIngAtMsg,
    layoutTabsPower,
    treeFields,
    sendMailInfo,
    sendMail,
    detailsInfo,
    noticeInfo,
    notification,
    operationInfo,
    mailContent,
    dictionariesForm,
    dictionariesDefault,
    pageBaseInfo,
    pagePower,
    whiteList,
    blackList,
    acessBaseInfo,
    correlationForm,
    upDownRightInfo,
    leftUpDownInfo,
    orgListForm,
    leftCentreRight,
    orgAddForm,
    modAddDic,
    userInfoForm,
    modifyUserInfo,
    modifyUserPassword,
    addModifyParameter,
    addModifyOrgParameter,
    orgParameterSet,
    addModifyPerParameter,
    addModifyComParameter,
    addModifyApiParameter,
    perParameterSet,
    comParameterSet,
    parameterSetInfo,
    addModifyParameterSet,
    setParameterSet,
    infoTabView,
    baseInfoFiledView,
    layoutView,
    operationsView,
    pagingConfigView,
    functionsApi,
    addModifyComParView,
    comParameter,
    comParameterTree,
    travelSearch,
    addTravelApply,
    infoTravel,
    purviewFiledView,
    upDownInfo,
    specialRowFiledView,
    volumeAddFiledView,
    countFormulaFiledView,
    enumTypeAddForm,
    enumListAddForm,
    leftRightInfo,
    enumValueAddForm,
    businessAddForm,
    businessListForm,
    customGroupCate,
    addModifyGroup,
    addModifyUserForm,
    infoTabForm,
    optionsFormTab,
    funFormApi,
    infoTabDialog,
    infoTabTree,
    layoutTabTree,
    functionTabTree,
    styleTabDialog,
    layoutTabsInfo,
    addModifyTabs,
    countColumFormula,
    volumeAddColum,
    treeNodeInfo,
    treeSpecialNode,
    treeOperationTab,
    layoutLeftRight,
    layoutUpDown,
    layoutLeftCenterRight,
    layoutLeftUpDown,
    layoutUpDownRight,
    shareBaseInfo,
    operationTreeViews,
    operationForm,
    shareTemPreinstall,
    shareTempUrl,
    pageOperatInfo,
    pageOperatPower,
    modAddAgent,
    modAddUserControl,
    roleUserControl,
    modAddRoleControl,
    userRoleControl,
    impowerRoleControl,
    modAddPro,
    modAddPwd,
    messageTemplateAddForm,
    messageApi,
    newEnumValueAddForm,
    userInfoView,
    newOrgListForm,
    copyCommonForm,
    modAddexportInfoTem,
    modAddexportPruview,
    modAddDataPower,
    regularlyEnforceRules,
    progressInfo,
    addPortParameter,
    addStyle,
    copyEnumTypeForm,
    copySysParameter,
    copyParamterGroup,
    comParameterLeftRight,
    comParameterUpDown,
    comParameterLeftCenterRight,
    comParameterLeftUpDown,
    comParameterUpDownRight,
    comParameterTab,
    comParameterDialog,
    echarts,
    echartsTabs
  }
}
