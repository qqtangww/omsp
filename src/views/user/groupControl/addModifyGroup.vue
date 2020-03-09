<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :formRed="formRed"
        @sumitForm="commit"
        v-on="$listeners">
      </action-bar>
    </div>
    <el-form inline-message ref="formdata" :model="formdata" :rules="rules" label-width="128px">
      <div class="conBox">
        <el-form-item label="分组名称" prop="v_GrpName">
          <el-input v-model="formdata.v_GrpName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="v_GrpAlias">
          <el-input v-model="formdata.v_GrpAlias" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="共享分组">
          <el-switch
            v-model="formdata.i_IsPublic"
            active-color="#32c5d2"
            inactive-color="#e6e7e8"
            active-value="1"
            inactive-value="0"
          ></el-switch>
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
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'addModifyGroup',
  mixins: [logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formdata: {
        i_IsPublic: '0'
      },
      rules: {
        v_GrpName: [
          { required: true, message: '请输入分组名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ]
      },
      // 小红点功能
      oldModAddData: { i_IsPublic: '0' },
      formRed: false
    }
  },
  created () {
    let configBtn = this.$store.state.confsBtn
    if (configBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      this.$set(this.formdata, 'v_GrpName', formData.v_GrpName)
      this.$set(this.formdata, 'v_GrpAlias', formData.v_GrpAlias)
      this.$set(this.formdata, 'v_Description', formData.v_Description)
      this.$set(this.formdata, 'i_IsPublic', formData.i_IsPublic)
      this.$set(this.formdata, 'i_Id', formData.i_Id)
    }
    this.oldModAddData = Object.assign({}, this.formdata)
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
    // 保存数据
    commit () {
      let params = {
        ...this.formdata
      }
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        params.logParams = this.getLogParams()
      }
      this.$refs.formdata.validate(valid => {
        if (valid) {
          cgiService.saveTemgroupList(params).then(res => {
            if (!res.code) {
              this.$message.success(res.msg)
              this.formRed = false
              this.$emit('getTableData')
              Object.assign(this.oldModAddData, params)
              if (res.iId > 1) {
                this.$set(this.formdata, 'i_Id', res.iId)
                this.$set(this.oldModAddData, 'i_Id', res.iId)
              }
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
<style lang="scss" scoped>
.add-modify-form {
  .el-form {
    padding: 0 !important;
    .conBox {
      height: 100%;
      padding-top: 15px;
      box-sizing: border-box;
    }
  }
}
</style>
