import { API } from '@/api/basic'

// --差旅申请
// 出差申请人列表
const temTravelGetStaffList = (params) => {
  return API.post('sys/Travel/getStaffList', params).catch(err => { console.warn(err) })
}
// 出差申请人列表
const temTravelGetCity = (params) => {
  return API.post('common/Config/getCity', params).catch(err => { console.warn(err) })
}
// 申请审批通过
const temTravelSubmitApply = (params) => {
  return API.post('sys/Travel/submitApply', params).catch(err => { console.warn(err) })
}
// 添加/修改差旅申请
const temTravelSaveData = (params) => {
  return API.post('sys/Travel/saveData/1', params).catch(err => { console.warn(err) })
}
// 删除出差待申请记录
const temTravelWaitDelete = (params) => {
  return API.post('sys/Travel/travelWaitDelete', params).catch(err => { console.warn(err) })
}
// 差旅申请 驳回
const temTravelApplyReject = (params) => {
  return API.post('sys/Travel/applyReject', params).catch(err => { console.warn(err) })
}

// --报销
// 删除出差待申请记录
const temTravelSaveData2 = (params) => {
  return API.post('sys/Travel/saveData/2', params).catch(err => { console.warn(err) })
}
// 报销申请审批通过
const temTravelsubmitPayment = (params) => {
  return API.post('sys/Travel/submitPayment', params).catch(err => { console.warn(err) })
}
// 报销 驳回
const temTravelPaymentReject = (params) => {
  return API.post('sys/Travel/paymentReject', params).catch(err => { console.warn(err) })
}

// --结算
// 结算通过
const temTravelRecievePass = (params) => {
  return API.post('sys/Travel/recievePass', params).catch(err => { console.warn(err) })
}

// 差旅数据（查询）
const temTravelTravelList = (params) => {
  return API.post('sys/Travel/travelList', params).catch(err => { console.warn(err) })
}
// 差旅查询 拉取机构
const temTravelOrgList = (params) => {
  return API.post('custom_func/OrgGroup/orgList', params).catch(err => { console.warn(err) })
}

export {
  temTravelGetStaffList,
  temTravelSubmitApply,
  temTravelSaveData,
  temTravelWaitDelete,
  temTravelApplyReject,
  temTravelGetCity,
  temTravelRecievePass,
  temTravelPaymentReject,
  temTravelsubmitPayment,
  temTravelTravelList,
  temTravelOrgList,
  temTravelSaveData2
}
