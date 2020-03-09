<!-- 视图操作按钮 -->
<template>
  <div class="operation-tab">
    <div class="title-box">
      <span>
        <i class="iconfont icon-jibenxinxi"></i>
        <span>视图操作</span>
      </span>
      <span>
        <i class="iconfont icon-jibenxinxi"></i>
        <span>行内操作</span>
      </span>
    </div>
    <div class="centerBox">
      <div class="border-box">
        <div class="operationsBox">
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
              <span>隐藏</span>
              <span>操作</span>
            </div>
            <el-tree
              :data="globalList"
              node-key="id"
              default-expand-all
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              :expand-on-click-node="true"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
            >
              <div
                class="custom-tree-node"
                slot-scope="{ data }"
              >
                <div class="treeIconBox">
                  <div class="treeIconBox-right">
                    <el-tooltip
                      content="自定义按钮"
                      placement="bottom-start"
                      :open-delay='350'
                      effect="dark"
                      v-if="data.i_ButType === '2'"
                    >
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
                      content="预定义按钮"
                      placement="bottom-start"
                      :open-delay='350'
                      effect="dark"
                      v-if="data.i_ButType === '1'"
                    >
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
                      :open-delay='350'
                      effect="dark"
                      v-if="data.i_ButType === '4'"
                    >
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
                        :open-delay='350'
                        placement="bottom-start"
                        v-if="data.i_ButType === '2' && data.level === 1 ? true : false"
                      >
                        <i
                          class="iconfont icon-tianjia1"
                          @click.prevent.stop="addOperations(data)"
                        ></i>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="修改"
                        :open-delay='350'
                        placement="bottom-start"
                        v-if="data.i_ButType === '4' ? false : true "
                      >
                        <i
                          class="iconfont icon-bianji"
                          @click.prevent.stop="editOperations(data)"
                        ></i>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="删除"
                        :open-delay='350'
                        placement="bottom-start"
                      >
                        <i
                          class="iconfont icon-shanchu-lajitong"
                          @click.prevent.stop="delOperations(data.i_Id)"
                        ></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="border-box">

        <div class="optionsBox">
          <div class="viewOptionsTitle">
            <div class="operateBox">
              <div
                type="text"
                class="hoverBtn"
              >
                <i class="iconfont icon-tianjia"></i> 添加<i class="el-icon-arrow-down el-icon--right"></i>
                <ul class="addFiedBox">
                  <li @click="rowCateOptions('zhidingyi')">自定义按钮</li>
                  <li @click="rowCateOptions('xitong')">预定义按钮</li>
                </ul>
              </div>

            </div>
          </div>
          <div class="viewOptions">
            <div class="viewTitle">
              <span>操作名</span>
              <span>隐藏</span>
              <span>操作</span>
            </div>
            <el-tree
              :data="rowList"
              node-key="id"
              default-expand-all
              @node-drag-start="handleDragStart"
              @node-drag-enter="handleDragEnter"
              @node-drag-leave="handleDragLeave"
              @node-drag-over="handleDragOver"
              @node-drag-end="handleDragEnd"
              @node-drop="handleDrop"
              :expand-on-click-node="true"
              draggable
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
            >
              <div
                class="custom-tree-node"
                slot-scope="{ data }"
              >
                <div class="treeIconBox">
                  <div class="treeIconBox-right">
                    <el-tooltip
                      content="自定义按钮"
                      placement="bottom-start"
                      :open-delay='350'
                      effect="dark"
                      v-if="data.i_ButType === '2'"
                    >
                      <span>
                        <i
                          class="iconfont icon-zidingyianniu"
                          v-if="data.i_ButType === '2'"
                        ></i>
                        <i
                          class="iconfont icon-xitonganniu"
                          v-if="data.i_ButType === '1'"
                        ></i>
                        {{ data.v_OperationName}}
                      </span>
                    </el-tooltip>
                    <el-tooltip
                      content="预定义按钮"
                      placement="bottom-start"
                      :open-delay='350'
                      effect="dark"
                      v-if="data.i_ButType === '1'"
                    >
                      <span>
                        <i
                          class="iconfont icon-zidingyianniu"
                          v-if="data.i_ButType === '2'"
                        ></i>
                        <i
                          class="iconfont icon-xitonganniu"
                          v-if="data.i_ButType === '1'"
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
                        content="修改"
                        placement="bottom-start"
                        :open-delay='350'
                      >
                        <i
                          class="iconfont icon-bianji"
                          @click.prevent.stop="editOperations(data)"
                        ></i>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="删除"
                        placement="bottom-start"
                        :open-delay='350'
                      >
                        <i
                          class="iconfont icon-shanchu-lajitong"
                          @click.prevent.stop="delOperations(data.i_Id)"
                        ></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </el-tree>
          </div>
        </div>
      </div>
    </div>
    <!-- <modify-add-option ref="operationForm" v-model="showDialog"  :title='dialogTitle' :butType='butType' :type='type' :interface='saveOperationBtn' :treeData='treeData'  :treeCode='treeCode'></modify-add-option> -->
    <modify-add-option
      ref="modifyAddOption"
      :ifDialog='ifDialog'
      v-if="ifDialog"
      :componentData='componentData'
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
      :shareData='shareData'
    >
    </modify-add-option>
    <system-operation
      ref="systemOperation"
      @sysOptiosCommit='sysOptiosCommit'
    ></system-operation>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import modifyAddOption from '@/views/template/modifyAddoperation/modifyAddOperation'
import systemOperation from '@/views/template/modifyAddoperation/systemOperation'
export default {
  name: 'operationTab_View',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      // 是否显示编辑操作弹框
      ifDialog: false,
      // 权限是否禁用
      isDisable: '',
      // 视图编码
      viewId: '',

      // 操作数据
      operationData: {},
      // 待授权 权限
      stayRole: [],
      // 已授权 权限
      endRole: [],
      // 待权限条数
      toltal: 0,
      // 弹框标题
      dialogTitle: '',
      // 操作按钮id
      operationId: '',
      // 当前页
      index: 1,
      // 当前页条数
      size: 10,
      // 修改操作需要的id
      id: 0,
      treeCode: '',
      // 树形配置的数据
      treeData: {},
      // 全局操作
      globalList: [],
      // 节点操作
      rowList: [],
      roleList: [],
      // 是否显示编辑操作弹框
      showDialog: false,
      // 操作分类  自定义/ 系统/ 分割线
      butType: '',
      // 操作分类  全局操作/ 节点操作
      type: '',

      i_Type: '',
      // 分页总数据
      totalCount: 0,
      jurisdiction: [],
      componentData: {
        // 1代表显示列链接、2代表不显示三个是swtich开关、3代表正常显示
        roleFormType: '3',
        // 待授权接口
        awaitApi: 'awaitTemControl',
        // 已授权接口
        alreadyApi: 'endTemControl',
        // 保存接口
        saveApi: 'addTemCustomOptions',
        // 权限盒子文字
        roleText: '授权角色',
        // 保存接口后面是否需要拼接参数
        commitRelyOnValue: true,
        // url后面拼接的字段
        getFieldKey: 'v_ViewID',
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
  watch: {
    shareData: {
      handler: function (data) {
        if (data.v_ViewID) {
          this.viewId = data.v_ViewID
        }
        if (data.activeName === '3') {
          this.queryViewOperations()
          this.queryViewRowOperations()
        }
      },
      deep: true
    },
    // 编辑操作弹框的显示/隐藏
    ifDialog: {
      handler: function (val) {
        if (!val) {
          this.id = 0
          this.type = ''
          this.operationId = ''
          this.roleList = []
        }
      },
      immediate: true
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      this.viewId = formData.v_ViewID
      this.queryViewOperations()
      this.queryViewRowOperations()
    }
  },
  methods: {
    dataEmit (newData) {
      this.componentData.getFieldValue = newData.v_ViewID
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
        i_ButType: newData.i_ButType
      }
    },
    customGetOperationData () {
      this.queryViewOperations()
      this.queryViewRowOperations()
    },
    cateOptions (str) {
      if (str === 'zhidingyi') {
        this.type = '1'
        this.ifDialog = true
        this.isDisable = true
        this.operationData = Object.assign({}, {})
        this.dialogTitle = '添加自定义操作'
        this.queryEndJurisdiction()
      } else if (str === 'xitong') {
        this.i_Type = '1'
        // 添加系统按钮操作
        this.$refs.systemOperation.innerVisibleTolsOption = true
        this.$refs.systemOperation.optionsTitle = '添加预定义操作'
        let params = {
          v_CateCode: 'CC_VW',
          i_Type: '1'
        }
        cgiService.getSysOperationsBtn(this.viewId, params).then(res => {
          if (res.code === 0) {
            this.$refs.systemOperation.sysOptions = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        let params = {
          i_Type: '1',
          i_ButType: '4',
          v_OperationName: '分割线'
        }
        cgiService.addTemCustomOptions(this.viewId, params).then(res => {
          if (res) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.queryViewOperations()
          }
        })
      }
    },
    // 节点按钮操作
    rowCateOptions (str) {
      if (str === 'zhidingyi') {
        this.type = '2'
        this.ifDialog = true
        this.isDisable = true
        this.operationData = Object.assign({}, {})
        this.dialogTitle = '添加自定义操作'
      } else if (str === 'xitong') {
        this.i_Type = '2'
        // 添加系统按钮操作
        this.$refs.systemOperation.innerVisibleTolsOption = true
        this.$refs.systemOperation.optionsTitle = '添加预定义操作'
        let params = {
          v_CateCode: 'CC_VW',
          i_Type: '2'
        }
        cgiService.getSysOperationsBtn(this.viewId, params).then(res => {
          if (res.code === 0) {
            this.$refs.systemOperation.sysOptions = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    // 修改按钮操作
    editOperations (row) {
      if (row.i_Type === '1') {
        this.dialogTitle = '修改视图按钮操作'
      }
      if (row.i_Type === '2') {
        this.dialogTitle = '修改行内按钮操作'
      }
      this.operationId = row.v_OperationId
      this.ifDialog = true
      this.isDisable = false
      this.dialogTitle = '修改自定义操作'
      this.operationData = Object.assign({}, row)
      let params = {
        index: this.index,
        size: this.size
      }
      // 获取代授权
      this.queryAwaitJurisdiction(params)
      // 获取已授权
      this.queryEndJurisdiction()
      // 往权限组件中传值
      this.dataEmit(this.operationData)
    },
    // 删除操作按钮
    delOperations (id) {
      let params = {
        i_Id: id
      }
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService
          .delTemSysOptions(this.viewId, params)
          .then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.queryViewOperations()
              this.queryViewRowOperations()
            } else {
              this.$message.error(res.msg)
            }
          })
      })
    },
    // 添加操作
    addOperations (row) {
      this.operationId = row.v_OperationId
      this.ifDialog = true
      this.isDisable = false
      this.type = '1'
      this.dialogTitle = '添加自定义操作'
      this.operationData = Object.assign({}, {})
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
    querySearch (keywords) {
      let params = {
        index: this.index,
        size: this.size,
        keywords: keywords
      }
      this.queryAwaitJurisdiction(params)
    },
    // 子组件回调事件 改变分页当前页数据
    changeIndex (params) {
      if (params) {
        this.queryAwaitJurisdiction(params)
      }
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

      if (this.type !== '') {
        this.$set(params, 'i_Type', this.type)
      }
      cgiService.addTemCustomOptions(this.viewId, params).then(res => {
        if (res.code === 0) {
          // this.ifDialog = false
          this.$message.success(res.msg)
          this.isDisable = false
          this.queryViewOperations()
          this.queryViewRowOperations()
          if (Number(res.data.iId) > 0 && res.data.operationid !== null) {
            this.id = res.data.iId
            this.operationId = res.data.operationid
          }
          let params1 = {
            index: this.index,
            size: this.size
          }
          // 获取代授权
          this.queryAwaitJurisdiction(params1)
          // 获取已授权
          this.queryEndJurisdiction()
          // 往权限组件中传值
          this.$set(params, 'v_ViewID', this.viewId)

          this.dataEmit(params)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeIshidden (data) {
      let params = {
        ...data
      }
      cgiService.addTemCustomOptions(this.viewId, params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
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
      let arr = []
      let obj = {}
      let params1 = {}
      // 判断调序的 操作   视图级 / 行内操作
      if (dropNode.data.i_Type === '1') {
        // 拖动调序所需要的数据
        this.globalList.forEach(val => {
          obj = {
            i_Id: val.i_Id
          }
          if (val.children) {
            let children = []
            val.children.forEach(item => {
              params1 = {
                i_Id: item.i_Id
              }
              children.push(params1)
              this.$set(obj, 'children', children)
            })
          }
          arr.push(obj)
        })
      } else {
        // 拖动调序所需要的数据
        this.rowList.forEach(val => {
          obj = {
            i_Id: val.i_Id
          }
          if (val.children) {
            let children = []
            val.children.forEach(item => {
              params1 = {
                i_Id: item.i_Id
              }
              children.push(params1)
              this.$set(obj, 'children', children)
            })
          }
          arr.push(obj)
        })
      }
      let params = {
        ids: JSON.stringify(arr)
      }
      cgiService.moveTemCustomOptions(this.viewId, params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.queryViewOperations()
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
    // 获取视图操作
    queryViewOperations () {
      let params = {
        i_Type: '1'
      }
      cgiService.getTemViewOptions(this.viewId, params).then(res => {
        if (res.code === 0) {
          this.globalList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取视图行内操作
    queryViewRowOperations () {
      let params = {
        i_Type: '2'
      }
      cgiService.getTemViewOptions(this.viewId, params).then(res => {
        if (res.code === 0) {
          this.rowList = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 获取待授权 权限
    queryAwaitJurisdiction (params) {
      this.$set(params, 'v_OperationId', this.operationId)
      cgiService
        .awaitTemControl(this.viewId, params)
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
        .endTemControl(this.viewId, params)
        .then(res => {
          this.endRole = res.data
        })
    },
    // 系统按钮提交
    sysOptiosCommit (arr) {
      arr.forEach(v => {
        v.i_Type = this.i_Type
      })
      let params = {
        data: JSON.stringify(arr)
      }
      cgiService
        .addTemSysOptions(this.viewId, params)
        .then(res => {
          if (res.code === 0) {
            this.queryViewOperations()
            this.queryViewRowOperations()
            this.$message.success(res.msg)
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    jurisdictionList (arr) {
      this.jurisdiction = arr
    }
  },
  components: {
    modifyAddOption,
    systemOperation
  }
}
</script>
<style lang="scss" scoped>
.operation-tab {
  height: 100%;
  overflow: auto;
  .title-box {
    padding: 0 20px;
    margin-top: 10px;
    > span {
      display: inline-block;
      width: 45%;
      font-size: 14px;
      color: #000000;
      &:first-of-type{
        padding-left: 8px;
      }
      &:last-of-type{
        padding-left: 34px;
      }
    }
  }
  .centerBox {
    display: flex;
    padding: 5px 30px;
    .border-box {
      width: 50%;
      border: 1px solid #e6e6e6;
      &:last-of-type {
        margin-left: 10px;
      }
      .operateBox {
        height: 30px;
        background: none;
        border: none;
        line-height: 30px;
        padding: 0 12px;
        .hoverBtn {
          cursor: pointer;
        }
        .addFiedBox {
          left: 0px;
        }
      }
      .viewOptions {
        height: 462px;
      }
      .viewTitle {
        line-height: 30px;
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 10px;
        border-top: 1px solid #e6e6e6;
        border-bottom: 1px solid #e6e6e6;
        background: rgba(247, 247, 247, 0.8);
        > span:nth-of-type(1) {
          width: 50%;
        }
        > span:nth-of-type(2) {
          width: 30%;
          padding-left: 20px;
        }
        > span:nth-of-type(3) {
          width: 20%;
          text-align: center;
        }

      }
      .custom-tree-node {
        width: 100%;
        .treeIconBox-right {
          .el-tooltip {
            width: 40%;
          }
          .iconBox {
            &:first-of-type {
              width: 20%;
              .el-switch {
                width: 50px;
              }
            }
            &:last-of-type {
              text-align: right;
            }
            width: 33%;
            text-align: center;
          }
        }
      }
      .el-tree-node__children {
        .custom-tree-node {
          .treeIconBox-right {
            .el-tooltip {
              width: 28%;
            }
            .iconBox {
              &:first-of-type {
                width: 20%;
                .el-switch {
                  width: 50px;
                }
              }
              &:last-of-type {
                width: 21%;
                text-align: right;
              }
              text-align: center;
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
  padding-left: 6px !important;
}
</style>
