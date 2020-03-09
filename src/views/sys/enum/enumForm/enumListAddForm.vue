<!-- 枚举列表基本信息 -->
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
    <el-form inline-message ref="form" :model="formdata" :rules="rules" label-width="120px">
      <div class="titleMsg">
        <i class="iconfont icon-jibenxinxi"></i>
        <span>基本信息</span>
      </div>
      <div class="conBox">
        <el-form-item v-if="isnewEnumcode" label="父枚举">
          <el-input v-model="formdata.newEnumcode" disabled />
        </el-form-item>
        <el-form-item label="枚举编码" prop="v_EnumCode">
          <el-input v-model="formdata.v_EnumCode" :disabled="isdisabled" />
        </el-form-item>
        <el-form-item label="枚举名称" prop="v_EnumName">
          <el-input v-model="formdata.v_EnumName" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="formdata.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
      <div v-if="level < 2">
        <div v-if="isset">
          <div class="titleMsg">
            <i class="iconfont icon-jibenxinxi"></i>
            <span>设置</span>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="启用" prop="i_Status">
                <el-switch
                  v-model="formdata.i_Status"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缺省" prop="i_IsDefault">
                <el-switch
                  v-model="formdata.i_IsDefault"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'enumListAddForm',
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
      isdisabled: false,
      isset: false,
      isnewEnumcode: false,
      // 表单数据
      formdata: {
        newEnumcode: '',
        // 枚举名称
        v_EnumName: '',
        // 描述
        v_Description: '',
        // 枚举分类编码
        v_EnumCode: '',
        // 枚举分类编码
        v_EnumCatCode: ''
      },
      level: 0,
      rules: {
        v_EnumName: [
          { required: true, message: '请输入枚举名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_EnumCode: [
          { required: true, message: '请输入分类编码', trigger: 'blur' },
          { min: 1, max: 30, message: '长度不可超出30个字符', trigger: 'blur' }
        ],
        v_Description: [
          {
            min: 0,
            max: 200,
            message: '长度不可超出200个字符',
            trigger: 'blur'
          }
        ]
      },
      // 小红点功能
      oldModAddData: {},
      formRed: false
    }
  },
  created () {
    this.level = this.$store.state.fieTableData.level
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'addList') {
      // 获取 当前行的数据
      this.isnewEnumcode = true
      this.formdata.newEnumcode = this.$store.state.fieRowTableData['CC_VW_enumList'].v_EnumName
      // 父ID
      this.formdata.i_ParentEnumID = this.$store.state.fieRowTableData['CC_VW_enumList'].i_EnumID
      // 父编码
      this.formdata.v_EnumCatCode = this.$store.state.fieRowTableData['CC_VW_enumList'].v_EnumCatCode
      this.oldModAddData = Object.assign({}, this.formdata)
    } else if (confsBtn.operationcode === 'modify') {
      // 获取 当前行的数据
      this.isdisabled = true
      this.isnewEnumcode = false
      this.isset = true
      let formData = this.$store.state.fieTableData
      this.formdata = {
        ...formData
      }
      this.oldModAddData = Object.assign({}, this.formdata)
    }
  },
  watch: {
    formdata: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  methods: {
    // 关闭弹框 让弹框组件销毁
    closeFun () {
      this.$emit('getButtonConfig', false)
    },
    commit () {
      this.formdata.v_EnumCatCode = this.$store.state.fieRowTableData['CC_VW_enumCategory'].v_EnumCatCode
      let params = this.formdata
      this.$refs.form.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.newAddEnumList(params).then(res => {
            if (res.code === 0) {
              this.formRed = false
              if (res.iId > 1) {
                this.formdata.i_Id = res.iId
              }
              this.$message({
                message: res.msg,
                type: 'success'
              })
              let params = this.$store.state.paginations['CC_VW_enumList']
              this.$emit('getTableData', params)
            } else {
              this.$message.error(res.msg)
            }
          })
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
</style>
