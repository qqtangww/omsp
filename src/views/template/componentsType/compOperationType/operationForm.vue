<template>
  <div class="border-box">
    <div class="optionsBox">
      <div class="viewOptionsTitle">
        <div class="operateBox">
          <div
            class="hoverBtn"
            @click="changeSelection"
          >
            <el-button
              type="text"
              @click="add()"
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
                    :open-delay='500'
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
                    :open-delay='500'
                    placement="bottom"
                  >
                    <i
                      class="iconfont icon-shanchu-lajitong"
                      @click.prevent.stop="delOptions(data)"
                    ></i>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <mod-add-operation
      :ifDialog='ifDialog'
      v-if="ifDialog"
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
import { mixin } from '@/assets/js/base.js'
import modAddOperation from '@/views/template/componentsType/compOperationType/modAddOperation'
import { mapState } from 'vuex'
export default {
  name: 'operationsTab',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [mixin],
  data () {
    return {
      formOperationsList: [],
      // 是否显示编辑操作弹框
      ifDialog: false,
      // 弹框标题
      dialogTitle: '',
      // 操作数据
      operationData: {},
      // 操作按钮id
      operationId: '',
      // 操作按钮的数据
      sysData: {},
      i_Id: ''
    }
  },
  computed: {
    ...mapState({
      rowData: state => state.fieTableData
    })
  },
  watch: {
    rowData: {
      immediate: true,
      handler (nv) {
        this.getFormSysOperation()
      }
    }
  },
  methods: {
    // 获取操作按钮数据
    getFormSysOperation () {
      let params = {
        i_Type: '1'
      }
      let code = this.rowData.v_CateCode
      cgiService.getSysOperation(code, params).then(res => {
        this.formOperationsList = res.data
      })
    },
    // 添加操作
    add () {
      this.ifDialog = true
      this.dialogTitle = '添加表单预定义按钮'
      this.sysData = {}
    },
    // 通过子组件调用父组件的方法  改变弹框的显示或隐藏
    changDialog (val) {
      this.ifDialog = val
      this.i_Id = ''
    },
    // // 通过子组件调用父组件的方法  获取子组件的数据
    dialogData (data) {
      let params = {
        ...data
      }
      params.v_CateCode = this.configData.v_CateCode
      params.i_Type = '1'
      if (this.i_Id !== '') {
        params.i_Id = this.i_Id
      }
      cgiService.saveSysOperation(params).then(res => {
        if (res.code === 0) {
          if (Number(res.iId) >= 1) {
            this.i_Id = res.iId
          }
          this.$message.success(res.msg)
          this.getFormSysOperation()
          this.$emit('changeOperaList', this.configData.v_CateCode)
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
    // 修改操作按钮
    editOpera (data) {
      this.sysData = {
        ...data
      }
      this.ifDialog = true
      this.dialogTitle = '修改表单预定义按钮'
    },
    // 删除操作
    delOptions (data) {
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
            this.getFormSysOperation()
            this.$emit('changeOperaList', this.configData.v_CateCode)
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 控制添加自定义/系统下拉框
    changeSelection () {},
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
    allowDrag (draggingNode) {},
    // 子组件回调事件
    changeifDialog (val) {
      this.ifDialog = val
    },
    // 获取操作按钮
    queryOperationsBtn () {
      cgiService.getOperationBtn(this.rowData.v_FormCode).then(res => {
        this.formOperationsList = res.data
      })
    }
  },
  mounted () {},
  components: {
    modAddOperation
  }
}
</script>
<style lang="scss" scoped>
.border-box {
  flex: 1;
  padding: 0;
  border: 1px solid #e6e6e6;
  > span {
    position: absolute;
    top: -26px;
    padding: 0 10px;
    background: #ffffff;
    left: -14px;
  }
  .optionsBox {
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
          .icon-tianjia {
            vertical-align: text-bottom;
            color: #5892f6;
          }
          .el-button {
            color: #333333;
          }
        }
        .addFiedBox {
          left: 0;
        }
      }
    }
    .viewOptions {
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
        height: 232px;
        .el-tree-node__content {
          .custom-tree-node {
            width: 100%;
            height: 100%;
            align-content: center;
            .treeIconBox-right {
              height: 100%;
              align-items: center;
              > span {
                width: 43%;
                font-size: 12px;
              }
              .iconBox {
                width: 80px;
                > i {
                  margin-right: 6px;
                  &:last-of-type {
                    color: #f55e5e;
                  }
                }
                &:last-of-type {
                  text-align: right;
                }
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
</style>
