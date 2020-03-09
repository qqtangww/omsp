<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-12 18:47:28
 * @LastEditTime: 2019-09-18 18:22:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class='page-operation'>
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData='configData' v-on="$listeners" :shareData='shareData' @sumitForm='sumitForm' @getData='getData'></action-bar>
    </div>
    <el-tabs type="border-card" v-model="tabNameOpera" @tab-click="handleClick" class="components-type-form">
      <el-tab-pane label="基本" name="operaBasic">
        <el-form inline-message :model="operationForm" ref="operationForm" label-width="150px">
          <div class="titleMsg">
            <i class="iconfont icon-jibenxinxi"></i>
            <span>基本信息</span>
          </div>
          <div class="conBox">
            <el-form-item label="名称：">
              <el-input v-model="operationForm.v_OperationName"></el-input>
            </el-form-item>
            <el-form-item label="图标：">
              <el-select v-model="operationForm.v_IconURL" placeholder="请选择" class="select-width">
                <el-option
                  v-for="item in iconList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <span>
                    <i :class="item.value" />
                  </span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述：" class='description-label'>
              <el-input
                v-model="operationForm.v_Description"
                placeholder="可填写相关描述，帮助用户记忆和了解"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 4}"
              />
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="权限" name="operasRole">
        <div class="permissionCon">
          <div class="borderDiv">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 权限
            </span>
            <div class="permissionBox clearfix">
              <div>
                <span>需要授权</span>
                <el-switch
                  v-model="operationForm.i_NeedAuthorized"
                  active-value="1"
                  @change="switchCommit('i_NeedAuthorized',operationForm)"
                  inactive-value="0"
                ></el-switch>
              </div>
              <div>
                <span>禁用</span>
                <el-switch
                  v-model="operationForm.i_IsDisabled"
                  active-value="1"
                  inactive-value="0"
                  @change="switchCommit('i_IsDisabled',operationForm)"
                ></el-switch>
              </div>
              <div>
                <span>代理使用</span>
                <el-switch
                  v-model="operationForm.enableagent"
                  active-value="1"
                  inactive-value="0"
                  @change="switchCommit('enableagent',operationForm)"
                ></el-switch>
              </div>
            </div>
          </div>
          <div class="borderDiv" v-show="operationForm.i_NeedAuthorized === '1'">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 授权角色
            </span>
            <div class="roleBox">
              <div class="searchBox clearfix">
                <el-input
                  placeholder="输入名称搜索"
                  clearable
                  v-model="roleSearchKey"
                  class="input-with-select"
                  @keydown.enter.native="querySearchOpera"
                >
                  <el-button slot="append" @click="querySearchOpera">
                    <i class="el-icon-search"></i>
                  </el-button>
                </el-input>
              </div>
              <div class="templateTabBox clearfix">
                <div class="roleLeft">
                  <el-table
                    ref="multipleTable"
                    :data="stayControlRol"
                    tooltip-effect="dark"
                    class="contentTable"
                    :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                    style="width: 100%"
                    height="315px"
                    @selection-change="noSelPeople">
                    <el-table-column type="selection" width="30" />
                    <el-table-column
                      label="待授权角色"
                      width="90"
                      prop="v_RoleName"
                      show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.v_RoleName }}</template>
                    </el-table-column>
                    <el-table-column
                      prop="v_Description"
                      label="描述"
                      width="auto"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">{{ scope.row.v_Description}}</template>
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    background
                    :total="paginationTotal"
                    class="paginationBoxSmall pagePagin"
                    layout="sizes,prev,pager,next"
                  />
                </div>
                <div class="dialogCommitBox">
                  <el-button
                    type="text"
                    @click="moveAddControl"
                    :disabled="formOptios.i_NeedAuthorized === '0'"
                  >
                    <i class="iconfont icon-tianjiachengyuanjiantouyou"></i>
                  </el-button>
                  <el-button
                    type="text"
                    @click="cancelAddControl"
                    :disabled="formOptios.i_NeedAuthorized === '0'"
                  >
                    <i class="iconfont icon-tianjiachengyuanjiantouzuo"></i>
                  </el-button>
                </div>
                <div class="roleRight">
                  <el-table
                    ref="multipleTable"
                    :data="endControlRol"
                    tooltip-effect="dark"
                    height="358px"
                    class="contentTable"
                    :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
                    style="width: 100%"
                    @selection-change="noSelPeople"
                  >
                    <el-table-column type="selection" width="30" />
                    <el-table-column label="已授权角色"  width="100" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.v_RoleName }}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="描述" width="auto" show-overflow-tooltip>
                      <template slot-scope="scope">{{ scope.row.v_Description}}</template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'pageOperation',
  props: {
    shareData: {
      type: Object,
      default () {}
    },
    configData: {
      type: Object,
      default () {}
    }
  },
  watch: {
    shareData: {
      deep: true,
      immediate: true,
      handler (nv) {
        this.operationForm = JSON.parse(JSON.stringify(nv))
      }
    },
    endControlRol (nv) {
      this.roledIdArr.length = 0
      if (nv.length === 0) {
        this.roledIdArr = []
      } else {
        nv.forEach(val => {
          this.roledIdArr.push(val.i_RoleID)
        })
      }
    },
    tabNameOpera (nv) {
      if (nv === 'operaBasic') {
        this.customShareData = {}
        this.customShareData.i_Id = this.operationForm.i_Id
        this.customShareData.v_OperationName = this.operationForm.v_OperationName
        this.customShareData.v_IconURL = this.operationForm.v_IconURL
        this.customShareData.v_Description = this.operationForm.v_Description
      } else {
        this.customShareData = {}
        this.customShareData.roleIds = this.roledIdArr
        this.$set(this.customShareData, 'v_OperationCode', this.operationForm.v_OperationCode)
        this.$set(this.customShareData, 'i_PageID', this.operationForm.i_PageID)
      }
    }
  },
  data () {
    return {
      operationForm: {},
      // 图标
      iconList: [
        {
          // 参数管理
          value: 'iconfont icon-canshuguanli'
        },
        {
          // 角色管理
          value: 'iconfont icon-jiaoseguanli'
        },
        // {
        //   // 个人中心
        //   value: 'iconfont icon-gerenzhongxin'
        // },
        {
          // 访问策略
          value: 'iconfont icon-fangwencelve'
        },
        {
          // 密码策略
          value: 'iconfont icon-mimacelve'
        },
        {
          // 配置管理
          value: 'iconfont icon-peizhiguanli'
        },
        {
          // 枚举管理
          value: 'iconfont icon-meijuguanli'
        },
        {
          // 快捷菜单
          value: 'iconfont icon-kuaijiecaidan'
        },
        {
          // 系统概要
          value: 'iconfont icon-xitonggaiyao'
        },
        {
          // 权限管理
          value: 'iconfont icon-quanxianguanli'
        },
        {
          // 用户管理
          value: 'iconfont icon-yonghuguanli'
        },
        {
          // 系统管理
          value: 'iconfont icon-xitongguanli'
        },
        {
          // 修改密码
          value: 'iconfont icon-xiugaimima'
        },
        {
          // 用户代理
          value: 'iconfont icon-yonghudaili'
        },
        {
          // 组织机构
          value: 'iconfont icon-zuzhijigou'
        },
        {
          // 用户群组
          value: 'iconfont icon-yonghuqunzu'
        },
        {
          // 页面管理
          value: 'iconfont icon-yemianguanli'
        },
        {
          // 业务类别
          value: 'iconfont icon-yewuleibie'
        }
        // {
        //   // 数据字典
        //   value: 'iconfont icon-shujukubiao'
        // },
        // {
        //   // 模板配置
        //   value: 'iconfont icon-shitupeizhi'
        // }
      ],
      roleSearchKey: '',
      // 待授权数据
      stayControlRol: [],
      // 设置默认显示第几页
      currentPage: 1,
      // 角色授权 设置一页显示多少条数据数组
      pageSizes: [5, 10, 50],
      // 角色授权 设置一页显示多少条数据
      pageSize: 10,
      // 共多少条数据
      paginationTotal: 0,
      // 已授权数据
      endControlRol: [],
      formOptios: {},
      tabNameOpera: 'operaBasic',
      roledIdArr: [],
      customShareData: {}
    }
  },
  created () {
    this.getRoleList(this.shareData.i_PageID)
  },
  methods: {
    handleClick (tab, event) {},
    // 刷新数据
    getData () {

    },
    sumitForm () {
      if (this.tabNameOpera === 'operaBasic') {
        // 如果是基本信息
        this.configData.tabNameOpera = 'operaBasic'
        this.$refs.operationForm.validate(valid => {
          if (valid) {
            cgiService.temPagesOperationSaveData2(this.operationForm).then(res => {
              if (!res.code) {
                this.$message.success(res.msg)
                this.$emit('getTableData')
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            return false
          }
        })
      } else {
        // 如果是角色授权
        cgiService.temPageOpertionGetRoledOpeartionList(this.operationForm.i_PageID, { v_OperationCode: this.operationForm.v_OperationCode, roleIds: this.operationForm.roleIds }).then(res => {
          if (!res.code) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 查询角色
    querySearchOpera () {
      let params = {
        keywords: this.operaKey,
        operationcode: this.editForm.operationcode
      }
      this.getPageOperaRoleList(this.pageid, params)
    },
    // 授权table 选中的值
    noSelPeople (val) {
      this.pitchArray = val
    },
    // 角色授权分页
    handleSizeChange (val) {
      this.pageSize = val
      let params = {
        index: this.currentPage,
        size: this.pageSize
      }
      this.getRoleList(this.pageid, params)
    },
    // 调取接口获取角色列表
    getRoleList (pageid, params) {
      cgiService.temPagesOperationGetRoleOpeartionList(pageid, { v_OperationCode: this.shareData.v_OperationCode }).then(res => {
        if (!res.code) {
          this.stayControlRol = res.data
          this.paginationTotal = res.totalCount
        }
      })
      cgiService.temPagesOperationGetRoledOpeartionList(pageid, { v_OperationCode: this.shareData.v_OperationCode }).then(res => {
        if (!res.code) {
          this.endControlRol = res.data
        }
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      let params = {
        index: this.currentPage,
        size: this.pageSize
      }
      this.getRoleList(this.pageid, params)
    },
    // 操作权限移动交互往右移
    moveAddControl () {
      if (this.pitchArray.length !== 0) {
        let newStayControlRol = []
        let tmpSelStayRoles = [] // 暂存已待授权角色
        // 遍历选中的数组
        this.pitchArray.forEach(item => {
          tmpSelStayRoles.push(item)
        })

        this.stayControlRol.forEach(val => {
          let isExist = 0
          tmpSelStayRoles.forEach(data => {
            if (val.i_RoleID === data.i_RoleID) {
              // 存贮已选中成员的 在 左边数组中的索引
              isExist = 1
              return false
            }
          })
          if (!isExist) {
            newStayControlRol.push(val)
          }
        })

        this.stayControlRol = newStayControlRol
        // 把选中的角色跟右边的数组合并
        if (!this.endControlRol) {
          this.endControlRol = []
        }
        this.endControlRol = this.endControlRol.concat(this.pitchArray)
        this.endControlRol = this.arrNewSet(this.endControlRol)
      }
    },
    // 操作权限移动交互往左移
    cancelAddControl () {
      // 判断  是否有选中checkbox
      if (this.pitchArray.length !== 0) {
        // 定义一个临时用来存储选中的变量
        let newPitchArray = []
        // 定义临时用来储存对比后的数据
        let newEndControlRol = []
        // 遍历选中的变量
        this.pitchArray.forEach(val => {
          newPitchArray.push(val)
        })

        this.endControlRol.forEach(val => {
          let isExist = 0
          newPitchArray.forEach(item => {
            if (val.i_RoleID === item.i_RoleID) {
              isExist = 1
              return false
            }
          })
          if (!isExist) {
            newEndControlRol.push(val)
          }
          this.endControlRol = newEndControlRol
        })
        this.stayControlRol = this.stayControlRol.concat(this.pitchArray)
        this.stayControlRol = this.arrNewSet(this.stayControlRol)
      }
    },
    switchCommit (fields, data) {
      let obj = {}
      obj.operationcode = data.v_OperationCode
      obj.id = data.i_Id
      obj.pageid = data.i_PageID
      obj[fields] = data[fields]
      cgiService.temPagesOperationSaveData2(obj).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          cgiService.getOperationList(data.i_PageID).then(res => {
            this.editList = res.data
          })
        }
      })
    },
    // 数组去重
    arrNewSet (arr) {
      var x = new Set(arr)
      return [...x]
    }
  },
  components: {
    actionBar
  }
}
// function save (params) {
//   params.that.$emit('sumitForm')
//   setTimeout(() => {
//     if (params.that.configData.allowCommit && params.that.configData.tabNameOpera === 'operaBasic') {
//       params.cgiService.temPagesOperationSaveData2(params.currentData).then(res => {
//         if (!res.code) {
//           params.that.$message.success(res.msg)
//           params.that.getTableData()
//         } else {
//           params.that.$message.error(res.msg)
//         }
//       })
//     } else {
//       params.cgiService.temPageOpertionGetRoledOpeartionList(params.currentData.i_PageID, { v_OperationCode: params.currentData.v_OperationCode, roleIds: params.currentData.roleIds }).then(res => {
//         if (!res.code) {
//           params.that.$message.success(res.msg)
//         } else {
//           params.that.$message.error(res.msg)
//         }
//       })
//     }
//   }, 300)
// }
</script>

<style scoped lang='scss'>
.page-operation {
    height: 100%;
    display: flex;
    flex-direction: column;
}
#pane-pageRole,
#pane-operasRole {
  padding: 5px;
  border: 4px solid #abd6ff;
  .permissionCon {
    padding: 10px 10px;
    // background: white;
    // height: 100%;
  }
  .borderDiv {
    border: 1px solid #bfbfbf;
    position: relative;
    &:last-of-type {
      margin-top: 16px;
    }
    > span {
      position: absolute;
      top: -10px;
      left: 8px;
      padding: 0 8px;
      background: #ffffff;
    }
    .permissionBox {
      padding: 24px 0 16px 13px;
      .el-switch {
        margin-left: 24px;
      }
      > div {
        float: left;
        &:nth-of-type(n + 2) {
          // margin-left: 78px;
        }
      }
    }
    .roleBox {
      padding: 10px;
      .templateTabBox {
        display: flex;
        align-items: center;
        > div {
          // float: left;
          &.roleLeft,
          &.roleRight {
            height: 100%;
            width: 46%;
            border: 1px solid #cccccc;
            .contentTable {
              border: none !important;
            }
            .paginationBoxSmall {
              border: none;
              border-top: 1px solid #cccccc;
            }
          }
          &.dialogCommitBox {
            width: 8%;
          }
        }
        .dialogCommitBox {
          border: none;
          width: 120px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          i {
            font-size: 28px;
            color: #2b8ed1;
          }
          > button:last-of-type {
            margin: 0;
          }
        }
      }
      .searchBox {
        width: 100%;
        margin-bottom: 8px;
        .input-with-select {
          width: 46%;
          float: left;
          > div.el-input-group__append {
            button {
              width: 44px;
              padding: 0;
            }
          }
        }
      }
    }
  }
}
#pane-operaBasic {
  .conBox {
    .el-cascader {
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>
