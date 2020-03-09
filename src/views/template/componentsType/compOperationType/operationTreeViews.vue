<template>
  <div class="operation-tab">
    <div class="title-box" v-if="shareData.v_CateCode === 'CC_TR'">
      <span>
        <i class="iconfont icon-jibenxinxi"></i>
        <span>全局按钮</span>
      </span>
      <span>
        <i class="iconfont icon-jibenxinxi"></i>
        <span>节点按钮</span>
      </span>
    </div>
    <div class="title-box"  v-if="shareData.v_CateCode === 'CC_VW'">
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
      <div class="border-Box">
        <div class="operationsBox">
          <div class="viewOptionsTitle">
            <div class="operateBox">
              <div class="hoverBtn">
                <el-button
                  type="text"
                  @click="addGlobal"
                > <i class="iconfont icon-tianjia"></i> 添加</el-button>
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
              :data="globalOperaList"
              node-key="id"
              default-expand-all
              :expand-on-click-node="true"
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
            >
              <div
                class="custom-tree-node"
                slot-scope="{ data }"
              >
                <div class="treeIconBox">
                  <div class="treeIconBox-right">
                    <span>
                      <i class="iconfont icon-xitonganniu"></i>
                      {{ data.v_OperationName}}
                    </span>
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
                        :open-delay='200'
                        placement="bottom"
                      >
                        <i
                          class="iconfont icon-bianji"
                          @click.prevent.stop="editOpera(data)"
                        ></i>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="删除"
                        :open-delay='200'
                        placement="bottom"
                      >
                        <i
                          class="iconfont icon-shanchu-lajitong"
                          @click.prevent.stop="delOperations(data)"
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
      <div class="border-Box">
        <div class="optionsBox">
          <div class="viewOptionsTitle">
            <div class="operateBox">
              <div class="hoverBtn">
                <el-button
                  type="text"
                  @click="addNode"
                > <i class="iconfont icon-tianjia"></i> 添加</el-button>
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
              :data="nodeOperaList"
              node-key="id"
              default-expand-all
              :expand-on-click-node="true"
              :allow-drop="allowDrop"
              :allow-drag="allowDrag"
            >
              <div
                class="custom-tree-node"
                slot-scope="{ data }"
              >
                <div class="treeIconBox">
                  <div class="treeIconBox-right">
                    <span>
                      <i class="iconfont icon-xitonganniu"></i>
                      {{ data.v_OperationName}}
                    </span>
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
                        placement="bottom"
                        :open-delay='200'
                      >
                        <i
                          class="iconfont icon-bianji"
                          @click.prevent.stop="editOpera(data)"
                        ></i>
                      </el-tooltip>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        content="删除"
                        placement="bottom"
                        :open-delay='200'
                      >
                        <i
                          class="iconfont icon-shanchu-lajitong"
                          @click.prevent.stop="delOperations(data)"
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
   <mod-add-operation
       v-if="ifDialog"
      :ifDialog='ifDialog'
      :dialogTitle="dialogTitle"
      :sysData='sysData'
      @changDialog='changDialog'
      @dialogData='dialogData'
    >
  </mod-add-operation>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import modAddOperation from '@/views/template/componentsType/compOperationType/modAddOperation'
import { mapState } from 'vuex'
export default {
  name: 'operationTree',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formOperationsList: [],
      // 是否显示编辑操作弹框
      ifDialog: false,
      // 弹框标题
      dialogTitle: '',
      // 操作数据
      operationData: {},
      // 操作按钮的数据
      sysData: {},
      // 全局操作
      globalList: [],
      // 节点操作
      nodeList: [],
      // 操作分类  全局操作/ 节点操作
      type: '',
      // 全局系统操作数据
      globalOperaList: [],
      // 节点系统操作数据
      nodeOperaList: [],
      i_Id: '',
      title: ''
    }
  },
  computed: {
    ...mapState({
      rowData: state => state.fieTableData
    })
  },
  //  第一次进来 数据是否存在 v-CateCode 有进行调取弹框的值
  watch: {
    'rowData.v_CateCode': {
      immediate: true,
      handler (nv) {
        if (nv) {
          this.getGlobalSysOperation()
          this.getNodeSysOperation()
        }
      }
    }
  },
  // created () {
  //   this.getGlobalSysOperation()
  //   this.getNodeSysOperation()
  // },
  methods: {
    // 获取全局操作按钮数据
    getGlobalSysOperation () {
      let params = {
        i_Type: '1'
      }

      let code = this.rowData.v_CateCode

      cgiService.getSysOperation(code, params).then(res => {
        this.globalOperaList = res.data
      })
    },
    // 获取节点操作按钮数据
    getNodeSysOperation () {
      let params = {
        i_Type: '2'
      }
      let code = this.rowData.v_CateCode
      cgiService.getSysOperation(code, params).then(res => {
        this.nodeOperaList = res.data
      })
    },
    // 添加操作
    addGlobal () {
      this.ifDialog = true
      this.dialogTitle = '添加全局预定义操作'
      this.type = '1'
      this.sysData = {}
      if (this.rowData.v_CateCode === 'CC_VW') {
        this.dialogTitle = '添加视图预定义操作'
      } else {
        this.dialogTitle = '添加全局预定义操作'
      }
    },
    addNode () {
      this.sysData = {}
      this.ifDialog = true
      this.dialogTitle = '添加节点预定义操作'
      this.type = '2'
      if (this.rowData.v_CateCode === 'CC_VW') {
        this.dialogTitle = '添加行内预定义操作'
      } else {
        this.dialogTitle = '添加节点预定义操作'
      }
    },
    // 通过子组件调用父组件的方法  改变弹框的显示或隐藏
    changDialog (val) {
      this.ifDialog = val
      this.i_Id = ''
    },
    //  通过子组件调用父组件的方法  获取子组件的数据
    dialogData (data) {
      let params = {
        ...data
      }
      params.v_CateCode = this.rowData.v_CateCode
      if (this.type !== '') {
        params.i_Type = this.type
      }
      if (this.i_Id !== '') {
        params.i_Id = this.i_Id
      }
      cgiService.saveSysOperation(params).then(res => {
        if (res.code === 0) {
          if (Number(res.iId) >= 1) {
            this.i_Id = res.iId
          }
          this.$message.success(res.msg)
          this.getGlobalSysOperation()
          this.getNodeSysOperation()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeIshidden (data) {
      let params = {
        ...data
      }
      cgiService.saveSysOperation(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 修改按钮操作
    editOpera (row) {
      this.ifDialog = true
      this.sysData = Object.assign({}, row)
      if (row.v_CateCode === 'CC_VW') {
        if (row.i_Type === '1') {
          this.dialogTitle = '修改视图预定义操作'
        } else {
          this.dialogTitle = '修改行内预定义操作'
        }
      } else {
        if (row.i_Type === '1') {
          this.dialogTitle = '修改全局预定义按钮'
        } else {
          this.dialogTitle = '修改节点预定义按钮'
        }
      }
    },
    // 删除操作按钮
    delOperations (data) {
      let params = {
        ...data
      }
      params.i_Status = '9'
      this.$confirm('确定要删除此按钮?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.saveSysOperation(params).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.getGlobalSysOperation()
            this.getNodeSysOperation()
          } else {
            this.$message.error(res.msg)
          }
        })
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
    }
    // // 获取全局操作
    // queryTreeGlobalOperations () {
    //   this.$emit('queryTreeGlobalOperations', this.formData.v_TreeCode)
    // },
    // // 获取节点操作
    // queryTreeNodeOperations () {
    //   this.$emit('queryTreeNodeOperations', this.formData.v_TreeCode)
    // }

  },
  components: {
    modAddOperation
  }
}
</script>
<style lang="scss" scoped>
.operation-tab {
//  border: 4px solid #abd6ff;
//   height: 320px;
  overflow: auto;
  .title-box {
    padding-left: 15px;
    margin-top: 10px;
    > span {
      display: inline-block;
      width: 45%;
      font-size: 14px;
      color: #000000;
      &:last-of-type{
        margin-left: 22px;
      }
    }
  }
  .centerBox {
    display: flex;
    padding: 5px 15px;
    .border-Box {
      width: 50%;
      border: 1px solid #e6e6e6;
      height: 355px;
      &:last-of-type {
        margin-left: 10px;
      }
      .operateBox {
        height: 30px;
        background: none;
        border: none;
        line-height: 30px;
        padding: 0 16px;
        .addFiedBox {
          left: 0px;
        }
        .hoverBtn {
          font-size: 12px;
          .icon-tianjia {
            vertical-align: text-bottom;
            color: #5892f6;
          }
          .el-button {
            color: #333333;
          }
        }
      }
      .viewOptions {
        height: 100%;
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
        }
        > span:nth-of-type(3) {
          width: 20%;
          text-align: right;
        }
      }
      .custom-tree-node {
        width: 100%;
        .treeIconBox-right {
          > span {
            width: 43%;
          }
          .el-tooltip {
            width: 40%;
          }
          .iconBox {
            &:first-of-type {
              width: 16%;
              text-align: left;
              .el-switch {
                width: 50px;
              }
            }
            width: 33%;
            text-align: right;
          }
        }
      }
      .el-tree-node__children {
        .custom-tree-node {
          .treeIconBox-right {
            .el-tooltip {
              width: 27%;
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
              }
              text-align: right;
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
</style>
