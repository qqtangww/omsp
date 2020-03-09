<template>
<!-- 登录页面 -->
  <div class="main-box">
    <div class="loginHeader">
      <div class="logoBox">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <div class="loginTitle">
        <p>易智捷 外包服务管理平台</p>
        <p>e-Smart Outsourcing Service Management Platform</p>
      </div>
    </div>
    <div class="login-box">
      <div class="wrapper">
        <header>
          <span>账号登录</span>
        </header>
        <section>
          <el-form inline-message ref="form" :model="metaForm" class="clearfix" label-width="120px">
            <el-row>
              <el-col>
                <el-input
                  v-model="metaForm.userid"
                  autofocus
                  prefix-icon="iconfont icon-zhanghao"
                  @keydown.enter.native="loginIn"
                  placeholder="请输入帐号"
                  @blur="changeID"/>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-input
                  v-model="metaForm.passwd"
                  prefix-icon="iconfont icon-mimacelve"
                  @keydown.enter.native="loginIn"
                  type="password"
                  placeholder="请输入密码"/>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-input
                  v-model="metaForm.vcode"
                  prefix-icon="iconfont icon-zhanghaoanquan"
                  @keydown.enter.native="loginIn"
                  type="text"
                  class="valid-code"
                  placeholder="请输入验证码">
                  <template slot="append">
                    <img
                      v-if="imgSrc"
                      :src="imgSrc"
                      @click="refresh()" >
                  </template>
                </el-input>
              </el-col>
            </el-row>
            <el-row class="selAgent" v-if="showAgent > 0">
              <el-col class="selAgentCol">
                  <i class="iconfont icon-yonghudaili"></i>
                  <el-select v-model="metaForm.byagentuserid" clearable placeholder="选择使用代理权">
                    <el-option
                      v-for="item in agentList"
                      :key="item.value"
                      :label="item.userid +' '+ item.username"
                      :value="item.userid">
                    </el-option>
                  </el-select>
              </el-col>
            </el-row>
            <el-row class="login-btn-box">
              <el-col :span="12">
                <el-button class="login-btn" @click="loginIn">登&nbsp;&nbsp;&nbsp;录</el-button>
              </el-col>
                <el-col class="login-pwd-btn" :span="12">
                <span class="forgetPwd" @click="routerPwdControl">忘记密码</span>
              </el-col>
            </el-row>
          </el-form>
        </section>
      </div>
      <div class="banner">
        <img src="../assets/images/login-bg.jpg" alt="">
      </div>
    </div>
    <div class="loginFooter">
      <div>Copyright ©2018 www.osmp.com All Rights Reserved</div>
    </div>
  </div>
</template>

<script>
import cgiService from '../api/cgiService'
export default {
  data () {
    return {
      metaForm: {
        userid: '',
        passwd: '',
        vcode: ''
      },
      imgSrc: '',
      yesLoginIn: false,
      noLoginIn: true,
      // 代理人列表
      agentList: [],
      // 是否展示选择代理
      showAgent: 0
    }
  },
  created () {
    this.refresh()
  },
  methods: {
    refresh () {
      cgiService.verificationCode().then(res => {
        this.imgSrc = res.img
      })
    },
    loginIn () {
      // 如果当前的用户 不是代理 就删除代理这个字段
      if (!this.showAgent > 0) {
        delete this.metaForm.byagentuserid
      }
      cgiService.login(this.metaForm).then(res => {
        if (parseInt(res.code) === 0) {
          if (!res.data.isagent) {
            this.$message({
              message: '登录成功',
              duration: '1000',
              type: 'success'
            })
          } else {
            this.$message({
              message: '已用代理模式登录',
              duration: '1000',
              type: 'success'
            })
          }
          // 登录成功之后调取快捷菜单
          cgiService.getFastMenu().then(res => {
            let historyOpenArr = []
            // 用户快捷菜单 获取成功
            if (!res.code) {
              // 如果有快捷菜单
              if (res.data.length > 0) {
                res.data.forEach(item => {
                  // 如果 用户设置了快捷菜单 就显示快捷菜单
                  if (item.isexpand === '1') {
                    this.$store.commit('addTabMenu', {
                      code: item.code,
                      catecode: item.catecode,
                      cate: item.cate,
                      name: item.pagename,
                      path: item.pageurl,
                      parentpageid: item.parentpageid,
                      pageid: item.pageid
                    })
                    historyOpenArr.push(item)
                  }
                })
                // 判断historyOpenArr有没有值，如果有就不添加个人信息页
                if (historyOpenArr.length === 0) {
                  let item = {
                    parentpageid: '10443',
                    pageid: '10444',
                    pagename: '个人信息',
                    pageurl: '/sys/stdFormControl/CC_FM_userInfo',
                    cate: '1',
                    catecode: 'CC_FM',
                    code: 'CC_FM_userInfo'
                  }
                  sessionStorage['refreshPageData'] = JSON.stringify(item)
                  historyOpenArr.push(item)
                  this.$store.commit('addTabMenu', {
                    code: item.code,
                    catecode: item.catecode,
                    cate: item.cate,
                    name: item.pagename,
                    path: item.pageurl,
                    parentpageid: item.parentpageid,
                    pageid: item.pageid
                  })
                  this.firstMenuID = '10442'
                  this.pageid = '10444'
                }
              } else {
                // 如果 用户没有设置快捷菜单 默认显示个人信息
                let item = {
                  parentpageid: '10443',
                  pageid: '10444',
                  pagename: '个人信息',
                  pageurl: '/sys/stdFormControl/CC_FM_userInfo',
                  cate: '1',
                  catecode: 'CC_FM',
                  code: 'CC_FM_userInfo'
                }
                sessionStorage['refreshPageData'] = JSON.stringify(item)
                historyOpenArr.push(item)
                this.$store.commit('addTabMenu', {
                  name: item.pagename,
                  path: item.pageurl,
                  parentpageid: item.parentpageid,
                  pageid: item.pageid
                })
              }
            }
            // 跳转到第一个 快捷菜单
            this.$router.push(historyOpenArr[0].pageurl)
            sessionStorage.setItem('fastMenuData', JSON.stringify(historyOpenArr))
          })
        } else if (Math.abs(res.code) === 3041) {
          // -3041 重定向到系统参数
          this.$router.push(res.data.jumpurl)
        } else if (Math.abs(res.code) === 3042) {
          // -3042 下次登录改密
          if (JSON.stringify(res.data) !== '{}') {
            sessionStorage.setItem('temporaryInfo', JSON.stringify(res.data))
            this.$router.push('/changePassword')
          } else {
            this.$message.error('接口数据错误')
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(errData => {
        console.log(errData)
      })
    },
    changeID () {
      this.getAgentList()
    },
    // 获取用户代理列表
    getAgentList () {
      cgiService.getAgentList({ userid: this.metaForm.userid }).then(res => {
        if (!res.code) {
          this.agentList = res.data
          this.showAgent = res.data.length
        }
      })
    },

    // 找回密码
    routerPwdControl () {
      this.$router.push({ path: '/retrievePwd' })
    }
  }
}
</script>

<style lang="scss">
html,body{
    height: 100%;
    margin: 0;
}
.clearfix:before,.clearfix:after{
  content:"";
  display:table;
}
.clearfix:after{
 clear:both;
}
.clearfix{
 *zoom:1;
}
.main-box{
  display: flex;
  flex-direction: column;
  height: 100%;
  .loginHeader{
    min-height: 100px;
    height: 12%;
    display: flex;
    align-items: center;
    .logoBox{
      width: 135px;
      height: 40px;
      margin-left: 40px;
      img{
        width: 100%;
      }
    }
    .loginTitle{
      margin-left: 24px;
      >p{
        margin: 0;
        color: #333333;
        &:first-of-type{
          font-size: 27px;
        }
        &:last-of-type{
          font-size: 12px;
        }
      }
    }
  }
  .login-box{
    height: 76%;
    // min-height: 500px;
    background:linear-gradient(90deg,rgba(47,142,245,1) 0%,rgba(89,164,244,1) 100%);
    // position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    .wrapper{
      width: 350px;
      margin-right: 120px;
      // position: absolute;
      // top: 50%;
      // right: 260px;
      // transform: translateY(-50%);
      // z-index: 2;
      header{
        height: 30px;
        background: #424E64;
        color: white;
        font-size: 12px;
        line-height: 30px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      section{
        padding: 0 30px;
        box-sizing: border-box;
        background: white;
        .el-row{
          margin-top: 16px;
          // 修改icon
          &.login-btn-box {
            margin-bottom: 16px;
            .login-pwd-btn {
              padding-top: 11px;
              padding-right: 40px;
            }
          }
          .el-input__prefix{
            left: 9px;
            color: #333333;
            i{
              font-size: 18px;
            }
          }
          input{
            height: 40px !important;
          }
          // 选择代理权
          .selAgentCol{
            position: relative;
            .el-select{
              width: 100%;
              input{
                padding-left: 30px;
                font-size: 12px;
              }
            }
            >i{
              position: absolute;
              z-index: 1;
              left: 9px;
              font-size: 18px;
              top: 50%;
              transform: translateY(-50%);
              color: #333333;
            }
          }
          button{
            width: 90%;
            background-color: #32C5D2;
            color: white;
            font-size: 14px;
            &:hover{
              background-color: #38D9E8;
            }
          }
          // 验证码
          .valid-code{
            .el-input-group__append{
              background: white;
              padding-top: 8px;
              height: 24px;
              > img {
                  height: 100%;
              }
            }
          }
        }
        // 忘记密码
        span.forgetPwd{
          display: inline-block;
          float: right;
          color: red;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    .banner{
      width: 40%;
      height: 50%;
      min-height: 400px;
      margin-left: 120px;
      display: flex;
      align-items: center;
      // width: 800px;
      // height: 550px;
      // position: absolute;
      // top: 50%;
      // transform: translateY(-50%);
      // margin-left: 120px;
      img{
        width: 100%;
      }
    }
  }
  .loginFooter{
    min-height: 110px;
    >div{
      width: 800px;
      text-align: center;
      margin: 30px auto 0;
      color: #999999;
    }
  }
}
</style>
