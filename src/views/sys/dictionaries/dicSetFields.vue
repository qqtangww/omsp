<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-23 10:37:24
 * @LastEditTime: 2019-09-04 17:38:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 字段设置 废弃文件 -->
  <div>
    <div class="fieldCon bodyBorderBox">
      <div class="operateBox formOperateBox">
        <el-button type="text" @click="closeDialog">
          <i class="iconfont icon-tuichu"></i> 关闭
        </el-button>
        <el-button
          type="text"
          icon="iconfont icon-tianjia"
          @click="add">添加
        </el-button>
        <el-button
          @click="del()"
          type="text"
          icon="iconfont icon-shanchu-lajitong">删除
        </el-button>
      </div>
      <el-table
        :data="fieldsTableData"
        style="width: 100%"
        :height='confTableHeight'
        class="contentTable fieldsTable"
        :row-class-name="'ws-row'"
        @selection-change="tableSelect"
        :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }">
        <!-- 表格checkBox -->
        <el-table-column type="selection" fixed></el-table-column>
        <!-- 序号列 -->
        <el-table-column type="index" label="索引" fixed="left"></el-table-column>
        <el-table-column label="字段名" prop="fieldname" width="100" ></el-table-column>
        <el-table-column label="字段中文名" prop="fieldtitle" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="描述" prop="fielddescription" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="主键" width="100">
          <template slot-scope="scope">
            <el-switch
              @change="isSwitch('isprimary',scope.row)"
              v-model="scope.row.isprimary"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="索引" width="100">
          <template slot-scope="scope">
            <el-switch
              @change="isSwitch('isindex',scope.row)"
              v-model="scope.row.isindex"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="转换代码" width="100">
          <template slot-scope="scope">
            <el-switch
              @change="isSwitch('transcode',scope.row)"
              v-model="scope.row.transcode"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="转换对应枚举" prop width="auto"></el-table-column>
        <el-table-column label="操作" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" class="opeartionBtn" @click="modify(scope.row,scope.$index)">修改</el-button>
            <el-button type="text" class="opeartionBtn" @click="del({rowData:scope.row , rowIndex:scope.$index})">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="modAddField"
      append-to-body
      v-dialogDrag
      :close-on-click-modal='false'
      width="650px"
      :title="modAddFieldTit"
      @close="closeFun('rules')"
      class="formBox accessFormBox" >
      <div class="bodyBorderBox">
        <div class="formOperateBox">
          <el-button type="text" @click="closeFun('rules')">
            <i class="iconfont icon-tuichu"></i> 关闭
          </el-button>
          <el-badge :is-dot="isBadge" class="item">
            <el-button type="text" @click="commit('rules')">
              <i class="iconfont icon-baocun"></i> 保存
            </el-button>
          </el-badge>
        </div>
        <el-tabs type="border-card" @tab-click="fieldsTabClick" v-model="fieldsTabName">
          <el-tab-pane label="基本" name="basicTab" class="basicMsg">
            <el-form label-position="right" label-width="100px" ref="rules" :model="formdata" :rules="rules">
              <div>
                <el-form-item label="所属表">
                  <el-input v-model="formdata.tablename" :disabled="showTablename"></el-input>
                </el-form-item>
                <el-form-item label="字段名" prop="fieldname">
                  <el-select v-model="formdata.fieldname" placeholder="请选择">
                    <el-option
                      v-for="item in fieldsList"
                      :key="item.fieldname"
                      :label="item.fieldname"
                      :value="item.fieldname">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字段中文名">
                  <el-input v-model="formdata.fieldtitle"></el-input>
                </el-form-item>
                <el-form-item label="字段描述">
                  <!-- <el-input v-model="formdata.fielddescription"></el-input> -->
                  <el-input
                      v-model="formdata.fielddescription"
                      placeholder="请输入表关系描述"
                      type="textarea"
                      class="minInput"
                      :autosize="{ minRows: 2, maxRows: 4}"
                    />
                </el-form-item>
                <el-form-item label="数据类型">
                  <el-input v-model="formdata.datatypey"></el-input>
                </el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="主键">
                      <el-switch
                        v-model="formdata.isprimary"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="14">
                    <el-form-item label="索引">
                      <el-switch
                        v-model="formdata.isindex"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="转换代码">
                      <el-switch
                        v-model="formdata.transcode"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                        @change='transChange'
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="14">
                    <el-form-item label="转换对应枚举">
                      <el-cascader
                        class="selInput"
                        :disabled='formdata.transcode === "0" '
                        :options="enumList"
                        v-model="formdata.selectedOptions"
                        @change="enumChange">
                      </el-cascader>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="默认设置" name="defaultTab" class="defaultSet">
            <el-form label-position="right" label-width="90px" :model="formdata">
              <div class="styleConf">
                <span class="divTitle">
                  <i class="iconfont icon-jibenxinxi"></i>
                  样式
                  </span>
                <el-row>
                  <!-- <el-col :span="12">
                    <el-form-item label="列标题" prop="tablename">
                      <el-input v-model="formdata.coltitle"></el-input>
                    </el-form-item>
                  </el-col> -->
                  <el-form-item label="格式化串">
                    <el-row class="formatBox">
                      <el-col>
                        <el-select
                          placeholder="数据类型"
                          v-model="formdata.formatstring" class="selInput">
                          <el-option
                            label="String"
                            value="String" >
                          </el-option>
                          <el-option
                            label="Number"
                            value="Number" >
                          </el-option>
                           <el-option
                            label="Data"
                            value="Data" >
                          </el-option>
                        </el-select>
                        <el-input v-model="formdata.dataformat" :disabled="!formdata.formatstring" class="formatVal"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="固定列" prop="tabledescription">
                      <el-select v-model="formdata.isfixed" placeholder="请选择" class="selInput">
                        <el-option
                          v-for="item in fixedList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="列宽" prop="category">
                      <el-input-number v-model="formdata.colwidth" controls-position="right"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="排序" prop="status">
                      <el-switch
                        v-model="formdata.issort"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="排序方式" prop="status">
                      <el-radio-group v-model="formdata.sortmode" :disabled="formdata.issort === '0'">
                        <el-radio label="0">无</el-radio>
                        <el-radio label="1">升序</el-radio>
                        <el-radio label="2">降序</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="setting">
                <span class="divTitle">
                  <i class="iconfont icon-jibenxinxi"></i>
                  设置
                  </span>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="导出" prop="status">
                      <el-switch
                        v-model="formdata.isexpord"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合计" prop="status">
                      <el-switch
                        v-model="formdata.istotalup"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="分类" prop="status">
                      <el-switch
                        v-model="formdata.iscategory"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="隐藏" prop="status">
                      <el-switch
                        v-model="formdata.ishidden"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="查询" prop="status">
                      <el-switch
                        v-model="formdata.isquery"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="显示方式" prop="status">
                      <el-select v-model="formdata.type" placeholder="请选择" class="selInput">
                        <el-option
                          v-for="item in typeList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { API } from '@/api/basic'
import { mixin } from '@/assets/js/base.js'
import Vue from 'vue'
export default {
  name: 'dicSetFields',
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      confTableHeight: 0,
      fieldsTableData: [],
      // 表单数据
      formdata: {
        sortmode: '0'
      },
      // 控制添加和修改字段显示隐藏
      modAddField: false,
      // 控制小圆点显示隐藏
      isBadge: false,
      // 枚举列表
      enumList: [],
      // 添加修改字段弹框标题
      modAddFieldTit: '',
      // 字段设置tab绑定 默认基本
      fieldsTabName: 'basicTab',
      // 是否可以更改表名
      showTablename: true,
      // 显示方式
      typeList: [
        {
          value: '0',
          label: '默认'
        },
        {
          value: '1',
          label: '开关'
        }
      ],
      fixedList: [
        {
          value: 'right',
          label: 'right'
        },
        {
          value: 'left',
          label: 'left'
        },
        {
          value: '',
          label: '默认'
        }
      ],
      fieldsList: [],
      rules: {
        fieldname: [
          { required: true, message: '请选择字段名', trigger: 'change' }
        ]
      },
      tableSelectList: []
    }
  },
  watch: {
    ifDialog: {
      handler: function (val) {
        this.getFieldsData()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    tableSelect (val) {
      this.tableSelectList = val
    },
    closeDialog () {
      this.$emit('getButtonConfig', false)
    },
    getFieldsList (tablename) {
      API.post('sys/Table/tableGetColumenList', { tablename }).then(res => {
        !res.code ? this.fieldsList = res.data : this.$message.error(res.msg)
      })
    },
    // 获取表 字段内容
    getFieldsData () {
      let tablename = this.$store.getters.getFieTableData.v_TableName
      API.post('sys/Table/allFieldsList', { tablename }).then(res => {
        if (!res.code) {
          this.fieldsTableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    modify (row, rowIndex) {
      // 获取字段列表数据
      this.getFieldsList(row.tablename)
      this.modAddFieldTit = '修改字段'
      this.modAddField = true
      this.formdata = Object.assign({}, row)
      // 获取点击的行索引
      this.rowIndex = rowIndex
      API.post('sys/EnumParameter/enumTypeValueList').then(res => {
        this.enumList = !res.code ? res.data : []
      })
    },
    add () {
      this.formdata = {}
      this.formdata.sortmode = '0'
      this.formdata.tablename = this.$store.getters.getFieTableData.v_TableName
      this.getFieldsList(this.$store.getters.getFieTableData.v_TableName)
      this.modAddFieldTit = '添加字段'
      this.modAddField = true
    },
    del (rowObj) {
      var ids = []
      // 如果是行内删除
      if (rowObj) {
        ids.push(rowObj.rowData.id)
      } else {
        this.tableSelectList.forEach(val => {
          ids.push(val.id)
        })
      }
      if (!ids.length) {
        this.$message.warning('未选中数据')
        return
      }
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.post('sys/Table/delData/2', { ids, logParams: this.$store.state.customLog }).then(res => {
          if (!res.code) {
            this.$message.success('删除成功')
            this.getFieldsData()
            this.modAddField = false
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    closeFun (formName) {
      this.modAddField = false
      this.formdata = {}
      this.fieldsTabName = 'basicTab'
      this.$refs[formName].resetFields()
    },
    // 提交接口
    commit (rules) {
      this.$refs[rules].validate((valid) => {
        if (valid) {
          // 如果是 基本 tab
          if (this.fieldsTabName === 'basicTab' || this.fieldsTabName === 'defaultTab') {
            // 获取记录日志 需要的参数
            this.formdata.logParams = this.$store.state.customLog
            API.post('sys/Table/saveData/2', this.formdata).then(res => {
              !res.code
                ? this.$message.success(res.msg) ? this.modAddField = false : this.modAddField = true
                : this.$message.error(res.msg)
                // 用set方式把 修改数据加载到页面  添加的话重新调接口
              this.rowIndex >= 0
                ? Vue.set(this.fieldsTableData, this.rowIndex, this.formdata)
                : this.getFieldsData()
            })
          }
        } else {
          return false
        }
      })
    },
    // siwch开关
    isSwitch (fields, data) {
      let obj = {}
      obj.id = data.id
      obj.tablename = data.tablename
      obj.fieldname = data.fieldname
      obj[fields] = data[fields]
      // 获取记录日志 需要的参数
      obj.logParams = this.$store.state.customLog
      API.post('sys/Table/saveData/2', obj).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          this.getFieldsData()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 转换对应枚举
    transChange (val) {
      if (val === '1') {
        API.post('sys/EnumParameter/enumTypeValueList').then(res => {
          this.enumList = !res.code ? res.data : []
        })
      }
    },
    // 枚举下拉change
    enumChange () {},
    // 字段tabs点击
    fieldsTabClick (tab, event) {
    },
    clearError () {
      this.$refs.rules.resetFields()
    }
  },
  mounted () {
    let dialogConf = JSON.parse(this.$store.state.confsBtn.dialogset)
    let a = 0
    if (document.querySelector('.formOperateBox')) {
      a = document.querySelector('.formOperateBox').offsetHeight
    }
    let b = document.querySelector('.el-dialog__header').offsetHeight
    let c = document.querySelector('.operateBox').offsetHeight
    // 除开内容区域外的 高度
    let toolsHeight = a + b + c
    // 内容区域 盒子
    let contentHeight = document.querySelector('.fieldsTable')
    // this.confTemDia({ height: 550, width: 900, toolsHeight, contentHeight, table: '1', isFixation: '1' })
    // this.confTemDia({ width: 900, minHeight: 300, toolsHeight, contentHeight, table: '1', isFixation: '0' })
    dialogConf.table = '1'
    dialogConf.toolsHeight = toolsHeight
    dialogConf.contentHeight = contentHeight
    this.$store.commit('getOperationDialogConf', dialogConf)
    // 如果设置了默认打开
    if (dialogConf.maxSize === '1') {
      this.changeSize()
    } else {
      this.confTemDia(dialogConf)
    }
  },
  mixins: [mixin]
}
</script>
<style scoped lang='scss'>
.formatVal{
  width: 276px;
  margin-left: 8px;
}
.selInput{
  width: 142px !important;
}
.basicMsg {
  .el-form{
    height: 400px;
    padding-top: 16px;
    box-sizing: border-box;
    >div{
      width: 462px;
      margin: 0 auto;
      .el-form-item{
        padding: 0;
      }
    }
  }
  .el-form-item {
    margin: 0 !important;
    margin-bottom: 16px !important;
  }
}
.fieldCon{
 border: 4px solid #abd6ff;
}
.defaultSet{
  .el-form-item {
    margin: 0 !important;
    margin-bottom: 8px !important;
  }
  > .el-form{
    height: 400px;
    box-sizing: border-box;
    padding: 24px 16px;
  }
  .styleConf{
    position: relative;
    border: 1px solid #BFBFBF;
    padding: 16px 16px 0 0;
    box-sizing: border-box;
  }
  .setting{
    margin-top: 24px;
    @extend .styleConf
  }
  .divTitle{
    width: 55px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 16px;
    transform: translateY(-50%);
    background: white;
    line-height: 30px;
    text-align: center;
  }
}
.el-input-number{
  max-width: 80px;
  line-height: 30px;
  .el-input-number__decrease , .el-input-number__increase{
    line-height: 15px !important;
    width: 30px !important;
  }
}
.fieldsTable{
  // max-height: calc(100vh - 300px);
}
.formatBox{
  >div:first-of-type{
    margin-right: 10px;
  }
}
  @media screen and (max-height: 600px){
    .basicMsg ,.defaultSet{
      .el-form{
        padding-top: 16px;
        // height: calc(100vh - 300px);
        overflow-Y: auto;
        overflow-X: hidden;
      }
    }
  }

</style>
