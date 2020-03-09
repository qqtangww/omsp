<template>
  <!-- 数据字典 - 字段设置 - 基本信息 -->
  <div id="dictionaries-form" class="add-modify-form">
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
      ref="rules"
      :model="formdata"
      :rules="rules">
      <div>
        <el-form-item label="所属表">
          <el-input v-model="formdata.v_TableName" disabled></el-input>
        </el-form-item>
        <el-form-item label="字段名" prop="v_FieldName">
          <el-select v-model="formdata.v_FieldName" placeholder="请选择">
            <el-option
              v-for="item in fieldsList"
              :key="item.fieldname"
              :label="item.fieldname"
              :value="item.fieldname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字段中文名">
          <el-input v-model="formdata.v_FieldTitle"></el-input>
        </el-form-item>
        <el-form-item label="字段描述" class='description-label'>
          <el-input
            v-model="formdata.v_FieldDescription"
            placeholder="请输入表关系描述"
            type="textarea"
            class="minInput"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="数据类型">
          <el-input v-model="formdata.v_DataTypey"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="主键">
              <el-switch
                v-model="formdata.i_IsPrimary"
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
                v-model="formdata.i_IsIndex"
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
                v-model="formdata.i_Transcode"
                active-color="#32c5d2"
                inactive-color="#e6e7e8"
                active-value="1"
                inactive-value="0"
                @change="transChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="转换对应枚举">
              <el-cascader
                class="selInput"
                popper-class="filtrate"
                :disabled="formdata.i_Transcode === '0' "
                :options="enumList"
                v-model="formdata.selectedOptions"
              ></el-cascader>
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
import { mapGetters, mapState } from 'vuex'
import logMixin from '@/common/js/mixins/getLogParams'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'dictionariesForm',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [windowRed, logMixin],
  data () {
    return {
      oldModAddData: {
        v_TableName: '',
        v_FieldName: '',
        v_FieldTitle: '',
        v_FieldDescription: '',
        v_DataTypey: '',
        i_IsPrimary: '0',
        i_IsIndex: '0',
        i_Transcode: '0',
        i_Id: ''
      },
      formdata: {
        v_TableName: '',
        v_FieldName: '',
        v_FieldTitle: '',
        v_FieldDescription: '',
        v_DataTypey: '',
        i_IsPrimary: '0',
        i_IsIndex: '0',
        i_Transcode: '0',
        i_Id: ''
      },
      rules: {
        v_FieldName: [
          { required: true, message: '请选择字段名', trigger: 'change' }
        ]
      },
      // 枚举列表
      enumList: [],
      fieldsList: []
    }
  },
  created () {
    this.getFieldsList(this.getFieTableData.v_TableName)
    this.formdata.v_TableName = this.getFieTableData.v_TableName
    if (this.confsBtn.operationcode === 'modify') {
      this.formdata.v_FieldName = this.getFieTableData.v_FieldName
      this.formdata.v_FieldTitle = this.getFieTableData.v_FieldTitle
      this.formdata.v_FieldDescription = this.getFieTableData.v_FieldDescription
      this.formdata.v_DataTypey = this.getFieTableData.v_DataTypey
      this.formdata.i_IsPrimary = this.getFieTableData.i_IsPrimary
      this.formdata.i_IsIndex = this.getFieTableData.i_IsIndex
      this.formdata.i_Transcode = this.getFieTableData.i_Transcode
      this.formdata.i_Id = this.getFieTableData.i_Id
    }
    this.oldModAddData = Object.assign({}, this.formdata)
  },
  watch: {
    formdata: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  computed: {
    // 拿到当前行的数据
    ...mapGetters(['getFieTableData']),
    ...mapState({
      confsBtn: state => state.confsBtn
    })
  },
  methods: {
    // 转换对应枚举
    transChange (val) {
      if (val === '1') {
        API.post('sys/EnumParameter/enumTypeValueList').then(res => {
          this.enumList = !res.code ? res.data : []
        })
      }
    },
    getFieldsList (tablename) {
      API.post('sys/Table/tableGetColumenList', { tablename }).then(res => {
        !res.code ? this.fieldsList = res.data : this.$message.error(res.msg)
      })
    },
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
          let params = this.$store.state.paginations['CC_VW_dictionariesField']
          this.$set(params, 'viewid', this.$store.state.fieRowTableData['CC_VW_dictionariesField'].viewid)
          this.$emit('getTableData', params)
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
#dictionaries-form{
    .el-form{
        border: none;
        >div{
            width: 462px;
            margin: 0 auto;
        }
    }
}
</style>
