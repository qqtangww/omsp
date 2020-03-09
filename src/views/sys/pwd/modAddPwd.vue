<template>
  <div class="mod-add-pwd">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" :formRed="formRed" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="form" :model="modeAddData" :rules="rules" label-width="120px">
      <div class="titleMsg">
        <i class="iconfont icon-jibenxinxi"></i>
        <span>基本信息</span>
      </div>
      <div class="conBox">
        <el-form-item label="策略名称" prop="v_PPname">
          <el-input v-model="modeAddData.v_PPname" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class="description description-label">
          <el-input
            v-model="modeAddData.v_Description"
            placeholder="可填写相关描述，帮助用户记忆和了解"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item label="密码规则" prop="v_PwdRegex">
          <el-input v-model="modeAddData.v_PwdRegex" />
        </el-form-item>
      </div>
      <div class="formLineBox"></div>
      <div class="titleMsg">
        <i class="iconfont icon-shezhi"></i>
        <span>设置</span>
      </div>
      <div class="conBox formPwdSet">
        <el-row class="conBoxFirstRow">
          <el-col :span="10">
            <el-form-item label="密码最小长度" prop="i_MinLength">
              <el-input-number
                controls-position="right"
                v-model="modeAddData.i_MinLength"
                :min="1"
                @change="changePwd"
                label
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :push='1'>
            <el-form-item label="密码最大长度" prop="i_MaxLength" label-width="155px">
              <el-input-number
                controls-position="right"
                v-model="modeAddData.i_MaxLength"
                :min="Number(modeAddData.i_MinLength)"
                label
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="conBoxFirstRow">
          <el-col :span="10">
            <el-form-item label="密码有效天数" prop="i_EffectiveDays">
              <el-input-number
                controls-position="right"
                v-model="modeAddData.i_EffectiveDays"
                :min="0"
                label
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :push='1'>
            <el-form-item label="密码过期提前提醒天数" prop="i_PWDexpireAlert" label-width="155px">
              <el-input-number
                controls-position="right"
                v-model="modeAddData.i_PWDexpireAlert"
                :min="1"
                label
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="conBoxFirstRow">
          <el-col :span="10">
            <el-form-item label="可输错最大次数" prop="i_LockMaxNumber">
              <el-input-number
                controls-position="right"
                v-model="modeAddData.i_LockMaxNumber"
                :min="0"
                label
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :push='1'>
            <el-form-item label="账号过期提前提醒天数" prop="i_ACTexpireAlert" label-width="155px">
              <el-input-number
                controls-position="right"
                v-model="modeAddData.i_ACTexpireAlert"
                :min="1"
                label
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="switchBox">
          <el-form-item label="密码修改" prop="i_CanModified">
            <el-switch
              v-model="modeAddData.i_CanModified"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
            />
            <div class="reminder-info"><i>开启后将允许用户自助修改密码</i></div>
          </el-form-item>
          <el-form-item label="缺省策略" prop="i_IsDefault">
            <el-switch
              v-model="modeAddData.i_IsDefault"
              active-color="#32c5d2"
              inactive-color="#e6e7e8"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'modAddPwd',
  props: {
    configData: Object
  },
  mixins: [mixin, logMixin],
  data () {
    return {
      dialogTitle: '',
      rules: {
        v_PPname: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_Description: [
          { required: true, message: '请输入描述', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度不可超出200个字符',
            trigger: 'blur'
          }
        ],
        i_LockMaxNumber: [
          { required: true, message: '请输入输错最大次数', trigger: 'blur' }
        ],
        i_ACTexpireAlert: [
          { required: true, message: '请输入账号过期提前提醒天数', trigger: 'blur' }
        ],
        i_PWDexpireAlert: [
          { required: true, message: '请输入密码过期提前提醒天数', trigger: 'blur' }
        ],
        i_EffectiveDays: [
          { required: true, message: '请输入有效天数', trigger: 'blur' }
        ],
        v_PwdRegex: [
          { required: true, message: '请输入密码规则', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度不可超出200个字符',
            trigger: 'blur'
          }
        ]
      },
      modeAddData: {
        i_ACTexpireAlert: 1,
        i_EffectiveDays: 1,
        i_LockMaxNumber: 1,
        i_MaxLength: 1,
        i_MinLength: 1,
        i_PWDexpireAlert: 1,
        i_CanModified: '0',
        i_IsDefault: '0'
      },
      formRed: false,
      // 小红点功能
      oldModAddData: {
        i_ACTexpireAlert: 1,
        i_EffectiveDays: 1,
        i_LockMaxNumber: 1,
        i_MaxLength: 1,
        i_MinLength: 1,
        i_PWDexpireAlert: 1,
        i_CanModified: '0',
        i_IsDefault: '0'
      }
    }
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        this.$set(
          this.oldModAddData,
          'i_EffectiveDays',
          Number(this.oldModAddData.i_EffectiveDays)
        )
        this.$set(
          this.oldModAddData,
          'i_ACTexpireAlert',
          Number(this.oldModAddData.i_ACTexpireAlert)
        )
        this.$set(
          this.oldModAddData,
          'i_LockMaxNumber',
          Number(this.oldModAddData.i_LockMaxNumber)
        )
        this.$set(
          this.oldModAddData,
          'i_MaxLength',
          Number(this.oldModAddData.i_MaxLength)
        )
        this.$set(
          this.oldModAddData,
          'i_MinLength',
          Number(this.oldModAddData.i_MinLength)
        )
        this.$set(
          this.oldModAddData,
          'i_PWDexpireAlert',
          Number(this.oldModAddData.i_PWDexpireAlert)
        )
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.modeAddData = {
        ...formData
      }
      if (Number(this.modeAddData.i_MaxLength) < Number(this.modeAddData.i_MinLength)) {
        this.modeAddData.i_MaxLength = Number(this.modeAddData.i_MinLength)
      }
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    // 提交表单信息
    commit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = this.modeAddData
          // 判断当前是添加还是修改  如果是修改要传i_Id
          if (this.modifyPwd) {
            delete params.i_Id
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.temAccessPwdSaveData2(params).then(res => {
            // 如果数据提交成功
            if (!res.code) {
              if (res.iId > 1) {
                this.stdFormData = Object.assign({}, this.modeAddData)
                this.modeAddData.i_Id = res.iId
                this.$emit('title', '修改密码策略')
              }
              this.formRed = false
              this.$message.success(res.msg)
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_pwd'])
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    clearError () {
      this.$emit('getButtonConfig', false)
      this.modeAddData = {}
      this.isDisable = false
      this.$refs.form.resetFields()
    },
    // 改变密码
    changePwd (num) {
      this.modeAddData.i_MaxLength = num
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.mod-add-pwd {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.conBoxFirstRow {
  height: 50px;
  line-height: 50px;
  /deep/ .el-form-item__content {
  width: auto;
}
}
.switchBox /deep/ .el-switch  {
  width: 30px !important;

}
.switchBox /deep/ .el-form-item__content {
  height: 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
    >.reminder-info {
        height: 100%;
        line-height: 30px;
        margin-left: 10px;
        > i {
          font-style: normal;
        }
    }
}
</style>
