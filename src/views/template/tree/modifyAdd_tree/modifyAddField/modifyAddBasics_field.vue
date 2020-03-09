<!-- 内容组件-树形组件-基础字段-基本信息 -->
<template>
  <div class="modify-add-field">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" :formRed="formRed" v-on="$listeners"></action-bar>
    </div>
    <div class="borderBox">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 字段设置
        </span>
        <el-form inline-message class="filedForm" label-position="right" label-width="100px" :rules="rules" ref="ruleForm" :model="modAddData">
          <div class="conBox">
            <el-form-item label="树形编码" prop="v_TreeCode">
              <el-input v-model="modAddData.v_TreeCode" disabled></el-input>
            </el-form-item>
            <el-form-item label="树形名称" prop="v_TreeName">
              <el-input v-model="modAddData.v_TreeName" disabled></el-input>
            </el-form-item>
            <el-form-item label="数据表" prop="v_TableName">
              <el-select
                placeholder="请选择"
                v-model="modAddData.v_TableName"
                @focus="getTableName"
                @change="getColums"
              >
                <el-option
                  v-for="item in tableName"
                  :key="item.v_TableName"
                  :label="item.v_TableName"
                  :value="item.v_TableName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字段名" prop="v_ColName">
              <el-select placeholder="请选择" filterable v-model="modAddData.v_ColName">
                <el-option
                  v-for="item in colName"
                  :key="item.i_Id"
                  :label="item.v_ColName"
                  :value="item.v_ColName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字段中文名" prop="i_ColTitle">
              <el-input v-model="modAddData.i_ColTitle"></el-input>
            </el-form-item>
            <el-form-item label="导出" prop="i_IsExpord">
              <el-switch v-model="modAddData.i_IsExpord" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
            <el-row>
              <el-col :span="9">
                <el-form-item label="排序" prop="i_IsSort">
                  <el-switch v-model="modAddData.i_IsSort" active-value="1" inactive-value="0" disabled></el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序方式" prop="i_SortMode" v-if="modAddData.i_IsSort === '1'">
                  <el-radio-group v-model="modAddData.i_SortMode">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">升序</el-radio>
                    <el-radio label="2">降序</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import logMixin from '@/common/js/mixins/getLogParams'
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'modifyAddBasics_field',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      // 字段数据
      modAddData: {
        // 编码
        v_TreeCode: '',
        // 树形名称
        v_TreeName: '',
        // 表名
        v_TableName: '',
        // 字段名
        v_ColName: '',
        // 字段中文名
        i_ColTitle: '',
        // 导出
        i_IsExpord: '0',
        // 字段类型
        i_ColumnType: '1',
        // 排序方式
        i_SortMode: '0'
      },

      // 标题
      optionsTitle: '',
      // 弹框显示/ 隐藏
      innerVisibleOption: false,
      rules: {
        v_TableName: [
          { required: true, message: '请选择数据表', trigger: 'change' }
        ],
        v_ColName: [
          { required: true, message: '请选择字段', trigger: 'change' }
        ],
        i_ColTitle: [
          { required: true, message: '请输入字段中文名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ]
      },
      // 数据表
      tableName: [],
      // 字段
      colName: [],
      formRed: false,
      oldModAddData: {}
    }
  },
  watch: {
    // 弹框关闭 打开
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    let formData = this.$store.state.fieTableData
    if (confsBtn.operationcode === 'modify') {
      this.modAddData = {
        ...formData
      }
    }
    let fieRowTableData = this.$store.state.fieRowTableData
    if (fieRowTableData['CC_VW_instanceTree'].v_TreeCode) {
      this.$set(this.modAddData, 'v_TreeCode', fieRowTableData['CC_VW_instanceTree'].v_TreeCode)
      this.$set(this.modAddData, 'v_TreeName', fieRowTableData['CC_VW_instanceTree'].v_TreeName)
    } else {
      this.$set(this.modAddData, 'v_TreeCode', fieRowTableData[formData.v_TreeCode].v_TreeCode)
      this.$set(this.modAddData, 'v_TreeName', fieRowTableData[formData.v_TreeCode].v_TreeName)
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    // 获取数据表
    getTableName () {
      cgiService.getTabelName(this.modAddData.v_TreeCode).then(res => {
        if (res.code === 0) {
          this.tableName = res.data
        }
      })
    },
    // 获取数据表下的字段
    getColums (tableName) {
      let params = {
        v_TableName: tableName
      }
      cgiService
        .getTabelNameColums(this.modAddData.v_TreeCode, params)
        .then(res => {
          if (res.code === 0) {
            this.colName = res.data
          }
        })
    },
    // 提交数据
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          cgiService.saveBasicsColum(this.modAddData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              if (Number(res.iId) > 1) {
                this.modAddData.i_Id = res.iId
              }
              // 老版调取数据
              // let resObj = {
              //   ...res
              // }
              // this.$set(resObj, 'v_TreeCode', res.v_TreeCode)
              // // 把 接口返回 的数据存到vuex
              // this.$store.commit('rowData', resObj)
              // 重新调取接口渲染数据
              let params = this.$store.state.paginations['CC_VW_treeFiledConfig']
              this.$set(
                params,
                'viewid',
                this.$store.state.fieRowTableData['CC_VW_treeFiledConfig']
                  .viewid
              )
              this.$emit('getTableData', params)
              this.formRed = false
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 关闭弹框回调
    closeCustomOptios () {
      this.modAddData.i_Id = ''
      this.$refs.ruleForm.resetFields()
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.modify-add-field {
  height: 100%;
  display: flex;
  flex-direction: column;
  .borderBox {
    border: 4px solid #abd6ff;
    padding: 15px;
    margin-top: 0px;
    overflow: auto;
    flex: 1;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      padding: 16px 0px;
      > span {
        position: absolute;
        top: -10px;
        left: 10px;
        background: #ffffff;
        padding: 0 5px;
      }
    }
  }
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form {
  border: none !important;
  padding-bottom: 0;
}
</style>
