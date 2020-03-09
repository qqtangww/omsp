<template>
  <div class="modify-user-info">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="formData"
        :formRed="formRed"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form inline-message ref="userData" :rules="rules" :model="userData" label-width="128px">
      <div class="conBox">
        <el-form-item label="用户名" prop="v_UserName">
          <el-input v-model="userData.v_UserName" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="v_UserID">
          <el-input v-model="userData.v_UserID" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="v_Email">
          <el-input v-model="userData.v_Email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="v_Mobile">
          <el-input v-model="userData.v_Mobile"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="v_WechatID">
          <el-input v-model="userData.v_WechatID"></el-input>
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
  name: 'modifyUserInfo',
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
      userData: {},
      rules: {},
      formData: {},
      // 小红点功能
      oldModAddData: {},
      formRed: false
    }
  },
  watch: {
    userData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.formRed = true
        }
      },
      deep: true
    }
  },
  created () {
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      this.userData = Object.assign({}, this.shareData)
      this.oldModAddData = Object.assign({}, this.userData)
    }
  },
  methods: {
    // 提交表单
    // 修改个人信息
    commit () {
      let params = this.userData
      this.$refs.userData.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.modifyUserInfo(params).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.getUserInfoConfig()
              this.formRed = false
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
.modify-user-info {
  display: flex;
  flex-direction: column;
  height: 100%;
  .el-form {
    padding-bottom: 0 !important;
    flex: 1 0 auto;
    .conBox {
      padding: 16px 0;
    }
  }
}
</style>
