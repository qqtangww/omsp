<!-- 枚举类型基本信息 -->
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
    <el-form inline-message ref="form" :model="metaForm" :rules="rules" label-width="120px">
      <div class="titleMsg">
        <i class="iconfont icon-jibenxinxi"></i>
        <span>基本信息</span>
      </div>
      <div class="conBox">
        <el-form-item label="枚举类型编码" prop="v_EnumCode">
          <el-input v-model="metaForm.v_EnumCode" :disabled="isEnumcatcode" />
        </el-form-item>
        <el-form-item label="枚举类型名称" prop="v_EnumName">
          <el-input v-model="metaForm.v_EnumName" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="metaForm.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'enumTypeAddForm',
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
      isEnumcatcode: false,
      // 表单数据
      metaForm: {
        // 枚举名称
        v_EnumName: '',
        // 描述
        v_Description: '',
        // 枚举分类编码
        v_EnumCode: ''
      },
      rules: {
        v_EnumName: [
          { required: true, message: '请输入枚举类型名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不可超出20个字符', trigger: 'blur' }
        ],
        v_EnumCode: [
          { required: true, message: '请输入枚举类型编码', trigger: 'blur' },
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
      formRed: false,
      i_BizID: ''
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.isEnumcatcode = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.metaForm, formData)
      this.$set(this.metaForm, 'i_Id', formData.i_Id)
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', this.metaForm)
    }
    this.oldModAddData = Object.assign({}, this.metaForm)
  },
  watch: {
    metaForm: {
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
      let formData = this.$store.state.fieTreeData['CC_TR_bizcategoryEnum']
      if (!formData) {
        this.$message.warning('请先选择左侧的树节点')
        return
      }
      let params = {
        ...this.metaForm
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$set(params, 'i_BizID', formData.i_BizID)
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.newAddEnumList(params).then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.formRed = false
              if (res.iId > 1) {
                this.metaForm.i_Id = res.iId
              }
              this.$emit('getTableData', { changeSpecialNodeData: [{ i_Cid: res.i_Cid, isCurrentNode: true }] })
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
