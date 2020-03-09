<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
        <!-- 操作栏 -->
        <action-bar
         :configData='configData'
         @sumitForm='commit'
         :formRed='formRed'
         v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      label-position="right"
      label-width="100px"
      inline-message
      ref="modeAddData"
      :model="modeAddData" >
      <div>
        <el-form-item label="参数组" prop="i_Id">
          <el-select v-model="modeAddData.i_Id" placeholder="请选择" filterable>
            <el-option
              v-for="(item,index) in groupdList"
              :key="item.index"
              :label="item.v_GroupName"
              :value="item.i_Id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'setParameterSet',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  mixins: [logMixin],
  data () {
    return {
      modeAddData: {
        i_Id: ''
      },
      // 获取到当前表的数据（当前行数据）
      rowData: {},
      formRed: false,
      // 小红点功能
      oldModAddData: {
        i_Id: ''
      },
      groupdList: []
    }
  },
  watch: {
    // shareData: {
    //   deep: true,
    //   handler (nv) {
    //     this.modeAddData = nv
    //   }
    // },
    configData: {
      immediate: true,
      handler (nv) {

      }
    },
    modeAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    let formRowData = this.$store.state.fieRowTableData['CC_VW_parameterGroup']
    this.getGroupdList(formRowData.i_Id)
    let formData = this.$store.state.fieTableData
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      util.initFormData(this.modeAddData, formData)
      this.$set(this.modeAddData, 'i_Id', formData.i_Id)
      this.$store.commit('changeRowTabData', this.modeAddData)
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    closeDialog () {
      this.$emit('getButtonConfig', false)
    },
    // 获取参数组
    getGroupdList (id) {
      let params = {}
      if (id) {
        params = {
          i_ParentGroupID: '0',
          selfId: id
        }
      } else {
        params = {
          i_ParentGroupID: '0'
        }
      }

      cgiService.getParameterGrp(params).then(res => {
        if (res.code === 0) {
          this.groupdList = res.data
        }
      })
    },
    commit () {
      let params = {
        ...this.modeAddData
      }
      let formRowData = this.$store.state.fieRowTableData['CC_VW_parameterGroup']
      let formData = this.$store.state.fieTableData
      if (formRowData.i_Id) {
        this.$set(params, 'fromGroupId', formRowData.i_Id)
      } else {
        this.$set(params, 'fromGroupId', formData.i_Id)
      }
      this.$refs.modeAddData.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.addParameGrp(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
              }
              this.oldModAddData = Object.assign({}, this.modeAddData)
              this.$message.success(res.msg)
              // 重新调取接口渲染数据
              let param = this.$store.state.paginations['CC_VW_parameterGroupList']
              this.$set(param, 'viewid', this.$store.state.fieRowTableData['CC_VW_parameterGroupList'].viewid)
              this.$emit('getTableData', param)
              let param1 = this.$store.state.paginations['CC_VW_parameterGroup']
              this.$set(param1, 'viewid', this.$store.state.fieRowTableData['CC_VW_parameterGroup'].viewid)
              this.$emit('getTableData', param1)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    clearError () {
      this.$refs.ruleForm.resetFields()
    }
  },
  mounted () {

  },
  components: {
    actionBar
  }
}
</script>
<style scoped lang='scss'>
.add-modify-form {
  height: 100%;
  display:flex;
  flex-direction: column;
  > form {
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    >div{
      width: 470px;
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%,-50%)
    }
    .el-form-item {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .el-select {
    width: 100%;
  }
}
</style>
