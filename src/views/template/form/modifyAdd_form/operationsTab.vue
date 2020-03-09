<!-- 表单操作按钮 -->
<template>
  <div class="border-box">
    <div class="optionsBox">
      <div class="viewOptionsTitle">
        <div class="operateBox">
          <div class="hoverBtn">
            <i class="iconfont icon-tianjia"></i> 添加<i class="el-icon-arrow-down el-icon--right"></i>
            <ul class="addFiedBox">
              <li @click="cateOptions('zhidingyi')">自定义按钮</li>
              <li @click="cateOptions('xitong')">预定义按钮</li>
              <li @click="cateOptions('fengexian')">分割线</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="viewOptions">
        <div class="viewTitle">
          <span>操作名</span>
          <span class="is-show">隐藏</span>
          <span>操作</span>
        </div>
        <el-tree
          :data="formOperationsList"
          node-key="id"
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag">
          <div
            class="custom-tree-node"
            slot-scope="{ data }"
          >
            <div class="treeIconBox">
              <div class="treeIconBox-right">
                <el-tooltip
                  content="自定义按钮"
                  placement="bottom-start"
                  :open-delay='500'
                  effect="dark"
                  v-if="data.i_ButType === '2'">
                  <span>
                    <i
                      class="iconfont icon-zidingyianniu"
                      v-if="data.i_ButType === '2'"
                    ></i>
                    <i
                      class="iconfont icon-xitonganniu"
                      v-if="data.i_ButType === '1'"
                    ></i>
                    <i
                      v-if="data.i_ButType === '4'"
                      class="iconfont icon-fengexian"
                    ></i>
                    {{ data.v_OperationName}}
                  </span>
                </el-tooltip>
                <el-tooltip
                  content="预定义按钮"
                  placement="bottom-start"
                  :open-delay='500'
                  effect="dark"
                  v-if="data.i_ButType === '1'">
                  <span>
                    <i
                      class="iconfont icon-zidingyianniu"
                      v-if="data.i_ButType === '2'"
                    ></i>
                    <i
                      class="iconfont icon-xitonganniu"
                      v-if="data.i_ButType === '1'"
                    ></i>
                    <i
                      class="iconfont icon-fengexian"
                      v-if="data.i_ButType === '4'"
                    ></i>
                    {{ data.v_OperationName}}
                  </span>
                </el-tooltip>
                <el-tooltip
                  content="分割线"
                  placement="bottom-start"
                  :open-delay='200'
                  effect="dark"
                  v-if="data.i_ButType === '4'">
                  <span>
                    <i
                      class="iconfont icon-zidingyianniu"
                      v-if="data.i_ButType === '2'"
                    ></i>
                    <i
                      class="iconfont icon-xitonganniu"
                      v-if="data.i_ButType === '1'"
                    ></i>
                    <i
                      class="iconfont icon-fengexian"
                      v-if="data.i_ButType === '4'"
                    ></i>
                    {{ data.v_OperationName}}
                  </span>
                </el-tooltip>
                <div class="iconBox">
                  <el-switch
                    v-model="data.i_isHidden"
                    active-value="1"
                    inactive-value="0"
                    @change="changeIshidden(data)"
                  >
                  </el-switch>
                </div>
                <div class="iconBox">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="添加"
                    :open-delay='500'
                    placement="bottom"
                    v-if="data.i_ButType === '2' && data.level === 1 ? true : false"
                  >
                    <i
                      class="iconfont icon-tianjia1"
                      @click.prevent.stop="addOptions(data)"
                    ></i>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="修改"
                    :open-delay='500'
                    placement="bottom"
                    v-if="data.v_OperationName === '分割线' ? false : true "
                  >
                    <i
                      class="iconfont icon-bianji"
                      @click.prevent.stop="editOptions(data)"
                    ></i>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除"
                    :open-delay='500'
                    placement="bottom"
                  >
                    <i
                      class="iconfont icon-shanchu-lajitong"
                      @click.prevent.stop="delOptions(data.i_Id)"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <modify-add-option
      ref="modifyAddOption"
      :ifDialog='ifDialog'
      :componentData='componentData'
      v-if="ifDialog"
      :isDisable='isDisable'
      :formData='shareData'
      :operationData='operationData'
      :stayRole='stayRole'
      :endRole='endRole'
      :toltal='toltal'
      @changeifDialog='changeifDialog'
      @changeRole='changeRole'
      @changeSize='changeSize'
      @changeIndex='changeIndex'
      @querySearch='querySearch'
      @customGetOperationData='customGetOperationData'
      @commit='commit'
      :dialogTitle='dialogTitle'
    >
    </modify-add-option>
    <system-operation ref="systemOperation"  @sysOptiosCommit='sysOptiosCommit'></system-operation>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import modifyAddOption from '@/views/template/modifyAddoperation/modifyAddOperation'
import systemOperation from '@/views/template/modifyAddoperation/systemOperation'
export default {
  name: 'operationsTab',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formOperationsList: [],
      // 权限是否禁用
      isDisable: '',
      // 是否显示编辑操作弹框
      ifDialog: false,
      // 弹框标题
      dialogTitle: '',
      // 操作数据
      operationData: {},
      // 待授权 权限
      stayRole: [],
      // 已授权 权限
      endRole: [],
      // 子组件传递过来的权限数据
      roleList: [],
      // 操作按钮id
      operationId: '',
      // 待权限条数
      toltal: 0,
      // 当前页
      index: 1,
      // 当前页条数
      size: 10,
      // 修改操作需要的id
      id: 0,
      componentData: {
        // 1代表显示列链接、2代表不显示三个是swtich开关、3代表正常显示
        roleFormType: '3',
        // 待授权接口
        awaitApi: 'getAwaitJurisdiction',
        // 已授权接口
        alreadyApi: 'getEndJurisdiction',
        // 保存接口
        saveApi: 'saveOperationBtn',
        // 权限盒子文字
        roleText: '授权角色',
        // 保存接口后面是否需要拼接参数
        commitRelyOnValue: false,
        // url后面拼接的字段
        getFieldKey: 'v_FormCode',
        // url后面拼接的字段
        getFieldValue: '',
        // post依赖的字段名
        postFieldKey: 'v_OperationId',
        // post依赖的字段值
        postFieldValue: '',
        // 提交的时候，已授权字段名
        alreadyFieldKey: 'roleData',
        // 依赖的数据
        relyOnData: {
          i_Id: '',
          v_OperationCode: '',
          v_OperationName: '',
          v_OperationId: '',
          v_FormCode: '',
          i_ButType: ''
        },
        // 三个switch盒子依赖的数据
        switchData: {
          i_NeedAuthorized: '0',
          i_IsDisabled: '0',
          i_EnableAgent: '0'
        },
        // 是否是行内操作按钮【修改】
        isInline: false,
        // 自定义小红点
        customRed: true,
        // 是否需要调用自定义刷新的方法
        isCustomUpdate: true,
        // 自定义刷新的方法
        customUpdateAPI: 'customGetOperationData',
        // 如果roleFormType为2，就传true，其余传false
        showRoleBox: false
      }
    }
  },
  computed: {
    formCode () {
      let rowTabData = this.$store.state.rowTabData
      return rowTabData.v_FormCode
    }
  },
  created () {
    this.queryOperationsBtn()
  },
  methods: {
    dataEmit (newData) {
      this.componentData.getFieldValue = newData.v_FormCode
      this.componentData.postFieldValue = newData.v_OperationId
      this.componentData.isInline = true
      this.componentData.switchData = {
        i_NeedAuthorized: newData.i_NeedAuthorized,
        i_IsDisabled: newData.i_IsDisabled,
        i_EnableAgent: newData.i_EnableAgent
      }
      this.componentData.relyOnData = {
        i_Id: newData.i_Id,
        v_OperationCode: newData.v_OperationCode,
        v_OperationName: newData.v_OperationName,
        v_OperationId: newData.v_OperationId,
        v_FormCode: newData.v_FormCode,
        i_ButType: newData.i_ButType
      }
    },
    customGetOperationData () {
      this.queryOperationsBtn()
    },
    cateOptions (val) {
      if (val === 'zhidingyi') {
        this.ifDialog = true
        this.isDisable = true
        this.operationData = Object.assign({}, {})
        this.id = ''
        this.operationId = ''
        this.dialogTitle = '添加自定义操作'
      } else if (val === 'fengexian') {
        let params = {
          i_ButType: '4',
          v_OperationName: '分割线',
          v_FormCode: this.formCode
        }
        cgiService.saveOperationBtn(params).then(res => {
          if (res.code === 0) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.queryOperationsBtn()
          }
        })
      } else {
        // 添加预定义按钮操作
        this.$refs.systemOperation.innerVisibleTolsOption = true
        this.$refs.systemOperation.optionsTitle = '修改表单预定义操作'
        let params = {
          v_CateCode: 'CC_FM'
        }
        cgiService
          .getSysOperationsBtn(this.formCode, params)
          .then(res => {
            if (res.code === 0) {
              this.$refs.systemOperation.sysOptions = res.data
              this.isDisable = false
            }
          })
      }
    },
    // 添加自定义操作
    addOptions (row) {
      this.ifDialog = true
      this.isDisable = true
      this.dialogTitle = '添加自定义操作'
      this.operationId = row.v_OperationId
      this.operationData = Object.assign({}, {})
      this.type = '1'
      this.id = ''
      let params = {
        index: this.index,
        size: this.size
      }
      // 获取代授权
      this.queryAwaitJurisdiction(params)
      // 获取已授权
      this.queryEndJurisdiction()
    },
    // 修改操作按钮
    editOptions (data) {
      this.operationId = data.v_OperationId
      this.ifDialog = true
      this.isDisable = false
      this.dialogTitle = '修改表单预定义操作'
      this.operationData = Object.assign({}, data)
      let params = {
        index: this.index,
        size: this.size
      }
      // 获取代授权
      this.queryAwaitJurisdiction(params)
      // 获取已授权
      this.queryEndJurisdiction()
      // 获取弹框容器
      this.queryDialogVessel()
      // 获取组件
      this.queryComponents()
      // 往权限组件中传值
      this.dataEmit(this.operationData)
    },
    // 删除操作
    delOptions (id) {
      let params = {
        i_Id: id
      }
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService
          .delOperationsBtn(this.formCode, params)
          .then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.queryOperationsBtn()
            } else {
              this.$message.error(res.msg)
            }
          })
      })
    },
    // 添加操作按钮
    commit (data) {
      let params = {
        ...data
      }
      if (this.operationId !== '') {
        this.$set(params, 'v_OperationId', this.operationId)
      }
      if (this.id > 0) {
        this.$set(params, 'i_Id', this.id)
      }
      this.$set(params, 'v_FormCode', this.formCode)
      cgiService.saveOperationBtn(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.isDisable = false
          this.queryOperationsBtn()
          if (res.iId > 0 && res.v_OperationId !== null) {
            this.id = res.iId
            this.operationId = res.v_OperationId
            let params1 = {
              index: this.index,
              size: this.size
            }
            // 获取代授权
            this.queryAwaitJurisdiction(params1)
            // 获取已授权
            this.queryEndJurisdiction()
          }
          // 往权限组件中传值
          this.dataEmit(params)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDragStart (node, ev) {
      // console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      let newArray = []
      let params = {}
      this.formOperationsList.forEach(val => {
        params = {
          i_Id: val.i_Id,
          children: val.children
        }
        newArray.push(params)
        newArray.forEach(val => {
          if (val.children) {
            val.children.forEach(item => {
              for (const key in item) {
                delete item.d_CreateTime
                delete item.d_LastModifiedTime
                delete item.i_ButSort
                delete item.i_ButType
                delete item.i_EnableAgent
                delete item.i_IsDisabled
                delete item.i_IsRecordLog
                delete item.i_NeedAuthorized
                delete item.i_OpenMode
                delete item.i_RunMode
                delete item.i_SortNO
                delete item.i_Status
                delete item.i_Type
                delete item.i_isHidden
                delete item.level
                delete item.v_ComponentCode
                delete item.v_ComponentConfigCode
                delete item.v_Creator
                delete item.v_DialogCode
                delete item.v_FormCode
                delete item.v_Func
                delete item.v_IconURL
                delete item.v_LastModifiedUser
                delete item.v_LinkPage
                delete item.v_OperationCode
                delete item.v_OperationId
                delete item.v_OperationName
                delete item.v_OperationParentId
                delete item.i_DisplayStyle
                delete item.leaf
                delete item.ishidden
                delete item.v_CateCode
                delete item.v_RegionCode
              }
            })
          }
        })
      })
      let id = JSON.stringify(newArray)

      let param = {
        ids: id
      }
      cgiService.sortOperations(this.formCode, param).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          cgiService.getOperationBtn(this.formCode).then(res => {
            if (res.code === 0) {
              this.formOperationsList = res.data
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {},
    allowDrop (draggingNode, dropNode, type) {
      if (type === 'prev') {
        return true
      } else if (type === 'next') {
        return true
      }
    },
    allowDrag (draggingNode) {
      if (draggingNode.data.children) {
        return true
      } else {
        return true
      }
    },
    // 子组件回调事件
    changeifDialog (val) {
      this.ifDialog = val
    },
    // 子组件回调事件改变权限数据
    changeRole (arr) {
      if (arr) {
        this.roleList = arr
      }
    },
    // 子组件回调事件 改变分页条数数据
    changeSize (params) {
      if (params) {
        this.queryAwaitJurisdiction(params)
      }
    },
    // 子组件回调事件 改变分页当前页数据
    changeIndex (params) {
      if (params) {
        this.queryAwaitJurisdiction(params)
      }
    },
    querySearch (keywords) {
      let params = {
        index: this.index,
        size: this.size,
        keywords: keywords
      }
      this.queryAwaitJurisdiction(params)
    },
    // 操作按钮 是否隐藏
    changeIshidden (data) {
      let params = {
        ...data
      }
      cgiService.saveOperationBtn(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        }
      })
    },
    sysOptiosCommit (arr) {
      arr.forEach(v => {
        v.i_Type = '1'
      })
      let params = {
        data: JSON.stringify(arr)
      }
      cgiService
        .saveSysOperationsBtn(this.formCode, params)
        .then(res => {
          if (res.code === 0) {
            this.queryOperationsBtn()
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        })
    },
    // 获取待授权 权限
    queryAwaitJurisdiction (params) {
      this.$set(params, 'v_OperationId', this.operationId)
      cgiService
        .getAwaitJurisdiction(this.formCode, params)
        .then(res => {
          this.stayRole = res.data
          this.toltal = res.totalCount
        })
    },
    // 获取已授权 权限
    queryEndJurisdiction () {
      let params = {
        v_OperationId: this.operationId
      }
      cgiService
        .getEndJurisdiction(this.formCode, params)
        .then(res => {
          this.endRole = res.data
        })
    },
    // 获取操作按钮
    queryOperationsBtn () {
      cgiService.getOperationBtn(this.formCode).then(res => {
        this.formOperationsList = res.data
      })
    },
    // 获取弹框容器
    queryDialogVessel () {
      cgiService.getDialogVessel().then(res => {
        if (res.code === 0) {
          // this.$refs.operationForm.$refs.operationInfo.dialogCode = res.data
        }
      })
    },
    // 获取组件
    queryComponents () {
      cgiService.getEnumValues().then(res => {
        if (res.code === 0) {
          // this.$refs.operationForm.$refs.operationInfo.componentCode = res.data
        }
      })
    },
    // 获取组件配置
    queryComponentConfig (val1, val2) {
      let params = {
        i_Cate: val1,
        v_CateCode: val2
      }
      cgiService.getComponentsConfig(params).then(res => {
        // this.$refs.operationForm.$refs.operationInfo.componentConfigCode = res.data
      })
    }
  },
  mounted () {},
  components: {
    modifyAddOption,
    systemOperation
  },
  mixins: [mixin]
}
</script>
<style lang="scss" scoped>
.border-box {
 flex: 1;
 padding: 10px;
 overflow: auto;
 box-sizing: border-box;
  > span {
    position: absolute;
    top: -26px;
    padding: 0 10px;
    background: #ffffff;
    left: -14px;
  }
  .optionsBox {
    border: 1px solid #e6e6e6;
    .viewOptionsTitle {
      .operateBox {
        box-sizing: border-box;
        z-index: 120;
        margin-top: 2px;
        margin-bottom: 1px;
        background: #ffffff;
        border: none;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        .hoverBtn {
          font-size: 12px;
          cursor: pointer;
          .icon-tianjia {
            vertical-align: middle;
            color: #5892f6;
          }
        }
        .addFiedBox {
          left: 0;
        }
      }
    }
    .viewOptions {
      min-height: 355px;
      .viewTitle {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 10px;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        background: rgba(247, 247, 247, 0.8);
        > span {
          flex: 2;
          &:first-of-type {
            flex: 6;
          }
          &:last-of-type {
            text-align: right;
          }
        }
      }
      .el-tree {
        overflow: auto;
        height: 264px;
        .el-tree-node__content {
          .custom-tree-node {
            width: 100%;
            height: 100%;
            align-content: center;
            .treeIconBox-right {
              height: 100%;
              align-items: center;
              > span {
                width: 45%;
                font-size: 12px;
              }
              .iconBox {
                width: 140px;
                > i {
                  margin-right: 6px;
                  &:last-of-type {
                    color: #f55e5e;
                  }
                }
                &:last-of-type {
                  text-align: right;
                }
                text-align: center;
                line-height: 100%;
              }
            }
          }
        }
      }
      .border-box {
        margin-top: 5px;
        padding: 0;
        .el-form-item {
          margin-top: 0;
          padding: 0;
          .el-form-item__content {
            width: 100%;
            > div {
              border-bottom: 1px solid #e6e6e6;
              display: flex;
              justify-content: space-between;
              padding: 0 10px;
              .el-checkbox {
                flex: 7;
              }
              > span {
                flex: 2;
                &.viewSysOption {
                  flex: 1;
                }
              }
              &:last-of-type {
                border-bottom: none;
              }
            }
            .addOptionsBox {
              padding: 0 60px;
              .iconfont {
                vertical-align: text-bottom;
              }
            }
          }
        }
      }
    }
  }
}
.viewOptions .el-tree /deep/ .el-tree-node__content .el-tree-node__expand-icon {
  padding: 0;
}
.el-tree /deep/ .el-tree-node__content {
  padding-left: 2px !important;
}
</style>
