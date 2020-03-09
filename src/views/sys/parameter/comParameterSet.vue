<!-- 实例应用参数组 -->
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
      label-width="80px"
      inline-message
      ref="modeAddData"
      :model="modeAddData" >
      <div>
        <el-form-item label="参数组" prop="v_GroupCode">
          <el-select v-model="modeAddData.v_GroupCode" placeholder="请选择" filterable>
            <el-option
              v-for="(item,index) in groupdList"
              :key="item.index"
              :label="item.v_GroupName"
              :value="item.v_GroupCode"
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
  name: 'comParameterSet',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  mixins: [logMixin],
  data () {
    return {
      modeAddData: {
        v_GroupCode: ''
      },
      // 获取到当前表的数据（当前行数据）
      rowData: {},
      formRed: false,
      // 小红点功能
      oldModAddData: {
        v_GroupCode: ''
      },
      groupdList: []
    }
  },
  watch: {
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
    this.getGroupdList()
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
    getGroupdList () {
      let params = {
        i_ParentGroupID: '0'
      }
      cgiService.getParameterGrp(params).then(res => {
        if (res.code === 0) {
          this.groupdList = res.data
        }
      })
    },
    commit () {
      this.$refs.modeAddData.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modeAddData.logParams = this.getLogParams()
          }
          cgiService.addInstanceParameterGrp(this.modeAddData).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
              }
              this.oldModAddData = Object.assign({}, this.modeAddData)
              this.$message.success(res.msg)
              // 重新调取接口渲染数据
              let param = this.$store.state.paginations['CC_VW_parameterComponent']
              this.$set(param, 'viewid', this.$store.state.fieRowTableData['CC_VW_parameterComponent'].viewid)
              this.$emit('getTableData', param)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
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
