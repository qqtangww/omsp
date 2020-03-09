<!-- 内容组件-视图组件-计算字段-公式 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="modAddData1" :model="modAddData" :rules="rules">
      <el-form-item label="计算类型" label-width="76px">
        <el-select placeholder="请选择" class="minSelect" clearable v-model="modAddData.i_FieldType" @change="changeType">
          <el-option
            v-for="(item,index) in tableDataType"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row v-if="modAddData.i_FieldType === '3'">
        <el-col :span="12">
        <el-form-item label="数据库表" label-width="76px" prop="v_ConvertTable" >
        <el-select placeholder="请选择" class="minSelect" clearable v-model="modAddData.v_ConvertTable" @focus="getDatabaseTab"  @change="getTableFields">
          <el-option
            v-for="(item,index) in databaseTab"
            :key="index"
            :label="item.v_TableName"
            :value="item.v_TableName"
          ></el-option>
        </el-select>
      </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="字段" label-width="76px" prop="v_ConvertColName">
        <el-select placeholder="请选择" clearable filterable v-model="modAddData.v_ConvertColName">
          <el-option
            v-for="(item,index) in fieldTable"
            :key="index"
            :label="item.v_FieldName"
            :value="item.v_FieldName"
          >
           <span style="float: left">{{ item.v_FieldName }}</span>
           <span style="float: right">{{ item.v_FieldTitle }}</span>
          </el-option>
        </el-select>
      </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="枚举" label-width="76px" prop='v_EnumCode' v-if="modAddData.i_FieldType === '3'">
        <!-- <el-cascader
          popper-class="filtrate"
          :options="enumList"
          :props="defaultProps"
          :show-all-levels='false'
          clearable
          v-model="enumValue"
          @visible-change="getEnumCateList"
          @change="getEnumValueList"
        ></el-cascader> -->
        <el-select v-model="modAddData.v_EnumCode" @change="getEnumValueList" filterable :filter-method="getOptions" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.v_EnumName"
                :value="item.v_EnumCode">
                  <span style="float: left">{{ item.v_EnumName }}</span>
                  <span style="float: right">{{ item.v_EnumCode }}</span>
              </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入该字段的函数名:" label-width="150px" v-if="modAddData.i_FieldType === '2'" ></el-form-item>
      <el-form-item label v-if="modAddData.i_FieldType === '2'">
        <el-input
          class="textareaBox"
          v-model="modAddData.v_Formulas"
          placeholder="请输入函数体显示字段的数据 例如:
function Name(row) {
   return  row.字段名 === '1' ? '数据一' ： '数据二'
 })
   "
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"
        />
      </el-form-item>
      <el-form-item label="请输入该字段的函数体:" label-width="150px" v-if="modAddData.i_FieldType === '1'" ></el-form-item>
      <el-form-item label v-if="modAddData.i_FieldType === '1'">
        <el-input
          class="textareaBox"
          v-model="modAddData.v_Formulas"
          placeholder="请输入函数体显示字段的数据 例如:
 (function(row) {
  return  row.字段名 === '1' ? '数据一' ： '数据二'
})
 "
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"
        />
      </el-form-item>
      <el-form-item label="请输入SQL语句:" label-width="114px" v-if="modAddData.i_FieldType === '4'"></el-form-item>
      <el-form-item label v-if="modAddData.i_FieldType === '4'">
        <el-input
          class="textareaBox"
          v-model="modAddData.v_Formulas"
          placeholder="请输入SQL语句"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4}"
        />
      </el-form-item>
      <el-table
        :data="enumVlaList"
        height="290px"
        style="width: 610px"
        class="contentTable"
        header-cell-class-name='headerCls-blue'
        :row-class-name="'ws-row'"
        :header-cell-style="{background:'rgba(247,247,247,.5)', color:'#333333' }"
        v-if="modAddData.i_FieldType === '3'">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="枚举值名称" prop="v_EnumValueName" width="auto" fixed show-overflow-tooltip></el-table-column>
        <el-table-column label="值1" prop="v_EnumValue" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="值2" prop="v_EnumValue1" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="值3" prop="v_EnumValue2" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="值4" prop="v_EnumValue3" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column label="值5" prop="v_EnumValue4" width="80" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'countFormulaFiledView',
  mixins: [windowRed, logMixin],
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      modAddData: {
        i_FieldType: '1',
        v_Formulas: '',
        v_ConvertTable: '',
        v_ConvertColName: '',
        v_EnumCode: ''
      },
      formData: {},
      // 表格列数据类型
      tableDataType: [
        { value: '1', label: '匿名函数' },
        { value: '2', label: '命名函数' },
        { value: '3', label: '转换代码' },
        { value: '4', label: 'SQL计算' }
      ],
      options: [],
      enumVlaList: [],
      batchDelIds: [],
      v_EnumCode: '',
      parentEnumID: '',
      oldModAddData: {},
      oldEnumValue: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        value: 'value'
      },
      databaseTab: [],
      fieldTable: [],
      rules: {
        v_ConvertTable: [{ required: true, message: '请选择数据库表', trigger: 'change' }],
        v_ConvertColName: [{ required: true, message: '请选择字段', trigger: 'change' }],
        v_EnumCode: [{ required: true, message: '请选择枚举', trigger: 'change' }]
      },
      i_FieldType: '',
      // v_Formulas：''
      v_Formulas: '',
      v_ConvertTable: '',
      v_ConvertColName: ''

    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldModAddData)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData
    })
  },
  created () {
    this.getEnumCateGoryList()
    this.formData = this.$store.state.fieTableData
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, this.formData)

      this.$set(this.modAddData, 'v_ViewID', this.formData.v_ViewID)
      // 计算类型切换时保存对应的数据  方便切换回来  保存原有的数据
      this.v_EnumCode = this.formData.v_EnumCode
      this.i_FieldType = this.formData.i_FieldType
      this.v_ConvertTable = this.formData.v_ConvertTable
      this.v_ConvertColName = this.formData.v_ConvertColName
      this.getEnumValueList(this.v_EnumCode)
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      let params = {
        ...this.modAddData
      }
      // 保存 时  取出VUEX Tab的必填项字段 并合并
      Object.assign(params, this.tabData['regin2'])
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        params.logParams = this.getLogParams()
      }
      if (this.modAddData.i_FieldType === '3') {
        this.$set(params, 'i_IsCodeConvert', '1')
      }
      this.$refs.modAddData1.validate(valid => {
        if (valid) {
          cgiService.addTemColumnList(params).then(res => {
            if (res.code === 0) {
            // 保存 计算类型数据 方便 切换类型后数据进行还原
              this.i_FieldType = params.i_FieldType
              this.v_Formulas = params.v_Formulas
              this.v_ConvertTable = params.v_ConvertTable
              this.v_ConvertColName = params.v_ConvertColName
              this.$message.success(res.msg)
              // // 老版调取数据,没发现问题
              // let resObj = {
              //   ...res
              // }
              // this.$set(resObj, 'v_ViewID', res.viewid)
              // // 把 接口返回 的数据存到vuex
              // this.$store.commit('rowData', resObj)
              // 重新调取接口渲染数据
              let param = this.$store.state.paginations['CC_VW_viewField']
              this.$set(
                param,
                'viewid',
                this.$store.state.fieRowTableData['CC_VW_viewField'].viewid
              )
              this.$emit('getTableData', param)
              this.isReminder = true
              this.oldFiledFormData = Object.assign({}, params)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 获取枚举列表
    getEnumCateGoryList () {
      cgiService.getEnumCateGoryList().then(res => {
        if (res.code === 0) {
          this.options = res.data
        }
      })
    },
    // 查询数据
    getOptions (val) {
      let params = {
        keywords: val
      }
      if (val) {
        setTimeout(() => {
          cgiService.getEnumCateGoryList(params).then(res => {
            if (res.code === 0) {
              this.options = res.data
            }
          })
        }, 1000)
      }
    },
    // // 获取枚举分类列表
    // getEnumCateList (flag) {
    //   cgiService.getTemEnumCategoryList().then(res => {
    //     this.enumList = res.data
    //     if (flag === '1') {
    //       this.recursionEnumList()
    //     }
    //   })
    // },
    // recursionEnumList () {
    //   this.enumList.forEach(item => {
    //     if (item.children) {
    //       item.children.some((val) => {
    //         if (val.value === this.v_EnumCode) {
    //           this.parentEnumID = item.value
    //         }
    //       })
    //     }
    //   })
    //   this.$set(this.enumValue, 0, this.parentEnumID)
    //   this.$set(this.enumValue, 1, this.v_EnumCode)
    //   this.getEnumValueList(this.enumValue)
    //   this.oldEnumValue = this.enumValue
    // },
    // 根据枚举分类拉取值
    getEnumValueList (val) {
      let enumCode = val
      cgiService.getEnumValues({ enumCode }).then(res => {
        if (res.code === 0 && res.data) {
          this.enumVlaList = res.data[enumCode]
        }
      })
    },
    changeType (e) {
      if (this.i_FieldType !== e) {
        this.modAddData.v_Formulas = ''
        this.modAddData.v_ConvertTable = ''
        this.modAddData.v_ConvertColName = ''
        this.modAddData.v_EnumCode = ''
        this.enumVlaList = []
      } else {
        this.$set(this.modAddData, 'v_Formulas', this.v_Formulas)
        this.$set(this.modAddData, 'v_ConvertTable', this.v_ConvertTable)
        this.$set(this.modAddData, 'v_ConvertColName', this.v_ConvertColName)
        this.$set(this.modAddData, 'v_EnumCode', this.v_EnumCode)
        this.getEnumValueList(this.v_EnumCode)
      }
    },
    change (e) {
      this.$forceUpdate()
    },
    // 获取数据库表
    getDatabaseTab () {
      let params = this.formData.v_ViewID
      cgiService.getTemDatabaseTab(params).then(res => {
        if (res) {
          this.databaseTab = res.data
        }
      })
    },
    // 获取table表的字段
    getTableFields (val, val1) {
      let params = {
        v_TableName: val
      }
      if (this.formData.v_ConvertTable !== val) {
        this.$set(this.modAddData, 'v_ConvertColName', '')
      }
      cgiService.getTemTablefields(params).then(res => {
        if (res) {
          this.fieldTable = res.data
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  .el-form {
    padding: 0 16px 16px 16px;
    box-sizing: border-box;
    border: none !important;
    .contentTable {
      margin-top: 6px;

      border: 1px solid #E6E6E6;
    }
  }
}
.add-modify-form /deep/ .minSelect {
  width: 225px !important;
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .add-modify-form
  /deep/.el-form
  .el-form-item
  textarea {
  height: 335px !important;
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  > div.el-form-item__content
  > span {
  margin-left: 0;
  width: 142px;
}
.contentTable /deep/ .el-table__fixed {
      height: 100% !important;
  }
</style>
