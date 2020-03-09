<template>
  <!-- <el-container :class="['ws-wrapper',classValue]">   换肤类名-->
  <el-container class="ws-wrapper">
    <el-header class="header-top">
      <div class="header-wrapper">
        <div class="logo">
          <img :src="$store.state.userInfo.syslogo" />
          <div class="logoTitle">
            <span class="titleCh">{{ $store.state.userInfo.sysname }}</span>
            <span class="titleEng">{{ $store.state.userInfo.sysenglishname }}</span>
          </div>
        </div>
        <!-- 个人中心 -->
        <div class="user-info">
          <!-- <span class="pointer" @click="setting">
            <i class="iconfont icon-tixing"></i>
          </span> -->
          <el-popover
            placement="bottom"
            width="336"
            trigger="hover">
            <el-badge slot="reference" :value="totalNum" class="badge-center" v-if="totalNum !== 0" >
              <i class="iconfont icon-tixing"></i>
            </el-badge>
            <el-badge slot="reference" value="" class="badge-center" v-else >
              <i class="iconfont icon-tixing"></i>
            </el-badge>
            <notification-center @getTotalQuantity='getTotalQuantity'></notification-center>
          </el-popover>
          <el-dropdown trigger="hover" @command="clickHeaderFast">
            <span class="el-dropdown-link">
              <img :src="$store.state.userInfo.userheader" alt class="userHeader" />
            </span>
            <el-dropdown-menu slot="dropdown" class="dialogFastMenu">
              <el-dropdown-item
                v-for="item in defaultObjList"
                :key="item.pageid"
                :command="item"
              >{{item.pagename}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- 换肤功能 -->
          <!-- <el-dropdown @command="getEnumValue" trigger="hover">
            <span class="el-dropdown-link">
              换肤
            </span>
            <el-dropdown-menu slot="dropdown" class="dialogFastMenu">
              <el-dropdown-item v-for="(item, index) in skinList" :key="item.index" :command="item.v_EnumValue">{{item.v_EnumValueName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
          <!-- 如果是代理登录 -->
          <div class="user-name-box" v-if="showAgent">
            <span class="user-name">{{$store.state.userInfo.username}}</span>
            <span>[代理模式]</span>
          </div>
          <!-- 如果不是代理登录 -->
          <span v-else class="user-name">{{$store.state.userInfo.username}}</span>
          <span class="pointer" @click="quit">
            <i class="iconfont icon-tuichu"></i>
          </span>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" ref="layoutElAside">
        <el-collapse :accordion="true" v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <span>
                <i class="header-icon iconfont icon-gongnengcaidan collapseMenu"></i>系统菜单
              </span>
            </template>
            <div class="border-Box">
              <template>
                <!-- 一级菜单 -->
                <el-select
                  placeholder="请选择"
                  popper-class="menu-background"
                  v-model="firstMenuID"
                  @change="selFirstMenu"
                  :class="firstMenuIcon"
                  class="select-first-menu"
                >
                  <el-option
                    v-for="(item,index) in firstMenu"
                    :key="index"
                    :label="item.pagename"
                    :value="item.pageid"
                  >
                    <span>
                      <i :class="item.iconurl" :style="{'color':item.iconcolor}"></i>
                      {{ item.pagename }}
                    </span>
                  </el-option>
                </el-select>
              </template>
            </div>
            <!-- 菜单递归组件 -->
           <el-menu
            class="el-menu-vertical-demo"
            :default-active="pageid"
            :default-openeds="pageArr"
            menu-trigger="click"
            @close='changeMenu'
            ref="menu"
            background-color="#ffffff"
            text-color="#FFFFFF"
            active-text-color="#fff"
            :collapse="isCollapse">
             <menu-list
                key="menu-father"
                :menuList='menuListData'
                :isCollapse='isCollapse'
                :pageArr='pageArr'
                ref="menuList"
                @getConfigData='getConfigData'
                @getHistoryWidth='getHistoryWidth'
                :menuData='menuData'
                :menuIndex='menuIndex'
                :pageid='pageid'
               >
             </menu-list>
          </el-menu>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <span>
                <i class="header-icon icon-dashboard iconfont collapseMenu"></i>在线人数[{{onlinePersonCount}}人]
              </span>
            </template>
            <el-input
              prefix-icon="el-icon-edit-outline"
              placeholder="输入姓名或工号搜索"
              class="filter-input"
              v-model="keywords"
            >
              <el-button slot="append" icon="el-icon-search" @click="queryPerson(keywords)"></el-button>
            </el-input>
            <ul class="el-menu orderNum">
              <li v-for="(item, index) in onLineList" :key="index">
                {{item.userid}} ({{item.username}})
                <span>{{item.onlinetime}}</span>
              </li>
            </ul>
            <el-pagination
              small
              :page-size="size"
              :pager-count="5"
              layout="prev, pager, next"
              :total="onlinePersonCount"
              @current-change="currentChange"
            ></el-pagination>
          </el-collapse-item>
        </el-collapse>
        <span class="shrinkBtnRight">
          <i class="iconfont icon-cujiantou"></i>
        </span>
        <span class="shrinkBtnLeft">
          <i class="iconfont icon-cujiantou1"></i>
        </span>
      </el-aside>
      <el-main class="content-wrapper">
        <!-- 设置顶部历史记录信息 -->
        <div class="tab-menu-box">
          <div class="tab-menu-btnBox">
            <div class="tab-menu">
              <el-button
                ref="historyButton"
                class="historyButton"
                v-for="(item, key) in tabMenu"
                :type="isActive(item) ? 'ccc' : 'info'"
                :key="key"
                plain
                size="mini"
                v-show="flag"
                @click="linkTo(item)"
              >
                {{ item.name }}
                <i
                  class="el-icon-close"
                  @click.prevent.stop="closeTheTag(item, key)"
                />
              </el-button>
            </div>
          </div>
          <el-popover
            class="linkBox"
            placement="bottom"
            width="100"
            trigger="hover"
            :offset="300"
            v-model="visible2"
            v-if="tabHistorys.length !== 0"
          >
            <div v-for="item in tabHistorys" :key="item.index" class="text">
              <el-button @click="toHistory(item)" type="text" ref="historys">{{item.name}}</el-button>
            </div>
            <!-- 历史记录下拉  -->
            <el-button slot="reference" @click="historysTab">
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </el-popover>
        </div>
        <!-- 除去头部 左侧导航 及 访问记录之后的内容区域 -->
        <el-main class="inner-content">
          <keep-alive>
            <router-view
              ref="current"
              v-if="$route.meta.keepAlive"
              :key="$route.path"
              :innerContentWidth="innerContentWidth"
              :shareData="shareData"
              :configData="configData"
            ></router-view>
          </keep-alive>
          <router-view
            v-if="!$route.meta.keepAlive"
            :key="$route.path"
            :innerContentWidth="innerContentWidth"
            :shareData="shareData"
            :configData="configData"
          ></router-view>
          <!-- <router-view
            :key="$route.path"
            :innerContentWidth='innerContentWidth'
            :configData='configData'>
          </router-view>-->
        </el-main>
        <div class="dragBox"></div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import cgiService from '@/api/cgiService'
import notificationCenter from '@/views/user/notification/notificationCenter'
import menuList from '@/views/menuList/menulist.vue'
import getParamData from '@/common/js/mixins/getParamData'
export default {
  name: 'layout',
  mixins: [getParamData],
  data () {
    return {
      asideWidth: '',
      linksArr: [],
      // 分页每页显示条数
      size: 23,
      // 当前分页页码
      index: 1,
      // 查询在线人数
      keywords: '',
      totals: 0,
      // 在线人数统计
      onlinePersonCount: 0,
      // 在线人数
      onLineList: [],
      historyTabs: {},
      // 历史记录盒子的隐藏/显示
      visible2: false,
      // 历史记录下拉框
      linkBoxIsshow: false,
      // 历史记录盒子
      links: [],
      // 是否水平折叠菜单
      isCollapse: false,
      // 拿到二级菜单id
      secondMenuID: '',
      // 获取所有树节点
      menuData: [],
      // 拿到一级菜单树节点
      firstMenu: [],
      // 拿到当前选中的一级菜单id
      firstMenuID: '',
      // 拿到当前选中的一级菜单 icon
      firstMenuIcon: '',
      // 三级菜单pageid
      pageid: '',
      historyData: {},
      // 定义快捷菜单数据
      defaultObjList: [],
      // 设置默认打开第一个折叠菜单
      activeNames: '1',
      lastActiveNames: '1',
      // 获取历史痕迹父盒子宽
      contentWrapperWidth: '',
      // 获取历史痕迹盒子宽度
      tabMenuWidth: '',
      // 获取历史痕迹父盒子的宽度
      tabMenuBoxWidth: '',
      flag: true,
      // 获取右侧父盒子的宽度
      innerContentWidth: '',
      showselect: false,
      // 视图id
      viewid: '',
      // 传递给模板的 配置数据
      configData: {},
      // 传递给模板的 数据
      shareData: {},
      // 显示代理模式
      showAgent: false,
      // 用于决定菜单是否高亮
      menuIndex: '',
      // // 皮肤列表
      // skinList: [],
      // // 皮肤样式类名
      // classValue: ''
      totalNum: 0,
      menuListData: [],
      unfoldMenuIndex: '',
      pageArr: [],
      // 在线人数刷新间隔时间
      onlineUsersRefreshTime: 0,
      routerFlag: '1'

    }
  },
  computed: {
    tabMenu () {
      return this.$store.state.tabMenu
    },
    // 获取历史记录
    tabHistorys () {
      let arr = Object.values(this.$store.state.tabHistorys)
      let newArr = arr.reverse()
      return newArr
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route (to, from) {
      // 拿到当前页面路由
      let path = this.$route.path
      // 当路由为个人设置的时候 isInTabMenu为false
      this.configData = this.$store.state.tabMenu[path]
      // console.log(path)
      // console.log(this.$refs.current)
      let menuHistory = JSON.parse(sessionStorage['history'] || '[]')
      let arr = Object.values(menuHistory)

      if (arr.length === 2) {
        this.$set(this.configData, 'isKeepAlive', '1')
      }
      // 已废弃
      // let isInTabMenu = Object.values(this.$store.state.tabMenu).some(item => {
      //   return item.path === path
      // })
      // if (!isInTabMenu && path !== '/setting') {
      //   // this.selectMenu(path)
      // }
    }
  },
  created () {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'http://osmp.pactera.com:1001/public/css/styleClass.css' : 'http://test.osmp.com/public/css/styleClass.css'
    document.getElementsByName('styleClass')[0].href = `${baseUrl}?date=${new Date().getTime()}`
    // 动态生成视图css文件
    let tabstyle = document.createElement('style')
    tabstyle.type = 'text/css'
    tabstyle.setAttribute('name', 'tableStyle')
    document.getElementsByTagName('head').item(0).appendChild(tabstyle)
    // 动态生成表单css文件
    let formstyle = document.createElement('style')
    formstyle.type = 'text/css'
    formstyle.setAttribute('name', 'formStyle')
    document.getElementsByTagName('head').item(0).appendChild(formstyle)
    // 动态生成树形css文件
    let treestyle = document.createElement('style')
    treestyle.type = 'text/css'
    treestyle.setAttribute('name', 'treeStyle')
    document.getElementsByTagName('head').item(0).appendChild(treestyle)
    // 存储左树右tab小红点
    this.$store.commit('saveTreeCode', 'CC_TR_page')
    this.$store.commit('saveTreeCode', 'CC_TR_business')
    this.$store.commit('saveTreeCode', 'CC_TR_org')
    // 获取菜单和用户的一些信息
    this.getMenuData()
    this.historysTab()
    // 获取在线人数
    this.queryOnLineNum()
    this.getHistoryData()
    // 在线人数定时刷新
    this.onLineNumRefresh()
    // 用户登录的时候 获取到快捷菜单
    this.clickHeaderImg()
  },
  methods: {
    getMenuData () {
      // 获取到所有菜单信息
      cgiService.getUserMenu().then(res => {
        if (String(res.code) === '-1') {
          this.$router.replace('/login')
          return
        }
        if (!res.code) {
          if (res.user_info.isagent) {
            this.showAgent = true
          }
          // 把用户信息存到vuex
          this.$store.state.userInfo = res.user_info
          // 菜单树 数据
          this.menuData = res.page_tree
          // 设置默认展开项  此方法用于递归寻找 对应配置状态 的pageid
          this.getPageid(this.menuData, this.pageArr)

          // 把请求到的数据pageTree 存到store
          this.$store.commit('setNavListMap', this.menuData)
          // 设置刷新之后  显示  刷新之前 菜单高亮问题
          let refreshData = ''
          let oldRefreshVal = []
          // 判断session中 有没有存菜单数据
          if (sessionStorage['refreshPageData']) {
            oldRefreshVal = Object.values(JSON.parse(sessionStorage['refreshPageData']))
          }
          let fastMenuData = JSON.parse(sessionStorage['fastMenuData'] || '[]')
          if (fastMenuData[0]) {
            // 获取一级菜单的pageid
            this.firstMenuID = fastMenuData[0].isfirstpageid
            this.selFirstMenu(fastMenuData[0].isfirstpageid)
          }
          // 判断session中有菜单数据 就从session中取数据
          if (oldRefreshVal.length > 1) {
            refreshData = JSON.parse(sessionStorage['refreshPageData'])
            this.$store.state.tabMenu = this.historyData

            this.getFrstPageId(this.menuData, refreshData.pageid)
            this.selFirstMenu(this.firstMenuID)

            let historyOpenArr = []
            historyOpenArr[0] = refreshData
            sessionStorage.setItem('fastMenuData', JSON.stringify(historyOpenArr))
          } else {
            // 如果session中没有菜单数据 就调用获取用户快捷菜单接口
            cgiService.getFastMenu().then(res => {
              if (!res.code) {
                let historyOpenArr = []
                // 如果快捷菜单接口中有数据 就打开快捷菜单中的数据
                if (res.data.length > 0) {
                  res.data.forEach(item => {
                    // 如果有 默认打开的菜单
                    if (item.isexpand === '1') {
                      this.$store.commit('addTabMenu', {
                        code: item.code,
                        catecode: item.catecode,
                        cate: item.cate,
                        name: item.pagename,
                        path: item.pageurl,
                        parentpageid: item.parentpageid,
                        pageid: item.pageid,
                        userid: this.$store.state.userInfo.userid,
                        viewid: item.viewid
                      })
                      // 把默认打开的菜单 添加到历史记录
                      historyOpenArr.push(item)
                    }
                  })
                  // 判断historyOpenArr有没有值，如果没有就添加个人信息页
                  if (historyOpenArr.length === 0) {
                    let item = {
                      parentpageid: '10443',
                      pageid: '10444',
                      pagename: '个人信息',
                      pageurl: '/sys/stdFormControl/CC_FM_userInfo',
                      cate: '1',
                      catecode: 'CC_FM',
                      code: 'CC_FM_userInfo',
                      isfirstpageid: '10442'
                    }
                    historyOpenArr.push(item)
                    this.$store.commit('addTabMenu', {
                      name: item.pagename,
                      path: item.pageurl,
                      parentpageid: item.parentpageid,
                      pageid: item.pageid,
                      cate: item.cate,
                      catecode: item.catecode,
                      code: item.code,
                      isfirstpageid: item.isfirstpageid
                    })
                    // 用于决定菜单是否高亮
                    this.menuIndex = item.pageid
                    this.firstMenuID = '10442'
                    localStorage['pageid'] = '10444'
                    this.pageid = '10444'
                    this.selFirstMenu()
                  }
                  // 如果有多个默认打开菜单 就默认 打开第一个
                  this.pageid = historyOpenArr[0].pageid
                  // 递归寻找 数据中对应的 一级菜单pageid
                  this.getFrstPageId(this.menuData, this.pageid)
                  this.selFirstMenu(this.firstMenuID)
                  sessionStorage['refreshPageData'] = JSON.stringify(historyOpenArr[0])
                  // this.secondMenuID = historyOpenArr[0].parentpageid
                } else {
                  // 如果快捷菜单没有数据  就 默认打开个人信息
                  let item = {
                    parentpageid: '10443',
                    pageid: '10444',
                    pagename: '个人信息',
                    pageurl: '/sys/stdFormControl/CC_FM_userInfo',
                    cate: '1',
                    catecode: 'CC_FM',
                    code: 'CC_FM_userInfo',
                    isfirstpageid: '10442'
                  }
                  historyOpenArr.push(item)
                  sessionStorage['refreshPageData'] = JSON.stringify(item)
                  this.$store.commit('addTabMenu', {
                    name: item.pagename,
                    path: item.pageurl,
                    parentpageid: item.parentpageid,
                    pageid: item.pageid,
                    cate: item.cate,
                    catecode: item.catecode,
                    code: item.code,
                    isfirstpageid: item.isfirstpageid
                  })
                  // 用于决定菜单是否高亮
                  this.menuIndex = item.pageid
                  this.firstMenuID = '10442'
                  localStorage['pageid'] = '10444'
                  this.pageid = '10444'
                  this.selFirstMenu('10442')
                }
                sessionStorage.setItem('fastMenuData', JSON.stringify(historyOpenArr))
                // 默认打开第一个菜单
                // this.$router.push({ path: historyOpenArr[0].pageurl })
                // 循环 让菜单高亮
                // this.menuData.map(val => {
                // // 截取一级菜单
                //   this.firstMenu.push(val)
                //   // if (val.children) {
                //   // // 二级菜单
                //   //   val.children.map(data => {
                //   //   // 如果当前菜单有子菜单 并且 当前点击的历史记录菜单的二级菜单 与 树形结构下的二级菜单一致
                //   //     if (data.pageid === refreshData.parentpageid || data.children) {
                //   //       if (data.children) {
                //   //         data.children.map(value => {
                //   //         // 如果历史记录有数据 就从历史记录中取
                //   //         // 反之就从 用户设置的快捷菜单中取数据
                //   //           if (value.pageid === this.pageid || value.pageid === refreshData.pageid) {
                //   //             // 用于决定菜单是否高亮
                //   //             this.menuIndex = value.pageid
                //   //             this.firstMenuID = data.parentpageid
                //   //             this.selFirstMenu(data.parentpageid)
                //   //             this.configData = value
                //   //             this.$set(this.configData, 'isKeepAlive', '1')
                //   //             this.$router.push({ path: historyOpenArr[0].pageurl })
                //   //           }
                //   //         })
                //   //       }
                //   //     } else {
                //   //       return false
                //   //     }
                //   //   })
                //   // }
                // })
              }
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getConfigData (data) {
      if (data) {
        this.configData = data
      }
    },
    handleChange (val) {
      // 如果主菜单1收起，则打开主菜单2。如果主菜单2收起则打开主菜单3
      if (!val) {
        if ((Number(this.lastActiveNames) === 2)) {
          this.lastActiveNames = this.activeNames = '1'
        } else {
          this.lastActiveNames = this.activeNames = String(Number(this.lastActiveNames) + 1)
        }
      } else {
        this.lastActiveNames = val
      }
    },
    historysTab () {
      let tabHistorys = JSON.parse(sessionStorage.getItem('historyList')) || {}
      this.$store.state.tabHistorys = tabHistorys
    },
    // 点击历史记录跳转到对应的页面
    // 点击历史记录跳转到对应的页面
    toHistory (item) {
      this.visible2 = false
      let refreshPageObj = {
        ...item
      }
      // 把刷新前的 历史痕迹保存到sessionStorage中
      sessionStorage['refreshPageData'] = JSON.stringify(refreshPageObj)
      // 把历史记录数据 转换数组
      let tabList = Object.values(this.$store.state.tabMenu)
      // 获取历史记录的父盒子
      this.tabMenuBoxWidth = document.querySelector('.tab-menu-btnBox').offsetWidth

      // 获取历史记录盒子
      this.tabMenuWidth = document.querySelector('.tab-menu').offsetWidth + 80
      if (this.tabMenuWidth + 12 >= this.tabMenuBoxWidth) {
        // 添加前删除最后一个元素
        this.$store.commit('removeTabMenuItem', tabList[tabList.length - 1])
        this.$store.commit('addTabMenu', {
          name: item.name,
          path: item.path,
          pageid: item.pageid,
          parentpageid: item.parentpageid,
          code: item.code,
          isfirstpageid: item.isfirstpageid
        })
        // 转换历史记录条中的数据  转为数组
        let arrayTabMenu = Object.values(this.tabMenu)
        // 定义一个空对象
        let obj = {}
        // 把转为数组的对象最后一位长度截取出来
        let str = arrayTabMenu.splice(arrayTabMenu.length - 1, 1)
        // 倒置数组
        arrayTabMenu.unshift(str[0])
        // 把数组还原成对象形式
        for (let key in arrayTabMenu) {
          obj[arrayTabMenu[key].path] = arrayTabMenu[key]
        }
        // 获取数组中得出最后一个元素
        let data = tabList.pop()
        // 替换vuex中的数据
        this.$store.state.tabMenu = obj
        this.$store.commit('removeTabLink', item)
        this.getHistoryWidth(data)
        this.$router.replace(item.path)
      } else {
        this.$store.commit('addTabMenu', {
          name: item.name,
          path: item.path,
          pageid: item.pageid,
          parentpageid: item.parentpageid,
          code: item.code,
          isfirstpageid: item.isfirstpageid
        })
        this.$store.commit('removeTabLink', item)
        this.$router.replace(item.path)
      }
    },
    // 获取历史痕迹盒子宽度
    getHistoryWidth (data) {
      // 判断历史记录盒子是否超出了 父盒子  超出就放入下拉框
      if (this.tabMenuWidth + 12 >= this.tabMenuBoxWidth) {
        // 判断值是从左侧树传入还是从下拉列表中传入
        if (data.name) {
          this.$store.commit('addTabLink', {
            name: data.name,
            path: data.path,
            parentpageid: data.parentpageid,
            pageid: data.pageid,
            code: data.code
          })
        } else {
          this.$store.commit('addTabLink', {
            name: data.pagename,
            path: data.pageurl,
            parentpageid: data.parentpageid,
            pageid: data.pageid,
            code: data.code
          })
        }
        // 取 session里面的值
        let tabHistorys =
          JSON.parse(sessionStorage.getItem('historyList')) || {}
        if (data.name) {
          sessionStorage['historyList'] = JSON.stringify(
            this.$store.state.tabHistorys
          )
        } else {
          let newTabHistorys = {}
          let flag = false
          // 取session里面的值 跟历史记录条上的记录做对比  相同就不存入下拉框中
          for (const val in tabHistorys) {
            for (const key in this.tabMenu) {
              if (key === val) {
                flag = true
              }
            }
            if (!flag) {
              newTabHistorys[val] = tabHistorys[val]
            }
          }
          // 把下拉框的重新替换vuex里面的值
          this.$store.state.tabHistorys = newTabHistorys
          //  存入session里面
          sessionStorage['historyList'] = JSON.stringify(
            this.$store.state.tabHistorys
          )
        }
      }
    },
    // 下拉选中一级菜单时触发
    selFirstMenu (pageid) {
      // 切换一级菜单 自动展开 二级菜单
      if (pageid) {
        this.firstMenu = []
        this.menuData.forEach(item => {
          this.firstMenu.push(item)
          if (item.pageid === pageid) {
          // 把当前一级菜单的二级菜单数据传到Menu组件
            this.menuListData = item.children || []
          }
        })
      }
      for (let val in this.firstMenu) {
        // 找到当前选中一级菜单的 图标
        if (this.firstMenu[val].pageid === this.firstMenuID) {
          this.firstMenuIcon = this.firstMenu[val].iconurl
        }
      }
    },
    // 点击左侧 三级菜单
    routerLink (data) {
      localStorage['pageid'] = data.pageid
      // 判断当前菜单是否有设置 隐藏导航窗格
      if (data.ishidenavigator === '1') {
        let shrinkBtnRight = document.querySelector('.shrinkBtnRight')
        let elAside = document.querySelector('.el-aside')
        // 获取到向右展开按钮
        let shrinkBtnLeft = document.querySelector('.shrinkBtnLeft')
        // 获取到左边侧栏盒子
        let contentWrapper = document.querySelector('.content-wrapper')
        let dragBox = document.querySelector('.dragBox')

        elAside.style.width = '0'
        shrinkBtnRight.style.display = 'none'
        shrinkBtnLeft.style.display = 'inline-block'
        contentWrapper.style.paddingLeft = '0'
        dragBox.style.display = 'none'
      }
      this.$router.push({ path: data.pageurl })
      this.configData = data
      this.configData.viewId = data.viewid || ''
      let refreshPageObj = {
        ...data
      }
      sessionStorage['refreshPageData'] = JSON.stringify(refreshPageObj)
      // 添加历史记录
      this.linkBoxIsshow = true
      // 获取历史记录的父盒子
      this.tabMenuBoxWidth = document.querySelector(
        '.tab-menu-btnBox'
      ).offsetWidth
      // 获取历史记录盒子
      this.tabMenuWidth = document.querySelector('.tab-menu').offsetWidth + 80
      if (this.tabMenuWidth >= this.tabMenuBoxWidth) {
        this.getHistoryWidth(data)
      } else {
        this.$store.commit('addTabMenu', {
          cate: data.cate,
          catecode: data.catecode,
          code: data.code,
          name: data.pagename,
          path: data.pageurl,
          parentpageid: data.parentpageid,
          pageid: data.pageid,
          viewid: data.viewid
        })
      }
    },
    menuConfig (data, refreshPageObj) {
      sessionStorage.setItem('fastMenuData', JSON.stringify([data]))
      localStorage['pageid'] = data.pageid
      // 判断当前菜单是否有设置 隐藏导航窗格
      if (data.ishidenavigator === '1') {
        let shrinkBtnRight = document.querySelector('.shrinkBtnRight')
        let elAside = document.querySelector('.el-aside')
        // 获取到向右展开按钮
        let shrinkBtnLeft = document.querySelector('.shrinkBtnLeft')
        // 获取到左边侧栏盒子
        let contentWrapper = document.querySelector('.content-wrapper')
        let dragBox = document.querySelector('.dragBox')

        elAside.style.width = '0'
        shrinkBtnRight.style.display = 'none'
        shrinkBtnLeft.style.display = 'inline-block'
        contentWrapper.style.paddingLeft = '0'
        dragBox.style.display = 'none'
      }
      sessionStorage['refreshPageData'] = JSON.stringify(refreshPageObj)
    },
    recursionMenu (data) {
      let currentPath = this.$route.path
      let recursionMenu = data => {
        data.forEach(item => {
          if (item.hasOwnProperty('children')) {
            recursionMenu(item.children)
          } else {
            if (item.pageurl === currentPath) {
              // 用于决定菜单是否高亮
              this.menuIndex = item.pageid
            }
          }
        })
      }
      recursionMenu(data)
    },
    // 点击头像获取用户快捷菜单
    clickHeaderImg () {
      cgiService.getFastMenu().then(res => {
        this.defaultObjList = res.data
      })
    },
    // 点击头像 的快捷菜单 改变当前页面
    clickHeaderFast (command) {
      this.routerLink(command)
    },
    // 拿到本地历史痕迹数据
    getHistoryData () {
      this.historyData = sessionStorage['history']
        ? JSON.parse(sessionStorage['history'])
        : []
    },
    // 点击历史记录按钮
    linkTo (item) {
      // 判断是够存在  一级菜单的pageid  没有  进行递归
      if (item.isfirstpageid) {
        this.selFirstMenu(item.isfirstpageid)
        this.firstMenuID = item.isfirstpageid
      } else {
        this.getFrstPageId(this.menuData, item.pageid)
        this.selFirstMenu(this.firstMenuID)
      }
      localStorage['pageid'] = item.pageid
      // 点击历史记录 获取到当前点击的一级菜单id 和 二级菜单id 用来高亮联动
      sessionStorage.setItem('fastMenuData', JSON.stringify([item]))
      this.$router.push({ path: item.path })
      this.configData = item
      this.configData.viewId = item.catecode === 'CC_VW' ? item.code : ''
      let refreshPageObj = {
        ...item
      }
      // 把刷新前的 历史痕迹保存到sessionStorage中
      sessionStorage['refreshPageData'] = JSON.stringify(refreshPageObj)
      // this.menuData.map(val => {
      //   if (val.children) {
      //     val.children.map(data => {
      //       // 如果当前菜单有子菜单 并且 当前点击的历史记录菜单的二级菜单 与 树形结构下的二级菜单一致
      //       if (data.children && data.pageid === item.parentpageid) {
      //         this.firstMenuID = data.parentpageid
      //         this.pageid = data.parentpageid
      //         if (data.children) {
      //           data.children.map(value => {
      //             if (value.pageurl === item.path) {
      //               // 用于决定菜单是否高亮
      //               this.menuIndex = this.secondMenuID = value.pageid
      //             }
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
    },
    // 点击关闭历史访问记录
    closeTheTag (item, index) {
      // keepAlive源码缓存的数据
      let cache = this.$refs.current.$vnode.parent.componentInstance.cache
      let keys = this.$refs.current.$vnode.parent.componentInstance.keys
      let tabList = Object.values(this.tabMenu)
      if (item.path === this.$route.path) {
        // 保留最后一个历史痕迹菜单
        if (tabList.length < 2) return
        sessionStorage['history'] = JSON.stringify(this.tabMenu)
        this.$store.commit('removeTabMenuItem', item)
        tabList = Object.values(this.tabMenu)
        // 从缓存数据中删除历史记录
        this.$nextTick(_ => {
          keys.forEach((key, kindex) => {
            // delete cache[key]
            if (key === index) {
              keys.splice(kindex, 1)
              delete cache[key]
            }
          })
        })
        this.configData = tabList[0]
        this.getFrstPageId(this.menuData, tabList[0].pageid)
        this.selFirstMenu(this.firstMenuID)
        this.$router.push({ path: tabList[0].path })
        sessionStorage['refreshPageData'] = JSON.stringify(tabList[0])
        sessionStorage['fastMenuData'] = JSON.stringify([tabList[0]])
        // this.menuLineHeight(tabList[0])
        sessionStorage['history'] = JSON.stringify(this.tabMenu)
        this.menuIndex = tabList[0].pageid
      } else {
        this.$store.commit('removeTabMenuItem', item)
      }
      // 把下拉列表的历史记录转为数组
      let arrayTabMenu = Object.values(this.tabHistorys)
      // 点闭时  调用vuex中的移除下拉盒子中的方法
      // 判断下拉盒子里面是否有数据  没有就不做操作
      if (arrayTabMenu.length >= 1) {
        this.$store.commit('removeTabLink', arrayTabMenu[0])
        // 调用vuex添加历史记录条的方法
        this.$store.commit('addTabMenu', arrayTabMenu[0])
      }
    },
    // 判断当前的路由 与 历史记录中选中的路由是否一致  一致就高亮显示
    isActive (item) {
      if (item.path === this.$route.path) {
        this.pageid = item.pageid
        this.secondMenuID = item.parentpageid
        return true
      }
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    quit () {
      sessionStorage['history'] = ''
      sessionStorage['refreshPageData'] = ''
      this.$store.state.tabMenu = {}
      cgiService.sendOut().then(res => {
        this.$router.replace('/login')
      })
    },
    setting () {
      this.$router.replace('/setting')
    },
    linkUrl (url) {
      this.$router.replace(url)
    },
    // 查询在线人
    queryPerson (val) {
      let params = {
        keywords: val,
        size: this.size
      }
      cgiService.getOnLineNum(params).then(res => {
        this.onlinePersonCount = res.data.onlinePersonCount
        this.onLineList = res.data.onlinePerson
      })
    },
    // 当前页改变
    currentChange (val) {
      if (val) {
        this.index = val
        this.queryOnLineNum()
      }
    },
    // 获取在线人数
    queryOnLineNum () {
      let params = {
        index: this.index,
        size: this.size,
        keywords: this.keywords
      }
      cgiService.getOnLineNum(params).then(res => {
        this.onlinePersonCount = res.data.onlinePersonCount
        this.onLineList = res.data.onlinePerson
      })
    },
    // 在线人数定时刷新
    onLineNumRefresh () {
      let v_ParamCode = ['onlineUsersRefreshTime']
      cgiService.getParameter({ v_ParamCode }).then(res => {
        if (res.code === 0) {
          this.onlineUsersRefreshTime = Number(res.data.onlineUsersRefreshTime.v_ParamValue) * 1000
          setInterval(() => {
            setTimeout(this.queryOnLineNum(), 0)
          }, this.onlineUsersRefreshTime)
        }
      })
    },
    // 获取 通知中心的总数量
    getTotalQuantity (num) {
      this.totalNum = num
    },
    // 关闭菜单的close事件
    changeMenu (index, path) {
      // this.$refs.menu.open(index)
    },
    // 递归  找对应数据的一级菜单
    getFrstPageId (treeData, pageid) {
      treeData.forEach(item => {
        if (item.pageid === pageid) {
          this.firstMenuID = item.isfirstpageid
          // 用于决定菜单是否高亮
          this.menuIndex = item.pageid
          // 默认打开第一个菜单
          this.$router.push({ path: item.pageurl })
          this.configData = item
          this.configData.viewId = item.viewid
        } else if (item.children && item.children.length > 0) {
          this.getFrstPageId(item.children, pageid)
        }
      })
    },
    // 遍历设置默认项展开的pageid
    getPageid (treeData, arr) {
      treeData.forEach(item => {
        if (item.isdefaultexpand === '1') {
          arr.push(item.pageid)
        }
        if (item.children && item.children.length > 0) {
          this.getPageid(item.children, arr)
        }
      })
    }
  },
  mounted () {
    let dragBox = document.querySelector('.dragBox')
    // 获取到向左收缩按钮
    let elAside = document.querySelector('.el-aside')
    let asideWidth = '200px'
    dragBox.onmousedown = e => {
      // // 获取右侧表格的div元素
      let innerContent = document.querySelector('.inner-content')
      // 获取菜单div的真实宽高
      let elAsideWidth = elAside.offsetWidth
      let widthX = e.clientX
      e.stopPropagation()
      e.preventDefault()
      // 鼠标触发事件
      document.onmousemove = function (e) {
        // e.stopPropagation()
        // 阻止鼠标跳转
        e.preventDefault()
        // 设置系统菜单的宽
        // 判断鼠标是移动方位  左/右
        if (elAsideWidth < e.clientX) {
          let leftX = widthX - e.clientX
          elAside.style.width = elAsideWidth - leftX + 'px'
        } else if (elAsideWidth === 0) {
          this.innerContentWidth = '100%'
        } else {
          let rightX = e.clientX - widthX
          elAside.style.width = elAsideWidth + rightX + 'px'
          innerContent.style.width = '100%'
        }
        // 用变量保存 拖动后盒子的
        asideWidth = elAside.style.width
      }
      // 鼠标结束事件
      document.onmouseup = function (e) {
        e.preventDefault()
        document.onmousemove = null
      }
    }

    // -----------设置收缩----------

    let shrinkBtnRight = document.querySelector('.shrinkBtnRight')
    // 获取到向右展开按钮
    let shrinkBtnLeft = document.querySelector('.shrinkBtnLeft')
    // 获取到左边侧栏盒子
    let contentWrapper = document.querySelector('.content-wrapper')
    shrinkBtnRight.onclick = () => {
      // 点击收缩按钮 让侧栏盒子宽度0
      elAside.style.width = '0'
      shrinkBtnRight.style.display = 'none'
      shrinkBtnLeft.style.display = 'inline-block'
      contentWrapper.style.paddingLeft = '0'
      dragBox.style.display = 'none'
    }
    shrinkBtnLeft.onclick = () => {
      // 点击展开后  把拖动后盒子的的宽度赋值给侧边盒子
      elAside.style.width = asideWidth
      shrinkBtnRight.style.display = 'inline-block'
      shrinkBtnLeft.style.display = 'none'
      contentWrapper.style.paddingLeft = '5px'
      dragBox.style.display = 'block'
    }
    // ---------设置左侧内容区域高度---------------
    // 获取头部高度
    let headerTopHeight = document.querySelector('.header-top').offsetHeight

    // 获取左侧nav菜单
    let elCollapseItem = document.querySelectorAll('.el-collapse-item >div:first-of-type')
    // 左侧aside内容区高度
    let elCollapseContent = document.querySelectorAll('.el-aside .el-collapse-item__content')
    let elCollapseItemHeight = elCollapseItem.length * elCollapseItem[0].offsetHeight
    let elCollapseContentHeight = parseInt(elCollapseItemHeight) + parseInt(headerTopHeight) + 5
    for (var i = 0; i < elCollapseContent.length; i++) {
      elCollapseContent[i].style.height = 'calc(100vh - ' + elCollapseContentHeight + 'px)'
    }
    // 左侧aside系统菜单内容区高度
    let borderBoxHeight = document.querySelector('.el-collapse-item__content  .border-Box ').offsetHeight
    // 获取系统二级下的内容
    let elMenu = document.querySelectorAll('.el-collapse-item__content .el-menu')
    // 系统菜单下需要计算的高度
    let sysMenuHeight = elCollapseContentHeight + borderBoxHeight
    // 在线人数下的需要计算的高度
    let orderNumHeight = elCollapseContentHeight + 40 + 25
    for (let j = 0; j < elMenu.length; j++) {
      elMenu[0].style.height = 'calc(100vh - ' + sysMenuHeight + 'px)'
      // 左侧aside在线人数区域高度
      elMenu[1].style.height = 'calc(100vh - ' + orderNumHeight + 'px)'
    }

    let innerContent = document.querySelector('.inner-content')
    this.innerContentWidth = innerContent.offsetWidth
    // 监听历史记录盒子的宽度
    window.addEventListener('resize', () => {
      // 动态监听历史记录盒子的宽高
      this.tabMenuWidth = document.querySelector('.tab-menu').offsetWidth
      this.tabMenuBoxWidth = document.querySelector('.tab-menu-btnBox').offsetWidth
      // 判断如果=历史记录盒子小于或等于 父盒子就执行  下拉减  记录条加

      if (this.tabMenuWidth >= this.tabMenuBoxWidth) {
        let tabList = Object.values(this.$store.state.tabMenu)
        if (tabList.length > 1) {
          this.$store.commit('removeTabMenuItem', tabList[tabList.length - 1])
          this.$store.commit('addTabLink', tabList[tabList.length - 1])
        } else {
          return
        }
      }
      // 判断父盒子减子盒子 大于 一条历史记录的宽度  记录条拉加  下拉减
      if (this.tabMenuBoxWidth - this.tabMenuWidth >= 100) {
        let tabHistoryList = Object.values(this.$store.state.tabHistorys)
        if (tabHistoryList.length >= 1) {
          this.$store.commit('removeTabLink', tabHistoryList[tabHistoryList.length - 1])
          this.$store.commit('addTabMenu', tabHistoryList[tabHistoryList.length - 1])
        }
      }
    })
  },
  components: {
    notificationCenter,
    menuList
  }
}
</script>

<style lang="scss" scoped>
  .badge-center{
      cursor:pointer;
       > i {
          vertical-align: middle;
        }
    /deep/ .el-badge__content{
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        border: none;
        border-radius: 50%;
        right: 4px;
        top: 18px;
        padding: 0;
        font-weight: normal;

    }
  }
</style>
<style lang="scss" >
@import "@/assets/css/globalcss.scss";
@import "@/assets/css/configSkin.scss";
@import "@/assets/css/sysStyleType.scss";
$linearGradient: linear-gradient(0deg, #a9d0fd 0%, #eff5fc 100%);
.ws-wrapper {
  height: 100%;
  // 头部
  .header-top {
    // height: 70px !important;
    background-image: linear-gradient(0deg, #2382e6 0%, #5ea5f0 100%);
    position: relative;
    // border-bottom: 4px solid #abd6ff;
    box-sizing: border-box;
    &::after {
      content: "";
      width: 100%;
      height: 4px;
      background: #abd6ff;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .header-wrapper {
      display: flex;
      height: 100%;
      justify-content: space-between;
      // align-items: center;
      // border-bottom: 4px solid #abd6ff;
      .logn-img-box {
        position: absolute;
        left: 50%;
        height: 100%;
        transform: translate(-50%);
        top: 0;
      }
      .logo {
        display: flex;
        color: white;
        align-items: center;
        img {
          width: 27px;
          height: 30px;
          vertical-align: middle;
        }
        .logoTitle {
          > span {
            display: inline-block;
            &.titleCh {
              margin-left: 16px;
              font-size: 22px;
            }
            &.titleEng {
              margin-left: 8px;
              font-size: 14px;
            }
          }
        }
      }
      .user-info {
        height: 100%;
        display: flex;
        flex-direction: row;
        span {
          color: #ffffff;
          font-size: 12px;
          > i {
            font-size: 16px;
          }
        }
        .el-dropdown {
          cursor: pointer;
          .userHeader {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
        }
        > span, div {
          margin-right: 12px;
          float: left;
          display: inline-block;
        }
        // >span{
        //   height: 20px;
        // }
        // >div{
        //   height: 30px;
        // }
        .user-name-box {
          display: flex;
          flex-direction: column;
          line-height: normal;
          justify-content: center;
          height: 66px;
          span {
            line-height: normal;
          }
        }
      }
    }
  }
  // el-container
  .el-container {
    background: #abd6ff;
    height: calc(100% - 70px);
    padding: 0 5px 5px 5px;
    // aside
    .el-aside {
      background: #ffffff;
      position: relative;
      box-sizing: border-box;
      overflow: visible;
      max-width: 300px;
      // min-width: 2px;
      // 折叠面板
      .el-collapse {
        border: none;
        .el-collapse-item {
          overflow: hidden;
        }
        .el-collapse-item__header {
          flex-direction: initial;
          padding-left: 12px;
          padding-right: 12px;
          height: 30px;
          line-height: 30px;
          box-sizing: border-box;
          color: white;
          background-image: linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%);
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // 自定义图标
          .collapseMenu {
            margin-right: 6px;
            vertical-align: middle;
            // margin: 2px;
          }
          &.el-menu-item {
            height: 40px;
            font-size: 12px;
            &.is-active {
              border-color: $themeColor !important;
            }
          }
        }
        .el-collapse-item__wrap {
          background: #ffffff;
          border: none;
          .el-collapse-item__content {
            color: white;
            box-sizing: border-box;
            > .el-menu {
              overflow: auto;
              color: #333333;
            }
            .orderNum {
              > li {
                padding: 0 5px;
                white-space: nowrap;
                display: flex;
                justify-content: space-between;
                > span {
                  text-align: left;
                  display: inline-block;
                  width: 40px;
                }
                &:nth-of-type(2n) {
                  background: #f7f7f7;
                }
              }
            }
            // 设置一级菜单下拉框
            .border-Box {
              padding: 4px 4px;
              .select-first-menu {
                position: relative;
                width: 100%;
                box-shadow: rgba(165, 165, 165, 0.5) 0px 3px 6px 0px;
                border: 1px solid #000000;
                border-radius: 4px;
                input {
                  font-size: 12px;
                  border: none;
                  padding-left: 30px;
                }
                &::before {
                  position: absolute;
                  top: 50%;
                  left: 10px;
                  font-size: 17px;
                  transform: translateY(-50%);
                  z-index: 2;
                  color: black;
                }
                .el-input__inner {
                  height: 26px;
                  line-height: 26px;
                }
                .el-input__suffix {
                  position: absolute;
                  height: 100%;
                  right: 11px;
                  top: 0;
                  text-align: center;
                  color: #c0c4cc;
                  -webkit-transition: all 0.3s;
                  transition: all 0.3s;
                  pointer-events: none;
                  .el-select__caret {
                    font-size: 12px;
                  }
                }
              }
            }

            // 在线人数
            .el-input--prefix {
              width: 100% !important;
              padding: 5px;
            }
          }
        }
      }
      .shrinkBtnRight {
        width: 5px;
        height: 55px;
        display: inline-block;
        position: absolute;
        top: 50%;
        right: -6px;
        transform: translateY(-50%);
        background: #56d4eb;
        line-height: 22px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        z-index: 140;
        cursor: pointer;
        > i {
          position: absolute;
          top: 20px;
          left: -7px;
          color: #ffffff;
          font-size: 16px;
        }
      }
      .shrinkBtnLeft {
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translateY(-50%);
        width: 5px;
        height: 55px;
        display: none;
        background: #56d4eb;
        text-align: center;
        line-height: 22px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        z-index: 140;
        cursor: pointer;
        > i {
          position: absolute;
          top: 20px;
          left: -3px;
          color: #ffffff;
        }
      }
      .el-menu {
        border: none !important;
      }
      .el-menu-item,
      .el-submenu__title {
        // padding-left: 16px !important;
        width: 100%;
        line-height: 30px;
        height: 30px;
        box-sizing: border-box;
        font-size: 12px;
        &:hover {
          background-color: #c2ddfc !important;
        }
      }
      .el-menu-item {
        // padding-left: 34px !important;
        min-width: auto;
        // 设置当前选中的菜单高亮
        &.high-light-menu.is-active, &.high-light-menu{
          background-image: linear-gradient(0deg, #a9d0fd 0%, #eff5fc 100%);
        }
        > i {
          color: #333333;
          margin-right: 2px;
        }
        > button {
          color: #333333;
          border: none;
          width: 90px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            background: none;
            border: none;
          }
        }
      }

      > ul {
        > li {
          width: 200px;
          > .el-submenu__title {
            // 左侧二级菜单 icon图标
            i.leftIcon {
              margin-right: 10px;
            }
          }
        }
      }
      .el-submenu__title .el-submenu__title_content {
        width: 100%;
        display: inline-block;
        > i {
          color: #333333;
          margin-right: 13px;
          margin: 0;
        }
        > button {
          color: #333333;
          border: none;
          width: 90px;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            background: none;
            border: none;
          }
        }
      }
    }
    // el-main
    .content-wrapper {
      padding: 0;
      padding-left: 5px;
      position: relative;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      .tab-menu-box {
        position: relative;
        width: 100%;
        border: solid 1px #999999;
        box-sizing: border-box;
        background-color: #e6feff;
        .tab-menu-btnBox {
          width: 95%;
          position: relative;
          // background: #ffffff;
          background-color: #e6feff;
          height: 40px;
          display: flex;
          align-items: center;
          .tab-menu {
            display: inline-block;
            overflow: hidden;
            height: 26px;
            line-height: 26px;
            > button {
              margin-left: 4px;
            }
            button {
              font-size: 12px;
              padding: 4px 8px;
              height: 26px;
              box-sizing: border-box;
              background-image: $linearGradient;
              color: #333333;
              border-radius: 15px;
              i.el-icon-close {
                transform: scale(0.8);
              }
              &.el-button--info {
                border: solid 1px #e6e6e6;
                background: white;
                color: #666666;
              }
            }
          }
        }
        .linkBox {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
          display: inline-block;
          width: 30px;
          > button {
            width: 100%;
            padding: 5px 8px;
            background: #fff;
            color: #000;
          }
        }
      }
      .inner-content {
        padding: 0;
        box-sizing: border-box;
        background: #ffffff;
        // height: calc(100vh - 117px);
        flex: 1;
      }
    }
  }
}
.menu-background /deep/ ul.el-select-dropdown__list{
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background: none;
  }
}
.el-menu-vertical-demo  .menu-component /deep/ .el-submenu.is-opened  {
  > div {
     > span {
           font-weight: 900;
             }
             .el-button {
               font-weight: 900;
             }
          }
}
.el-menu-vertical-demo .menu-component .el-submenu {
    >div {
      padding-left: 16px !important;
    }
}
.el-menu-vertical-demo .menu-component .el-menu-item {
  padding-left: 14px !important;
}
// @media screen and (max-width: 1400px) {
//   .ws-wrapper .el-container {
//     height: calc(100% - 50px);
//   }
// }

</style>
