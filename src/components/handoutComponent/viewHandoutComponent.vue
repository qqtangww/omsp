<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 11:13:49
 * @LastEditTime: 2019-09-26 10:40:01
 * @LastEditors: ly
 -->
<template>
  <!-- 视图（表格）组件分发器 -->
  <component :is="routeName" :paramPageNum='paramPageNum' :tableRowHeight='tableRowHeight' :configData="configData" :shareData="shareData" class="view-handout-component" v-on="$listeners"/>
</template>
<script>

// 大写 视图模板
import upperCaseView from '@/components/stdTable/upperCaseView/standardTable'
// 页面级 视图模板
import viewStandard from '@/components/stdTable/viewStandard/standardTable'
// 内容组件级 视图模板
import viewCustomHeight from '@/components/stdTable/viewCustomHeight/standardTable'
// 树形,树形懒加载表格视图模板
import viewSpecificLazyTable from '@/components/stdTable/viewSpecificLazyTable/standardTable'

import util from '@/common/js/util.js'
export default {
  name: 'viewHandoutComponent',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  watch: {
    configData: {
      deep: true,
      handler (nv) {
        if (nv.confParams) {
          //   视图分页数量
          let code = ''
          if (nv.code) {
            code = nv.code
          } else {
            code = nv.v_Code
          }

          if (Object.keys(nv).length > 0) {
            // if (nv.v_TemplateCode) {
            //   this.routeName = util.transContentCompName(nv.v_TemplateCode)
            // } else if (nv.confView.templatecode) {
            //   this.routeName = util.transContentCompName(nv.confView.templatecode)
            // }
            this.routeName = nv.v_TemplateCode ? nv.v_TemplateCode : nv.confView.templatecode
          }
          let paramPageNum = nv.confParams.paramPageNum ? nv.confParams.paramPageNum : ''
          if (paramPageNum) {
            this.paramPageNum = [paramPageNum.v_ParamValue, paramPageNum.v_ParamValue1, paramPageNum.v_ParamValue2, paramPageNum.v_ParamValue3, paramPageNum.v_ParamValue4]
          }
          let style = document.getElementsByName('tableStyle')[0]
          //   自定义查询间距
          let customQueryMargin = nv.confParams.customQueryRowMargin ? nv.confParams.customQueryRowMargin.v_ParamValue : ''
          style.innerHTML += `.${code} #stdTableAction_${code} .customQuery .form-search .el-form-item{ margin-bottom: ${customQueryMargin}px !important}`
          //   视图行高
          this.tableRowHeight = nv.confParams.tableRowHeight ? nv.confParams.tableRowHeight.v_ParamValue : ''
          //   视图表头高度
          let viewTableHeadHeight = nv.confParams.viewTableHeadHeight ? nv.confParams.viewTableHeadHeight.v_ParamValue : ''
          //   视图操作栏高度
          let viewOperationBarHeight = nv.confParams.viewOperationBarHeight ? nv.confParams.viewOperationBarHeight.v_ParamValue : ''
          style.innerHTML += `.${code} #stdTableAction_${code} thead tr th {height: ${viewTableHeadHeight}px !important;line-height: ${viewTableHeadHeight}px !important;}
                             .${code} #stdTableAction_${code} thead tr th .cell{height: ${viewTableHeadHeight}px !important;line-height: ${viewTableHeadHeight}px !important;}
                             .${code} #stdTableAction_${code} .toolsBox{height: ${viewOperationBarHeight}px !important;line-height: ${viewOperationBarHeight}px !important;}
                            .${code} #stdTableAction_${code} .toolsBox .unfoldSea{line-height: ${viewOperationBarHeight}px !important;}`
          //  视图操作栏背景颜色
          let stdToolsColor = nv.confParams.stdToolsBackgroundColor ? nv.confParams.stdToolsBackgroundColor.v_ParamValue.split(' ') : []
          if (stdToolsColor[1]) {
            style.innerHTML += `.${code} #stdTableAction_${code} .toolsBox{ background:linear-gradient(${stdToolsColor[2]}deg,${stdToolsColor[0]} 0%,${stdToolsColor[1]} 100%) !important;}`
          } else {
            style.innerHTML += `.${code} #stdTableAction_${code} .toolsBox{ background: ${stdToolsColor[0]}!important}`
          }
          // 视图多选框选中颜色
          let viewCheckBoxCheckedColor = nv.confParams.viewCheckBoxCheckedColor ? nv.confParams.viewCheckBoxCheckedColor.v_ParamValue.split(' ') : []
          if (viewCheckBoxCheckedColor[1]) {
            style.innerHTML += `.${code} #stdTableAction_${code} .el-checkbox__input.is-checked .el-checkbox__inner,.${code} #stdTableAction_${code} .el-checkbox__input.is-indeterminate .el-checkbox__inner{ background:linear-gradient(${viewCheckBoxCheckedColor[2]}deg,${viewCheckBoxCheckedColor[0]} 0%,${viewCheckBoxCheckedColor[1]} 100%) !important;}`
          } else {
            style.innerHTML += `.${code} #stdTableAction_${code} .el-checkbox__input.is-checked .el-checkbox__inner,.${code} #stdTableAction_${code} .el-checkbox__input.is-indeterminate .el-checkbox__inner{ background: ${viewCheckBoxCheckedColor[0]}!important;border-color:${viewCheckBoxCheckedColor[0]}!important }`
          }
          // 视图合计行背景颜色
          let viewTotalRowBgColor = nv.confParams.viewTotalRowBgColor ? nv.confParams.viewTotalRowBgColor.v_ParamValue.split(' ') : []
          if (viewTotalRowBgColor[1]) {
            style.innerHTML += `.${code} #stdTableAction_${code} .el-table__header-wrapper tbody td,.${code} #stdTableAction_${code} .el-table__footer-wrapper tbody td,.${code} #stdTableAction_${code} .el-table__fixed-footer-wrapper tbody td{ background:linear-gradient(${viewTotalRowBgColor[2]}deg,${viewTotalRowBgColor[0]} 0%,${viewTotalRowBgColor[1]} 100%) !important;}`
          } else {
            style.innerHTML += `.${code} #stdTableAction_${code} .el-table__header-wrapper tbody td,.${code} #stdTableAction_${code} .el-table__footer-wrapper tbody td,.${code} #stdTableAction_${code} .el-table__fixed-footer-wrapper tbody td{ background: ${viewTotalRowBgColor[0]}!important}`
          }
          // 视图表头背景颜色
          let viewTableHeadColor = nv.confParams.viewTableHeadColor ? nv.confParams.viewTableHeadColor.v_ParamValue.split(' ') : []
          if (viewTableHeadColor[1]) {
            style.innerHTML += `.${code} #stdTableAction_${code} .el-table__header thead tr th{ background:linear-gradient(${viewTableHeadColor[2]}deg,${viewTableHeadColor[0]} 0%,${viewTableHeadColor[1]} 100%)!important}`
          } else {
            style.innerHTML += `.${code} #stdTableAction_${code} .el-table__header thead tr th{ background: ${viewTableHeadColor[0]}!important;border-color:${viewTableHeadColor[0]}!important}`
          }
          // 视图行数据分割线颜色
          let viewRowLineColor = nv.confParams.viewRowLineColor ? nv.confParams.viewRowLineColor.v_ParamValue.split(' ') : []
          // 视图查询区折叠按钮颜色
          let viewSearchHideButtonColor = nv.confParams.viewSearchHideButtonColor ? nv.confParams.viewSearchHideButtonColor.v_ParamValue.split(' ') : []
          // 视图排序图标选中颜色
          let viewSortIconActivedColor = nv.confParams.viewSortIconActivedColor ? nv.confParams.viewSortIconActivedColor.v_ParamValue.split(' ') : []
          // 视图排序图标未选中颜色
          let viewSortIconInactivedColor = nv.confParams.viewSortIconInactivedColor ? nv.confParams.viewSortIconInactivedColor.v_ParamValue.split(' ') : []
          style.innerHTML += `.${code} #stdTableAction_${code} .el-table th.is-leaf,.${code} #stdTableAction_${code} .el-table td{ border-bottom-color: ${viewRowLineColor[0]}!important}
                            .${code} #stdTableAction_${code} .toolsBox .unfoldSea i{color: ${viewSearchHideButtonColor[0]}!important}
                            .${code} #stdTableAction_${code} .table-wrapper .el-table  /deep/ .descending .sort-caret.descending{border-top-color: ${viewSortIconActivedColor[0]} !important}
                            .${code} #stdTableAction_${code} .table-wrapper .el-table /deep/ .descending .sort-caret.ascending{border-bottom-color: ${viewSortIconInactivedColor[0]} !important}
                            .${code} #stdTableAction_${code} .table-wrapper .el-table /deep/ .ascending .sort-caret.ascending{border-bottom-color: ${viewSortIconActivedColor[0]} !important}
                            .${code} #stdTableAction_${code} .table-wrapper .el-table /deep/ .ascending .sort-caret.descending{border-top-color:  ${viewSortIconInactivedColor[0]} !important}
                            .${code} #stdTableAction_${code} .table-wrapper .el-table /deep/ .sort-caret.ascending{border-bottom-color:  ${viewSortIconInactivedColor[0]} !important}
                            .${code} #stdTableAction_${code} .table-wrapper .el-table /deep/ .sort-caret.descending{border-top-color:  ${viewSortIconInactivedColor[0]} !important}`

          // 视图列链接文字样式
          let viewColumnLinkTextStyle = nv.confParams.viewColumnLinkTextStyle ? nv.confParams.viewColumnLinkTextStyle.v_ParamValue : ''
          // 视图分页按钮Hover样式
          let viewPaginationButtonHoverStyle = nv.confParams.viewPaginationButtonHoverStyle ? nv.confParams.viewPaginationButtonHoverStyle.v_ParamValue : ''
          // 视图分页按钮未选中样式
          let viewPaginationButtonUnselected = nv.confParams.viewPaginationButtonUnselected ? nv.confParams.viewPaginationButtonUnselected.v_ParamValue : ''
          // 视图分页按钮选中样式
          let viewPaginationButtonuSelectedS = nv.confParams.viewPaginationButtonuSelectedS ? nv.confParams.viewPaginationButtonuSelectedS.v_ParamValue : ''
          // 视图分页文字样式
          let viewPaginationTextStyle = nv.confParams.viewPaginationTextStyle ? nv.confParams.viewPaginationTextStyle.v_ParamValue : ''
          // 视图分页数字文字样式
          let viewPaginationTotalNumberStyle = nv.confParams.viewPaginationTotalNumberStyle ? nv.confParams.viewPaginationTotalNumberStyle.v_ParamValue : ''
          // 视图表头文字样式
          let viewTableHeadTextStyle = nv.confParams.viewTableHeadTextStyle ? nv.confParams.viewTableHeadTextStyle.v_ParamValue : ''
          // 视图正文文字样式
          let viewTextStyle = nv.confParams.viewTextStyle ? nv.confParams.viewTextStyle.v_ParamValue : ''
          this.$nextTick(() => {
            setTimeout(() => {
              let tableStyle = document.getElementById(`stdTableAction_${code}`)
              if (viewColumnLinkTextStyle) {
                tableStyle.classList.add(viewColumnLinkTextStyle)
              }
              if (viewPaginationButtonHoverStyle) {
                tableStyle.classList.add(viewPaginationButtonHoverStyle)
              }
              if (viewPaginationButtonUnselected) {
                tableStyle.classList.add(viewPaginationButtonUnselected)
              }
              if (viewPaginationButtonuSelectedS) {
                tableStyle.classList.add(viewPaginationButtonuSelectedS)
              }
              if (viewPaginationTextStyle) {
                tableStyle.classList.add(viewPaginationTextStyle)
              }
              if (viewPaginationTotalNumberStyle) {
                tableStyle.classList.add(viewPaginationTotalNumberStyle)
              }
              if (viewTableHeadTextStyle) {
                tableStyle.classList.add(viewTableHeadTextStyle)
              }
              if (viewTextStyle) {
                tableStyle.classList.add(viewTextStyle)
              }
            }, 100)
          })
        }
      }
    }
  },
  data () {
    return {
      routeName: '',
      tableRowHeight: '',
      paramPageNum: []
    }
  },
  mounted () {

  },
  components: {
    viewStandard,
    viewCustomHeight,
    upperCaseView,
    viewSpecificLazyTable
  }
}
</script>

<style lang="scss" scoped>
.view-handout-component{
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
