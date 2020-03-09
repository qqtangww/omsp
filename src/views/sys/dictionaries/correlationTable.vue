<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-27 11:48:11
 * @LastEditTime: 2019-09-04 16:03:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="correlationTable bodyBorderBox">
    <div class="formOperateBox">
      <el-button type="text" @click="closeDialog">
        <i class="iconfont icon-tuichu"></i> 关 闭
      </el-button>
    </div>
    <el-form
      :rules="rules"
      :model="formdata"
      ref="rules">
      <div class="relevance-box">
        <el-row class="impFormItem">
          <div class="formItemTit">主表：</div>
          <el-input v-model="tablename" disabled></el-input>
          <div class="formItemBtn">
            <el-button type="text" @click="isShowAddTab('0','rules')" class="specialBtn">
              <i class="iconfont icon-tianjia"></i>添加关联表
            </el-button>
          </div>
        </el-row>
        <div class="add-relevance-tab-Box">
          <div class="relevance-top" v-show="isShowTab === '0'">
            <div class="relevance-head">
              <span>
                <i class="iconfont icon-jibenxinxi"></i>{{addModTit}}
              </span>
              <div>
                <span>
                  <el-button type="text" @click="isShowAddTab('1','rules')">取 消</el-button>
                </span>
                <span>
                  <el-button type="text" @click="submit('rules')">保 存</el-button>
                </span>
              </div>
            </div>
            <div class="relevance-centre" v-if="isShowTab === '0'">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="关联表" label-width="80px" prop='subtablename' class="formItemDiv">
                    <el-select
                      placeholder="请选择"
                      class="minInput"
                      v-model="formdata.subtablename"
                      :disabled="showSubtablename"
                      @focus="getRelevanceDatabase">
                      <el-option
                        v-for="item in relevanceDatabaseList"
                        :key="item.id"
                        :label="item.tablename"
                        :value="item.tablename"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="描述" label-width="80px" class="formItemDiv">
                    <el-input
                      v-model="formdata.relationdescription"
                      placeholder="请输入表关系描述"
                      type="textarea"
                      class="minInput"
                      :autosize="{ minRows: 2, maxRows: 4}"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-row>
                    <div v-for=" (item, index) in  formdata.fieldArray" :key="index" class="relevance-cen">
                      <el-col :span="12">
                          <!-- :prop="'fieldArray.' + index + '.keyfield'" -->
                          <!-- :rules="rules.keyfield" -->
                        <el-form-item
                          :label="'关键词段' + `${index + 1}`"
                          label-width="120px">
                          <el-select
                            placeholder="选择主表词段"
                            v-model="item.v_KeyField"
                            @focus="getMasterTabelField"
                            class="minSel">
                            <el-option
                              v-for="item in masterTabelField"
                              :key="item.id"
                              :value="item.fieldname"
                              :label="item.fieldname"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item>
                          <!-- :prop="'fieldArray.' + index + '.subkeyfield'" -->
                          <el-select
                            placeholder="选择关联表词段"
                            v-model="item.v_SubKeyField"
                            @focus="getRelevanceTableField"
                            class="minSel">
                            <el-option
                              v-for="item in relevanceTableField"
                              :key="item.id"
                              :value="item.fieldname"
                              :label="item.fieldname"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2">
                        <el-form-item>
                          <el-button type="text" @click="addFieldArr" v-if="index === 0" class="specialBtn">
                            <i class="iconfont icon-tianjia"></i> 添 加
                          </el-button>
                          <el-button type="text" @click="delField(item,index)" v-if="index >=1" class="specialBtn">
                            <i class="iconfont icon-shanchu-lajitong"></i> 删 除
                          </el-button>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="relevance-footer">
            <span>
              <i class="iconfont icon-jibenxinxi"></i> 已添加关联表
            </span>
            <el-table
              ref="multipleTable"
              :data="haveRelevanceTable"
              tooltip-effect="dark"
              class="contentTable dicTable"
              :header-cell-style="{background:'rgba(230,230,230,.5)', color:'#333333' }"
              :height="confTableHeight"
              style="width: 100%">
              <el-table-column type="selection" width="30"/>
              <el-table-column label="关联表名" fixed width="130">
                <template slot-scope="scope">
                  <span>{{ scope.row.subtablename }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="主表关键词段" width="150">
                <template slot-scope="scope">{{ scope.row.keyfield}}</template>
              </el-table-column>
              <el-table-column prop="name" label="子表关键词段" width="150">
                <template slot-scope="scope">{{ scope.row.subkeyfield}}</template>
              </el-table-column>
              <el-table-column prop="name" label="描述" width="auto">
                <template slot-scope="scope">{{ scope.row.relationdescription}}</template>
              </el-table-column>
              <el-table-column prop="name" label="操作" width="110">
                <template slot-scope="scope">
                  <el-button type="text" @click="editHaveField(scope.row)">修 改</el-button>
                  <el-button type="text" @click="delHaveField(scope.row.id,'rules')">删 除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import mixins from '@/assets/js/mixin'
export default {
  props: {
    configData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      confTableHeight: 0,
      // 控制关联表显示隐藏
      showSubtablename: false,
      addModTit: '',
      tablename: '',
      formdata: {
        // tablename: 't_sys_tables',
        keyfield: '',
        subkeyfield: '',
        subtablename: '',
        relationdescription: '',
        fieldArray: [{ v_KeyField: '', v_SubKeyField: '', v_DataTypey: '' }]
      },
      metaForm: {
        id: '0',
        // orgcode: '',
        orgfullnam: ''
      },
      // 效验规则
      rules: {
        subtablename: [
          { required: true, message: '请选择关联表', trigger: 'change' }
        ]
        // keyfield: [
        //   { required: true, message: '请拉取主表词段', trigger: 'blur' }
        // ],
        // subkeyfield: [
        //   { required: true, message: '请输入关联表词段', trigger: 'blur' }
        // ]
      },
      isShowTab: '1',
      relevanceDatabaseList: [],
      relevancetable: '',
      haveRelevanceTable: [],
      masterTabelField: [],
      relevanceTableField: [],
      haverelevanceArray: []

    }
  },
  watch: {
    ifDialog: {
      handler: function (val) {
        // 获取 当前行的数据
        let formData = this.$store.state.fieTableData
        this.tablename = formData.v_TableName
        // this.modeAddData = {
        //   ...formData
        // }
        this.queryHaveRelevanceDatabase()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDialog () {
      this.$emit('getButtonConfig', false)
    },
    // 控制 添加关联表 显示隐藏
    isShowAddTab (val, rules) {
      // val: 0打开 1关闭
      this.isShowTab = val
      if (val === '0') {
        this.addModTit = '添加关联表'
        this.formdata.subtablename = ''
        this.formdata.relationdescription = ''
        this.formdata.fieldArray = [{ v_KeyField: '', v_SubKeyField: '', v_DataTypey: '' }]
        this.showSubtablename = false

        let a = document.querySelector('.confDialog .formOperateBox').offsetHeight
        let b = document.querySelector('.confDialog .el-dialog__header').offsetHeight
        let c = document.querySelector('.confDialog .impFormItem').offsetHeight
        let d = 0
        setTimeout(() => {
          d = document.querySelector('.confDialog .relevance-top').offsetHeight
          // 除开内容区域外的 高度
          let boxHeight = a + b + c + 70 + d
          this.setDialogHeight(boxHeight)
        })
      } else if (val === '1') {
        this.$refs[rules].resetFields()

        let a = document.querySelector('.confDialog .formOperateBox').offsetHeight
        let b = document.querySelector('.confDialog .el-dialog__header').offsetHeight
        let c = document.querySelector('.confDialog .impFormItem').offsetHeight
        let boxHeight = a + b + c + 70
        this.setDialogHeight(boxHeight)
      }
      this.formdata.fieldArray = [{ v_KeyField: '', v_SubKeyField: '', v_DataTypey: '' }]
    },
    // 保存添加关联表
    submit (rules) {
      let params = {
        v_SubTableName: this.formdata.subtablename,
        v_RelationDescription: this.formdata.relationdescription,
        v_TableName: this.tablename,
        data: JSON.stringify(this.formdata.fieldArray)
      }
      cgiService.addOrEditDatabase(params).then(res => {
        if (!res.code) {
          this.isShowTab = false
          this.$message.success(res.msg)
          this.queryHaveRelevanceDatabase()
          this.formdata.fieldArray = [{ v_KeyField: '', v_SubKeyField: '', v_DataTypey: '' }]
          let a = document.querySelector('.confDialog .formOperateBox').offsetHeight
          let b = document.querySelector('.confDialog .el-dialog__header').offsetHeight
          let c = document.querySelector('.confDialog .impFormItem').offsetHeightlet
          let boxHeight = a + b + c + 70
          this.setDialogHeight(boxHeight)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 添加关键词段
    addFieldArr () {
      this.formdata.fieldArray.push({ v_KeyField: '', v_SubKeyField: '', v_DataTypey: '' })
    },
    // 修改关联表
    editHaveField (row) {
      this.showSubtablename = true
      this.addModTit = '修改关联表'
      this.isShowTab = '0'
      // this.formdata = Object.assign({}, row)
      this.formdata.subtablename = row.subtablename
      let strKeyfield = row.keyfield
      let strSubkeyfield = row.subkeyfield
      let strid = row.id
      // 切割后台返回的字符串
      let newStrKeyfield = strKeyfield.split(',')
      let newStrSubkeyfield = strSubkeyfield.split(',')
      let newStrId = strid.split(',')
      let newArray = []
      let params = {}
      let flag = false
      // 遍历切割好的字符串
      for (let i = 0; i < newStrKeyfield.length; i++) {
        for (let j = 0; j < newStrSubkeyfield.length; j++) {
          for (let k = 0; k < newStrId.length; k++) {
            // 判断三个的索引是否相等  相等就把值赋值给 params这对象
            if (i === j && i === k) {
              params.v_KeyField = newStrKeyfield[i]
              params.v_SubKeyField = newStrSubkeyfield[j]
              params.i_Id = newStrId[j]
              flag = true
            }
          }
        }
        // flag 为true 是 push进数组里面
        if (flag) {
          newArray.push(params)
          // push完成后清空对象
          params = {}
        }
      }
      this.formdata.fieldArray = newArray
      let a = document.querySelector('.confDialog .formOperateBox').offsetHeight
      let b = document.querySelector('.confDialog .el-dialog__header').offsetHeight
      let c = document.querySelector('.confDialog .impFormItem').offsetHeight
      let d = 0
      setTimeout(() => {
        d = document.querySelector('.confDialog .relevance-top').offsetHeight
        // 除开内容区域外的 高度
        let boxHeight = a + b + c + 70 + d
        this.setDialogHeight(boxHeight)
      })
    },
    // 删除关键词段
    delField (row, index) {
      this.formdata.fieldArray.splice(index, 1)
    },
    // 删除关联表
    delHaveField (row, rules) {
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'error'
      }).then(() => {
        let params = {
          ids: row.split(','),
          status: '9'
        }
        // 获取记录日志 需要的参数
        params.logParams = this.$store.state.customLog
        cgiService.delHaveRelevanceDatabase(params).then(res => {
          if (!res.code) {
            this.$message.success(res.msg)
            this.$refs[rules].resetFields()
            // val: 0打开 1关闭
            this.isShowTab = false
            this.queryHaveRelevanceDatabase()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 获取关联表数据
    getRelevanceDatabase () {
      this.queryRelevanceDatabase()
    },
    // 获取主表词段
    getMasterTabelField () {
      this.queryMasterTabelField(this.tablename)
    },
    // 获取关联表字段
    getRelevanceTableField () {
      this.queryMasterTabelField(this.formdata.subtablename)
    },
    // 获取关联表
    queryRelevanceDatabase () {
      cgiService.getRelevanceDatabase().then(res => {
        this.relevanceDatabaseList = res.data
      })
    },
    // 获取关联表字段
    queryMasterTabelField (data) {
      let params = {
        tablename: data
      }
      cgiService.getMasterTabelField(params).then(res => {
        // 判断是获取的是主表字段  还是关联表的字段
        if (params.tablename === this.tablename) {
          this.masterTabelField = res.data
        } else {
          this.relevanceTableField = res.data
        }
      })
    },
    // 获取已添加关联表的数据
    queryHaveRelevanceDatabase () {
      let params = {
        tablename: this.tablename
      }
      cgiService.getHaveRelevanceDatabase(params).then(res => {
        this.haveRelevanceTable = res.data
      })
    },
    clearError () {
      this.$refs.rules.resetFields()
      this.isShowTab = false
      let a = document.querySelector('.confDialog .formOperateBox').offsetHeight
      let b = document.querySelector('.confDialog .el-dialog__header').offsetHeight
      let c = document.querySelector('.confDialog .impFormItem').offsetHeight
      let boxHeight = a + b + c + 70
      this.setDialogHeight(boxHeight)
    },
    setDialogHeight (boxHeight) {
      let dialogConf = JSON.parse(this.$store.state.confsBtn.dialogset)
      let toolsHeight = 0
      if (boxHeight) {
        toolsHeight = boxHeight
      } else {
        let a = document.querySelector('.confDialog .formOperateBox').offsetHeight
        let b = document.querySelector('.confDialog .el-dialog__header').offsetHeight
        let c = document.querySelector('.confDialog .impFormItem').offsetHeight
        // 除开内容区域外的 高度
        toolsHeight = a + b + c + 70
      }
      // 内容区域 盒子
      let contentHeight = document.querySelector('.dicTable')
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
    }
  },
  mounted () {
    // this.setDialogHeight()
  },
  mixins: [mixin, mixins]
}
</script>
<style lang="scss" scoped>
.correlationTable {
  .dicTable{
    border: 1px solid rgba(230,230,230,1) !important;
  }
  .minInput{
    width: 270px !important;
  }
  .minSel{
    width: 172px !important;
  }
  .formItemDiv{
    padding: 0 !important;
  }
  .specialBtn{
    color: #333333;
    i{
      vertical-align: text-bottom;
      &.icon-tianjia{
        color: #5892f6;
      }
      &.icon-shanchu-lajitong{
        color: #f55e5e;
      }
    }
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .add-relevance-tab-Box {
    .relevance-top {
      border: 1px solid rgba(230,230,230,1);
      .relevance-centre {
        padding: 10px 0;
        border-top: 1px solid rgba(230, 230, 230, 1);
      }
      .relevance-head {
        height: 30px;
        padding: 6px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        > div {
          button {
            color: #32c5d2;
          }
        }
      }
      .relevance-cen {
        > div {
          &:first-of-type {
            margin-left: 30px;
          }
        }
      }
    }
    .relevance-footer{
      >span{
        margin: 6px 0;
        display: inline-block;
      }
    }
  }
  >.el-form{
    padding: 0 !important;
    >div{
      padding: 16px 0 24px;
      max-width: 930px;
      margin: 0 auto;
    }
  }
  .impFormItem{
    >div{
      line-height: 30px;
      float: left;
      margin-bottom: 16px;
      &.el-input{
        width: 276px;
      }
      &.formItemTit{
        margin-right: 24px;
      }
      &.formItemBtn{
        margin-right: 8px;
      }
    }
  }
}
// 自适应
.relevance-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .add-relevance-tab-Box {
    height: 0;
    flex: 1;
    .relevance-footer{
      height: 100%;
      display: flex;
      flex-direction: column;
      .contentTable {
        flex: 1;
      }
    }
  }
}
</style>
