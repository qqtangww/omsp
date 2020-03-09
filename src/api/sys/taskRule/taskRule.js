import { API } from '@/api/basic'

// 调取消息模板列表
const getMsgTemplateList = (params) => {
  return API.post('sys/Message/messageTemplateList', params).catch(err => {
    console.warn(err)
  })
}
// 调取定期执行规则
const getSysRuleList = (params) => {
  return API.post('sys/Rule/ruleList', params).catch(err => {
    console.warn(err)
  })
}

// 添加 任务规则库
const taskSaveData5 = (params) => {
  return API.post('sys/ProcessTask/saveData/5', params).catch(err => {
    console.warn(err)
  })
}

export {
  taskSaveData5,
  getSysRuleList,
  getMsgTemplateList
}
