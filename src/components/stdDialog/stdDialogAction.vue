<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 19:30:22
 * @LastEditTime: 2019-10-09 17:05:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-dialog
      id="dialog-config-box"
      ref="elDialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      v-dialogDrag
      :title="dialogData.dialogtitle"
      :width="dialogData.width + 'px'"
      append-to-body
      center
      class="formBox teldialog accessFormBox confDialog"
      :custom-class='dialogData.style'
      :class="dialogData.dialogcode"
      :before-close="handleClose">
      <el-button
        type="text"
        v-if="dialogData.ismax === '1'"
        @click="changeDialogSize"
        class="chang-size-dialog"
        icon="iconfont icon-dankuangsuofang"
      ></el-button>
      <!-- 这个组件在全局 main.js 注册了 -->
      <handout-component
        ref="handout"
        class="hand"
        :style="{height:dialogHeight,minHeight:dialogMinHeight}"
        v-on="$listeners"
        :ifDialog='ifDialog'
        :routerName="routeName"
        :getInterfaceData='interfaceData'
        :viewid="viewid"
        :configData='configData'
        :shareData='shareData'
        @close='handleClose'
        @changeDialogTitle='changeDialogTitle'>
      </handout-component>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/js/directives.js'
import util from '@/common/js/util.js'
import { mapState } from 'vuex'
export default {
  name: 'stdDialogAction',
  data () {
    return {
      flag: true,
      routeName: '',
      //   弹框内容的配置项
      dialogData: {},
      //   控制弹框显示隐藏
      dialogVisible: false,
      interfaceData: {},
      tempConfData: {},
      // 视图的viewid
      viewid: '',
      marginTop: 100,
      height: window.innerHeight - 200,
      isMagnify: true,
      dialogId: '',
      dialogIdArr: [],
      viewidArr: []
    }
  },
  props: {
    buttonConfig: Object,
    configData: Object,
    shareData: Object,
    ifDialog: Boolean
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    dialogHeight () {
      if (this.dialogData.heighttype === '1') {
        return this.dialogData.fixedheight + 'px'
      } else if (this.dialogData.heighttype === '0') {
        return this.height + 'px'
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    dialogMinHeight () {
      if (this.dialogData.heighttype === '1') {
        return 0 + 'px'
      } else if (this.dialogData.heighttype === '0') {
        return this.dialogData.minheight + 'px'
      }
    },
    ...mapState({
      confsBtn: state => state.confsBtn,
      dialogFlag: state => state.dialogFlag,
      currentDialogId: state => state.currentDialogId
    }),
    contentComponent () {
      return this.configData.v_CateCode
    }
  },
  created () {
    // false 代表 关闭弹框时候需要二次确认框
    // true 代表 可以直接关闭弹框
    this.$store.commit('getDialogFlag', [this.confsBtn.operationid, true])
    if (this.confsBtn.formcode) {
      this.$store.commit('closeViewId', this.confsBtn.formcode)
    } else if (this.confsBtn.treecode) {
      this.$store.commit('closeViewId', this.confsBtn.treecode)
    } else if (this.confsBtn.viewid) {
      this.$store.commit('closeViewId', this.confsBtn.viewid)
    } else {
      this.$store.commit('closeViewId', 'columLink')
    }

    // else if (this.confsBtn.v_Code) {
    //   this.$store.commit('closeViewId', this.confsBtn.v_Code)
    // }
    // console.log(111)
    // 存储 当前的 viewId  方便关闭弹框时  确定是哪个视图的弹框
    // this.$store.commit('closeViewId', this.configData.viewid)
  },
  watch: {
    ifDialog: {
      handler (val) {
        if (val) {
          this.dialogId = this.confsBtn.operationid
          // 保存当前的弹框id
          this.$store.commit('getDialogId', this.dialogId)
          this.dialogIdArr.push(this.dialogId)
          // 保存所有的弹框id
          this.$store.commit('getDialogIds', this.dialogId)
        }
        this.dialogVisible = val
      },
      immediate: true
    },
    configData: {
      handler (nv) {
        let confsBtn = this.confsBtn
        // console.log(Object.keys(confsBtn))
        // 注释 兼容列链接
        // nv.i_Cate = confsBtn.cate
        // nv.v_CateCode = confsBtn.v_CateCode
        if (confsBtn.cate === 'CT') {
          nv.v_CustomName = confsBtn.customname
          nv.i_Cate = confsBtn.cate
        }

        // nv. = this.confsBtn.code
        // 兼容列链接弹框
        if (nv.hasOwnProperty('dialogData')) {
          this.dialogData = nv.dialogData
          // 需要解析动参
          if (this.dialogData.dialogtitle.includes('#{explain}')) {
            this.getDynamic(this.confsBtn)
          }
        } else {
          this.getDialogData()
        }
        // 标识符：是否是弹框中的组件
        nv.isDialog = true
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    changeDialogSize () {
      // 放大状态
      let elDialog = document.querySelector(`.${this.dialogData.dialogcode} .el-dialog`)
      let innerContent = document.querySelector('.inner-content')
      let handContent = document.querySelector(`.${this.dialogData.dialogcode} .hand`)
      let innerContentData = innerContent.getBoundingClientRect()
      window.removeEventListener('resize', this.getHeight)
      if (this.isMagnify) {
        // 获取 弹框元素
        elDialog.style.width = innerContentData.width + 'px'
        elDialog.style.height = innerContentData.height + 'px'
        elDialog.style.left = innerContentData.left + 'px'
        elDialog.style.top = innerContentData.top + 'px'
        elDialog.style.margin = '0'
        elDialog.style.transform = 'none'
        handContent.classList.add('zoom')
        this.isMagnify = false
      } else {
        // 缩小状态
        elDialog.style.width = this.dialogData.width + 'px'
        elDialog.style.height = 'auto'
        elDialog.style.left = '50%'
        elDialog.style.top = '50%'
        elDialog.style.transform = 'translate(-50%,-50%)'
        handContent.classList.remove('zoom')
        this.isMagnify = true
        window.addEventListener('resize', this.getHeight)
      }
    },
    getHeight () {
      let dHeight = 0
      if (!this.dialogData.dialogcode) return
      let dialog = document.querySelector(`.${this.dialogData.dialogcode} .el-dialog.el-dialog--center`)
      if (this.dialogData.heighttype === '0') {
        this.height = window.innerHeight + 1 - 200
        dHeight = parseInt(this.dialogData.minheight) + 38
        if (window.innerHeight < dHeight) {
          dialog.style.top = 0
          dialog.style.left = '50%'
          dialog.style.transform = 'translate(-50%,0)'
        } else {
          dialog.style.top = '50%'
          dialog.style.left = '50%'
          dialog.style.transform = 'translate(-50%,-50%)'
        }
      } else if (this.dialogData.heighttype === '1') {
        dHeight = parseInt(this.dialogData.fixedheight) + 38
        if (window.innerHeight < dHeight) {
          dialog.style.top = 0
          dialog.style.left = '50%'
          dialog.style.transform = 'translate(-50%,0)'
        } else {
          dialog.style.top = '50%'
          dialog.style.left = '50%'
          dialog.style.transform = 'translate(-50%,-50%)'
        }
      }
    },
    // 获取操作按钮 配置数据
    getDialogData () {
      let confsBtn = this.confsBtn
      // 弹框相关配置
      this.dialogData = confsBtn.dialogData
      this.getDynamic(confsBtn)
    },
    // 解析弹框标题动参
    getDynamic (confsBtn) {
      let reg = /#\{(.*?)\}/
      let dynamicParams = util.regExpressionCut({ data: this.dialogData.dialogtitle, reg })
      // 判断操作按钮中有没有对应的动参属性
      if (Object.keys(confsBtn).includes(dynamicParams.field)) {
        this.dialogData.dialogtitle = confsBtn[dynamicParams.field] + dynamicParams.keyWords
      }
    },
    changeDialogTitle (title) {
      this.dialogData.dialogtitle = title
    },
    // 关闭前的回调，会暂停 Dialog 的关闭
    handleClose (params) {
      // console.log(this.confsBtn.formcode)
      // 关闭事件  判断关闭的是否是当前对应的页面   如果点击的 是从 Dialog中触发的， 就不需要 params值  直接进行调用
      // if (this.configData.v_Code === params.code || this.confsBtn.formcode === params.code || this.confsBtn.viewid === params.code || !params.code) {
      console.log(this.configData.v_Code, params.code)
      if (this.configData.v_Code === params.code || !params.code) {
        switch (this.contentComponent) {
          case 'CR_TAB':
            let currentTab = this.dialogFlag[this.currentDialogId[0]]
            this.closeDlg(currentTab)
            break
          case 'CC_FM':
            let formFlag = this.$store.state.formFlag
            formFlag ? this.closeDlg(false) : this.closeDlg(true)
            break
          default:
            this.closeDlg('1')
            break
        }
      }
    },
    closeDlg (flag) {
      if (!flag) {
        this.$confirm('数据已修改，确定返回保存？', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'error', showClose: false, closeOnClickModal: false
        }).catch(() => {
          if (this.dialogIdArr.pop() === this.dialogId) {
            this.$store.commit('getFormFlag', false)
            this.$emit('closeDialog')
            let params = {
              code: this.$store.state.closeViewId[this.$store.state.closeViewId.length - 1],
              flag: false
            }
            this.$emit('getDialogStatus', params)
            this.$store.commit('removeCloseViewId', this.$store.state.closeViewId[this.$store.state.closeViewId.length - 1])
            // 关闭弹框的时候，清空按钮配置数据两个数
            this.$store.commit('clearConfBtn')
            // this.$store.commit('rowData', {})两个数
          }
        })
      } else {
        if (this.dialogIdArr.pop() === this.dialogId) {
          this.$emit('closeDialog')
          // 关闭弹框 找对应的 弹框viewId
          let params = {
            // 取出弹框对应的viewId
            code: this.$store.state.closeViewId[this.$store.state.closeViewId.length - 1],
            flag: false
          }
          this.$emit('getDialogStatus', params)
          // 关闭弹框后 移除对应的viewId
          this.$store.commit('removeCloseViewId', this.$store.state.closeViewId[this.$store.state.closeViewId.length - 1])
          // 关闭弹框的时候，清空按钮配置数据
          this.$store.commit('clearConfBtn')
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.dialogData.isdefaultmax === '1') {
        this.changeDialogSize()
      }
    })
    window.addEventListener('resize', this.getHeight)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getHeight)
  }
}
</script>

<style lang="scss">
#dialog-config-box{
  .chang-size-dialog .icon-dankuangsuofang{
    color: white;
  }
  .chang-size-dialog:focus i,.chang-size-dialog:hover i{
    color: white;
  }
  .default-dialog{
    .el-dialog__header{
      background-image: linear-gradient(0deg, #2b8ed1 0%, #5da2ef 100%);
      .el-dialog__title{
        color: #ffffff;
      }
    }
    .el-dialog__body{
      border-color: #2e8fd2;
      //  解决放大适应问题 11.15
      height: 100%;
      display: flex;
      box-orient: vertical;
      flex-direction: column;
    }
  }
  .test-dialog{
    .el-dialog__header{
      background-image: linear-gradient(0deg, #7fc1ee 0%, #4f6c8d 100%);
      .el-dialog__title{
        color: #ffffff;
      }
    }
    .el-dialog__body{
      border-color: #000000;
    }
  }
  // tab灰色边框
  #standard-tabs{
    border: 3px solid #CCCCCC;
  }
}
.hand{
  display: flex;
  box-orient:vertical;
  flex-direction:column;
  overflow: auto;
  .content {
    flex: 1;
  }
}
.formBox {
  overflow: auto!important;
  .el-dialog__header {
    text-align: left;
  }
  .el-dialog__headerbtn {
    &:focus > i {
      color: white;
    }
  }
}
.default-dialog,.test-dialog {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  box-orient:vertical;
  flex-direction:column;
  box-sizing: border-box;
  .el-dialog__body {
    //  解决放大适应问题 11.15
  //  flex: 1 0 auto;
  }

}
.formBox .default-dialog div.el-dialog__body .bodyBorderBox,.formBox .test-dialog div.el-dialog__body .bodyBorderBox {
  display: flex;
  height: 100%;
  box-orient:vertical;
  flex-direction:column;
  box-sizing: border-box;
}
.teldialog .el-form {
  flex: 1;
  // height: 100%;
  box-sizing: border-box;
  overflow: auto;
}
.configTabs {
  flex: 1 auto;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  box-orient:vertical;
  flex-direction:column;
  .el-tabs__nav-wrap {
    .el-tabs__nav {
      .el-tabs__item.is-active {
          height: 30px;
      }
    }
  }
  // 弹框里面的视图 适配   分页置底
  .view-handout-component {
      .table-wrapper {
        flex: 1;
      }
  }
}
.el-tabs__content {
  flex: 1;
  .templateUrl,
  .tabs-field {
    box-sizing: border-box;
    height: 100%;
    > div {
      height: 100%;
      .view-handout-component {
        height: 100%;
        display: flex;
        box-orient:vertical;
        flex-direction:column;
        .table-wrapper{
          // height: auto!important;
          flex: 1;
          .el-table {
            height: 100%!important;
          }
        }
      }
    }
  }
}
.el-tab-pane {
  height: 100%;
}
.base-info-page {
  height: 100%;
  display: flex;
  box-orient:vertical;
  flex-direction:column;
}
.power-page {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  box-orient:vertical;
  flex-direction:column;
}
// 表单
.add-org-form {
  height: 100%;
  display: flex;
  box-orient:vertical;
  flex-direction:column;
}
.add-modify-form {
  height: 100%;
  display: flex;
  box-orient:vertical;
  flex-direction:column;
}
.add-form {
  height: 100%;
  display: flex;
  box-orient:vertical;
  flex-direction:column;
}
.add-org-form .el-form {
  flex: 1;
}
// 树
.impower-roleControl {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  .roleTreeContent {
    flex: 1
  }
}

.components-type-form {
    flex: 1;
    height: 100%;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
   .el-tab-pane {
    height: 100%;
    display: flex;
    box-orient: vertical;
    flex-direction: column;
     overflow: auto;
      .tabs-base-info {
      // flex: 1;
      // height: auto;
      // overflow: auto;
      // box-sizing: border-box;
      // padding: 0;
      .el-form {
        // flex: 1;
        // padding: 16px 16px 12px;
        // box-sizing: border-box;
        // overflow: visible;
        .border-box {
          // box-sizing: border-box;
          // display: flex;
          // box-orient: vertical;
          // flex-direction: column;
        }
      }
    }
    }
}
.components-type-form .el-tab-pane .templateUrl,
.components-type-form .el-tab-pane .operation-tab,
.components-type-form .el-tab-pane .sysOperationBox,
.components-type-form .el-tab-pane .content {
  height: 100%;
  box-sizing: border-box;
  .el-table__fixed::before, .el-table__fixed-right::before {
      height: 0!important;
    }
}
.components-type-form .el-tab-pane .templateUrl {
  overflow: auto;
}
.components-type-form .el-tab-pane .templateUrl .contentTable {
  // display: flex;
  // box-orient: vertical;
  // flex-direction: column;
  .el-table__body-wrapper {
    height: auto;
    flex: 1;
  }
}
.components-type-form .el-tab-pane .sysOperationBox {
  display: flex;
  box-orient: vertical;
  flex-direction: column;
  .border-box .optionsBox .viewOptions .el-tree {
    height: auto;
  }
}
.layout-tabs,
.tree-component {
  height: 100%;
  display: flex;
  box-orient: vertical;
  flex-direction: column;
  .el-tabs__content {
    flex: 1;
    overflow: auto;
    .el-tab-pane {
      height: 100%;
      display: flex;
      box-sizing: border-box;
      // 这里影响到 配置出来的Tab页滚动条的样式
      // overflow: auto;
      box-orient: vertical;
      flex-direction: column;
      .tabs-base-info {
        flex: 1;
        box-sizing: border-box;
        padding: 0;
        .el-form {
          padding: 16px 16px 12px;
          box-sizing: border-box;
          overflow: visible;
          height: auto;
          .border-box {
            box-sizing: border-box;
            display: flex;
            box-orient: vertical;
            flex-direction: column;
        }
      }
    }
    }
  }
}
.layout-tabs .el-tabs__content .tabs-field {
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  > div {
    height: 100%;
  }
}

.teldialog {
  .contentBox {
  flex: 1;
  overflow: auto;
  padding: 16px;
  .el-form {
    padding: 16px;
  }
}
}
.zoom {
  height: 100% !important;
}
</style>
<style lang="scss" scoped>
#dialog-config-box {
  // 弹框中tab 抖动样式
  /deep/ .el-tabs__nav-wrap .el-tabs__nav .el-tabs__item{
    box-sizing: border-box;
    height: 29px !important;
    margin-top: 1px;
    &.is-active{
      border-top: 1px solid #3792d8 !important;
      border-left: 1px solid #3792d8;
    }
  }
  // 去除弹框中 表单的边框线
  /deep/ .form-component{
    border: none !important;
  }
}
</style>
