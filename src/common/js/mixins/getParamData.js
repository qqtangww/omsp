import cgiService from '@/api/cgiService'
// 获取参数
export default {
  data () {
    return {
      // 视图数据行行高
      tableRowHeight: '',
      // 菜单栏背景色
      menuBackground: '',
      // 菜单栏行高
      menuRowHeight: '',
      // 历史记录栏背景颜色
      historyBarColor: '',
      // 标题行高
      headerWrapper: '',
      // 标题行高的line-height
      headerLineHeightWrapper: '',
      // 树形行高
      treeRowHeight: '',
      // 竖形Tab行高
      treeTabRowHeight: '',
      // 视图操作栏背景颜色
      stdToolsColor: '',
      // 自定义查询间距
      customQueryMargin: '',
      // 表单边距
      formRowMargin: '',
      // 历史记录的数量
      paramNum: 0,
      // 视图表头行高
      viewTableHeadHeight: '',
      // 视图操作栏行高
      viewOperationBarHeight: '',
      // 表单操作栏行高
      formOperationBarHeight: '',
      // 树形组件标题栏高度
      treeTitleBarHeight: '',
      // 树形组件标题栏高度
      menuTitleBarHeight: '',
      // 布局区域标题栏高度
      regionTitleBarHeight: '',
      // 历史栏区域高度
      historyBarHeight: '',
      // 树形,菜单,视图Hover颜色
      hoverColor: '',
      // 树形,菜单,视图选中颜色
      selectedColor: '',
      // 历史记录栏背景颜色
      historyBarSelectedBgColor: '',
      // 历史栏菜单未选中背景颜色
      historyBarUnselectedBgColor: '',
      // 历史栏菜单选中文字样式
      historyBarSelectedTextStyle: '',
      // 历史栏菜单未选中文字样式
      historyBarUnselectedTextStyle: '',
      // 区域分割线颜色
      regionLineColor: '',
      // 区域间距
      regionMargin: '',
      // 区域间距背景颜色
      regionMarginBgColor: '',
      // 区域间距hover颜色
      regionMarginHoverColor: '',
      // 布局区域标题栏文字样式
      regionTitleBarTextStyle: '',
      // 布局区域标题栏背景颜色
      regionTitleBarBgColor: '',
      // 系统标题区中文标题样式
      systemChineseTitleStyle: '',
      // 系统标题区英文标题样式
      systemEnglishTitleStyle: '',
      // 系统标题区背景颜色
      systemTitleBgColor: '',
      // 系统标题区用户名文字样式
      systemTitleUserNameTextStyle: '',
      // 菜单标题背景颜色
      menuTitleBarBgColor: '',
      // 导航菜单区背景颜色
      navMenuBgColor: '',
      // 菜单标题文字样式
      menuTitleBarTextStyle: '',
      // 菜单默认节点样式
      menuDefaultNodeStyle: '',
      // 菜单展开节点样式
      menuExpandNodeStyle: '',
      // 表单操作按钮文字样式
      formButtonStyle: '',
      // 表单描述文字样式
      formDesriptionStyle: '',
      // 编辑表单标签文字
      formLabelStyle: '',
      // 表单正文样式
      formTextStyle: '',
      // 表单提示文字样式
      formWarningStyle: '',
      // 表单分类标题文字
      groupTitleStyle: '',
      // 查看表单标签文字
      infoLabelStyle: '',
      // 表单分类边框颜色
      formGroupBorderColor: '',
      // 表单输入框边框默认颜色
      formInputBorderDefaultColor: '',
      // 表单输入框边框激活颜色
      formInputBorderFocusColor: '',
      // 表单输入框边框验证出错颜色
      formInputBorderInvalidColor: '',
      // 表单输入框边框验证正确颜色
      formInputBorderValidColor: '',
      // 表单操作栏颜色
      formOperationBarColor: '',
      // Tab边框线颜色
      tabBorderColor: '',
      // Tab选中标签样式
      tabSelectedStyle: '',
      // Tab未选中标签样式
      tabUnselectedStyle: '',
      // Tab特殊标签样式
      tabSpecialStyle: '',
      // 树形组件标题栏背景颜色
      treeTitleBarBgColor: '',
      // 树形组件标题栏文字样式
      treeTitleBarTextStyle: '',
      // 视图多选框选中颜色
      viewCheckBoxCheckedColor: '',
      // 视图行数据分割线颜色
      viewRowLineColor: '',
      // 视图查询区折叠按钮颜色
      viewSearchHideButtonColor: '',
      // 视图排序图标选中颜色
      viewSortIconActivedColor: '',
      // 视图排序图标未选中颜色
      viewSortIconInactivedColor: '',
      // 视图表头背景颜色
      viewTableHeadColor: '',
      // 视图合计行背景颜色
      viewTotalRowBgColor: '',
      // 视图列链接文字样式
      viewColumnLinkTextStyle: '',
      // 视图分页按钮Hover样式
      viewPaginationButtonHoverStyle: '',
      // 视图分页按钮未选中样式
      viewPaginationButtonUnselected: '',
      // 视图分页按钮选中样式
      viewPaginationButtonuSelectedS: '',
      // 视图分页文字样式
      viewPaginationTextStyle: '',
      // 视图分页数字文字样式
      viewPaginationTotalNumberStyle: '',
      // 视图表头文字样式
      viewTableHeadTextStyle: '',
      // 视图正文文字样式
      viewTextStyle: ''
    }
  },
  created () {
    let v_ParamCode = ['tableRowHeight', 'viewTextStyle', 'viewTableHeadTextStyle', 'viewPaginationTotalNumberStyle', 'viewPaginationTextStyle', 'viewColumnLinkTextStyle', 'viewPaginationButtonHoverStyle', 'viewPaginationButtonUnselected', 'viewPaginationButtonuSelectedS', 'viewTotalRowBgColor', 'viewTableHeadColor', 'viewSortIconInactivedColor', 'viewSortIconActivedColor', 'viewSearchHideButtonColor', 'viewRowLineColor', 'viewCheckBoxCheckedColor', 'selectedColor', 'treeTitleBarTextStyle', 'treeTitleBarBgColor', 'tabSpecialStyle', 'tabUnselectedStyle', 'tabSelectedStyle', 'tabBorderColor', 'formOperationBarColor', 'formInputBorderFocusColor', 'formInputBorderInvalidColor', 'formInputBorderValidColor', 'formGroupBorderColor', 'formInputBorderDefaultColor', 'formDesriptionStyle', 'formLabelStyle', 'formTextStyle', 'formWarningStyle', 'groupTitleStyle', 'infoLabelStyle', 'formButtonStyle', 'menuDefaultNodeStyle', 'menuExpandNodeStyle', 'menuTitleBarTextStyle', 'menuTitleBarBgColor', 'navMenuBgColor', 'systemTitleUserNameTextStyle', 'regionTitleBarBgColor', 'systemTitleBgColor', 'systemChineseTitleStyle', 'systemEnglishTitleStyle', 'regionTitleBarTextStyle', 'regionMarginBgColor', 'regionMarginHoverColor', 'regionMargin', 'regionLineColor', 'historyBarSelectedTextStyle', 'historyBarUnselectedTextStyle', 'historyBarUnselectedBgColor', 'historyBarSelectedBgColor', 'hoverColor', 'historyBarHeight', 'regionTitleBarHeight', 'menuTitleBarHeight', 'treeTitleBarHeight', 'formOperationBarHeight', 'viewOperationBarHeight', 'viewTableHeadHeight', 'fristMenuListBarBgColor', 'historyBarBackgroundColor', 'menuRowHeight', 'paramPointColor', 'paramPageNum', 'paramHistoryNum', 'systemTitleHeight', 'treeRowHeight', 'treeTabRowHeight', 'stdToolsBackgroundColor', 'customQueryRowMargin', 'formRowMargin']
    this.getParameter({ v_ParamCode })
  },
  methods: {
    getParameter (params) {
      cgiService.getParameter(params).then(res => {
        if (res.code === 0) {
          //   小点颜色
          this.$store.commit('getParameterData', [res.data.paramPointColor, 'windowRed'])
          //   视图分页数
          this.$store.commit('getParameterData', [res.data.paramPageNum, 'parameterPage'])
          //   历史记录的数量
          if (Number(res.data.paramHistoryNum.v_ParamValue) <= 2) {
            this.paramNum = 2
            this.$store.commit('getparamNum', this.paramNum)
          } else {
            this.paramNum = Number(res.data.paramHistoryNum.v_ParamValue)
            this.$store.commit('getparamNum', this.paramNum)
          }
          //   视图行高
          let tableRowHeight = res.data.tableRowHeight.v_ParamValue
          //   菜单栏行高
          let menuRowHeight = res.data.menuRowHeight.v_ParamValue
          //   树形行高
          this.treeRowHeight = res.data.treeRowHeight.v_ParamValue
          //   竖形tab行高
          this.treeTabRowHeight = res.data.treeTabRowHeight.v_ParamValue
          //   标题行高
          let headerWrapper = res.data.systemTitleHeight.v_ParamValue
          let headerLineHeightWrapper = Number(res.data.systemTitleHeight.v_ParamValue) - 6
          //   自定义查询间距
          this.customQueryMargin = res.data.customQueryRowMargin.v_ParamValue
          //   表单边距
          this.formRowMargin = res.data.formRowMargin.v_ParamValue
          //   视图表头高度
          this.viewTableHeadHeight = res.data.viewTableHeadHeight.v_ParamValue
          //   视图操作栏高度
          this.viewOperationBarHeight = res.data.viewOperationBarHeight.v_ParamValue
          //   表单操作栏高度
          this.formOperationBarHeight = res.data.formOperationBarHeight.v_ParamValue
          //   树形组件标题栏高度
          this.treeTitleBarHeight = res.data.treeTitleBarHeight.v_ParamValue
          //   树形组件标题栏高度
          this.menuTitleBarHeight = res.data.menuTitleBarHeight.v_ParamValue
          //   布局区域标题栏高度
          this.regionTitleBarHeight = res.data.regionTitleBarHeight.v_ParamValue
          //   历史栏区域高度
          this.historyBarHeight = res.data.historyBarHeight.v_ParamValue
          //   区域间距
          this.regionMargin = res.data.regionMargin.v_ParamValue
          let style = document.createElement('style')
          style.type = 'text/css'
          style.innerHTML = `.el-submenu /deep/ .el-menu-item,.el-submenu /deep/ .el-submenu__title{ height: ${menuRowHeight}px !important;line-height: ${menuRowHeight}px !important;}
                             .menu-component /deep/ .el-menu-item{ height: ${menuRowHeight}px !important;line-height: ${menuRowHeight}px !important;}
                             .el-table .el-table__row{ height: ${tableRowHeight}px;line-height: ${tableRowHeight}px;}
                             .el-tree-node /deep/ .el-tree-node__content{ height: ${this.treeRowHeight}px !important;line-height: ${this.treeRowHeight}px !important;} 
                             .tabBox .tabs{ height: ${this.treeTabRowHeight}px !important;line-height: ${this.treeTabRowHeight}px !important;}
                             .ws-wrapper>.header-top{ height: ${headerWrapper}px !important;line-height: ${headerLineHeightWrapper}px !important; }
                             .std-table-action .customQuery .form-search .el-form-item{ margin-bottom: ${this.customQueryMargin}px !important}
                             .bodyBorderBox .el-form .el-form-item{ margin-top: ${this.formRowMargin}px !important;margin-bottom: 0px !important}
                             .table-wrapper thead tr th {height: ${this.viewTableHeadHeight}px !important;line-height: ${this.viewTableHeadHeight}px !important;}
                             .table-wrapper thead tr th .cell{height: ${this.viewTableHeadHeight}px !important;line-height: ${this.viewTableHeadHeight}px !important;}
                             .toolsBox{height: ${this.viewOperationBarHeight}px !important;line-height: ${this.viewOperationBarHeight}px !important;}
                             .toolsBox .unfoldSea{line-height: ${this.viewOperationBarHeight}px !important;}
                             .formOperateBox{height: ${this.formOperationBarHeight}px !important;line-height: ${this.formOperationBarHeight}px !important;}
                             .tree-wrap .title{height: ${this.treeTitleBarHeight}px !important;line-height: ${this.treeTitleBarHeight}px !important;}
                             .el-collapse-item__header{height: ${this.menuTitleBarHeight}px !important;line-height: ${this.menuTitleBarHeight}px !important;}
                             .both-side-box .box-title{height: ${this.regionTitleBarHeight}px !important;line-height: ${this.regionTitleBarHeight}px !important;}
                             .tab-menu-box{height: ${this.historyBarHeight}px !important;line-height: ${this.historyBarHeight}px !important;}
                             .tab-menu-box .tab-menu-btnBox{height: 100% !important;line-height: 100% !important;}
                             .both-side-box .drag-line {width: ${this.regionMargin}px !important}
                             .both-side-box .drag-vertical {height: ${this.regionMargin}px !important}`
          document.getElementsByTagName('head').item(0).appendChild(style)
          // 菜单栏背景色
          this.menuBackground = res.data.fristMenuListBarBgColor.v_ParamValue.split(' ') || []
          if (this.menuBackground[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.menu-background{ background:linear-gradient(${this.menuBackground[2]}deg,${this.menuBackground[0]} 0%,${this.menuBackground[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.menu-background{ background: ${this.menuBackground[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 历史记录栏背景颜色
          this.historyBarColor = res.data.historyBarBackgroundColor.v_ParamValue.split(' ') || []
          if (this.historyBarColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tab-menu-box,.tab-menu-btnBox{ background:linear-gradient(${this.historyBarColor[2]}deg,${this.historyBarColor[0]} 0%,${this.historyBarColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tab-menu-box,.tab-menu-btnBox{ background: ${this.historyBarColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 视图操作栏背景颜色
          this.stdToolsColor = res.data.stdToolsBackgroundColor.v_ParamValue.split(' ') || []
          if (this.stdToolsColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.toolsBox{ background:linear-gradient(${this.stdToolsColor[2]}deg,${this.stdToolsColor[0]} 0%,${this.stdToolsColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.toolsBox{ background: ${this.stdToolsColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 树形,菜单,视图Hover颜色
          this.hoverColor = res.data.hoverColor.v_ParamValue.split(' ') || []
          if (this.hoverColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tree-wrap  /deep/ .el-tree-node__content:hover{ background:linear-gradient(${this.hoverColor[2]}deg,${this.hoverColor[0]} 0%,${this.hoverColor[1]} 100%);}
                              .ws-wrapper .el-container .el-aside .el-collapse .el-menu-item:hover, .ws-wrapper .el-container .el-aside .el-collapse .el-submenu__title:hover{ background:linear-gradient(${this.hoverColor[2]}deg,${this.hoverColor[0]} 0%,${this.hoverColor[1]} 100%); !important}
                              .el-table__body tr.hover-row > td{ background:linear-gradient(${this.hoverColor[2]}deg,${this.hoverColor[0]} 0%,${this.hoverColor[1]} 100%);}
                              .navigationBar .tabBox .tabs:hover{ background:linear-gradient(${this.hoverColor[2]}deg,${this.hoverColor[0]} 0%,${this.hoverColor[1]} 100%)!important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tree-wrap /deep/ .el-tree-node__content:hover{ background: ${this.hoverColor[0]}}
                               .ws-wrapper .el-container .el-aside .el-collapse .el-menu-item:hover, .ws-wrapper .el-container .el-aside .el-collapse .el-submenu__title:hover{ background: ${this.hoverColor[0]} !important}
                               .el-table__body tr.hover-row > td{ background: ${this.hoverColor[0]}}
                               .navigationBarBox .navigationBar .tabBox .tabs:hover{ background: ${this.hoverColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 树形,菜单,视图选中颜色
          this.selectedColor = res.data.selectedColor.v_ParamValue.split(' ') || []
          if (this.selectedColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tree-wrap .tree-layout /deep/ .el-tree-node.is-current > .el-tree-node__content{ background:linear-gradient(${this.selectedColor[2]}deg,${this.selectedColor[0]} 0%,${this.selectedColor[1]} 100%)!important;}
                               .ws-wrapper .el-container .el-aside .el-menu-item.high-light-menu.is-active, .ws-wrapper .el-container .el-aside .el-menu-item.high-light-menu{ background:linear-gradient(${this.selectedColor[2]}deg,${this.selectedColor[0]} 0%,${this.selectedColor[1]} 100%)!important;}
                               .el-table__body tbody tr.el-table__row.current-row > td{ background:linear-gradient(${this.selectedColor[2]}deg,${this.selectedColor[0]} 0%,${this.selectedColor[1]} 100%)!important;}
                               .navigationBarBox .navigationBar .tabBox .tabs.pitchOn{ background:linear-gradient(${this.selectedColor[2]}deg,${this.selectedColor[0]} 0%,${this.selectedColor[1]} 100%)!important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tree-wrap .tree-layout /deep/ .el-tree-node.is-current > .el-tree-node__content{ background: ${this.selectedColor[0]}!important}
                               .ws-wrapper .el-container .el-aside .el-menu-item.high-light-menu.is-active, .ws-wrapper .el-container .el-aside .el-menu-item.high-light-menu{ background: ${this.selectedColor[0]} !important}
                               .el-table__body tbody tr.el-table__row.current-row > td{ background: ${this.selectedColor[0]}!important}
                               .navigationBarBox .navigationBar .tabBox .tabs.pitchOn{ background: ${this.selectedColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 历史栏菜单选中背景颜色
          this.historyBarSelectedBgColor = res.data.historyBarSelectedBgColor.v_ParamValue.split(' ') || []
          if (this.historyBarSelectedBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .content-wrapper .tab-menu-box .tab-menu-btnBox .tab-menu button{ background:linear-gradient(${this.historyBarSelectedBgColor[2]}deg,${this.historyBarSelectedBgColor[0]} 0%,${this.historyBarSelectedBgColor[1]} 100%)}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .content-wrapper .tab-menu-box .tab-menu-btnBox .tab-menu button{ background: ${this.historyBarSelectedBgColor[0]}}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 历史栏菜单未选中背景颜色
          this.historyBarUnselectedBgColor = res.data.historyBarUnselectedBgColor.v_ParamValue.split(' ') || []
          if (this.historyBarUnselectedBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .content-wrapper .tab-menu-box .tab-menu-btnBox .tab-menu button.el-button--info{ background:linear-gradient(${this.historyBarUnselectedBgColor[2]}deg,${this.historyBarUnselectedBgColor[0]} 0%,${this.historyBarUnselectedBgColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .content-wrapper .tab-menu-box .tab-menu-btnBox .tab-menu button.el-button--info{ background: ${this.historyBarUnselectedBgColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 表单操作栏颜色
          this.formOperationBarColor = res.data.formOperationBarColor.v_ParamValue.split(' ') || []
          if (this.formOperationBarColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.formBox .el-dialog div.el-dialog__body .bodyBorderBox .formOperateBox{ background:linear-gradient(${this.formOperationBarColor[2]}deg,${this.formOperationBarColor[0]} 0%,${this.formOperationBarColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.formBox .el-dialog div.el-dialog__body .bodyBorderBox .formOperateBox{ background: ${this.formOperationBarColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 区域间距背景颜色
          this.regionMarginBgColor = res.data.regionMarginBgColor.v_ParamValue.split(' ') || []
          if (this.regionMarginBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.both-side-box .drag-line,.both-side-box .drag-vertical{ background:linear-gradient(${this.regionMarginBgColor[2]}deg,${this.regionMarginBgColor[0]} 0%,${this.regionMarginBgColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.both-side-box .drag-line,.both-side-box .drag-vertical{ background: ${this.regionMarginBgColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 区域间距hover颜色
          this.regionMarginHoverColor = res.data.regionMarginHoverColor.v_ParamValue.split(' ') || []
          if (this.regionMarginHoverColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.both-side-box .drag-line:hover,.both-side-box .drag-vertical:hover{ background:linear-gradient(${this.regionMarginHoverColor[2]}deg,${this.regionMarginHoverColor[0]} 0%,${this.regionMarginHoverColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.both-side-box .drag-line:hover,.both-side-box .drag-vertical:hover{ background: ${this.regionMarginHoverColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 布局区域标题栏背景颜色
          this.regionTitleBarBgColor = res.data.regionTitleBarBgColor.v_ParamValue.split(' ') || []
          if (this.regionTitleBarBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.both-side-box .box-title{ background:linear-gradient(${this.regionTitleBarBgColor[2]}deg,${this.regionTitleBarBgColor[0]} 0%,${this.regionTitleBarBgColor[1]} 100%);}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.both-side-box .box-title{ background: ${this.regionTitleBarBgColor[0]};}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 树形组件标题栏背景颜色
          this.treeTitleBarBgColor = res.data.treeTitleBarBgColor.v_ParamValue.split(' ') || []
          if (this.treeTitleBarBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tree-wrap #template-tree-box .title{ background:linear-gradient(${this.treeTitleBarBgColor[2]}deg,${this.treeTitleBarBgColor[0]} 0%,${this.treeTitleBarBgColor[1]} 100%);}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.tree-wrap #template-tree-box .title{ background: ${this.treeTitleBarBgColor[0]};}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 系统标题区背景颜色
          this.systemTitleBgColor = res.data.systemTitleBgColor.v_ParamValue.split(' ') || []
          if (this.systemTitleBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .header-top{ background:linear-gradient(${this.systemTitleBgColor[2]}deg,${this.systemTitleBgColor[0]} 0%,${this.systemTitleBgColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .header-top{ background: ${this.systemTitleBgColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 菜单标题背景颜色
          this.menuTitleBarBgColor = res.data.menuTitleBarBgColor.v_ParamValue.split(' ') || []
          if (this.menuTitleBarBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .el-aside .el-collapse .el-collapse-item__header{ background:linear-gradient(${this.menuTitleBarBgColor[2]}deg,${this.menuTitleBarBgColor[0]} 0%,${this.menuTitleBarBgColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .el-aside .el-collapse .el-collapse-item__header{ background: ${this.menuTitleBarBgColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 导航菜单区背景颜色
          this.navMenuBgColor = res.data.navMenuBgColor.v_ParamValue.split(' ') || []
          if (this.navMenuBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .el-aside .el-collapse .el-collapse-item__wrap,.ws-wrapper .el-container .el-aside .el-collapse .el-collapse-item__wrap .menu-component{ background:linear-gradient(${this.navMenuBgColor[2]}deg,${this.navMenuBgColor[0]} 0%,${this.navMenuBgColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.ws-wrapper .el-container .el-aside .el-collapse .el-collapse-item__wrap,.ws-wrapper .el-container .el-aside .el-collapse .el-collapse-item__wrap .menu-component{ background: ${this.navMenuBgColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 视图多选框选中颜色
          this.viewCheckBoxCheckedColor = res.data.viewCheckBoxCheckedColor.v_ParamValue.split(' ') || []
          if (this.viewCheckBoxCheckedColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{ background:linear-gradient(${this.viewCheckBoxCheckedColor[2]}deg,${this.viewCheckBoxCheckedColor[0]} 0%,${this.viewCheckBoxCheckedColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{ background: ${this.viewCheckBoxCheckedColor[0]}!important;border-color:${this.viewCheckBoxCheckedColor[0]}!important }`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 视图表头背景颜色
          this.viewTableHeadColor = res.data.viewTableHeadColor.v_ParamValue.split(' ') || []
          if (this.viewTableHeadColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.el-table__header thead tr th{ background:linear-gradient(${this.viewTableHeadColor[2]}deg,${this.viewTableHeadColor[0]} 0%,${this.viewTableHeadColor[1]} 100%)}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.el-table__header thead tr th{ background: ${this.viewTableHeadColor[0]}!important;border-color:${this.viewTableHeadColor[0]}}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 视图合计行背景颜色
          this.viewTotalRowBgColor = res.data.viewTotalRowBgColor.v_ParamValue.split(' ') || []
          if (this.viewTotalRowBgColor[1]) {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.el-table__header-wrapper tbody td, .el-table__footer-wrapper tbody td,.el-table__fixed-footer-wrapper tbody td{ background:linear-gradient(${this.viewTotalRowBgColor[2]}deg,${this.viewTotalRowBgColor[0]} 0%,${this.viewTotalRowBgColor[1]} 100%) !important;}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          } else {
            let style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = `.el-table__header-wrapper tbody td, .el-table__footer-wrapper tbody td,.el-table__fixed-footer-wrapper tbody td{ background: ${this.viewTotalRowBgColor[0]}!important}`
            document.getElementsByTagName('head').item(0).appendChild(style)
          }
          // 区域分割线border颜色
          this.regionLineColor = res.data.regionLineColor.v_ParamValue.split(' ') || []
          // 表单分类边框颜色
          this.formGroupBorderColor = res.data.formGroupBorderColor.v_ParamValue.split(' ') || []
          // 表单输入框边框默认颜色
          this.formInputBorderDefaultColor = res.data.formInputBorderDefaultColor.v_ParamValue.split(' ') || []
          // 表单输入框边框激活颜色
          this.formInputBorderFocusColor = res.data.formInputBorderFocusColor.v_ParamValue.split(' ') || []
          // 表单输入框边框验证出错颜色
          this.formInputBorderInvalidColor = res.data.formInputBorderInvalidColor.v_ParamValue.split(' ') || []
          // 表单输入框边框验证正确颜色
          this.formInputBorderValidColor = res.data.formInputBorderValidColor.v_ParamValue.split(' ') || []
          // Tab边框线颜色
          this.tabBorderColor = res.data.tabBorderColor.v_ParamValue.split(' ') || []
          // 视图行数据分割线颜色
          this.viewRowLineColor = res.data.viewRowLineColor.v_ParamValue.split(' ') || []
          // 视图查询区折叠按钮颜色
          this.viewSearchHideButtonColor = res.data.viewSearchHideButtonColor.v_ParamValue.split(' ') || []
          // 视图排序图标选中颜色
          this.viewSortIconActivedColor = res.data.viewSortIconActivedColor.v_ParamValue.split(' ') || []
          // 视图排序图标未选中颜色
          this.viewSortIconInactivedColor = res.data.viewSortIconInactivedColor.v_ParamValue.split(' ') || []
          let borderStyle = document.createElement('style')
          borderStyle.type = 'text/css'
          borderStyle.innerHTML = `.both-side-box .bsb-left,
                               .both-side-box .bsb-left-top,
                               .both-side-box .bsb-left-bottom,
                               .both-side-box .bsb-right,
                               .both-side-box .center-box,
                               .both-side-box .left-box,
                               .both-side-box .right-box,
                               .both-side-box .bsb-top,
                               .both-side-box .bsb-down{ border-color: ${this.regionLineColor[0]}!important}
                               .el-form .border-box{ border-color: ${this.formGroupBorderColor[0]}!important}
                               .el-form /deep/ .el-form-item__content .el-input__inner{ border-color: ${this.formInputBorderDefaultColor[0]}!important}
                               .el-form /deep/ .el-form-item__content .el-textarea__inner{ border-color: ${this.formInputBorderDefaultColor[0]}!important}
                               .el-form /deep/ .el-form-item__content .el-input__inner:focus{ border-color: ${this.formInputBorderFocusColor[0]}!important}
                               .el-form /deep/ .el-form-item__content .el-textarea__inner:focus{ border-color: ${this.formInputBorderFocusColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-error .el-input__inner{ border-color: ${this.formInputBorderInvalidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-error .el-input__inner:focus{ border-color: ${this.formInputBorderInvalidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-error .el-textarea__inner{ border-color: ${this.formInputBorderInvalidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-error .el-textarea__inner:focus{ border-color: ${this.formInputBorderInvalidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-success .el-input__inner{ border-color: ${this.formInputBorderValidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-success .el-input__inner:focus{ border-color: ${this.formInputBorderValidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-success .el-textarea__inner{ border-color: ${this.formInputBorderValidColor[0]}!important}
                               .el-form /deep/ .el-form-item.is-success .el-textarea__inner:focus{ border-color: ${this.formInputBorderValidColor[0]}!important}
                               .el-tabs__header{ border-bottom-color: ${this.tabBorderColor[0]}!important}
                               .el-tabs__nav-wrap .el-tabs__nav .el-tabs__item.is-active{ border-top-color: ${this.tabBorderColor[0]}!important;border-left-color: ${this.tabBorderColor[0]}!important;border-right-color: ${this.tabBorderColor[0]}!important}
                               .el-table th.is-leaf, .el-table td{ border-bottom-color: ${this.viewRowLineColor[0]}!important}
                               .toolsBox .unfoldSea i{color: ${this.viewSearchHideButtonColor[0]}!important}
                               .table-wrapper .el-table  /deep/ .descending .sort-caret.descending{border-top-color: ${this.viewSortIconActivedColor[0]} !important}
                               .table-wrapper .el-table /deep/ .descending .sort-caret.ascending{border-bottom-color: ${this.viewSortIconInactivedColor[0]} !important}
                               .table-wrapper .el-table /deep/ .ascending .sort-caret.ascending{border-bottom-color: ${this.viewSortIconActivedColor[0]} !important}
                               .table-wrapper .el-table /deep/ .ascending .sort-caret.descending{border-top-color:  ${this.viewSortIconInactivedColor[0]} !important}
                               .table-wrapper .el-table /deep/ .sort-caret.ascending{border-bottom-color:  ${this.viewSortIconInactivedColor[0]} !important}
                               .table-wrapper .el-table /deep/ .sort-caret.descending{border-top-color:  ${this.viewSortIconInactivedColor[0]} !important}`
          document.getElementsByTagName('head').item(0).appendChild(borderStyle)
          // 历史栏菜单选中文字样式
          this.historyBarSelectedTextStyle = res.data.historyBarSelectedTextStyle.v_ParamValue
          if (this.historyBarSelectedTextStyle) {
            let menuButtonColor = document.querySelector('.ws-wrapper .el-container .tab-menu')
            menuButtonColor.classList.add(this.historyBarSelectedTextStyle)
            // 历史栏菜单未选中文字样式
            this.historyBarUnselectedTextStyle = res.data.historyBarUnselectedTextStyle.v_ParamValue
            menuButtonColor.classList.add(this.historyBarUnselectedTextStyle)
          }
          // 系统标题区中文标题样式
          this.systemChineseTitleStyle = res.data.systemChineseTitleStyle.v_ParamValue
          if (this.systemChineseTitleStyle) {
            let sysCHTitle = document.querySelector('.ws-wrapper .el-header .header-wrapper .titleCh')
            sysCHTitle.classList.add(this.systemChineseTitleStyle)
          }
          // 系统标题区英文标题样式
          this.systemEnglishTitleStyle = res.data.systemEnglishTitleStyle.v_ParamValue
          if (this.systemEnglishTitleStyle) {
            let sysENTitle = document.querySelector('.ws-wrapper .el-header .header-wrapper .titleEng')
            sysENTitle.classList.add(this.systemEnglishTitleStyle)
          }
          // 系统标题区用户名文字样式
          this.systemTitleUserNameTextStyle = res.data.systemTitleUserNameTextStyle.v_ParamValue
          if (this.systemTitleUserNameTextStyle) {
            let sysUserTitle = document.querySelector('.ws-wrapper .el-header .header-wrapper .user-name')
            sysUserTitle.classList.add(this.systemTitleUserNameTextStyle)
          }
          // 菜单标题文字样式
          this.menuTitleBarTextStyle = res.data.menuTitleBarTextStyle.v_ParamValue
          if (this.menuTitleBarTextStyle) {
            let menuTitle = document.querySelector('.ws-wrapper .el-container')
            menuTitle.classList.add(this.menuTitleBarTextStyle)
          }
          // 菜单默认节点样式
          this.menuExpandNodeStyle = res.data.menuExpandNodeStyle.v_ParamValue
          if (this.menuExpandNodeStyle) {
            let menuExpandNode = document.querySelector('.ws-wrapper .el-menu-vertical-demo')
            menuExpandNode.classList.add(this.menuExpandNodeStyle)
          }
          // 菜单展开节点样式
          this.menuDefaultNodeStyle = res.data.menuDefaultNodeStyle.v_ParamValue
          if (this.menuDefaultNodeStyle) {
            let menuDefaultNode = document.querySelector('.ws-wrapper .el-container')
            menuDefaultNode.classList.add(this.menuDefaultNodeStyle)
          }
          // 布局区域标题栏文字样式
          this.regionTitleBarTextStyle = res.data.regionTitleBarTextStyle.v_ParamValue
          if (this.regionTitleBarTextStyle) {
            let regionTitle = document.querySelector('.el-main')
            regionTitle.classList.add(this.regionTitleBarTextStyle)
          }
          // 树形组件标题栏文字样式
          this.treeTitleBarTextStyle = res.data.treeTitleBarTextStyle.v_ParamValue
          if (this.treeTitleBarTextStyle) {
            let treeTitle = document.querySelector('.el-main')
            treeTitle.classList.add(this.treeTitleBarTextStyle)
          }
          // Tab选中标签样式
          this.tabSelectedStyle = res.data.tabSelectedStyle.v_ParamValue
          if (this.tabSelectedStyle) {
            let tabSelectedStyle = document.querySelector('.el-main')
            tabSelectedStyle.classList.add(this.tabSelectedStyle)
          }
          // Tab未选中标签样式
          this.tabUnselectedStyle = res.data.tabUnselectedStyle.v_ParamValue
          if (this.tabUnselectedStyle) {
            let tabUnselectedStyle = document.querySelector('.el-main')
            tabUnselectedStyle.classList.add(this.tabUnselectedStyle)
          }
          // Tab未选中标签样式
          this.tabSpecialStyle = res.data.tabSpecialStyle.v_ParamValue
          if (this.tabSpecialStyle) {
            let tabSpecialStyle = document.querySelector('.el-main')
            tabSpecialStyle.classList.add(this.tabSpecialStyle)
          }
          // 表单操作按钮文字样式
          this.formButtonStyle = res.data.formButtonStyle.v_ParamValue
          // 表单描述文字样式
          this.formDesriptionStyle = res.data.formDesriptionStyle.v_ParamValue
          // 编辑表单标签文字
          this.formLabelStyle = res.data.formLabelStyle.v_ParamValue
          // 表单正文样式
          this.formTextStyle = res.data.formTextStyle.v_ParamValue
          // 表单提示文字样式
          this.formWarningStyle = res.data.formWarningStyle.v_ParamValue
          // 表单分类标题文字
          this.groupTitleStyle = res.data.groupTitleStyle.v_ParamValue
          // 查看表单标签文字
          this.infoLabelStyle = res.data.infoLabelStyle.v_ParamValue
          let formStyle = document.querySelector('body')
          if (this.formButtonStyle) {
            formStyle.classList.add(this.formButtonStyle)
          }
          if (this.formDesriptionStyle) {
            formStyle.classList.add(this.formDesriptionStyle)
          }
          if (this.formLabelStyle) {
            formStyle.classList.add(this.formLabelStyle)
          }
          if (this.formTextStyle) {
            formStyle.classList.add(this.formTextStyle)
          }
          if (this.formWarningStyle) {
            formStyle.classList.add(this.formWarningStyle)
          }
          if (this.groupTitleStyle) {
            formStyle.classList.add(this.groupTitleStyle)
          }
          if (this.infoLabelStyle) {
            formStyle.classList.add(this.infoLabelStyle)
          }

          // 视图列链接文字样式
          this.viewColumnLinkTextStyle = res.data.viewColumnLinkTextStyle.v_ParamValue
          // 视图分页按钮Hover样式
          this.viewPaginationButtonHoverStyle = res.data.viewPaginationButtonHoverStyle.v_ParamValue
          // 视图分页按钮未选中样式
          this.viewPaginationButtonUnselected = res.data.viewPaginationButtonUnselected.v_ParamValue
          // 视图分页按钮选中样式
          this.viewPaginationButtonuSelectedS = res.data.viewPaginationButtonuSelectedS.v_ParamValue
          // 视图分页文字样式
          this.viewPaginationTextStyle = res.data.viewPaginationTextStyle.v_ParamValue
          // 视图分页数字文字样式
          this.viewPaginationTotalNumberStyle = res.data.viewPaginationTotalNumberStyle.v_ParamValue
          // 视图表头文字样式
          this.viewTableHeadTextStyle = res.data.viewTableHeadTextStyle.v_ParamValue
          // 视图正文文字样式
          this.viewTextStyle = res.data.viewTextStyle.v_ParamValue
          let tableStyle = document.querySelector('.el-container')
          if (this.viewColumnLinkTextStyle) {
            tableStyle.classList.add(this.viewColumnLinkTextStyle)
          }
          if (this.viewPaginationButtonHoverStyle) {
            tableStyle.classList.add(this.viewPaginationButtonHoverStyle)
          }
          if (this.viewPaginationButtonUnselected) {
            tableStyle.classList.add(this.viewPaginationButtonUnselected)
          }
          if (this.viewPaginationButtonuSelectedS) {
            tableStyle.classList.add(this.viewPaginationButtonuSelectedS)
          }
          if (this.viewPaginationTextStyle) {
            tableStyle.classList.add(this.viewPaginationTextStyle)
          }
          if (this.viewPaginationTotalNumberStyle) {
            tableStyle.classList.add(this.viewPaginationTotalNumberStyle)
          }
          if (this.viewTableHeadTextStyle) {
            tableStyle.classList.add(this.viewTableHeadTextStyle)
          }
          if (this.viewTextStyle) {
            tableStyle.classList.add(this.viewTextStyle)
          }
        }
      })
    }
  }

}
