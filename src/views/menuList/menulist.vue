<!-- 左侧菜单栏拆分的独立组件 -->
<template>
  <div class="menu-component">
    <!-- <el-menu
      class="el-menu-vertical-demo"
      :default-active="pageid"
      menu-trigger="click"
      @close='changeMenu'
      ref="menu"
      background-color="#ffffff"
      text-color="#FFFFFF"
      active-text-color="#fff"
      :collapse="isCollapse"> -->
      <template v-for="(item,index) in menuList">
        <el-submenu
          :index="item.pageid"
          v-if="item.children"
          :class="{'high-light-menu' : item.pageid === selectedPageid}"
          :key="item.pageid">
          <!-- <span>{{item.pageid }}</span> -->
          <template slot="title">
            <span
              slot="title"
              class="el-submenu__title_content"
              :class="'padd' + item.level"
             >
              <i
                :class="item.iconurl"
                :style="{'color':item.iconcolor}"
                class="leftIcon"
              ></i>
              <el-button type="text" >{{ item.pagename}}</el-button>
            </span>
          </template>

          <!--递归调用-->
           <el-menu
            class="el-menu-vertical-demo-children"
            :default-active="pageid"
            :default-openeds="pageArr"
            menu-trigger="click"
            @close='changeMenuClose'
            @open='changeMenuOpen'
            ref="menu"
            background-color="#ffffff"
            text-color="#FFFFFF"
            active-text-color="#fff"
            :collapse="isCollapse">
            <menu-list
            class="menu-son"
            :isCollapse='isCollapse'
            :pageArr='pageArr'
            :menuList='item.children'
            @getConfigData='getConfigData'
            @getHistoryWidth='getHistoryWidth'
            :menuData='menuData'
            :menuIndex='menuIndex'
            :pageid='pageid'
            >
            </menu-list>
           </el-menu>
        </el-submenu>
        <el-menu-item
          :index="item.pageid"
          :class="{'high-light-menu' : item.pageid === selectedPageid}"
          v-else
          @click="routerLink(item,item.pageid)"
          :key="index"
          >
          <i :class="item.icon"></i>
          <span slot="title" class="title-box" :class="'padd' + item.level">
            <i
              :class="item.iconurl"
              :style="{'color':item.iconcolor}"
              class="leftIcon"
            ></i>
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.pagename"
              disabled
              placement="top-start">
              <el-button
                type="text"
              >{{ item.pagename}}</el-button>
            </el-tooltip>
          </span>
        </el-menu-item>
      </template>
    <!-- </el-menu> -->
  </div>
</template>
<script>
export default {
  name: 'MenuList',
  props: {
    menuList: Array,
    // 是否水平折叠菜单
    isCollapse: Boolean,
    menuData: Array,
    menuIndex: String,
    pageid: String,
    pageArr: Array
  },
  data () {
    return {
      selectedPageid: '',
      // 菜单高亮标识符
      selectedIndex: '',
      firstID: [],
      falg: '',
      // 历史记录的数量
      paramNum: ''
    }
  },
  watch: {
    menuIndex: {
      handler: function (val) {
        this.selectedIndex = val
        this.selectedIndex = val
      },
      deep: true,
      immediate: true
    },
    pageid: {
      handler: function (val) {
        this.selectedPageid = val
      },
      deep: true,
      immediate: true
    },
    menuList: {
      handler: function (val) {
        // console.log(val)
      },
      deep: true,
      immediate: true
    }

  },
  created () {
    this.firstID = JSON.parse(sessionStorage['fastMenuData'] || '[]')
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
  methods: {
    getConfigData (data) {
      if (data) {
        this.$emit('getConfigData', data)
      }
    },
    getHistoryWidth (data) {
      if (data) {
        this.$emit('getHistoryWidth', data)
      }
    },
    // 点击左侧二级， 三级菜单
    routerLink (data, currentPageid) {
      this.configData = data
      this.$emit('getConfigData', data)
      this.configData.viewId = data.catecode === 'CC_VW' ? data.code : ''
      let refreshPageObj = {
        ...data
      }
      // console.log(data)
      // 添加历史记录
      this.linkBoxIsshow = true
      // 获取历史记录的父盒子
      this.tabMenuBoxWidth = document.querySelector('.tab-menu-btnBox').offsetWidth
      // 获取历史记录盒子
      this.tabMenuWidth = document.querySelector('.tab-menu').offsetWidth + 80
      // 获取参数管理 设置历史记录的数量
      let tabMenuArr = Object.keys(this.tabMenu)
      // 判断 历史记录的宽度  是否大于  父盒子的宽度  是: 存入 下拉列表 , 否: 存入历史工具条上
      if (this.tabMenuWidth + 12 >= this.tabMenuBoxWidth) {
        // 对比历史记录 跟 参数管理设置的数量
        if (this.paramNum > tabMenuArr.length + this.tabHistorys.length || !this.paramNum) {
          this.menuConfig(data, refreshPageObj)
          // 用于决定菜单是否高亮
          this.selectedPageid = currentPageid
          // 传超出的数据
          this.$emit('getHistoryWidth', this.tabMenu[tabMenuArr[tabMenuArr.length - 1]])
          this.$store.commit('removeTabMenuItem', this.tabMenu[tabMenuArr[tabMenuArr.length - 1]])
          this.$store.commit('addTabMenu', {
            cate: data.cate,
            catecode: data.catecode,
            code: data.code,
            name: data.pagename,
            path: data.pageurl,
            parentpageid: data.parentpageid,
            pageid: data.pageid,
            viewid: data.viewid,
            isfirstpageid: data.isfirstpageid
          })
          // 添加前删除最后一个元素
          this.$router.push({ path: data.pageurl })
        } else {
          let result = this.tabHistorys.some(function (item) {
            return item.path === data.pageurl
          })
          if (tabMenuArr.indexOf(data.pageurl) >= 0 || result) {
            this.menuConfig(data, refreshPageObj)
            // 用于决定菜单是否高亮
            this.selectedPageid = currentPageid
            this.$router.push({ path: data.pageurl })
          } else {
            this.$alert(
              '<span>至多同时打开' + this.paramNum + '个页面，如果要访问更多 页面，请先关闭当前已打开页面</span>', '提示',
              {
                dangerouslyUseHTMLString: true,
                type: 'warning'
              }
            )
          }
        }
      } else {
        if (this.paramNum > tabMenuArr.length + this.tabHistorys.length || !this.paramNum) {
          this.menuConfig(data, refreshPageObj)
          // 用于决定菜单是否高亮
          this.selectedPageid = currentPageid
          this.$store.commit('addTabMenu', {
            cate: data.cate,
            catecode: data.catecode,
            code: data.code,
            name: data.pagename,
            path: data.pageurl,
            parentpageid: data.parentpageid,
            pageid: data.pageid,
            viewid: data.viewid,
            isfirstpageid: data.isfirstpageid
          })
          this.$router.push({ path: data.pageurl })
        } else {
          let result = this.tabHistorys.some(function (item) {
            return item.path === data.pageurl
          })
          if (tabMenuArr.indexOf(data.pageurl) >= 0 || result) {
            this.menuConfig(data, refreshPageObj)
            // 用于决定菜单是否高亮
            this.selectedPageid = currentPageid
            this.$router.push({ path: data.pageurl })
          } else {
            this.$alert(
              '<span>至多同时打开' +
                this.paramNum +
                '个页面，如果要访问更多 页面，请先关闭当前已打开页面</span>',
              '提示',
              {
                dangerouslyUseHTMLString: true,
                type: 'warning'
              }
            )
          }
        }
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
    // 判断当前的路由 与 历史记录中选中的路由是否一致  一致就高亮显示
    isActive (item) {
      if (item.path === this.$route.path) {
        this.pageid = item.pageid
        this.secondMenuID = item.parentpageid
        return true
      }
    },
    linkUrl (url) {
      this.$router.replace(url)
    },
    // 关闭菜单的close事件
    changeMenuClose (index, path) {
    //   this.falg = index
    //   // this.$refs.menu.open(index)
    },
    // // 关闭菜单的close事件
    changeMenuOpen (index, path) {
    //   this.falg = index
    }
  },
  mounted () {
    setTimeout(() => {
      this.paramNum = this.$store.state.paramNum
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
  .menu-component{
    overflow: auto;
    height: 100%;
  }
  .menu-component.menu-son{
    overflow: hidden;
    // padding-left: 20px;
  }
  .menu-component /deep/  .el-menu-item .title-box .el-button{
    color: #333;
    border: none;
    width: 90px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0;
    // vertical-align: text-top;
  }
   .menu-component /deep/  .el-menu-item > i {
     color: #333333;
      &.is-active {
             color: #333333;
         }
   }
  .menu-component /deep/.el-menu-item.is-active i {
        color: #333333;
      }
  .menu-component.menu-son /deep/.el-submenu .el-submenu__title_content{
      padding-left: 6px ;
      font-weight: 400;
  }
  .menu-component.menu-son /deep/.el-submenu.is-opened  {
          > div {
             > span {
               font-weight: 900;
             }
             .el-button {
               font-weight: 900;
             }
          }
  }
  .menu-component.menu-son /deep/.el-menu-item .title-box{
    vertical-align: top;
    // padding-left: 15px ;
  }
 .el-menu-vertical-demo-children /deep/ .menu-component.menu-son   {
          .padd3 {
            padding-left: 18px !important;

          }
          .padd4 {
            padding-left: 35px !important;
          }
          .padd5 {
            padding-left: 52px !important;
          }
          .padd6 {
            padding-left: 68px !important;
          }
          .padd7 {
            padding-left: 74px !important;
          }
          .padd8 {
            padding-left: 92px !important;
          }
}
  //  .el-menu-vertical-demo-children /deep/ .menu-component.menu-son .el-submenu__title .el-submenu__title_content > i  {
  //         padding-left: 8px !important;
  //  }
 </style>
