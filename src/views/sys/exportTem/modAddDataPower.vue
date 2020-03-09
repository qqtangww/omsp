<!-- 此文件废除 -->
<template>
  <!-- 弹框基本信息 -->
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      inline-message
      label-position="right"
      label-width="110px"
      :rules="rules"
      ref="ruleForm"
      :model="modAddData"
    >
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="con-box">
       <el-form-item
            label="权限类型"
            prop="i_permissonsType"

          >
          <el-radio-group v-model="modAddData.i_permissonsType" @change="handlePowerType">
              <el-radio label="0">无限制</el-radio>
              <el-radio label="1">组织机构</el-radio>
              <el-radio label="2">个人用户</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
          <!-- <std-table-action v-show="modAddData.i_permissonsType === '1'"  :configData='configDataPowerOrg' :shareData='shareDataPowerOrg'></std-table-action>
          <std-table-action v-show="modAddData.i_permissonsType === '2'"  :configData='configDataPower' :shareData='shareDataPower'></std-table-action> -->
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import stdTableAction from '@/components/stdTable/stdTableAction'
import { API } from '@/api/basic'
export default {
  name: 'infoTab',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      modAddData: {
        i_permissonsType: '0'
      },
      rules: {
        i_IsUseOrgSon: [
          { required: true, message: '请选适用机构条件', trigger: 'change' }
        ]
      },
      oldModAddData: {},
      isDisabled: false,
      operationcode: '',
      orgList: [],
      userList: [],
      userIds: [],
      orgVuale: [],
      props: {
        label: 'v_OrgFullName',
        value: 'v_OrgCode',
        multiple: true
      },
      configDataPower: {
        viewId: 'CC_VW_exportTemplateUser',
        isKeepAlive: 'isKeepAlive'
      },
      configDataPowerOrg: {
        viewId: 'CC_VW_exportTemplateOrg',
        isKeepAlive: 'isKeepAlive'
      },
      shareDataPower: {},
      shareDataPowerOrg: {}
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    let formData = this.$store.state.fieTableData
    // 获取用户列表
    this.getUserList()
    // 获取组织机构
    this.getOrgList()
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      this.$refs.ruleForm.validate(valid => {

      })
    },
    handlePowerType (val) {
      if (val === '0') {
        this.$set(this.configDataPower, 'viewId', '')
      } else if (val === '1') {
        Object.assign(this.modAddData, this.$store.state.rowTabData)
        this.$store.commit('changeRowTabData', this.modAddData)
        this.$set(this.configDataPower, 'viewId', 'CC_VW_exportTemplateOrg')
      } else {
        Object.assign(this.modAddData, this.$store.state.rowTabData)
        this.$store.commit('changeRowTabData', this.modAddData)
        this.$set(this.configDataPower, 'viewId', 'CC_VW_exportTemplateUser')
      }
    },
    getFileType (val) {

    },
    getUserFilterList (val) {
      let params = {
        keywords: val,
        size: 100
      }
      if (val) {
        setTimeout(() => {
          cgiService.temUserList(params).then(res => {
            if (res.code === 0) {
              this.userList = res.data
              // [{ 'v_OrgCode': 'A0001', 'v_OrgFullName': 'BG3_DU1' }, { 'v_OrgCode': 'A0001', 'v_OrgFullName': 'BG3_DU1' }]
            }
          })
        }, 1000)
      }
    },
    getOrgFilter (val) {
      let params = {
        keywords: val,
        size: 100
      }
      if (val) {
        setTimeout(() => {
          cgiService.temUserList(params).then(res => {
            if (res.code === 0) {
              this.userList = res.data
            }
          })
        }, 1000)
      }
    },
    getUserList () {
      let params = {
        size: 100
      }
      cgiService.temUserList(params).then(res => {
        if (res.code === 0) {
          this.userList = res.data
        }
      })
    },
    getOrgList () {
      cgiService.getTemOrgList().then(res => {
        if (res.code === 0) {
          this.orgList = res.data
        }
      })
    }
  },
  mounted () {
    // function delUser(params) {
    //   var ids = []
    //   let checkedData = params.that.checkSelectData
    //   if (!checkedData.length) {
    //     params.that.$message.warning('没有选中数据，请重试')
    //     return
    //   }
    //   checkedData.forEach(val => {
    //     ids.push(val.i_Id)
    //   })
    //   // 获取需要传的数据
    //   let logParams = params.that.getLogParams()
    //   params.that.$confirm('确定要删除此条数据?', '提示', {
    //     confirmButtonText: '确定', cancelButtonText: '取消', type: 'error'
    //   }).then(() => {
    //     params.that.API.post('sys/exportTemplate/deleteData/3', { ids, logParams }).then(res => {
    //       if (!res.code) {
    //         params.that.$message.success(res.msg)
    //       } else {
    //         params.that.$message.error(res.msg)
    //       }
    //     })
    //   })
    // }
    // !res.code ? params.that.$message.success(res.msg) : params.that.$message.error(res.msg)
    // if (!res.code) {
    // params.that.$message.success(res.msg)
    // let param = params.that.$store.state.paginations['CC_VW_exportTemplateOrg']
    // params.that.$set(param, 'viewid', params.that.$store.state.fieRowTableData['CC_VW_exportTemplateOrg'].viewid)
    // params.that.$parent.$parent.$parent.$parent.$parent.$parent.$parent.getTableData(param)
    // } else {
    //   params.that.$message.error(res.msg)
    // }
    // console.log();
    // !res.code ? params.that.$message.success(res.msg) : params.that.$message.error(res.msg)
    // let param = params.that.$store.state.paginations['CC_VW_dataPowerUser']
    // params.that.$set(param, 'viewid', params.that.$store.state.fieRowTableData['CC_VW_exportTemplateUser'].viewid)
    // params.that.$parent.getTableData(param)
    // !res.code ? params.that.$message.success(res.msg) : params.that.$message.error(res.msg)
    // if (!res.code) {
    //   let param = params.that.$store.state.paginations['CC_VW_dataPowerUser']
    //   params.that.$set(param, 'viewid', params.that.$store.state.fieRowTableData['CC_VW_exportTemplateUser'].viewid)
    //   params.that.$parent.getTableData(param)
    // }else {
    //   this.$message.error(res.msg)
    // }
    // // 如果成功删除  需要重新调用接口
    // // 先拿到当前分页数据
    // let param = params.that.$store.state.paginations['CC_VW_viewField']
    // params.that.$set(param, 'viewid', params.that.$store.state.fieRowTableData['CC_VW_viewField'].viewid)
    // params.that.$parent.getTableData(param)

    // function save (params) {
    //   let rowTabData = params.that.$store.state.rowTabData
    //   let checkedData = params.that.$store.state.checkedData
    //   let commitParams = {}
    //   let userData = []
    //   if (checkedData.length > 0) {
    //     checkedData.forEach(item => {
    //       userData.push(item.v_UserID)
    //     })
    //   }
    //   commitParams.v_TemplateCode = rowTabData.v_TemplateCode
    //   commitParams.i_permissonsType = rowTabData.i_permissonsType
    //   commitParams.userData = JSON.stringify(userData)
    //   params.cgiService.saveTempDataPwoer(commitParams).then(res => {
    //     !res.code ? params.that.$message.success(res.msg) : params.that.$message.error(res.msg)
    //   })
    // }
    // function saveOrg (params) {
    //   let rowTabData = params.that.$store.state.rowTabData
    //   let checkedData = params.that.$store.state.checkSelectData
    //   let orgData = []
    //   let commitParams = {}
    //   if (checkedData.length > 0) {
    //     checkedData.forEach(item => {
    //       let params = {}
    //       params.v_OrgCode = item.v_OrgCode
    //       params.i_IsUseOrgSon = item.i_IsUseOrgSon
    //       params.v_OrgFullName = item.v_OrgFullName
    //       orgData.push(params)
    //     })
    //   }

    //   commitParams.v_TemplateCode = rowTabData.v_TemplateCode
    //   commitParams.i_permissonsType = rowTabData.i_permissonsType
    //   commitParams.orgData = orgData
    //   params.that.cgiService.saveTempDataPwoer(commitParams).then(res => {
    //     !res.code ? params.that.$message.success(res.msg) : params.that.$message.error(res.msg)
    //   })
    // }
    // function requestParams_CC_VW_dataPowerOrg(params) {
    //   let templateCode = params.that.$store.state.rowTabData.v_TemplateCode
    //   let para = {
    //     v_TemplateCode: templateCode
    //   }
    //   params.that.cgiService.getTempDataPwoer(para).then(res => {
    //     if (res.code === 0) {
    //       params.that.checkSelectData = res.data
    //     }
    //   })
    //   let commitParams = {
    //   }
    //   return commitParams
    // }
    //   function download(params) {
    //     let rowTabData = params.that.$store.state.rowTabData
    //     let checkedData = params.that.$store.state.checkedData
    //     let ids = []
    //     let commitParams = {}
    //     if (checkedData.length > 0) {
    //       checkedData.forEach(item => {
    //         ids.push(item.i_Id)
    //       })
    //     }
    //     commitParams.v_TemplateCode = rowTabData.v_TemplateCode
    //     commitParams.ids = ids
    //     params.that.cgiService.downloadExportTemp(commitParams).then(res => {
    //       if (!res.code) {
    //         params.that.$message.success(res.msg)
    //       } else {
    //         params.that.$message.error(res.msg)
    //       }
    //     })
    //   }
    // params.that.cgiService.downloadExportTemp(commitParams).then(res => {
    //   if (!res.code) {
    //     params.that.$message.success(res.msg)
    //   } else {
    //     params.that.$message.error(res.msg)
    //   }
    // })
    // function download (params) {
    //   let templateCode = params.that.$store.state.fieTableData.v_TemplateCode
    //   // let params = []
    //   // 获取 导出选中的数据
    //   var ids = []
    //   var modelArr = ''
    //   let checkedData = this.checkSelectData
    //   if (checkedData.length > 0) {
    //     checkedData.forEach(val => {
    //       ids.push(val.i_Id)
    //     })
    //     // 获取到ids字符串
    //     var idStr = 'ids=' + ids.join(',')
    //     if (ids.length > 0) { params.push(idStr) }
    //   }
    //   let resConfigData = this.$store.state.confsBtn
    //   // 判断是否需要记录日志
    //   if (resConfigData.isrecordlog === '1') {
    //     // 获取需要 记录日志的数据
    //     let logParamsObj = this.getLogParams()
    //     let logParamsStr = ''
    //     let logParamsArr = []
    //     for (var key in logParamsObj) {
    //       logParamsArr.push('logParams.' + key + '=' + logParamsObj[key])
    //     }
    //     logParamsStr = logParamsArr.join('&')
    //     params.push(logParamsStr)
    //   }
    //   // 获取 排序
    //   let paginations = this.$store.state.paginations
    //   if (paginations.hasOwnProperty('sortBy')) {
    //     let sortByStr = 'sortBy=' + paginations.sortBy
    //     params.push(sortByStr)
    //   }
    //   // 获取 排序字段名
    //   if (paginations.hasOwnProperty('sortColumn')) {
    //     let sortColumn = 'sortColumn=' + paginations.sortColumn
    //     params.push(sortColumn)
    //   }
    //   window.open(API.defaults.baseURL + 'sys/exportTemplate/downloadFile/' + templateCode + '?' + params.join('&'))
    // }
    // function download(params) {
    //   let templateCode = params.that.$store.state.fieTableData.v_TemplateCode
    //   if (params.that.$store.state.confsBtn) {
    //     let resConfigData = params.that.$store.state.confsBtn
    //     params.that.viewID = resConfigData.viewid
    //   } else {
    //     params.that.viewID = params.that.$route.params.viewid
    //   }
    //   let commitParams = []
    //   // 导出选中的数据
    //   var ids = []
    //   let checkedData = params.that.checkSelectData
    //   if (checkedData.length > 0) {
    //     checkedData.forEach(val => {
    //       ids.push(val.i_Id)
    //     })
    //     // 获取到ids字符串
    //     var idStr = 'ids=' + ids.join(',')
    //     if (ids.length > 0) { commitParams.push(idStr) }
    //   }
    //   window.open(params.that.API.defaults.baseURL + 'sys/exportTemplate/downloadFile/' + '?' + 'v_TemplateCode=' + templateCode + '&' + commitParams.join('&'))
    // }
    // function download(params) {
    //   let templateCode = params.that.$store.state.fieTableData.v_TemplateCode
    //   if (params.that.$store.state.confsBtn) {
    //     let resConfigData = params.that.$store.state.confsBtn
    //     params.that.viewID = resConfigData.viewid
    //   } else {
    //     params.that.viewID = params.that.$route.params.viewid
    //   }
    //   let commitParams = []
    //   // 导出选中的数据
    //   var ids = []
    //   let checkedData = params.that.checkSelectData
    //   if (checkedData.length > 0) {
    //     checkedData.forEach(val => {
    //       ids.push(val.i_Id)
    //     })
    //     // 获取到ids字符串
    //     var idStr = 'ids=' + ids.join(',')
    //     if (ids.length > 0) { commitParams.push(idStr) }
    //   }
    //   // 获取需要 记录日志的数据
    //   let logParamsObj = params.that.getLogParams()
    //   let logParamsStr = ''
    //   let logParamsArr = []
    //   for (var key in logParamsObj) {
    //     logParamsArr.push('logParams.' + key + '=' + logParamsObj[key])
    //   }
    //   logParamsStr = logParamsArr.join('&')
    //   commitParams.push(logParamsStr)
    //   window.open(params.that.API.defaults.baseURL + 'sys/exportTemplate/downloadFile' + '?' + 'v_TemplateCode=' + templateCode + '&' + commitParams.join('&'))
    // }
    params.that.$confirm('是否需要下载文件?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {

    }).catch(() => {
      params.that.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
    // function download(params) {
    //   let templateCode = params.that.$store.state.fieTableData.v_TemplateCode
    //   if (params.that.$store.state.confsBtn) {
    //     let resConfigData = params.that.$store.state.confsBtn
    //     params.that.viewID = resConfigData.viewid
    //   } else {
    //     params.that.viewID = params.that.$route.params.viewid
    //   }
    //   let commitParams = []
    //   // 导出选中的数据
    //   var ids = []
    //   let checkedData = params.that.checkSelectData
    //   if (checkedData.length > 0) {
    //     checkedData.forEach(val => {
    //       ids.push(val.i_Id)
    //     })
    //     // 获取到ids字符串
    //     var idStr = 'ids=' + ids.join(',')
    //     if (ids.length > 0) { commitParams.push(idStr) }
    //   }
    //   if (ids.length > 0) {
    //     params.that.$confirm('是否需要下载文件?', '提示', {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       window.open(params.that.API.defaults.baseURL + 'sys/exportTemplate/downloadFile/' + '?' + 'v_TemplateCode=' + templateCode + '&' + commitParams.join('&'))
    //     }).catch(() => {
    //       params.that.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    //   }
    // }
    // function switchFunc(rowData, interfaceData, cgiService, _this) {
    //   let commitParams = {}
    //   commitParams.i_Id = rowData.i_Id
    //   commitParams.i_IsUseOrgSon = rowData.i_IsUseOrgSon
    //   cgiService.modifyOrgPower(commitParams).then(res => {
    //     !res.code ? _this.$message.success(res.msg) : _this.$message.error(res.msg)
    //   })
    // }
  },
  components: {
    actionBar,
    stdTableAction
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  height: 100%;
  box-sizing: border-box;
  .el-form {
    border: none !important;
    padding: 3px  16px  16px 16px !important;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin: 15px 0;
      padding: 16px 0;
      box-sizing: border-box;
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
    }
        .stdTableAction {
          border: 1px solid #BFBFBF;
          flex: 1;
        }
  }
}
.con-box /deep/ .el-form-item__content {
  width: 520px;
}
.config-export /deep/ .el-upload-list__item {
  height: 30px;
  border: 1px solid #e6e6e6;
}
.el-cascader-panel /deep/ .el-cascader-menu /deep/ .el-scrollbar__wrap {
   margin-right: 0 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important
}

</style>
