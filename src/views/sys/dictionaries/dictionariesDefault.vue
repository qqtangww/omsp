<template>
  <!-- 数据字典 - 字段设置 - 默认配置 -->
  <div class="add-modify-form" id="deictionaries-default">
   <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData='configData'
        @sumitForm='commit'
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message label-position="right" label-width="90px" :model="formdata">
      <div class="style-config">
        <span class="div-title">
          <i class="iconfont icon-jibenxinxi"></i>
          样式
        </span>
        <el-row>
          <el-form-item label="格式化串">
            <el-row class="formatBox">
              <el-col>
                <el-select placeholder="数据类型" v-model="formdata.v_FormatString" class="sel-input">
                  <el-option label="String" value="String"></el-option>
                  <el-option label="Number" value="Number"></el-option>
                  <el-option label="Data" value="Data"></el-option>
                </el-select>
                <el-input
                  v-model="formdata.i_DataFormat"
                  :disabled="!formdata.v_FormatString"
                  class="format-value"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="固定列" prop="tabledescription">
              <el-select v-model="formdata.v_Isfixed" placeholder="请选择" class="sel-input">
                <el-option
                  v-for="item in fixedList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="列宽" prop="category" label-width="125px">
              <el-input-number v-model="formdata.i_ColWidth" controls-position="right"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="排序" prop="status">
              <el-switch
                v-model="formdata.i_IsSort"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="排序方式" prop="status" label-width="95px">
              <el-radio-group v-model="formdata.i_SortMode" :disabled="formdata.i_IsSort === '0'">
                <el-radio label="0">无</el-radio>
                <el-radio label="1">升序</el-radio>
                <el-radio label="2">降序</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="setting">
        <span class="div-title">
          <i class="iconfont icon-jibenxinxi"></i>
          设置
        </span>
        <el-row>
          <el-col :span="12">
            <el-form-item label="导出" prop="status">
              <el-switch
                v-model="formdata.i_IsExpord"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合计" prop="status">
              <el-switch
                v-model="formdata.i_IsTotalup"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="分类" prop="status">
              <el-switch
                v-model="formdata.i_IsCategory"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐藏" prop="status">
              <el-switch
                v-model="formdata.i_IsHidden"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="查询" prop="status">
              <el-switch
                v-model="formdata.i_IsQuery"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示方式" prop="status">
              <el-select v-model="formdata.v_Type" placeholder="请选择" class="sel-input">
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
  </div>
</template>

<script>
import { API } from '@/api/basic'
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapGetters, mapState } from 'vuex'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'deictionariesDefault',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [windowRed, logMixin],
  data () {
    return {
      oldModAddData: {},
      formdata: {
        v_TableName: '',
        v_FieldName: '',
        v_FormatString: '',
        i_DataFormat: '',
        v_Isfixed: '',
        i_ColWidth: '',
        i_IsSort: '',
        i_SortMode: '',
        i_IsExpord: '',
        i_IsTotalup: '',
        i_IsCategory: '',
        i_IsHidden: '',
        i_IsQuery: '',
        v_Type: '',
        i_Id: ''
      },
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
      ]
    }
  },
  created () {
    if (this.confsBtn.operationcode === 'modify') {
      this.formdata.v_TableName = this.getFieTableData.v_TableName
      this.formdata.v_FieldName = this.getFieTableData.v_FieldName
      this.formdata.v_FormatString = this.getFieTableData.v_FormatString
      this.formdata.i_DataFormat = this.getFieTableData.i_DataFormat
      this.formdata.v_Isfixed = this.getFieTableData.v_Isfixed
      this.formdata.i_ColWidth = this.getFieTableData.i_ColWidth
      this.formdata.i_IsSort = this.getFieTableData.i_IsSort
      this.formdata.i_SortMode = this.getFieTableData.i_SortMode
      this.formdata.i_IsExpord = this.getFieTableData.i_IsExpord
      this.formdata.i_IsTotalup = this.getFieTableData.i_IsTotalup
      this.formdata.i_IsCategory = this.getFieTableData.i_IsCategory
      this.formdata.i_IsHidden = this.getFieTableData.i_IsHidden
      this.formdata.i_IsQuery = this.getFieTableData.i_IsQuery
      this.formdata.v_Type = this.getFieTableData.v_Type
    }
    this.oldModAddData = Object.assign({}, this.formdata)
  },
  computed: {
    // 拿到当前行的数据
    ...mapGetters(['getFieTableData']),
    ...mapState({
      confsBtn: state => state.confsBtn
    })
  },
  methods: {
    commit () {
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        this.formdata.logParams = this.getLogParams()
      }
      API.post('sys/Table/saveData/2', this.formdata).then(res => {
        if (!res.code) {
          this.$message.success(res.msg)
          this.isReminder = true
          this.oldModAddData = Object.assign({}, this.modAddData)
          // 重新调取接口渲染数据
          let params = this.$store.state.paginations
          this.$emit('getTableData', params['CC_VW_dictionariesField'])
        } else {
          this.$message.error(res.msg)
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
#deictionaries-default{
    .el-form{
        border: none;
        height: 400px;
        box-sizing: border-box;
        padding: 24px 16px;
        .style-config, .setting{
            position: relative;
            border: 1px solid #bfbfbf;
            padding: 16px 16px 0 0;
            box-sizing: border-box;
        }
        .setting{
            margin-top: 24px;
        }
        .div-title{
            width: 55px;
            height: 30px;
            position: absolute;
            top: 0;
            left: 16px;
            transform: translateY(-50%);
            background: #fff;
            line-height: 30px;
            text-align: center;
        }
        .format-value{
            width: 276px;
            margin-left: 8px;
        }
        .sel-input{
            width: 142px!important;
        }
        .el-form-item{
            margin: 0!important;
            margin-bottom: 8px!important;
        }
    }
}
</style>
