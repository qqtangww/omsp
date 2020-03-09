<template>
  <div class="fastmenuBox">
    <div class="title">
      <span>
      <i class="iconfont icon-biaotibiao"></i>
      快捷菜单管理
      </span>
      <span class="fastBtn-box">
        <el-button
          type="text"
          @click="commit"
          v-if="JSON.stringify(commitObj) !== '{}'"
          :disabled="commitObj.isdisabled === '1'"><i :class="commitObj.iconurl" :style="{'color':commitObj.iconcolor}"></i>{{ commitObj.operationname }}
        </el-button>
      </span>
    </div>
    <div class="fastContentBox">
      <!-- 左边盒子 -->
      <div class="fastLeft">
        <span class="promptMessage">提示：选择三级界面并保存跨界菜单将在点击头像时下拉弹出，便于快速跳转，可以设置五个菜单</span>
        <div class="settingFast">
          <div class="title">
            <span>
              <i class="iconfont icon-biaotibiao"></i>设置快捷菜单
            </span>
          </div>
          <div class="treeThead">
            <ul>
              <li>全部</li>
              <li v-for="(item,index) in treeList" :key="index">{{item}}</li>
            </ul>
          </div>
          <div class="roleTreeContent">
            <el-tree
              ref="treeAuthor"
              :data="allArr"
              :props="treeProps"
              show-checkbox
              default-expand-all
              :default-checked-keys="checkedPage"
              :expand-on-click-node="false"
              @check-change="changeFastMenu"
              node-key="pageid">
              <span slot-scope="{ node }" class="custom-tree-node">
                <el-tooltip :content="node.label"  placement="top-start" effect="dark" :open-delay='300'>
                    <span>{{ node.label }}</span>
                </el-tooltip>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="dragCenterBox" @mousedown='dargEagle'></div>
      <!-- 右边盒子 -->
      <div class="fastRight">
        <span class="promptMessage">提示：选择已添加的快捷菜单作为登录时默认打开的访问痕迹页面，便于快捷打开调用</span>
        <div class="settingDefault clearfix">
          <ul>
            <li class="clearfix">
              <div>快捷菜单</div>
              <div>启动时自动打开</div>
            </li>
            <li v-for="(item,index) in defaultObjList" :key="index" class="clearfix" v-show="item.isdisabled === '0'">
              <!-- <div>{{item.pagename}}</div> -->
              <div>{{item.pagename}}</div>
              <div>
                <el-switch
                  @change="switchChange($event,item,index)"
                  v-model="item.isexpand"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </div>
            </li>
            <li class="nothingData" v-if="defaultObjList.length === 0">暂无数据</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import global from '@/views/global/global'
export default {
  data () {
    return {
      // 保存按钮
      commitObj: {},
      //   默认选中项
      checkedPage: [],
      checkExpend: [],
      isIndeterminate: true,
      //   渲染快捷菜单
      treeProps: { children: 'children', label: 'pagename', disabled: true },
      //   快捷菜单数据
      allArr: [],
      //   保存三级菜单页面编号
      threeMenuPageIdArr: [],
      //   保存三级菜单页面编号
      threeMenuPageNameArr: [],
      //   页面自动打开页面
      defaultList: [],
      //   保存自动打开 页面数据
      defaultObjList: [],
      // 定义一个临时数组
      lsArr: [],
      levelList: [],
      level: 0,
      list: ['一级页', '二级页', '三级页', '四级页', '五级页', '六级页', '七级页', '八级页', '九级页'],
      treeList: []
    }
  },
  created () {
    let _this = this
    global.getPageId(_this)
    this.getFastMenuList()
    this.getFastMenu()
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
    switchChange (val, item, index) {
    // 判断 如果switch 改变为 关闭状态
      if (val === '0') {
        // 判断这一项的pagename 是否已经存在 如果存在
        this.checkExpend.forEach((val, index) => {
          if (val === item.pagename) {
            this.checkExpend.splice(index, 1)
          }
        })
      } else {
        this.checkExpend.push(item.pagename)
      }
    },
    dargEagle (e) {
      let fastLeft = document.querySelector('.fastLeft')
      let fastLeftWidth = fastLeft.offsetWidth

      let fastRight = document.querySelector('.fastRight')
      let fastRightWidth = fastRight.offsetWidth
      let widthX = e.clientX
      document.onmousemove = function (e) {
        e.preventDefault()
        if (fastLeftWidth > e.clientX) {
          let leftX = widthX - e.clientX
          fastLeft.style.width = fastLeftWidth - leftX + 'px'
          fastRight.style.width = fastRightWidth + leftX + 'px'
        } else {
          let rightX = e.clientX - widthX
          fastLeft.style.width = fastLeftWidth + rightX + 'px'
          fastRight.style.width = fastRightWidth - rightX + 'px'
        }
      }
      document.onmouseup = function (e) {
        document.onmousemove = null
      }
    },
    // 渲染左边树
    getFastMenu () {
      cgiService.getUserMenu().then(res => {
        var allObj = [{ pageid: 1, pagename: '全部', children: res.page_tree }]
        this.allArr = allObj
        this.foreach(this.allArr[0].children)
        // 全部
        // this.allArr.map(val => {
        //   if (val.children) {
        //     // 一级菜单
        //     val.children.map(data => {
        //       // 二级菜单
        //       if (data.children) {
        //         data.children.map(value => {
        //           if (value.children) {
        //             // 三级菜单
        //             value.children.map(item => {
        //               // 给三级菜单加一个标识符
        //               item.isThird = '1'
        //             })
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
      })
    },
    changeFastMenu (row, ischeck, indeterminate) {
      if (!row.children) {
        row.isThird = '1'
      } else {
        delete row.isThird
      }
      if (row.isThird) {
        if (this.defaultObjList.length >= 5 && ischeck) {
          this.$message.warning('选中数据不能超过五条哦')
          // 不让当前点击的这个菜单选中
          this.$refs.treeAuthor.setChecked(row, false)
        }

        let isExist = 0
        let indexExist = 0
        // 右侧 列表数据 判断数据是否存在
        this.defaultObjList.forEach((item, index) => {
          if (item.pageid === row.pageid) {
            isExist = 1
            indexExist = index
          }
        })
        // 如果是左侧选中 ，右侧不存在 则加入右侧
        // eslint-disable-next-line no-unreachable
        if (ischeck && !isExist) {
          this.defaultObjList.push(row)
        }
        // 如果是左侧取消选中，右侧存在则 删除右侧
        if (!ischeck && isExist) {
          this.defaultObjList.splice(indexExist, 1)
        }
      }
    },
    // 添加快捷菜单
    commit () {
      let pageid = []
      this.defaultObjList.forEach(item => {
        let pid = item.pageid
        let tag = 0
        this.checkExpend.forEach(pname => {
          if (pname === item.pagename) {
            tag = 1
          }
        })
        pid = tag === 1 ? pid + '-1' : pid + '-0'
        pageid.push(pid)
      })
      if (this.defaultObjList.length > 5) {
        this.$message.warning('选中数据不能超过五条哦')
      } else {
        cgiService.saveFastMenuOpen({ pageid: pageid }).then(res => {
          res.code === 0
            ? this.$message.success('添加快捷菜单成功')
            : this.$message.error(res.msg)
        })
      }
    },
    // 获取用户设置的自动打开页面
    getFastMenuList () {
      cgiService.getFastMenu().then(res => {
        // 拿到快捷菜单数据
        this.defaultObjList = res.data
        // 左侧已选中
        this.defaultObjList.forEach((item, index) => {
          this.checkedPage.push(item.pageid)
          item.dataIndex = index
          if (item.isexpand === '1') {
            this.checkExpend.push(item.pagename)
          }
        })
      })
    },
    setHeight () {
      // 设置两块 提示信息高度
      let promptMessageOne = document.querySelectorAll('.promptMessage')[0]
      let promptMessageTwo = document.querySelectorAll('.promptMessage')[1].offsetHeight
      promptMessageOne.style.height = promptMessageTwo + 'px'

      // 设置左边树高度
      let headerTopH = document.querySelector('.header-top').offsetHeight
      let tabMenuBoxH = document.querySelector('.tab-menu-box').offsetHeight
      let titleH = document.querySelector('.fastmenuBox .title').offsetHeight
      let promptMessageH = document.querySelector('.fastLeft .promptMessage').offsetHeight
      let settingFastH = document.querySelector('.settingFast')
      let BoxHeight = headerTopH + tabMenuBoxH + titleH + promptMessageH + 16 + 20
      // 设置settingFast盒子的高度
      settingFastH.style.height = 'calc(100vh - ' + BoxHeight + 'px)'
      // 设置 el-tree 盒子的高
      let titleHH = document.querySelector('.settingFast .title').offsetHeight
      let treeTheadH = document.querySelector('.settingFast .treeThead').offsetHeight
      let elTreeH = document.querySelector('.el-tree')
      elTreeH.style.height = settingFastH.offsetHeight - titleHH - treeTheadH - 8 + 'px'
    }
  },
  mounted () {
    // 设置两块 提示信息高度
    let promptMessageOne = document.querySelectorAll('.promptMessage')[0]
    let promptMessageTwo = document.querySelectorAll('.promptMessage')[1].offsetHeight
    promptMessageOne.style.height = promptMessageTwo + 'px'
    // 设置左边树高度
    let headerTopH = document.querySelector('.header-top').offsetHeight
    let tabMenuBoxH = document.querySelector('.tab-menu-box').offsetHeight
    let titleH = document.querySelector('.fastmenuBox .title').offsetHeight
    let promptMessageH = document.querySelector('.fastLeft .promptMessage').offsetHeight
    let settingFastH = document.querySelector('.settingFast')
    let BoxHeight = headerTopH + tabMenuBoxH + titleH + promptMessageH + 16 + 20
    // 设置settingFast盒子的高度
    settingFastH.style.height = 'calc(100vh - ' + BoxHeight + 'px)'
    // 设置 el-tree 盒子的高
    let titleHH = document.querySelector('.settingFast .title').offsetHeight
    let treeTheadH = document.querySelector('.settingFast .treeThead').offsetHeight
    let elTreeH = document.querySelector('.el-tree')
    elTreeH.style.height = settingFastH.offsetHeight - titleHH - treeTheadH - 8 + 'px'
    window.addEventListener('resize', this.setHeight)
  },
  destroyed () {
    window.removeEventListener('resize', this.setHeight, false)
  },
  deactivated () {
    window.removeEventListener('resize', this.setHeight, false)
  }
}
</script>
<style lang="scss">
$themeColor: #87a9c7;
.fastmenuBox {
  border: 1px solid $themeColor;
  height: 100%;
  box-sizing: border-box;
  .title {
      justify-content: space-between;
      padding: 0 15px;
      width: auto;
      .fastBtn-box {
        cursor: pointer;
        >button {
          color: #ffffff;
          display: block;
          i{
            vertical-align: text-bottom;
          }
        }
      }
  }
  .fastContentBox {
    display: flex;
    background: #ffffff;
    overflow: auto;
    .fastLeft {
      margin-left: 8px;
      margin-right: 0;
      min-width: 1150px;
      .settingFast {
        height: calc(100vh - 200px);
        border: 1px solid rgba(230,230,230,1);
        position: relative;
        // 保存按钮
        .saveFast {
          position: absolute;
          bottom: 24px;
          right: 24px;
        }
        .treeThead {
          line-height: 30px;
          font-size: 12px;
          color: #333333;
          > ul {
            margin: 0;
            display: flex;
            background: rgba(247,247,247,1);
            list-style: none;
            border-bottom: 1px solid rgba(230,230,230,1);
            > li {
              &:first-of-type{
              width: 50px;
              padding-left:20px;
            }
              &:nth-of-type(n+2){
                width: 172px;
                text-align: center;
              }
            }
          }
        }
        .roleTreeContent {
          background: white;
          overflow: auto;
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
    }
    .fastRight {
      .settingDefault {
        ul,li{
          list-style: none;
          padding: 0;
          margin: 0;
        }
        ul{
          border:1px solid rgba(230,230,230,1);
          float: left;
        }
        li{
          line-height: 30px;
          width: 243px;
          font-size:12px;
          font-family:Microsoft YaHei;
          padding: 0 24px 0 12px;
          box-sizing: border-box;
          text-align: left;
          >div:first-of-type{
            float: left;
          }
          >div:last-of-type{
            width: 85px;
            text-align: left;
            float: right;
          }
          &:first-of-type{
            color: white;
            background:linear-gradient(180deg,rgba(93,162,239,1) 0%,rgba(43,142,209,1) 100%);
          }
          &:nth-of-type(n+2){
            border-bottom: 1px solid rgba(230,230,230,1);
            &:last-of-type{
              border-bottom: none;
            }
          }
          &.nothingData{
            text-align: center;
          }
        }
        // label {
        //   margin: 0;
        //   padding: 6px 16px;
        //   border-left: 1px solid $themeColor;
        //   border-right: 1px solid $themeColor;
        //   border-top: 1px solid $themeColor;
        //   width: 243px;
        //   box-sizing: border-box;
        // }
        // > label {
        //   // background: ;
        //   background-image: linear-gradient(0deg, #2b8ed1 0%, #5da2ef 100%);
        //   color: white;
        //   border-radius: 4px 4px 0 0;
        //   &.is-checked > span.el-checkbox__label {
        //     color: white;
        //   }
        // }
        // .el-checkbox-group {
        //   display: flex;
        //   flex-direction: column;
        //   label {
        //     font-size: 12px;
        //     color: #333333;
        //     font-family: Microsoft YaHei;
        //     &:last-of-type {
        //       border-bottom: 1px solid $themeColor;
        //       border-radius: 0 0 4px 4px;
        //     }
        //   }
        // }
      }
    }
  }
  @media screen and (max-width: 1400px) {
  }
  .promptMessage{
    line-height: 18px;
    margin: 8px;
    display: inline-block;
  }
}
</style>
