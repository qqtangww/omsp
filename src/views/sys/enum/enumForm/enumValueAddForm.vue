<!-- 枚举值 基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        :formRed="formRed"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="formdataValList" :model="formdataValList" :rules="rules1" label-width="120px" id="form-box">
      <div class="titleMsg">
        <i class="iconfont icon-jibenxinxi"></i>
        <span>基本信息</span>
      </div>
      <div class="conBox">
        <el-form-item label="枚举名称" v-if="isadd">
          <el-select v-model="formdataValList.i_EnumID" @focus="selectParentVal" placeholder="请选择">
            <el-option
              v-for="(item,key) in fatherEnumList"
              :key="key"
              :label="item.v_EnumName"
              :value="item.i_EnumID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举名称" v-if="isaddchild">
          <el-select v-model="formdataValList.i_EnumID" @focus="selectParentVal" placeholder="请选择">
            <el-option
              v-for="(item,key) in fatherEnumList1"
              :key="key"
              :label="item.v_EnumName"
              :value="item.i_EnumID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举名称" v-if="isModify">
          <el-input v-model="formdataValList.v_EnumName" disabled />
        </el-form-item>
        <el-form-item label="父枚举值" v-if="isShow">
          <el-input v-if="isparent" v-model="formdataValList.enumparentvaluename" disabled />
          <el-select
            v-if="isModifyparent"
            v-model="formdataValList.enumparentvaluename"
            disabled
            placeholder="请选择"
          >
            <el-option
              v-for="(item,key) in fatherEnumList2"
              :key="key"
              :label="item.v_EnumValueName"
              :value="item.i_EnumValueID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="枚举值名称" prop="v_EnumValueName">
          <el-input v-model="formdataValList.v_EnumValueName" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="formdataValList.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
      <div class="titleMsg">
        <i class="iconfont icon-canshubiaoti"></i>
        <span>枚举值</span>
      </div>
      <div class="conBox content-value">
        <el-form-item label="参数值1" prop="v_EnumValue">
          <el-input v-model="formdataValList.v_EnumValue" />
        </el-form-item>
        <el-form-item label="参数值2" prop="v_EnumValue1">
          <el-input v-model="formdataValList.v_EnumValue1" />
        </el-form-item>
        <el-form-item label="参数值3" prop="v_EnumValue2">
          <el-input v-model="formdataValList.v_EnumValue2" />
        </el-form-item>
        <el-form-item label="参数值4" prop="v_EnumValue3">
          <el-input v-model="formdataValList.v_EnumValue3" />
        </el-form-item>
        <el-form-item label="参数值5" prop="v_EnumValue4">
          <el-input v-model="formdataValList.v_EnumValue4" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'enumValueAddForm',
  mixins: [logMixin],
  props: {
    shareData: {
      type: Object
    },
    configData: {
      type: Object
    },
    ifDialog: Boolean
  },
  data () {
    return {
      isadd: true,
      isparent: true,
      isModifyparent: false,
      isModify: false,
      isaddchild: false,
      isShow: false,
      // 表单数据
      formdataValList: {
        v_EnumName: '',
        enumparentvaluename: '',
        v_EnumValueName: '',
        v_Description: '',
        v_EnumValue: '',
        v_EnumValue1: '',
        v_EnumValue2: '',
        v_EnumValue3: '',
        v_EnumValue4: ''
      },
      // 父枚举值名字
      fatherEnumname: '',
      // 父枚举值
      fatherEnumList: [],
      fatherEnumList1: [],
      fatherEnumList2: [],
      // 判断是否是二级
      level: 0,
      rules1: {
        v_EnumValueName: [
          { required: true, message: '请输入枚举值名称', trigger: 'blur' },
          { min: 1, max: 200, message: '长度不可超出200个字符', trigger: 'blur' }
        ],
        v_Description: [
          {
            min: 0,
            max: 200,
            message: '长度不可超出200个字符',
            trigger: 'blur'
          }
        ],
        v_EnumValue: [
          { required: true, message: '至少填写一个枚举值', trigger: 'blur' }
        ]
      },
      // 小红点功能
      oldModAddData: {},
      formRed: false
    }
  },
  created () {
    this.level = this.$store.state.fieTableData.level
    this.getFatherEnumList()
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'addList') {
      // 获取 当前行的数据
      let params = {
        i_EnumID: this.$store.state.fieTableData.i_EnumID
      }
      cgiService.getSonEnum(params).then(res => {
        if (res.code === 0) {
          this.fatherEnumList1 = res.data
        }
      })
      this.isadd = false
      this.isModify = false
      this.isparent = true
      this.isModifyparent = false
      this.isShow = true
      this.isaddchild = true
      this.formdataValList.enumparentvaluename = this.$store.state.fieTableData.v_EnumValueName
      this.formdataValList.isAddSon = 1
      this.formdataValList.v_EnumCatCode = this.$store.state.fieRowTableData['CC_VW_enumValue'].v_EnumCatCode
      this.formdataValList.i_ParentEnumValueID = this.$store.state.fieRowTableData['CC_VW_enumValue'].i_EnumValueID
      this.oldModAddData = Object.assign({}, this.formdataValList)
    } else if (confsBtn.operationcode === 'modify') {
      // 获取 当前行的数据
      this.level = this.$store.state.fieTableData.level
      if (this.level !== 1) {
        this.isShow = true
      } else {
        this.isShow = false
      }
      this.isadd = false
      this.isparent = false
      this.isModifyparent = true
      this.isaddchild = false
      this.isModify = true
      let params = {
        i_EnumID: this.$store.state.fieTableData.i_EnumID
      }
      cgiService.getParentEnumList(params).then(res => {
        this.fatherEnumList2 = res.data
      })
      let formData = this.$store.state.fieTableData
      this.formdataValList = {
        ...formData
      }
      this.formdataValList.enumparentvaluename = this.$store.state.fieTableData.i_ParentEnumValueID
      this.formdataValList.i_Id = this.$store.state.fieRowTableData['CC_VW_enumValue'].i_Id
      this.formdataValList.level = this.$store.state.fieRowTableData['CC_VW_enumValue'].level
      // this.formdataValList.enumparentvaluename = this.$store.state.fieRowTableData['CC_VW_enumValue'].enumparentvaluename
      this.formdataValList.i_EnumID = this.$store.state.fieRowTableData['CC_VW_enumValue'].i_EnumID
      this.formdataValList.i_SortNO = this.$store.state.fieRowTableData['CC_VW_enumValue'].i_SortNO
      this.formdataValList.isAddSon = 1
      this.formdataValList.i_EnumValueID = this.$store.state.fieRowTableData['CC_VW_enumValue'].i_EnumValueID
      this.formdataValList.i_ParentEnumValueID = this.$store.state.fieRowTableData['CC_VW_enumValue'].i_ParentEnumValueID
      this.oldModAddData = Object.assign({}, this.formdataValList)
    }
  },
  watch: {
    formdataValList: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  methods: {
    // 选择父枚举值Change事件
    selectParentVal () {},
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
    },
    commit () {
      this.formdataValList.i_EnumID = this.$store.state.fieTableData.i_EnumID
      this.formdataValList.v_EnumCatCode = this.$store.state.fieRowTableData['CC_VW_enumCategory'].v_EnumCatCode
      let params = this.formdataValList
      this.$refs.formdataValList.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.newAddEnumValue(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.formdataValList.i_Id = res.iId
              }
              this.$message.success(res.msg)
              let params = this.$store.state.paginations['CC_VW_enumCategory']
              this.$set(params, 'v_EnumCatCode', this.$store.state.fieRowTableData['CC_VW_enumCategory'].v_EnumCatCode)
              this.$emit('getTableData', params)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    getFatherEnumList () {
      let params = {
        v_EnumCatCode: this.$store.state.fieRowTableData['CC_VW_enumCategory']
          .v_EnumCatCode
      }
      cgiService.getSelectEnumList(params).then(res => {
        if (res.code === 0) {
          this.fatherEnumList = res.data
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
.content-value{
  margin-bottom: 12px;
}
#form-box{
  padding-bottom: 0px;
}
</style>
