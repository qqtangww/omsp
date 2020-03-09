<!-- 角色授权树 -->
<template>
  <div class="impower-role-control">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <div class="impower-roleControl">
      <div class="treeThead">
        <ul>
          <li>全部</li>
          <li v-for="(item,index) in treeList" :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="roleTreeContent">
        <el-tree
          ref="treeAuthor"
          :data="impowerTreeList"
          :props="treeProps"
          show-checkbox
          default-expand-all
          :expand-on-click-node="false"
          :check-strictly="checkStrictly"
          @check="handleCheckChange"
          node-key="pageid"
        >
          <span slot-scope="{ node }" class="custom-tree-node">
            <el-tooltip
              :content="node.label"
              placement="bottom-start"
              :open-delay="350"
              effect="dark"
            >
              <span>{{ node.label }}</span>
            </el-tooltip>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'impowerRoleControl',
  props: {
    configData: Object,
    shareData: Object,
    ifDialog: Boolean
  },
  mixins: [mixin, logMixin, windowRed],
  data () {
    return {
      // 角色授权树 数据
      impowerTreeList: [],
      // 展示的节点名
      treeProps: { children: 'children', label: 'pagename' },
      checkStrictly: true,
      treeRoleid: '',
      nodeVal: [],
      operationVal: [],
      levelList: [],
      level: 0,
      list: ['一级菜单', '二级菜单', '三级菜单', '四级菜单', '五级菜单', '六级菜单', '七级菜单', '八级菜单', '九级菜单'],
      treeList: []
    }
  },
  watch: {
    ifDialog: {
      handler: function (val) {
        // 获取当前行操作数据
        // let confsBtn = this.$store.state.confsBtn
        // if (confsBtn.operationcode === 'rolePage') {
        // 获取 当前行的数据
        let formData = this.$store.state.fieTableData
        this.rolePage(formData)
        setTimeout(() => {
          this.checkStrictly = false
        }, 500)
        // }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    foreach (item) {
      if (item && item.length > 0) {
        item.forEach(element => {
          this.foreach(element.children)
          this.levelList.push(element.level)
          this.level = this.levelList.sort().reverse()[0]
          this.treeList = this.list.slice(0, this.level)
        })
      }
    },
    // 授权页面
    rolePage (row) {
      this.showDialogTree = true
      this.treeRoleid = row.i_RoleID
      // let operationToChildren = arr => {
      //   arr.map(item => {
      //     if (item.children) {
      //       operationToChildren(item.children)
      //     } else {
      //       // 如果菜单有操作属性 就拼接
      //       if (item.operation) {
      //         let id = item.pageid
      //         item.children = Object.entries(item.operation).map(item => {
      //           return {
      //             pagename: item[1],
      //             isOperation: true,
      //             pageid: id + '-' + item[0]
      //           }
      //         })
      //       }
      //     }
      //   })
      //   return arr
      // }
      // 获取所有页面
      cgiService.PagesOperationPageTree().then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.treeData = res.data
          var allObj = [{ pageid: '1', pagename: '全部', children: res.data }]
          // 授权树  数据
          this.impowerTreeList = allObj
          this.foreach(this.impowerTreeList[0].children)
        }
      })
      cgiService.getRolePageOperation(row.i_RoleID).then(res => {
        if (res.code === 0) {
          let nodeVal = res.rolepage
          let operationVal = res.rolepageoperation
          // 选中 该角色 已授权页面
          this.$refs.treeAuthor.setCheckedKeys(nodeVal.concat(operationVal))
        }
      })
    },
    // 保存操作
    commit () {
      let value = this.$refs.treeAuthor.getHalfCheckedKeys()
      let val = this.$refs.treeAuthor.getCheckedKeys()
      let params = {
        i_RoleID: this.treeRoleid,
        pageoperationids: [...new Set(val.concat(value))]
      }
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        params.logParams = this.getLogParams()
      }
      cgiService.temSaveRoleUser(params).then(res => {
        if (res.code === 0) {
          this.isReminder = true
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    clearError () {
      this.$emit('getButtonConfig', false)
      // 树checkbox 父子不相关联
      this.checkStrictly = true
    },
    handleCheckChange () {
      this.isReminder = false
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss">
  .impower-role-control {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .impower-roleControl {
        overflow: auto;
      .roleTreeContent {

        // overflow-y: inherit;
        // overflow-x: auto;
      }
      .treeThead {
        line-height: 30px;
        font-size: 12px;
        background: #f7f7f7;
        color: #333333;
        > ul {
          margin: 0;
          min-width: 100%;
          display:inline-block;
          white-space: nowrap;
          padding-left:0;
          list-style: none;
          border-bottom: 1px solid rgba(230, 230, 230, 1);
          > li {
            display: inline-block;
            white-space:nowrap;
            background: #f7f7f7;
            &:first-of-type{
              width: 50px;
              padding-left:40px;
            }
            &:nth-of-type(n + 2) {
              width: 180px;
              text-align: center;
            }
          }
        }
      }
      .role-tree-content {
        overflow: auto;
      }
      .menu-tabs {
        line-height: 30px;
        font-size: 12px;
        color: #333333;
        > ul {
          margin: 0;
          background: #f7f7f7;
          border-bottom: 1px solid rgba(230, 230, 230, 1);
          list-style: none;
          > li {
            &:first-of-type{
              width: 50px;
            }
            &:nth-of-type(n + 2) {
              width: 200px;
              text-align: center;
            }
          }
        }
      }
      // 树形结构
      .el-tree {
        flex: 1;
        > .el-tree-node {
          // 一级菜单 纵向排列
          padding: 16px;
          display: flex;
          > .el-tree-node__content {
            width: 80px;
            position: relative;
            padding-right: 10px;
          }
          > .el-tree-node__children {
            > .el-tree-node {
              // 二级菜单 纵向排列
              display: flex;
              position: relative;
              margin-left: 10px;
              // 设置 全部 和一级菜单  的连线
              &::after {
                content: "";
                width: 2px;
                height: 100%;
                position: absolute;
                left: 0;
                bottom: -11px;
                border-left: 2px solid #bfbfbf;
              }
              &:last-of-type::after {
                border: none;
              }
              &.is-expanded:last-of-type::after {
                border: none;
              }
              &.is-expanded::after {
                content: "";
                width: 2px;
                height: 100%;
                position: absolute;
                left: 0;
                bottom: -11px;
                border-left: 2px solid #bfbfbf;
              }
              &::before {
                content: "";
                width: 10px;
                height: 1px;
                position: absolute;
                top: 10px;
                left: 0;
                border-bottom: 2px solid #bfbfbf;
              }
              &:first-of-type::before {
                width: 20px;
                left: -10px;
              }
              > .el-tree-node__children {
                > .el-tree-node {
                  // 三级菜单 纵向排列
                  display: flex;
                  position: relative;
                  margin-left: 20px;
                  // 设置 全部 和一级菜单  的连线
                  &::after {
                    content: "";
                    width: 2px;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    bottom: -11px;
                    border-left: 2px solid #bfbfbf;
                  }
                  &:last-of-type::after {
                    border: none;
                  }
                  &.is-expanded:last-of-type::after {
                    border: none;
                  }
                  &.is-expanded::after {
                    content: "";
                    width: 2px;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    bottom: -11px;
                    border-left: 2px solid #bfbfbf;
                  }
                  &::before {
                    content: "";
                    width: 10px;
                    height: 1px;
                    position: absolute;
                    top: 10px;
                    left: 0;
                    border-bottom: 2px solid #bfbfbf;
                  }
                  &:first-of-type::before {
                    width: 20px;
                    left: -10px;
                  }
                  .el-tree-node__content {
                    padding-left: 18px !important;
                  }
                  > .el-tree-node__children {
                    > .el-tree-node {
                      // 二级菜单 纵向排列
                      display: flex;
                      position: relative;
                      margin-left: 10px;
                      // 设置 全部 和一级菜单  的连线
                      &::after {
                        content: "";
                        width: 2px;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        bottom: -11px;
                        border-left: 2px solid #bfbfbf;
                      }
                      &:last-of-type::after {
                        border: none;
                      }
                      &.is-expanded:last-of-type::after {
                        border: none;
                      }
                      &.is-expanded::after {
                        content: "";
                        width: 2px;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        bottom: -11px;
                        border-left: 2px solid #bfbfbf;
                      }
                      &::before {
                        content: "";
                        width: 10px;
                        height: 1px;
                        position: absolute;
                        top: 10px;
                        left: 0;
                        border-bottom: 2px solid #bfbfbf;
                      }
                      &:first-of-type::before {
                        width: 20px;
                        left: -10px;
                      }
                      > .el-tree-node__children {
                        > .el-tree-node {
                          // 三级菜单 纵向排列
                          display: flex;
                          position: relative;
                          margin-left: 20px;
                          // 设置 全部 和一级菜单  的连线
                          &::after {
                            content: "";
                            width: 2px;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            bottom: -11px;
                            border-left: 2px solid #bfbfbf;
                          }
                          &:last-of-type::after {
                            border: none;
                          }
                          &.is-expanded:last-of-type::after {
                            border: none;
                          }
                          &.is-expanded::after {
                            content: "";
                            width: 2px;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            bottom: -11px;
                            border-left: 2px solid #bfbfbf;
                          }
                          &::before {
                            content: "";
                            width: 10px;
                            height: 1px;
                            position: absolute;
                            top: 10px;
                            left: 0;
                            border-bottom: 2px solid #bfbfbf;
                          }
                          &:first-of-type::before {
                            width: 20px;
                            left: -10px;
                          }
                          .el-tree-node__content {
                            padding-left: 18px !important;
                          }
                          > .el-tree-node__children {
                            > .el-tree-node {
                              // 三级菜单和操作按钮 横向排列
                              display: flex;
                              > .el-tree-node__children {
                                > .el-tree-node {
                                  // 二级菜单 纵向排列
                                  display: flex;
                                  position: relative;
                                  margin-left: 10px;
                                  // 设置 全部 和一级菜单  的连线
                                  &::after {
                                    content: "";
                                    width: 2px;
                                    height: 100%;
                                    position: absolute;
                                    left: 0;
                                    bottom: -11px;
                                    border-left: 2px solid #bfbfbf;
                                  }
                                  &:last-of-type::after {
                                    border: none;
                                  }
                                  &.is-expanded:last-of-type::after {
                                    border: none;
                                  }
                                  &.is-expanded::after {
                                    content: "";
                                    width: 2px;
                                    height: 100%;
                                    position: absolute;
                                    left: 0;
                                    bottom: -11px;
                                    border-left: 2px solid #bfbfbf;
                                  }
                                  &::before {
                                    content: "";
                                    width: 10px;
                                    height: 1px;
                                    position: absolute;
                                    top: 10px;
                                    left: 0;
                                    border-bottom: 2px solid #bfbfbf;
                                  }
                                  &:first-of-type::before {
                                    width: 20px;
                                    left: -10px;
                                  }
                                  > .el-tree-node__children {
                                    > .el-tree-node {
                                      // 三级菜单 纵向排列
                                      display: flex;
                                      position: relative;
                                      margin-left: 20px;
                                      // 设置 全部 和一级菜单  的连线
                                      &::after {
                                        content: "";
                                        width: 2px;
                                        height: 100%;
                                        position: absolute;
                                        left: 0;
                                        bottom: -11px;
                                        border-left: 2px solid #bfbfbf;
                                      }
                                      &:last-of-type::after {
                                        border: none;
                                      }
                                      &.is-expanded:last-of-type::after {
                                        border: none;
                                      }
                                      &.is-expanded::after {
                                        content: "";
                                        width: 2px;
                                        height: 100%;
                                        position: absolute;
                                        left: 0;
                                        bottom: -11px;
                                        border-left: 2px solid #bfbfbf;
                                      }
                                      &::before {
                                        content: "";
                                        width: 10px;
                                        height: 1px;
                                        position: absolute;
                                        top: 10px;
                                        left: 0;
                                        border-bottom: 2px solid #bfbfbf;
                                      }
                                      &:first-of-type::before {
                                        width: 20px;
                                        left: -10px;
                                      }
                                      .el-tree-node__content {
                                        padding-left: 18px !important;
                                      }
                                      > .el-tree-node__children {
                                        > .el-tree-node {
                                          // 二级菜单 纵向排列
                                          display: flex;
                                          position: relative;
                                          margin-left: 10px;
                                          // 设置 全部 和一级菜单  的连线
                                          &::after {
                                            content: "";
                                            width: 2px;
                                            height: 100%;
                                            position: absolute;
                                            left: 0;
                                            bottom: -11px;
                                            border-left: 2px solid #bfbfbf;
                                          }
                                          &:last-of-type::after {
                                            border: none;
                                          }
                                          &.is-expanded:last-of-type::after {
                                            border: none;
                                          }
                                          &.is-expanded::after {
                                            content: "";
                                            width: 2px;
                                            height: 100%;
                                            position: absolute;
                                            left: 0;
                                            bottom: -11px;
                                            border-left: 2px solid #bfbfbf;
                                          }
                                          &::before {
                                            content: "";
                                            width: 10px;
                                            height: 1px;
                                            position: absolute;
                                            top: 10px;
                                            left: 0;
                                            border-bottom: 2px solid #bfbfbf;
                                          }
                                          &:first-of-type::before {
                                            width: 20px;
                                            left: -10px;
                                          }
                                          > .el-tree-node__children {
                                            > .el-tree-node {
                                              // 三级菜单 纵向排列
                                              display: flex;
                                              position: relative;
                                              margin-left: 20px;
                                              // 设置 全部 和一级菜单  的连线
                                              &::after {
                                                content: "";
                                                width: 2px;
                                                height: 100%;
                                                position: absolute;
                                                left: 0;
                                                bottom: -11px;
                                                border-left: 2px solid #bfbfbf;
                                              }
                                              &:last-of-type::after {
                                                border: none;
                                              }
                                              &.is-expanded:last-of-type::after {
                                                border: none;
                                              }
                                              &.is-expanded::after {
                                                content: "";
                                                width: 2px;
                                                height: 100%;
                                                position: absolute;
                                                left: 0;
                                                bottom: -11px;
                                                border-left: 2px solid #bfbfbf;
                                              }
                                              &::before {
                                                content: "";
                                                width: 10px;
                                                height: 1px;
                                                position: absolute;
                                                top: 10px;
                                                left: 0;
                                                border-bottom: 2px solid #bfbfbf;
                                              }
                                              &:first-of-type::before {
                                                width: 20px;
                                                left: -10px;
                                              }
                                              .el-tree-node__content {
                                                padding-left: 18px !important;
                                              }
                                              > .el-tree-node__children {
                                                > .el-tree-node {
                                                  // 三级菜单和操作按钮 横向排列
                                                  display: flex;
                                                  > .el-tree-node__children {
                                                    // 操作按钮 横向排列
                                                    display: flex;
                                                    .el-tree-node__content {
                                                      padding: 0 !important;
                                                      width: 110px;
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .el-tree-node__content {
          background: none;
          &:hover {
            background: none;
          }
        }
      }
    }
  }
  .roleTreeContent /deep/ .el-tree-node > .el-tree-node__children {
    overflow: inherit !important;
  }
</style>
