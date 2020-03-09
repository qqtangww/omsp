<template>
  <div class="correlationForm add-modify-form">
    <div class="formOperateBox">
      <action-bar
        :configData='configData'
        @sumitForm='commit'
        :formRed='formRed'
        v-on="$listeners"
    ></action-bar>
    </div>
    <el-form
      :rules="rules"
      :model="formdata"
      label-width="100px"
      inline-message
      ref="rules">
      <div class="border-box">
        <el-form-item label="关联表" prop="v_SubTableName">
          <el-select v-model="formdata.v_SubTableName" placeholder="请选择关联表">
            <el-option
              v-for="item in relevanceDatabaseList"
              :key="item.id"
              :label="item.tablename"
              :value="item.tablename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row class="field-box">
          <div v-for="(item,index) in fieldArray" :key='index' class="clearfix cycle-field-box">
            <el-col :span="24">
              <el-form-item :label="`关键字段${index + 1}`" id="select-field-box">
                <el-select v-model="item.v_KeyField" placeholder="请选择主表字段" @focus="getPrimaryTableList" clearable>
                  <el-option
                    v-for="item in primaryTableList"
                    :key="item.id"
                    :value="item.fieldname"
                    :label="item.fieldname"
                  ></el-option>
                </el-select>
                <el-select v-model="item.v_SubKeyField" placeholder="请选择关联表字段" @focus="getCorrelationTableList" clearable>
                  <el-option
                    v-for="item in correlationTableList"
                    :key="item.id"
                    :value="item.fieldname"
                    :label="item.fieldname"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <button class="delete-field" @click="deleteField(index)"><i class="iconfont icon-shanchu-lajitong"></i>删除</button>
          </div>
          <button class="add-field" @click="addField"><i class="iconfont icon-tianjia"></i>添加</button>
        </el-row>
        <el-form-item label="关联表描述" class='description-label'>
          <el-input
            v-model="formdata.v_TableDescription"
            placeholder="请输入关联表表描述"
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
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'correlationForm',
  mixins: [logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formdata: {
        v_SubTableName: '',
        v_TableDescription: ''
      },
      fieldArray: [{ v_KeyField: '', v_SubKeyField: '' }],
      oldFieldArray: [{ v_KeyField: '', v_SubKeyField: '' }],
      rules: {
        v_SubTableName: [
          { required: true, message: '请输入关联表名称', trigger: 'blur' }
        ]
      },
      formRed: false,
      // 小红点功能
      oldModAddData: {
        v_SubTableName: '',
        v_TableDescription: ''
      },
      // 主表字段下拉
      primaryTableList: [],
      // 关联表字段下拉
      correlationTableList: [],
      // 主表字段下拉
      masterTabelField: [],
      // 关联表 表名下拉
      relevanceDatabaseList: []
    }
  },
  computed: {
    ...mapState({
      buttonConfig: state => state.confsBtn
    })
  },
  watch: {
    fieldArray: {
      deep: true,
      handler (nv) {
        if (JSON.stringify(this.oldFieldArray) !== JSON.stringify(nv)) {
          this.formRed = true
        }
      }
    },
    formdata: {
      deep: true,
      handler (nv) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(nv)) {
          this.formRed = true
        }
      }
    }
  },
  created () {
    this.queryRelevanceDatabase()
    // type等于1为操作栏按钮【新增操作】，等于2为行内操作按钮【修改操作】
    if (this.buttonConfig.type === '1') {
      this.formdata.v_SubTableName = ''
      this.formdata.v_TableDescription = ''
    } else if (this.buttonConfig.type === '2') {
      this.oldModAddData.v_SubTableName = this.formdata.v_SubTableName = this.shareData.v_SubTableName
      this.oldModAddData.v_TableDescription = this.formdata.v_TableDescription = this.shareData.v_TableDescription
      // 主从字段下拉绑定
      this.oldFieldArray[0].v_KeyField = this.fieldArray[0].v_KeyField = this.shareData.v_KeyField
      this.oldFieldArray[0].v_SubKeyField = this.fieldArray[0].v_SubKeyField = this.shareData.v_SubKeyField
      this.oldFieldArray[0].i_Id = this.fieldArray[0].i_Id = this.shareData.i_Id
    }
  },
  methods: {
    // 保存添加关联表
    commit (rules) {
      this.$refs.rules.validate(valid => {
        if (valid) {
          // 如果没有选择主表字段，提示用户必填
          if (!this.fieldArray[0].v_KeyField) {
            this.$message({
              duration: 1000,
              type: 'warning',
              message: '请选择主表关键字段'
            })
            return
          }
          let params = {
            v_TableName: this.shareData.v_TableName,
            v_TableDescription: this.formdata.v_TableDescription,
            v_SubTableName: this.formdata.v_SubTableName,
            data: JSON.stringify(this.fieldArray)
          }
          cgiService.addOrEditDatabase(params).then(res => {
            if (!res.code) {
              this.formRed = false
              this.$message.success(res.msg)
              this.$emit('getTableData')
              this.fieldArray.forEach((item, index) => {
                item.i_Id = res.ids[index]
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    addField () {
      this.fieldArray.push({ v_KeyField: '', v_SubKeyField: '' })
    },
    deleteField (index) {
      this.fieldArray.splice(index, 1)
    },
    // 获取关联表
    queryRelevanceDatabase () {
      cgiService.getRelevanceDatabase().then(res => {
        this.relevanceDatabaseList = res.data
      })
    },
    // 获取主表字段
    getPrimaryTableList () {
      this.getFieldLsit(this.shareData.v_TableName)
    },
    // 获取关联表字段
    getCorrelationTableList () {
      this.getFieldLsit(this.formdata.v_SubTableName)
    },
    // 获取关联表字段
    getFieldLsit (data) {
      let params = {
        tablename: data
      }
      // 2020/1/21 修改 注释原因 主表 跟 关联 表数据一样

      // let isPrimaryTable = false
      // let isCorrelationTable = false
      // if (params.tablename === this.shareData.v_TableName || params.tablename !== this.shareData.v_TableName) {
      //   // 如果是主表数组 中有数据就不请求
      //   isPrimaryTable = this.primaryTableList.length > 0

      //   if (isPrimaryTable) return
      //   // 如果是关联表数组 中有数据就不请求
      //   isCorrelationTable = this.correlationTableList.length > 0
      //   if (isCorrelationTable) return
      // }
      let param1 = params.that.$store.state.paginations['CC_VW_dataPowerUser']
      params.that.$set(param1, 'viewid', params.that.$store.state.fieRowTableData['CC_VW_dataPowerUser'].viewid)
      params.that.$parent.getTableData(param1)
      cgiService.getMasterTabelField(params).then(res => {
        // 判断是获取的是主表字段  还是关联表的字段
        // if (!isPrimaryTable) {
        if (this.shareData.v_TableName === data) {
          this.primaryTableList = res.data
        }
        // }
        // if (!isCorrelationTable) {
        // if (data === this.formdata.v_SubTableName) {
        this.correlationTableList = res.data
        // }
        // }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.border-box{
  padding: 14px 75px 16px 16px;
  margin: 16px;
  border: 1px solid #BFBFBF;
  .field-box{
    position: relative;
    .add-field{
      display: inline-block;
      width: 50px;
      height: 24px;
      padding: 0;
      font-size: 12px;
      line-height: 24px;
      border: none;
      outline: none;
      background: white;
      position: absolute;
      top: 8px;
      right: -50px;
      cursor: pointer;
      i{
        font-size: 12px;
        margin-right: 4px;
      }
    }
    .cycle-field-box{
      position: relative;
      .delete-field{
        @extend .add-field;
        i{
          color: #F55E5E;
        }
      }
    }
  }
}
#select-field-box{
  /deep/ .el-select{
    width: 48%;
    &:last-of-type{
      margin-left: 10px;
    }
  }
}
</style>
