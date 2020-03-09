// 菜单-密码策略 接口
import { API } from '@/api/basic'
// 新增修改进程
const progressSaveData1 = (params) => {
  return API.post('sys/ProcessTask/saveData/1', params).catch(err => { console.warn(err) })
}
// 开始所有或单次进程
const progresStartAll = (params) => {
  return API.post('sys/ProcessTask/startProcess', params).catch(err => { console.warn(err) })
}
// 停止所有进程
const progressStopAll = (params) => {
  return API.post('sys/ProcessTask/stopProcess', params).catch(err => { console.warn(err) })
}
// 任务列表【修改保存、暂停任务、继续任务】
const progressSaveData4 = (params) => {
  return API.post('sys/ProcessTask/saveData/4', params).catch(err => { console.warn(err) })
}
// 任务列表 运行一次任务
const progressWorkOnceProcessTask = (params) => {
  return API.post('sys/ProcessTask/workOnceProcessTask', params).catch(err => { console.warn(err) })
}
// 操作日志 修改
const progressSaveData2 = (params) => {
  return API.post('sys/ProcessTask/saveData/2', params).catch(err => { console.warn(err) })
}

// 进程管理-接口参数添加/修改
const progressSaveData6 = (params) => {
  return API.post('sys/ProcessTask/saveData/6', params).catch(err => { console.warn(err) })
}
export {
  progressSaveData6,
  progressSaveData1,
  progressSaveData2,
  progressWorkOnceProcessTask,
  progressSaveData4,
  progresStartAll,
  progressStopAll
}
