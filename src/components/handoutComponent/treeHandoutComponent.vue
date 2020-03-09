<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 11:13:49
 * @LastEditTime: 2019-08-27 17:37:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 树 组件分发器 -->
  <component :is="routeName" v-on="$listeners" :configData="configData" :shareData="shareData" class="tree-component"/>
</template>
<script>

// 标准 树模板
import treeStandard from '@/components/stdTree/standardTree'
// 懒加载 树模板
import lazyTree from '@/components/stdTree/lazyTree'

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
      immediate: true,
      handler (nv) {
        if (nv.response.data.confParams) {
          let style = document.getElementsByName('treeStyle')[0]
          let code = ''
          if (nv.v_Code) {
            code = nv.v_Code
          } else {
            code = nv.code
          }
          this.routeName = nv.v_TemplateCode ? nv.v_TemplateCode : nv.response.data.confView.templatecode
          //   树形行高
          let treeRowHeight = nv.response.data.confParams.treeRowHeight ? nv.response.data.confParams.treeRowHeight.v_ParamValue : ''
          //   树形组件标题栏高度
          let treeTitleBarHeight = nv.response.data.confParams.treeTitleBarHeight ? nv.response.data.confParams.treeTitleBarHeight.v_ParamValue : ''
          style.innerHTML += `.${code} #stdTreeAction_${code} .tree-wrap .title{height: ${treeTitleBarHeight}px !important;line-height: ${treeTitleBarHeight}px !important;}
                              .${code} #stdTreeAction_${code} .el-tree-node /deep/ .el-tree-node__content{ height: ${treeRowHeight}px !important;line-height: ${treeRowHeight}px !important;} `
          // 树形组件标题栏背景颜色
          let treeTitleBarBgColor = nv.response.data.confParams.treeTitleBarBgColor ? nv.response.data.confParams.treeTitleBarBgColor.v_ParamValue.split(' ') : []
          if (treeTitleBarBgColor[1]) {
            style.innerHTML += `.${code} #stdTreeAction_${code} #template-tree-box .title{ background:linear-gradient(${treeTitleBarBgColor[2]}deg,${treeTitleBarBgColor[0]} 0%,${treeTitleBarBgColor[1]} 100%)!important;}`
          } else {
            style.innerHTML += `.${code} #stdTreeAction_${code} #template-tree-box .title{ background: ${treeTitleBarBgColor[0]}!important;}`
          }
          // 树形组件标题栏文字样式
          let treeTitleBarTextStyle = nv.response.data.confParams.treeTitleBarTextStyle ? nv.response.data.confParams.treeTitleBarTextStyle.v_ParamValue : ''
          // 树节点计数样式
          let treeNodeCountStyle = nv.response.data.confParams.treeNodeCountStyle ? nv.response.data.confParams.treeNodeCountStyle.v_ParamValue : ''
          // 节点文字样式
          let treeNodeTextStyle = nv.response.data.confParams.treeNodeTextStyle ? nv.response.data.confParams.treeNodeTextStyle.v_ParamValue : ''
          this.$nextTick(() => {
            setTimeout(() => {
              let treeStyle = document.getElementById(`stdTreeAction_${code}`)
              if (treeTitleBarTextStyle) {
                treeStyle.classList.add(treeTitleBarTextStyle)
              }
              if (treeNodeCountStyle) {
                treeStyle.classList.add(treeNodeCountStyle)
              }
              if (treeNodeTextStyle) {
                treeStyle.classList.add(treeNodeTextStyle)
              }
            }, 100)
          })
        }
      }
    }
  },
  data () {
    return {
      routeName: ''
    }
  },
  components: {
    treeStandard,
    lazyTree
  }
}
</script>

<style lang="scss" scoped>
.tree-component{
  height: 100%;
}
</style>
