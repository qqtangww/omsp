<!-- 内容组件-视图组件-字段设置【基础、计算字段】-基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="modAddData1" :rules="rules" :model="modAddData" label-width="100px">
      <div class="topBox">
        <div class="border-box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本信息
          </span>
          <el-form-item label="视图名称">
            <el-input v-model="formData.v_ViewName" disabled></el-input>
          </el-form-item>
          <el-form-item label="视图代码">
            <el-input v-model="formData.v_ViewID" disabled></el-input>
          </el-form-item>
          <el-form-item label="字段类型">
            <el-radio-group v-model="modAddData.i_ColumnType" @change="changeColumType">
            <el-radio label="1">基础</el-radio>
            <el-radio label="2">计算</el-radio>
          </el-radio-group>
          </el-form-item>
          <!-- i_ColumnType 的类型  是  基础字段 1 / 计算字段  2 -->
            <el-form-item label="数据库表" prop="v_TableName" v-if="modAddData.i_ColumnType === '1'">
              <el-select
                placeholder="请选择"
                filterable
                @focus="getDatabaseTab"
                @change="getTableFields"
                v-model="modAddData.v_TableName"
              >
                <el-option
                  v-for="(item) in databaseTab"
                  :key="item.v_TableName"
                  :label="item.v_TableName"
                  :value="item.v_TableName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字段名" key='v_ColName1' prop="v_ColName" v-if="modAddData.i_ColumnType === '1'">
              <el-select
                placeholder="请选择"
                filterable
                @change='getColumData'
                v-model="modAddData.v_ColName"
                @focus="getTableFields(modAddData.v_TableName)"
              >
                <el-option
                  v-for="(item) in fieldTable"
                  :key="item.i_Id"
                  :label="item.v_FieldName"
                  :value="item.v_FieldName"
                 >
                  <span style="float: left">{{ item.v_FieldName }}</span>
                  <span style="float: right">{{ item.v_FieldTitle }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字段名" key="v_ColName2" prop="v_ColName" v-if="modAddData.i_ColumnType === '2'">
               <el-input v-model="modAddData.v_ColName"></el-input>
            </el-form-item>

          <el-form-item label="列标题" prop="i_ColTitle">
            <el-input v-model="modAddData.i_ColTitle"></el-input>
          </el-form-item>
        </div>
        <div class="border-box">
          <span>
            <i class="iconfont icon-yemianguanli"></i> 位置样式
          </span>
          <el-form-item label="固定列" label-width="90px" prop="v_Isfixed">
            <el-select placeholder="请选择" class="minSelect" v-model="modAddData.v_Isfixed">
              <el-option label="无" value></el-option>
              <el-option label="居左" value="left"></el-option>
              <el-option label="居右" value="right"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="列宽" label-width="90px">
            <el-input-number
              v-model="modAddData.i_ColWidth"
              controls-position="right"
              @change="handleChange"
              :min="0"
            ></el-input-number>
            <span class="hintInfo">值为0时自适应</span>
          </el-form-item>

          <el-form-item label="对齐" label-width="90px">
            <el-radio-group v-model="modAddData.i_ColAlign">
              <el-radio label="left">左</el-radio>
              <el-radio label="center">中</el-radio>
              <el-radio label="right">右</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" class="controlLiHei" label-width="90px">
            <el-switch v-model="modAddData.i_IsSort" active-value="1" inactive-value="0" @change='sortChange'></el-switch>
            <span class="hintInfo">此列显示排序按钮</span>
          </el-form-item>
          <el-form-item
            label="排序方式"
            v-if="modAddData.i_IsSort === '1'"
            class="controlLiHei"
            label-width="90px"
          >
            <el-radio-group v-model="modAddData.i_SortMode">
              <el-radio label="0">无</el-radio>
              <el-radio label="1">升序</el-radio>
              <el-radio label="2">降序</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <div class="centerBox">
        <div class="border-box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本设置
          </span>
          <el-row>
            <el-col :span="12">
              <el-form-item label="导出" class="controlLiHei">
                <el-switch v-model="modAddData.i_IsExpord" active-value="1" inactive-value="0"></el-switch>
                <span class="hintInfo">在导出文件中显示</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="合计" class="controlLiHei">
                <el-switch v-model="modAddData.i_IsTotalup" active-value="1" inactive-value="0"></el-switch>
                <span class="hintInfo">在合计行计算</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类" class="controlLiHei">
                <el-switch
                  v-model="modAddData.i_IsCategory"
                  @change="changeCateGory"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
                <span class="hintInfo">按此列进行分类</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="隐藏" class="controlLiHei">
                <el-switch v-model="modAddData.i_IsHidden" active-value="1" inactive-value="0"></el-switch>
                <span class="hintInfo">设此列在表格内可见</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 判断columnType 的类型  是  基础字段 1 / 计算字段  2 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="查询" class="controlLiHei">
                <el-switch v-model="modAddData.i_IsSelect" active-value="1" inactive-value="0" :disabled="modAddData.i_ColumnType === '2'"></el-switch>
                <span class="hintInfo">设此列为视图查询项</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="查询组件" class="controlLiHei">
                <el-select
                  placeholder="开关"
                  class="minSelect"
                  v-model="modAddData.i_SearchSubType"
                  :disabled="modAddData.isselect === '0' || modAddData.i_ColumnType === '2'"
                >
                  <el-option label="默认" value="1"></el-option>
                  <el-option label="日期" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 判断columnType 的类型  是  基础字段 1 / 计算字段  2 -->
      <div class="bottomBox">
        <div class="border-box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 显示设置
          </span>

          <el-form-item label="显示方式" prop="v_FormatString" class="format-string">
              <el-col :span="8" class="format-box">
                <el-select placeholder="数据类型" v-model="modAddData.v_FormatString"  @change="changeShowType" clearable>
                  <el-option v-for="(item,index) in formatList"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="14"  v-if="!(modAddData.v_FormatString === 'colorBlocks' || modAddData.v_FormatString === 'style' || modAddData.v_FormatString === 'default' || modAddData.v_FormatString === 'Img' || modAddData.v_FormatString === 'switch')">
                <el-input
                  class="input-format"
                  v-model="modAddData.i_DataFormat"
                  :disabled="!modAddData.v_FormatString "
                ></el-input>
              </el-col>
          </el-form-item>
          <el-form-item
            v-if="modAddData.v_FormatString=== 'switch'"
            label="开关函数体"
            class="funSwitch description-label"
            prop="v_SwitchFunc">
            <el-row>
              <el-col :span="24" class="switch-func">
                <el-input
                  v-model="modAddData.v_SwitchFunc"
                  placeholder="请输入函数体，控制开关按钮是否置灰"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 4}"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'baseInfoFiled_View',
  mixins: [windowRed, logMixin],
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      modAddData: {
        v_Isfixed: '',
        i_ColWidth: 0,
        i_ColAlign: 'left',
        i_SortMode: '0',
        v_Type: '0',
        i_IsTotalup: '0',
        i_IsSort: '0',
        i_IsSelect: '0',
        i_IsHidden: '0',
        i_IsExpord: '0',
        i_IsCategory: '0',
        v_TableName: '',
        v_ColName: '',
        i_ColTitle: '',
        v_FormatString: 'default',
        i_DataFormat: '',
        i_SearchSubType: '1',
        v_SwitchFunc: '',
        i_ColumnType: '1'
      },
      oldModAddData: {},
      databaseTab: [],
      fieldTable: [],
      formData: {},
      rules: {
        v_TableName: [
          { required: true, message: '请选择数据库表', trigger: 'change' }
        ],
        v_ColName: [
          { required: true, message: '请选择数据库表', trigger: 'blur' }
        ],
        i_ColTitle: [
          { required: true, message: '请选择数据库表', trigger: 'blur' }
        ]
      },
      tabsCode: '',
      formatList: []
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (data.i_ColWidth === 'auto') {
          this.$set(data, 'i_ColWidth', 0)
        }
        if (this.oldModAddData.i_ColWidth === 'auto') {
          this.$set(this.oldModAddData, 'i_ColWidth', 0)
        }
        this.$set(
          this.oldModAddData,
          'i_ColWidth',
          Number(this.oldModAddData.i_ColWidth)
        )
        // 对比编辑前后数据 不一致出现小红点
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    temConf: {
      handler: function (data) {
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData,
      moveSort: state => state.moveSort
    })
  },
  created () {
    this.formData = this.$store.state.fieTableData
    let obj = this.$store.state.fieRowTableData
    let confsBtn = this.$store.state.confsBtn
    //  修改操作 是 基础字段
    if (confsBtn.operationcode === 'modify') {
      if (this.modAddData.i_ColWidth === 'auto') {
        this.modAddData.i_ColWidth = 0
      }
      util.initFormData(this.modAddData, this.formData)
      this.$set(this.modAddData, 'i_Id', this.formData.i_Id)
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      let currentTab = Object.assign({}, this.modAddData)
      this.$set(currentTab, 'regin', 'regin2')
      // 把修改的数据存入vuex中  方便返回给其他的Tab页
      this.$store.commit('changeRepetitionRowTabData', currentTab)
      // 如果是基础字段修改，隐藏公式tab
      if (this.modAddData.i_ColumnType === '1') {
        document.querySelectorAll('#tab-1')[1].style.display = 'none'
      }
    }
    // 视图名称数据
    this.$set(this.formData, 'v_ViewName', this.tabData['regin1'].v_ViewName)
    // if (obj['CC_VW_contentView'].v_ViewName) {
    //   this.$set(this.formData, 'v_ViewName', obj['CC_VW_contentView'].v_ViewName)
    // } else {
    //   this.$set(this.formData, 'v_ViewName', this.formData.viewName)
    // }
    this.getEnumValue({ enumCode: 'dataCategoryList' })
    this.getEnumValue({ enumCode: 'tabsDisabled' })
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    // 排序改变时
    sortChange () {
      // 获取当前视图的viewid
      let confsBtn = this.$store.state.confsBtn
      // 获取是否开启调序字段
      let flag = this.moveSort[confsBtn.viewid].isSort
      // 开启调序提示
      if (flag === '1') {
        this.$message.warning('当前已开启调序，开启调序后排序将不生效')
      }
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
      cgiService.getTemTablefields(params).then(res => {
        if (res) {
          this.fieldTable = res.data
        }
      })
    },
    handleChange () {},
    commit () {
      this.$refs.modAddData1.validate(valid => {
        if (valid) {
          let params = {
            ...this.modAddData
          }
          this.$set(params, 'v_ViewID', this.formData.v_ViewID)
          // this.$set(params, 'i_ColumnType', this.columnType)
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.addTemColumnList(params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              // 判断添加的字段是否是基础字段，如果是基础字段就置灰公式tab页
              if (this.modAddData.i_ColumnType === '1') {
                // tab置灰
                // this.$emit('changeFlag', { isDisabled: false, tabsCode: this.tabsCode })
                this.$emit('changeFlag', { isDisabled: false, tabsCode: '' })
                document.querySelectorAll('#tab-1')[1].style.display = 'none'
              } else {
                document.querySelectorAll('#tab-1')[1].style.display = 'inline-block'
                this.$emit('changeFlag', { isDisabled: false, tabsCode: '' })
              }
              // 重新调取接口渲染数据
              let param = this.$store.state.paginations['CC_VW_viewField']
              this.$set(param, 'viewid', this.$store.state.fieRowTableData['CC_VW_viewField'].viewid)
              this.$emit('getTableData', param)
              // 把提交的数据保存到vuex，用于权限tab
              this.$store.commit('rowData', params)
              if (Number(res.iId) > 0) {
                this.modAddData.i_Id = res.iId
                params.i_Id = res.iId
                this.isReminder = true
                this.oldModAddData = Object.assign({}, this.modAddData)
                // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
                let currentTab = Object.assign({}, this.modAddData)
                this.$set(currentTab, 'regin', 'regin2')
                // 把修改的数据存入vuex中  方便返回给其他的Tab页
                this.$store.commit('changeRepetitionRowTabData', currentTab)
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    changeCateGory (val) {
      if (val === '1') {
        this.$set(this.modAddData, 'i_IsHidden', '1')
      }
    },
    changeColumType (val) {
      if (val === this.formData.i_ColumnType) {
        if (this.modAddData.i_Id) {
          this.$set(this.modAddData, 'v_ColName', this.formData.v_ColName)
          this.$set(this.modAddData, 'i_ColTitle', this.formData.i_ColTitle)
        }
      } else {
        this.$set(this.modAddData, 'v_ColName', '')
        this.$set(this.modAddData, 'i_ColTitle', '')
      }
      this.$nextTick(() => {
        this.$refs.modAddData1.clearValidate(['v_ColName', 'i_ColTitle'])
      })
    },
    changeShowType (val) {
      if (this.formData.v_FormatString === val) {
        this.$set(this.modAddData, 'i_DataFormat', this.formData.i_DataFormat)
      } else {
        this.$set(this.modAddData, 'i_DataFormat', '')
      }
    },
    // 获取显示方式
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          if (params.enumCode === 'dataCategoryList') {
            this.formatList = res.data.dataCategoryList
            this.formatList.push({ v_EnumValue: 'mixins', v_EnumValueName: '混合类型' })
          } else {
            this.tabsCode = res.data.tabsDisabled.v_EnumValue
          }
        }
      })
    },
    getColumData (val) {
      let obj = {}
      obj = this.fieldTable.find(item => {
        return item.v_FieldName === val
      })
      this.$set(this.modAddData, 'i_ColTitle', obj.v_FieldTitle)
    }
  },
  mounted () {
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  .format-string{
    /deep/ .input-format {
      width: 304px;
      >input{
        padding: 0 12px;
      }
    }
  }
  .el-form {
    border: none !important;
  }
  .border-box {
    border: 1px solid #bfbfbf;
    padding: 0px 14px 14px 0px;
    box-sizing: border-box;
    position: relative;
    > span {
      position: absolute;
      top: -10px;
      left: 15px;
      background: #ffffff;
      padding: 0 4px;
    }
  }
  .el-form {
    padding: 10px 10px 0px 10px;
    box-sizing: border-box;
    overflow: auto;
    box-sizing: border-box;
    .topBox {
      display: flex;
      .border-box {
        width: 50%;
        .input-format {
          margin-left: 8px;
        }
        &:first-of-type {
          margin-right: 10px;
        }
      }
    }
    .centerBox {
      margin-top: 15px;
    }
    .bottomBox {
      padding: 10px 0;
      .border-box {
        box-sizing: border-box;
      }
      .format-box{
        margin-right: 8px;
      }
    }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .el-form
  .el-form-item
  div.el-input-number.is-controls-right {
  width: 90px;
  line-height: 28px;
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
}
.border-box /deep/ .controlLiHei {
  margin-top: 10px !important;
}
.border-box /deep/ .controlLiHei .el-switch {
  width: 40px;
}
</style>
