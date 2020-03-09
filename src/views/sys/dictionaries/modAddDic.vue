<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-28 17:20:39
 * @LastEditTime: 2019-08-29 14:49:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 修改添加数据表 -->
  <div class="mod-add-dic add-modify-form">
    <div class="formOperateBox">
        <!-- 操作栏 -->
        <action-bar
         :configData='configData'
         @sumitForm='commit'
         v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      label-position="right"
      label-width="100px"
      inline-message
      :rules="rules"
      ref="ruleForm"
      :model="modeAddData" >
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <el-form-item label="数据表名称" prop="v_TableName">
          <el-input v-model="modeAddData.v_TableName" :disabled="displayTableName"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="v_Title">
          <el-input v-model="modeAddData.v_Title"></el-input>
        </el-form-item>
        <el-form-item label="表类型" prop="i_Category">
          <el-select v-model="modeAddData.i_Category" placeholder="请选择">
            <el-option
              v-for="item in tableType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="v_TableDescription" class='description-label'>
           <el-input
              v-model="modeAddData.v_TableDescription"
              placeholder="请输入表关系描述"
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 12}"
            />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  props: {
    configData: Object,
    ifDialog: Boolean,
    shareData: Object
  },
  mixins: [logMixin, windowRed],
  data () {
    return {
      modeAddData: {
        v_TableName: '',
        i_Category: '',
        v_TableDescription: '',
        v_Title: ''
      },
      // 效验规则
      rules: {
        v_TableName: [
          { required: true, message: '请输入数据表名称', trigger: 'blur' }
        ],
        i_Category: [
          { required: true, message: '请拉取表类型', trigger: 'blur' }
        ],
        v_Title: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ]
      },
      // 表类型
      tableType: [
        {
          label: '数据表',
          value: '1'
        },
        {
          label: '视图表',
          value: '2'
        },
        {
          label: '临时表',
          value: '3'
        },
        {
          label: '内存表',
          value: '4'
        }
      ],
      // 获取到当前表的数据（当前行数据）
      rowData: {},
      // 小红点功能
      oldModAddData: {},
      displayTableName: false

    }
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    let formData = this.$store.state.fieTableData

    if (confsBtn.operationcode === 'modify') {
      this.displayTableName = true
      // 获取 当前行的数据

      this.modeAddData = {
        ...formData
      }
    }
    this.$set(this.modeAddData, 'i_BizID', formData.i_BizID)
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    closeDialog () {
      this.$emit('getButtonConfig', false)
    },
    commit () {
      let currentTreeNode = this.$store.state.fieTreeData['CC_TR_bizcategoryDictionary']
      if (!currentTreeNode) {
        this.$message.warning('请先选择左侧的树节点')
        return
      }
      let bizID = currentTreeNode.i_BizID
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {}
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          params.i_BizID = bizID
          params.v_TableName = this.modeAddData.v_TableName
          params.i_Category = this.modeAddData.i_Category
          params.v_TableDescription = this.modeAddData.v_TableDescription
          params.v_Title = this.modeAddData.v_Title
          // 判断当前是添加还是修改  如果是修改要传i_Id
          if (Number(this.modeAddData.i_Id) > 0) {
            params.i_Id = this.modeAddData.i_Id
          }
          cgiService.getTableSaveData1(params).then(res => {
            // 如果数据提交成功
            if (!res.code) {
              this.isReminder = true
              this.$message.success(res.msg)
              this.$emit('changeFlag', { isDisabled: false })
              if (res.iId > 1) {
                this.stdFormData = Object.assign({}, this.modeAddData)
                this.modeAddData.id = res.iId
              }
              this.$emit('getTableData', { changeSpecialNodeData: [{ i_Cid: res.i_Cid, isCurrentNode: true }] })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    clearError () {
      this.$refs.ruleForm.resetFields()
    }
  },
  mounted () {
    setTimeout(() => {
      this.stdFormData = Object.assign({}, this.modeAddData)
    }, 1000)
  },
  components: {
    actionBar
  }
}
</script>
<style scoped lang='scss'>
.mod-add-dic {
  height: 100%;
  display:flex;
  flex-direction: column;
  > form {
    box-sizing: border-box;
    overflow: auto;
    border: none !important ;
    .border-box{
      margin: 16px;
      border: 1px solid #BFBFBF;
      position: relative;
      padding: 16px 100px 50px 50px;
      >span{
        position: absolute;
        top: -10px;
        left: 10px;
        background: #ffffff;
        padding: 0 16px;
      }
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
