import travelSearch from '@/views/buss/travel/travelSearch'
// 枚举查询
import enumHeadlineType from '@/views/sys/enum/enumHeadlineType'
import enumHeadlineSearch from '@/views/sys/enum/enumHeadlineSearch'
import enumValHeadlineSearch from '@/views/sys/enum/enumValHeadlineSearch'
//  参数查询
import selfParameterBatchSearch from '@/views/sys/parameter/selfParameterBatchSearch'
import selfParameterSearch from '@/views/sys/parameter/selfParameterSearch'
import selfParameterSearchUser from '@/views/sys/parameter/selfParameterSearchUser'
import selfParameterSearchGroup from '@/views/sys/parameter/selfParameterSearchGroup'
import selfParameterSearchGroupList from '@/views/sys/parameter/selfParameterSearchGroupList'
import selParameterSerachOrg from '@/views/sys/parameter/selParameterSerachOrg'
import customCompParameterQuery from '@/views/sys/parameter/customCompParameterQuery'
import customCompParameterApiQuery from '@/views/sys/parameter/customCompParameterApiQuery'
// 邮件模板查询
import mailCustomQuery from '@/views/sys/mailManagement/mailCustomQuery'
// 通知发布查询
import noticeCustomQuery from '@/views/sys/msgNotification/noticeCustomQuery'
// 消息模板查询
import messageTemplateSearch from '@/views/sys/messageTemplate/messageTemplateSearch'
// 消息模板  绑定任务规则  查询
import customQueryMsgTaskRule from '@/views/sys/messageTemplate/customQueryMsgTaskRule'
// 消息模板 发送日志 查询
import sendLogSearch from '@/views/sys/messageTemplate/sendLogSearch'
// 通知详情查询
import detailsCustomQuery from '@/views/sys/detailsInfo/detailsCustomQuery'
// 系统概要 自定查询
import systemCustomQuery from '@/views/sys/profiles/systemCustomQuery'
// 数据字典 自定查询
import dictionariesCustomQuery from '@/views/sys/dictionaries/dictionariesCustomQuery'
// 数据字典 - 字段设置 自定查询
import dictionariesFiledCustomQuery from '@/views/sys/dictionaries/dictionariesFiledCustomQuery'
// 访问策略 自定查询
import accessCustomQuery from '@/views/sys/access/accessCustomQuery'
// 密码策略 自定查询
import pwdCustomQuery from '@/views/sys/pwd/pwdCustomQuery'
// 视图组件 自定查询
import viewCustomQuery from '@/views/template/viewConfig/viewCustomQuery'
// 视图组件-字段设置-自定查询
import viewFiledCustomQuery from '@/views/template/viewConfig/viewFiledCustomQuery'
// 树形组件 自定查询
import treeCustomQuery from '@/views/template/tree/treeCustomQuery'
// 树形组件 - 字段设置 自定查询
import treeFiledCustomQuery from '@/views/template/tree/treeFiledCustomQuery'
// 树形组件 - 组件参数自定查询
import treeParameterCustomQuery from '@/views/template/tree/treeParameterCustomQuery'
// 表单组件 自定查询
import formCustomQuery from '@/views/template/form/formCustomQuery'
// 表单组件-组件参数自定查询
import formCustomParameterQuery from '@/views/template/form/formCustomParameterQuery'
// 布局组件 自定查询
import layoutCustomQuery from '@/views/template/layoutComponents/layoutCustomQuery'
// 弹框组件 自定查询
import dialogCustomQuery from '@/views/template/dialog/dialogCustomQuery'
// 角色管理 自定查询
import roleCustomQuery from '@/views/sys/roleControl/roleCustomQuery'
// 用户管理 自定查询
import userCustomQuery from '@/views/sys/userControl/userCustomQuery'
// 操作日志 自定查询
import operationCustomQuery from '@/views/sys/operationLog/operationCustomQuery'
// 登录日志 自定查询
import conLogCustomQuery from '@/views/sys/conLog/conLogCustomQuery'
// 用户代理 自定查询
import agentCustomQuery from '@/views/sys/agent/agentCustomQuery'
// 邮件发送 自定查询
import sendMailCustomQuery from '@/views/sys/sendMail/sendMailCustomQuery'
//  用户分组  自定查询页面
import customSearchShare from '@/views/user/groupControl/customSearchShare'
import customSearchGroup from '@/views/user/groupControl/customSearchGroup'
// 枚举类型  自定义查询
import newEnumTypeSearch from '@/views/sys/enum/newEnumTypeSearch'
// 枚举值  自定义查询
import newEnumValSearch from '@/views/sys/enum/newEnumValSearch'
// 导出，导入模板 用户权限自定义查询
import userPowerCustomQuery from '@/views/sys/exportTem/userPowerCustomQuery'
// 导出，导入模板 选择用户权限-自定义查询
import choiceCustomQuery from '@/views/sys/exportTem/choiceCustomQuery'
// 配置关联表  自定义查询
import correlationQuery from '@/views/sys/dictionaries/correlationQuery'
// 配置关联表  自定义查询
import customQueryTaskRule from '@/views/sys/taskRule/customQueryTaskRule'
// 样式管理  自定义查询
import styleCustomQuery from '@/views/sys/styleManagement/styleCustomQuery'
// 定期执行规则  自定义查询
import customQueryRegularly from '@/views/sys/regularlyEnforceRules/customQueryRegularly'
export default {
  data () {

  },
  components: {
    customQueryRegularly,
    customQueryMsgTaskRule,
    customQueryTaskRule,
    travelSearch,
    enumHeadlineType,
    selfParameterBatchSearch,
    selfParameterSearch,
    selParameterSerachOrg,
    mailCustomQuery,
    noticeCustomQuery,
    messageTemplateSearch,
    sendLogSearch,
    systemCustomQuery,
    enumHeadlineSearch,
    enumValHeadlineSearch,
    detailsCustomQuery,
    dictionariesCustomQuery,
    dictionariesFiledCustomQuery,
    accessCustomQuery,
    pwdCustomQuery,
    viewCustomQuery,
    viewFiledCustomQuery,
    treeCustomQuery,
    treeFiledCustomQuery,
    formCustomQuery,
    layoutCustomQuery,
    dialogCustomQuery,
    roleCustomQuery,
    userCustomQuery,
    operationCustomQuery,
    conLogCustomQuery,
    agentCustomQuery,
    sendMailCustomQuery,
    customSearchShare,
    customSearchGroup,
    selfParameterSearchUser,
    selfParameterSearchGroup,
    selfParameterSearchGroupList,
    newEnumTypeSearch,
    newEnumValSearch,
    userPowerCustomQuery,
    choiceCustomQuery,
    correlationQuery,
    styleCustomQuery,
    treeParameterCustomQuery,
    formCustomParameterQuery,
    customCompParameterQuery,
    customCompParameterApiQuery
  }
}
