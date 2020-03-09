<template>
    <div class="user-info-view">
        <div class="formOperateBox">
        <!-- 操作栏 -->
        <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
        </div>
     <el-form inline-message ref="metaForm" :model="modeAddData" :rules="rules">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>基本信息</span>
        </span>
       <div class="head-img-box" v-if="modeAddData.v_Header">

               <img :src="userInfo" alt="">
        </div>
       <div class="head-img-box" v-else>
               <img src="@/assets/images/head.png" alt="">
        </div>
        <el-row>
          <el-col :span="4">
              <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="80px" label="用户账号:">{{modeAddData.v_UserID}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="公司邮箱:" label-width="80px">{{modeAddData.v_companyEmail}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
                <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="80px" label="用户名:">{{modeAddData.v_UserName}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="个人邮箱:" label-width="80px">{{modeAddData.v_Email}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="80px" label="用户类型:">{{modeAddData.v_UserType}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="手机号:" label-width="80px">{{modeAddData.v_Mobile}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="80px" label="组织机构:"  >{{modeAddData.v_OrgCode}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="固定电话:" label-width="80px">{{modeAddData.v_Tel}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="80px" label="账户启用:"  >{{modeAddData.i_ActiveFlag === '1' ? '已启用' : '未启用'}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="微信:" label-width="80px">{{modeAddData.v_WechatID}}</el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>账户与策略</span>
        </span>
        <el-row>
          <el-col :span="2">
              <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="账户锁定:"  >{{modeAddData.i_LockFlag === '1' ? '已锁定' : '未锁定'}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码已输错次数:" label-width="140px">{{modeAddData.i_PwdTryCount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
                <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="多重登录:" >{{modeAddData.i_MultiLogin === '1' ? '允许' : '不允许'}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="累积登录次数:" label-width="140px">{{modeAddData.i_LoginCount}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="下次登录改密:"  >{{modeAddData.i_NextUpdatePwd === '1' ? '是' : '否'}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="最后登录时间:" label-width="140px">{{modeAddData.d_LastLogin}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="访问策略:"  >{{modeAddData.v_APname}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码策略:" label-width="140px">{{modeAddData.v_PPname}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="账号启用时间:"  >{{modeAddData.d_Activedate}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码启用日期:" label-width="140px">{{modeAddData.d_PwdActiveDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="账号失效时间:"  >{{modeAddData.d_ExpiredDate}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="密码失效日期:" label-width="140px">{{modeAddData.d_PwdExpiredDate}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
           <div>&nbsp;</div>
          </el-col>
          <el-col :span="18">
            <el-form-item label-width="140px" label="描述:"  >{{modeAddData.v_Description}}</el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-gengxinjilu"></i>
          <span>更新记录</span>
        </span>
        <el-row>
          <el-col :span="2">
              <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="创建者:"  >{{modeAddData.v_Creator}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="创建时间:" label-width="140px">{{modeAddData.d_CreateTime}}</el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
                <div>&nbsp;</div>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="140px" label="最后修改者:"  >{{modeAddData.v_LastModifiedUser}}</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="最后修改时间:" label-width="140px">{{modeAddData.d_LastModifiedTime}}</el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
export default {
  name: 'userInfoView',
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      modeAddData: {
        v_UserID: '',
        v_companyEmail: '',
        v_UserName: '',
        v_Email: '',
        v_UserType: '',
        v_Mobile: '',
        v_OrgCode: '',
        v_Tel: '',
        i_ActiveFlag: '',
        v_WechatID: '',
        i_LockFlag: '',
        i_PwdTryCount: '',
        i_MultiLogin: '',
        i_LoginCount: '',
        i_NextUpdatePwd: '',
        d_LastLogin: '',
        v_APcode: '',
        v_PPcode: '',
        d_Activedate: '',
        d_PwdActiveDate: '',
        d_ExpiredDate: '',
        d_PwdExpiredDate: '',
        v_Description: '',
        v_Creator: '',
        d_CreateTime: '',
        v_LastModifiedUser: '',
        d_LastModifiedTime: '',
        v_Header: ''
      },
      rules: {}
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    userInfo () {
      if (this.$store.state.userInfo.userheader) {
        return this.$store.state.userInfo.userheader
      }
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'userInfo') {
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData

      util.initFormData(this.modeAddData, formData)
      this.$set(this.modeAddData, 'v_UserType', formData.v_UserType.v_EnumValue)
    }
  },
  methods: {
    commit () {

    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
  .border-box {
    border: 1px solid #bfbfbf;
    position: relative;
    padding: 20px;
    margin-top: 15px;
    &:first-of-type {
        margin-top: 0;
    }
    > span {
      position: absolute;
      top: -10px;
      left: 15px;
      background: #ffffff;
      padding: 0 4px;
      font-size: 14px;
      font-weight: 900;
      color: #333333;
    }
  .head-img-box {
     height:110px;
     width: 88px;
     top: 30px;
     position: absolute;
     border: 1px solid #bfbfbf;
     border-radius: 5%;
     > img {
         width: 100%;
         height: 100%;
      }
     }
  }
    .user-info-view {
        height: 100%;
        display: flex;
        flex-direction: column;
        .el-form {
           padding: 16px;

        }
    }
  .user-info-view /deep/ .el-form-item__content {
            font-size: 12px;
 }
  .user-info-view /deep/ .el-form-item__label {
           color: #0A8FEF;
           font-weight: 900;
 }
</style>
