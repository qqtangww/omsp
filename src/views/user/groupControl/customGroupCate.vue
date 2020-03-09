<template>
  <div class="tree-wrapper">
    <div class="title pageMessage">
      <span>
        <i class="iconfont icon-biaotibiao"></i>我的分组
      </span>
      <el-button
        v-for="(item,index) in configData.confOperation.tools"
        :key="index"
        type="text"
        @click="dialogButtonClick(item)"
        :disabled="item.isdisabled === '1'"
        icon="iconfont icon-tianjia"
        v-show="item.operationcode === 'add'"
      >{{ item.operationname }}</el-button>
    </div>
    <el-input
      class="filter-input"
      prefix-icon="el-icon-edit-outline"
      placeholder="请输入分组名称"
      clearable
      v-model="searGroupKey"
    >
      <el-button slot="append" @click="groupSearch">
        <i class="el-icon-search"></i>
      </el-button>
    </el-input>
    <div class="groupCardBox">
      <!-- 我的分组下面的  分组信息 -->
      <div
        class="groupCard"
        v-for="(row,index) in groupList"
        :key="row.id"
        @click="changeGroupList(row,index)"
        :ref="row.grpcode"
        :class="{isClick : index === clickNum}"
      >
        <div class="cardTitleBox">
        <el-tooltip v-if="row.v_GrpAlias !== ''" class="item" effect="dark" :content="row.v_GrpAlias" :open-delay='600' placement="bottom">
            <span class="cardTitle">{{row.v_GrpName}}</span>
         </el-tooltip>
         <span class="cardTitle" v-else>{{row.v_GrpName}}</span>
          <span class="peopleNum">[{{row.num}}人]</span>
          <div class="cardOperation" v-if="index === clickNum">
            <el-button
              v-for="(item,index) in configData.confOperation.tools"
              :key="index"
              type="text"
              @click="dialogButtonClick(item, row)"
              :disabled="item.isdisabled === '1'"
              v-show="item.operationcode !== 'add'"
            >
              <i :class="item.iconurl"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <dialog-standard
      v-if="ifDialog"
      :ifDialog="ifDialog"
      :configData="dialogConfigData"
      :shareData="shareData"
      @getDialogStatus="getDialogStatus"
      @getTableData="getUserGroupList"
    ></dialog-standard> -->
   <dialog-standard v-on="$listeners" v-if="showFormDialog" :ifDialog='showFormDialog' @getTableData="getUserGroupList" :configData='dialogConfigData' @getDialogStatus='getDialogStatus'></dialog-standard>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import dialogStandard from '@/components/stdDialog/stdDialogAction'
export default {
  name: 'customGroupCate',
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      groupList: [],
      clickNum: 0,
      searGroupKey: '',
      ifDialog: false,
      dialogConfigData: {},
      customShareData: {},
      showFormDialog: false
    }
  },
  watch: {
    shareData: {
      handler: function (val) {
        if (val.flag) {
          this.getUserGroupList()
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    this.getUserGroupList()
    setTimeout(() => {
      if (this.groupList[0]) {
        this.changeGroupList(this.groupList[0], 0)
        this.$store.commit('rowData', this.groupList[0])
      }
    }, 500)
  },
  methods: {
    // 操作栏 按钮点击事件
    dialogButtonClick (interfaceData, row) {
      this.customShareData = {
        ...row
      }
      // 把这个按钮配置项按钮相关信息存vuex
      if (typeof interfaceData === 'object') {
        this.$store.commit('confBtn', interfaceData)
      }
      this.dialogConfigData = {}
      if (interfaceData.linkflag === '1') {
        switch (interfaceData.buttype) {
          // 系统按钮
          case '1':
            // 直接执行方法
            this[interfaceData.func]()
            break
          // 自定义按钮
          case '2':
            // 自定义按钮
            // 拿到解析完的函数体
            let funObj = this.$store.getters.getFunctions
            // 获取到函数名 和 参数
            // 这里的正则是判断是因为  行内传的值是后台接口中这个按钮的数据  工具条只传了方法名
            let funData = {}
            if (interfaceData.func) {
              funData = util.methodSplit(interfaceData.func)
              this.$store.commit('nowConf', funData.fncName)
              for (var key in funObj) {
                // 去除前后空格
                if (key === funData.fncName.replace(/(^\s*)|(\s*$)/g, '')) {
                  let params = {
                    that: this,
                    currentData: this.customShareData,
                    cgiService
                  }
                  // 函数自调用
                  funObj[key](params)
                }
              }
            } else {
              this.$message.warning('操作方法函数体为空')
            }
            break
          // 按钮组
          case '3':
            break
          // 分割线
          case '4':
            break

          default:
            break
        }
      } else if (interfaceData.linkflag === '2') {
        this.customShareData = {
          ...row
        }
        // 弹框配置数据
        this.dialogConfigData.v_Code = interfaceData.code
        this.dialogConfigData.v_CateCode = interfaceData.catecode
        this.dialogConfigData.i_Cate = interfaceData.cate
        this.dialogConfigData.operationcode = interfaceData.operationcode
        this.showFormDialog = true
      }
    },
    groupSearch () {
      this.getUserGroupList(this.searGroupKey)
    },
    changeGroupList (item, index) {
      this.clickNum = index
      // 依赖项需要的参数传递
      this.$listeners.changeShareData(item)
      this.$store.commit('rowData', item)
      // 拿到当前分组的部分信息
      //   this.grpcode = item.grpcode
      //   this.share = item.share === '1''
    },
    commit () {},

    // 删除
    del () {
      var ids = []
      ids.push(this.customShareData.i_Id)
      this.$confirm('确定要删除此条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.delTemgroupList({ ids: ids }).then(res => {
          this.dialogFormVisible = false
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.clickNum = 0
            this.getUserGroupList()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    getUserGroupList (val) {
      let params = {
        keywords: val
      }
      cgiService.getTemgroupList(params).then(res => {
        if (!res.code) {
          // console.log(res)

          this.groupList = res.data
          // 判断：如果是删除成功 就选中第一个节点
          if (this.clickNum === 0 && this.groupList.length >= 1) {
            this.changeGroupList(this.groupList[0], 0)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // // 关闭表单弹框
    // closeFormDialog (data) {
    //   if (data === true) {
    //     this.ifDialog = data
    //   } else {
    //     let dialogIds = this.$store.state.dialogIds
    //     // 拿到当前的 弹框id
    //     let currentDialogId = this.$store.state.currentDialogId[0]
    //     if (currentDialogId === dialogIds[dialogIds.length - 1]) {
    //       // 判断表单是否有小红点
    //       let formFlag = this.$store.state.formFlag
    //       if (formFlag) {
    //         this.$confirm('数据已修改，确定返回保存？', '提示', {
    //           confirmButtonText: '确定', cancelButtonText: '取消', type: 'error', showClose: false, closeOnClickModal: false
    //         }).catch(() => {
    //           this.ifDialog = false
    //           this.$store.commit('getFormFlag', false)
    //         })
    //       } else {
    //         this.$store.commit('getFormFlag', false)
    //         this.ifDialog = false
    //       }
    //       this.$store.commit('removeDialogIds')
    //     } else {
    //       this.$store.commit('getDialogId', dialogIds[dialogIds.length - 1])
    //     }
    //   }
    // }
    getDialogStatus (params) {
      if (this.configData.confView.formcode === params.code) {
        this.showFormDialog = params.flag
      }
    }
  },
  components: {
    dialogStandard
  }
}
</script>
<style lang="scss" scoped>
.filter-input {
  width: 100% !important;
  padding: 8px;
}
// 我的分组卡片
.groupCardBox {
  overflow: auto;
  height: calc(100% - 86px);
  box-sizing: border-box;
  .groupCard {
    background: white;
    padding: 0 4px;
    box-sizing: border-box;
    font-size: 12px;
    position: relative;
    margin-top: 0px;
    &:first-of-type {
      margin-top: 0;
    }
    &.isClick {
      background-image: linear-gradient(0deg, #a9d0fd 0%, #eff5fc 100%);
    }
    &:hover {
      background: #dae7fe;
    }
    > div {
      height: 24px;
      line-height: 24px;
      // padding: 0 4px;
      &.cardTitleBox {
        cursor: pointer;
        .cardTitle {
          font-size: 12px;
          color: #333333;
        }
        .peopleNum {
          color: #333333;
          font-size: 12px;
          margin-left: 8px;
        }
        .cardOperation {
          float: right;
          margin-top: 0px;

          button.el-button--text {
            font-size: 12px;
            padding: 0;
            color: #5892f6;
            margin: 0;
          }
        }
      }
      &.cardNameBox {
        .cardNameCon {
          color: #333333;
          font-size: 12px;
        }
      }
      span.cardNameTit {
        font-size: 12px;
        color: #666666;
        margin-right: 25px;
      }
    }
    > i {
      font-size: 18px;
      position: absolute;
      left: 6px;
      top: 14px;
    }
  }
}
</style>
