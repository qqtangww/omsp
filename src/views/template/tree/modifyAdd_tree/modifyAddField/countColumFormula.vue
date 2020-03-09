<!-- 内容组件-树形组件-计算字段-公式 -->
<template>
  <div class="count-colum-formula">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message class="filedForm" label-position="right" label-width="100px" ref="ruleForm" :model="modAddData">
      <div class="formulaConBox">
        <el-form-item label="计算类型" label-width="80px" prop="i_FieldType">
          <el-select placeholder="请选择" class="minSelect" @change="changeType" v-model="modAddData.i_FieldType" clearable>
            <el-option
              v-for="(item) in tableDataType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转换代码" label-width="80px" v-if="modAddData.i_FieldType === '3'">
          <!-- <el-cascader
            :options="enumList"
            :show-all-levels="false"
            v-model="cateCodeVal"
            :props="defaultProps"
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
        <el-form-item label="请输入该字段的函数名:" label-width="155px" v-if="modAddData.i_FieldType === '2'" ></el-form-item>
        <el-form-item
          label
          label-width="0"
          class="formulaTextaraBox"
          v-if="modAddData.i_FieldType === '1'"
          prop="v_Func"
        >
          <el-input
            class="textareaBox"
            v-model="modAddData.v_Func"
            placeholder="请输入函数体显示字段的数据 例如:
        (function(row) {
          return  row.字段名 === '1' ? '数据一' ： '数据二'
        })
        "
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="请输入该字段的函数体:" label-width="155px" v-if="modAddData.i_FieldType === '1'" ></el-form-item>
        <el-form-item label label-width="0" v-if="modAddData.i_FieldType === '2'" prop="v_Func">
          <el-input
            class="textareaBox"
            v-model="modAddData.v_Func"
            placeholder="请输入函数体显示字段的数据 例如:
function Name(row) {
   return  row.字段名 === '1' ? '数据一' ： '数据二'
 })
    "
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="请输入SQL语句:" label-width="118px" v-if="modAddData.i_FieldType === '4'" ></el-form-item>
        <el-form-item label label-width="0" v-if="modAddData.i_FieldType === '4'" prop="v_Func">
          <el-input
            class="textareaBox"
            v-model="modAddData.v_Func"
            placeholder="请输入SQL语句"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
       <el-table
        :data="enumVlaList"
        height="350px"
        style="width: 610px"
        id="treeFormual"
        class="contentTable"
        :row-class-name="'ws-row'"
        :header-cell-style="{background:'rgba(247,247,247,.5)', color:'#333333' }"
        v-if="modAddData.i_FieldType === '3' "
      >
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
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'countColumFormula',
  mixins: [windowRed, logMixin],
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      modAddData: {
        i_FieldType: '1',
        v_Func: '',
        v_EnumCode: ''
      },
      options: [],
      enumVlaList: [],
      // 表格列数据类型
      tableDataType: [
        { value: '1', label: '匿名函数' },
        { value: '2', label: '命名函数' },
        { value: '3', label: '转换代码' },
        { value: '4', label: 'SQL计算' }
      ],

      // 定义小红点 存储数据的对象
      oldModAddData: {},
      i_FieldType: '',
      v_Func: '',
      v_EnumCode: ''
    }
  },
  created () {
    this.getEnumCateGoryList()
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modifyField') {
      let formData = this.$store.state.fieTableData
      this.getEnumValueList(formData.v_EnumCode)
      this.i_FieldType = formData.i_FieldType
      this.v_Func = this.modAddData.v_Func
      this.v_EnumCode = this.modAddData.v_EnumCode
      util.initFormData(this.modAddData, formData)
    }
    // 接受旧的表单数据  用于 跟新数据 做对比
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  methods: {
    commit () {
      // 保存 时  取出VUEX Tab的必填项字段 并合并
      let rowTabData = this.$store.state.rowTabData
      Object.assign(this.modAddData, rowTabData)
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        this.modAddData.logParams = this.getLogParams()
      }
      cgiService.saveBasicsColum(this.modAddData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          // 保存 计算类型数据 方便 切换类型后数据进行还原
          this.i_FieldType = this.modAddData.i_FieldType
          this.v_Func = this.modAddData.v_Func
          // let resObj = {
          //   ...res
          // }
          // this.$set(resObj, 'v_TreeCode', res.v_TreeCode)
          // // 把 接口返回 的数据存到vuex
          // this.$store.commit('rowData', resObj)
          // 把修改后的必填项数据  存入VUEX 中  方便其他Tab获取
          this.$store.commit('changeRowTabData', this.modAddData)
          // 重新调取接口渲染数据
          let params = this.$store.state.paginations['CC_VW_treeFiledConfig']
          this.$set(
            params,
            'viewid',
            this.$store.state.fieRowTableData['CC_VW_treeFiledConfig'].viewid
          )
          this.$emit('getTableData', params)
          if (Number(res.iId) > 0) {
            this.$set(this.modAddData, 'i_Id', res.iId)
          }
          // 保存后设置小红点消失
          this.isReminder = true
          this.oldModAddData = Object.assign({}, this.modAddData)
        } else {
          this.$message.error(res.msg)
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
    // 拉取枚举值
    getEnumValueList (val) {
      let enumCode = val
      cgiService.getEnumValues({ enumCode }).then(res => {
        if (res.code === 0 && res.data) {
          this.enumVlaList = res.data[enumCode]
        }
      })
    },
    // 查询数据枚举
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
    changeType (e) {
      if (this.i_FieldType !== e) {
        this.modAddData.v_Func = ''
        this.modAddData.v_EnumCode = ''
        this.enumVlaList = []
      } else {
        this.$set(this.modAddData, 'v_Func', this.v_Func)
        this.$set(this.modAddData, 'v_EnumCode', this.v_EnumCode)
      }
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.formBox .el-dialog div.el-dialog__body .bodyBorderBox {
  .count-colum-formula {
    overflow: auto;
    display: flex;
    flex-direction: column;
    .el-form {
      flex: 1;
    }
    .formulaConBox {
      padding: 10px 10px;
      box-sizing: border-box;

      .el-form-item:nth-of-type(1) {
        margin-top: 0px !important;
      }
      .el-form-item {
        .el-form-item__content {
          .minSelect {
            width: 142px;
          }
          .textareaBox {
            height: 375px;
            > textarea {
              height: 100% !important;
            }
          }
        }
      }
    }
    .contentTable {
      margin: auto;
    }
  }
}
.formBox .el-dialog div.el-dialog__body .bodyBorderBox .el-form {
  border: none;
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  > div.el-form-item__content
  > span {
  margin: 0;
  width: 142px;
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  .textareaBox
  /deep/
  textarea {
  height: 100% !important;
}
.contentTable {
  border: 1px solid #E6E6E6;
}
 #treeFormual /deep/ .el-table__header th .cell {
  color: #333333 !important;
}
</style>
