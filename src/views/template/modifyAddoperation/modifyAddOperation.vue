<template>
  <div class="modify-add-option">
    <el-dialog
      width="650px"
      :title="optionsTitle"
      class="formBox"
      custom-class='fieldSet'
      id="operation-style"
      :close-on-click-modal='false'
      :before-close="handleClose"
      v-dialogDrag
      top="10vh"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div class="bodyBorderBox">
        <el-tabs
          type="border-card"
          class="custom-border-card"
          v-model="activeName2">
          <el-tab-pane
            name="first">
         <el-badge slot="label" :is-dot='isDotInfo' :class="'dot-' + pointData">
          <span> 基本</span>
          </el-badge>
            <operation-info
              ref="operationInfo1"
              @changeData="changeData"
              @changeIsDotInfo ='changeIsDotInfo'
              :ifDialog='ifDialog'
              :operationData='operationData'
            ></operation-info>
          </el-tab-pane>
          <el-tab-pane
            name="second"
            :disabled="isDisablePower">
            <el-badge slot="label" :is-dot='isDotPur' :class="'dot-' + pointData">
            <span >权限</span>
            </el-badge>
            <role-form @customGetOperationData='customGetOperationData' @changeIsDotPur='changeIsDotPur' :configData='configData' :shareData='shareData' :componentData='componentData' v-on="$listeners"></role-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 操作按钮基本
import operationInfo from '@/views/template/modifyAddoperation/operationInfo'
import roleForm from '@/views/common/roleForm'
import { mapState } from 'vuex'
export default {
  name: 'modifyAddOperation',
  props: {
    ifDialog: Boolean,
    dialogTitle: String,
    formData: Object,
    componentData: Object,
    operationData: Object,
    stayRole: Array,
    endRole: Array,
    toltal: Number,
    isDisable: Boolean,
    shareData: Object
  },
  data () {
    return {
      data: {},
      // 是否显示弹框
      dialogVisible: false,
      // 标题
      optionsTitle: '',
      // 是否禁用权限
      isOptionDisabled: true,
      // 默认选中tab标签基本信息
      activeName2: 'first',
      // 是否禁用权限
      isDisablePower: true,
      isDotInfo: false,
      isDotPur: false,
      configData: {
        confOperation: {
          tools: [
            {
              isdisabled: '0',
              ishidden: '0',
              linkflag: '1',
              operationname: '保存',
              operationparentid: '0',
              type: '1',
              iconurl: 'iconfont icon-baocun',
              iconcolor: '#5892F6',
              func: 'sumitForm',
              buttype: '1',
              displaystyle: '1'
            }
          ]
        }
      }
    }
  },
  watch: {
    ifDialog: {
      handler: function (val) {
        this.dialogVisible = val
        this.activeName2 = 'first'
        if (!val) {
          // 关闭弹框让小红点变为false隐藏
          this.isDotInfo = false
          this.isDotPur = false
        }
      },
      immediate: true
    },
    dialogTitle: {
      handler: function (val) {
        this.optionsTitle = val
      },
      immediate: true
    },
    isDisable: {
      handler: function (val) {
        this.isDisablePower = val
      },
      immediate: true,
      deep: true
    }
    // operationData: {
    //   handler: function (val) {
    //     console.log(val)
    //   },
    //   deep: true
    // }
  },

  computed: {
    ...mapState({
      // 小红点颜色（参数）
      pointData: state => state.parameter.windowRed.v_ParamValue
    })
  },
  methods: {
    customGetOperationData () {
      this.$emit('customGetOperationData')
    },
    // 子 => 父  小红点的显示/隐藏
    changeIsDotInfo (val) {
      this.isDotInfo = val
    },
    // 子 => 父 权限小红点 显示/隐藏
    changeIsDotPur (val) {
      this.isDotPur = val
    },
    // 子 => 父  按钮操作的基本信息
    changeData (data) {
      this.data = {
        ...data
      }
      this.optiosCommit()
    },
    optiosCommit () {
      if (this.formData.v_FormCode) {
        this.$set(this.data, 'v_FormCode', this.formData.v_FormCode)
      } else if (this.formData.v_TreeCode) {
        this.$set(this.data, 'v_TreeCode', this.formData.v_TreeCode)
      }
      if (!this.data.i_ButType) {
        this.$set(this.data, 'i_ButType', '2')
      }
      this.$refs.operationInfo1.$refs.customOptios.validate(valid => {
        if (valid) {
          this.$emit('commit', this.data)
        }
      })
    },
    // 关闭弹框回调函数
    handleClose (done) {
      if (this.isDotInfo || this.isDotPur === true) {
        this.$confirm('数据已修改，确定返回保存？', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'error', showClose: false, closeOnClickModal: false
        }).catch(() => {
          // 如果 关闭弹框 则手动清空操作的id
          this.$refs.operationInfo1.operationForm.i_Id = ''
          this.$refs.operationInfo1.operationForm.v_Func = ''
          this.$refs.operationInfo1.operationForm.v_DialogCode = ''
          this.$refs.operationInfo1.cateCodeVal = []
          this.$refs.operationInfo1.$refs.customOptios.resetFields()
          this.$emit('changeifDialog', false)
          // done()
        })
      } else {
        // 如果 关闭弹框 则手动清空操作的id
        this.$refs.operationInfo1.operationForm.i_Id = ''
        this.$refs.operationInfo1.operationForm.v_Func = ''
        this.$refs.operationInfo1.operationForm.v_DialogCode = ''
        this.$refs.operationInfo1.cateCodeVal = []
        this.$refs.operationInfo1.$refs.customOptios.resetFields()
        this.$emit('changeifDialog', false)
      }
    }
  },
  components: {
    operationInfo,
    roleForm
  }
}
</script>
<style lang="scss" scoped>
#operation-style {
  /deep/ .is-dot.el-badge__content  {
    width: 6px;
    height: 6px;
    right: 0px;
  }
  .bodyBorderBox{
    height: 570px;
    .custom-border-card  {
      height: 100%;
      display: flex;
      flex-direction: column;
      .el-tabs__item  {
        height: 30px;
      }
    }
  }
}
 .custom-border-card /deep/ .el-tabs__item {
        height: 28px !important;
        line-height: 25px !important;
        margin-left: 0px !important;
 }
</style>
