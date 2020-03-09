<!-- 角色管理-基本信息 -->
<template>
  <div class="mod-add-roleControl">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :rules="rules" :model="modeAddData" label-width="128px">
      <div class="title-border">
        <!-- <span class="title-style"><i class="iconfont icon-jibenxinxi"></i>基本信息</span> -->
      <div class="conBox">
        <el-form-item label="角色名称" prop="v_RoleName">
          <el-input v-model="modeAddData.v_RoleName" />
        </el-form-item>
        <el-form-item label="描述" prop="v_Description" class='description-label'>
          <el-input
            v-model="modeAddData.v_Description"
            placeholder="描述此角色权限相关的介绍"
            type="textarea"
            :autosize="{ minRows: 20}"
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
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'modAddRoleControl',
  props: {
    configData: Object,
    shareData: Object,
    ifDialog: Boolean
  },
  mixins: [windowRed, logMixin, mixin],
  data () {
    return {
      // 表单绑定数据
      modeAddData: {
        i_Id: '',
        v_RoleName: '',
        v_Description: ''
      },
      // 添加角色效验规则
      rules: {
        v_RoleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度不可超出25个字符', trigger: 'blur' }
        ],
        v_Description: [
          { required: false, message: '请输入描述信息', trigger: 'blur' },
          {
            min: 1,
            max: 200,
            message: '长度不可超出200个字符',
            trigger: 'blur'
          }
        ]
      },
      // 小红点功能
      oldModAddData: {
        i_Id: '',
        v_RoleName: '',
        v_Description: ''
      }
    }
  },
  watch: {
    modeAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.isDisabled = false
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.formId = formData.v_FormCode
      util.initFormData(this.modeAddData, formData)
      this.$set(this.modeAddData, 'i_RoleID', formData.i_RoleID)
    }
    this.oldModAddData = Object.assign({}, this.modeAddData)
  },
  methods: {
    // 添加角色
    commit (fucName) {
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          let params = {}
          params.v_RoleName = this.modeAddData.v_RoleName
          // params.v_RoleName = this.modeAddData.v_RoleName
          params.v_Description = this.modeAddData.v_Description
          params.i_RoleID = this.$store.state.fieTableData.i_RoleID
          if (this.modeAddData.i_Id > 0) {
            params.i_Id = this.modeAddData.i_Id
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.temRoleControlSaveData2(params).then(res => {
            if (!res.code) {
              this.isReminder = true
              // 2020/1/21 判断保存的code 是否是 保存并关闭
              if (fucName === 'saveAndClose') {
                setTimeout(() => {
                  let params = {
                    code: this.configData.v_RegionCode,
                    flag: false
                  }
                  this.$emit('close', params)
                }, 800)
              }
              this.$message.success(res.msg)
              // 取消tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              // 重新刷新视图数据
              this.$emit('getTableData')
              // 把提交的数据保存到vuex，用于权限tab
              this.$store.commit('rowData', { i_RoleID: res.roleId })
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
                this.$emit('title', '修改角色')
              }
              this.oldModAddData = Object.assign({}, this.modeAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
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
.mod-add-roleControl {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .el-form {
    padding: 16px 14px;
    box-sizing: border-box;
    flex: 1;
    .title-border {
        width: 100%;
        padding: 20px 0 40px 0;
        box-sizing: border-box;
      .conBox {
        margin: 0;
        /deep/ .el-form-item__content {
          width: 75%;
        }
      }
    }
  }
}
</style>
