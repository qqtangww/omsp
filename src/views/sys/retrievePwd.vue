<template>
  <div class="retrieve-box">
    <div class="header-wrapper">
      <div class="logo">
        <img src="@/assets/images/testlogo.png" />
        <div class="logoTitle">
          <span class="titleCh">易智捷外包服务管理平台</span>
          <span class="titleEng">e-Smart Outsourcing Service Management Platform</span>
        </div>
      </div>
      <div class="white-line"></div>
      <div class="font-title">找回密码</div>
      <div class="logo-box">
        <el-button type="text" @click="backLogin">返回登录</el-button>
      </div>
    </div>
    <div class="content-box">
      <div class="centre-box">
        <el-steps
          :active="active"
          finish-status="success"
          :align-center='true'
        >
          <el-step title="验证身份"></el-step>
          <el-step title="设置新密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <div class="form-box">
          <el-form
            key='userForm'
            :model="userForm"
            inline-message
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            v-if="active === 0"
          >
            <el-form-item
              label="用户账号"
              prop="userid"
            >
              <el-input v-model="userForm.userid"></el-input>
            </el-form-item>
            <el-form-item
              label="用户邮箱"
              prop="email"
            >
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item
              label="验证码"
              prop="v_VerifyCode"
            >
              <el-col :span="11">
                <el-input v-model="userForm.v_VerifyCode"></el-input>
              </el-col>
              <el-col :span='2'>
                <div>&nbsp;</div>
              </el-col>
              <el-col :span="11">
                <div class="get-str">
                  <el-button @click="getAuthCodeClick" v-if="flag">获取验证码</el-button>
                  <el-button v-if="!flag" disabled>{{time}}s 重新获取</el-button>
                </div>
              </el-col>
            </el-form-item>
            <el-form-item>
              <div class="email-next">
                <el-button @click="nextUser">下一步</el-button>
              </div>
            </el-form-item>
          </el-form>
          <el-form
            key="pwdForm"
            inline-message
            :model="pwdForm"
            :rules="rules1"
            ref="pwdForm"
            label-width="100px"
            v-if="active === 1">
            <el-form-item
              label="新密码"
              prop="newpasswd"
            >
              <el-input
                type="password"
                v-model="pwdForm.newpasswd"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认新密码"
              prop="confimpasswd"
            >
              <el-input
                type="password"
                v-model="pwdForm.confimpasswd"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="验证码">
              <el-col :span="11">
                <el-input
                  type="password"
                  v-model="pwdForm.confimpasswd"
                ></el-input>
              </el-col>
              <el-col :span="2">
                <div> &nbsp;</div>
              </el-col>
              <el-col :span="11">
                <template slot="append">
                  <img
                    v-if="imgSrc"
                    :src="imgSrc"
                    @click="refresh()"
                  >
                </template>
              </el-col>
            </el-form-item> -->
            <el-form-item>
              <el-col :span="11">
                <div class="resetPwd-box">
                  <el-button @click="modifyPwd">下一步</el-button>
                </div>
              </el-col>
              <el-col :span="2">
                <div>&nbsp;</div>
              </el-col>
              <el-col :span="11">
                <el-button @click="back">上一步</el-button>
              </el-col>
            </el-form-item>
          </el-form>
          <div v-if="active === 2" class="success-box">
            <div class="success-img-box">
              <img src="@/assets/images/successpwd.png">
              <div>修改密码成功</div>
            </div>
            <div class="back-logo">
              <el-button @click="backLogin">返回登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
export default {
  data () {
    var verifyEamil = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'))
      }
      let emailVerify = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      setTimeout(() => {
        if (!emailVerify.test(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }, 200)
    }
    var verifyNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认新密码'))
      } else if (value !== this.pwdForm.newpasswd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      active: 0,
      userForm: {},
      pwdForm: {},
      rules: {
        userid: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        email: [
          { validator: verifyEamil, trigger: 'blur' },
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }
        ]
      },
      rules1: {
        newpasswd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confimpasswd: [
          { validator: verifyNewPwd, trigger: 'blur' },
          { required: true, message: '请输入确认新密码', trigger: 'blur' }
        ]
      },
      imgSrc: '',
      flag: true,
      time: 120,
      timer: null
    }
  },
  methods: {
    // 验证身份的下一步
    nextUser () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.userForm.v_VerifyCode) {
            let params = {
              userid: this.userForm.userid,
              email: this.userForm.email,
              v_VerifyCode: this.userForm.v_VerifyCode
            }
            cgiService.nextStepVerify(params).then(res => {
              if (res.code === 0) {
                this.active++
                this.$message.success(res.msg)
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            this.$message.warning('请输入验证码')
          }
        }
      })
    },
    // 返回登录
    backLogin () {
      sessionStorage['history'] = ''
      sessionStorage['refreshPageData'] = ''
      this.$store.state.tabMenu = {}
      cgiService.sendOut().then(res => {
        this.$router.replace('/login')
      })
    },
    // 获取验证码
    getAuthCodeClick () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let that = this
          if (that.flag) {
            let params = {
              userid: this.userForm.userid,
              email: this.userForm.email
            }
            // 获取验证码
            cgiService.getAuthCode(params).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                this.flag = false
                let set = setInterval(() => {
                  // 把重新获取的时间存入storage
                  this.setStorage(that.time)
                  // 如果时间等于或小于0  重置时间  并显示获取验证码按钮
                  if (that.time-- <= 0) {
                    that.time = 120
                    that.flag = true
                    // 清除定时器
                    clearInterval(set)
                  }
                }, 1000)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        }
      })
    },
    // 存入loaclStorage
    setStorage (params) {
      localStorage.setItem('delay', params)
      localStorage.setItem('_time', new Date().getTime())
    },
    // 获取localStorage  拼装成一个对象  返回
    getStorage () {
      let localDelay = {}
      localDelay.delay = localStorage.getItem('delay')
      localDelay.sec = localStorage.getItem('_time')
      return localDelay
    },
    // 刷新页面  在mounted 中调用  获取 存入localStoreage里面的时间
    judgetCOde () {
      let that = this
      let localDelay = that.getStorage()
      // 计算点击获取验证码后过去多长时间
      let secTime = parseInt(new Date().getTime() - localDelay.sec) / 1000
      if (secTime > Number(localDelay.delay)) {
        that.flag = true
      } else {
        that.flag = false
        // 计算 点击获取验证码 剩余的时间
        let _delay = parseInt(localDelay.delay - secTime)
        that.time = _delay
        that.timer = setInterval(() => {
          if (_delay > 1) {
            _delay--
            that.setStorage(_delay)
            that.time = _delay
            that.flag = false
          } else {
            that.flag = true
            clearInterval(that.timer)
          }
        }, 1000)
      }
    },

    modifyPwd () {
      this.$refs.pwdForm.validate(vaild => {
        if (vaild) {
          let params = {
            newpasswd: this.pwdForm.newpasswd,
            confimpasswd: this.pwdForm.confimpasswd,
            userid: this.userForm.userid
          }
          cgiService.modifyPwd(params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              this.active++
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }

  },
  mounted () {
    this.judgetCOde()
  }
}
</script>
<style lang="scss" scoped>
.retrieve-box {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .header-wrapper {
    width: 100%;
    height: 90px;
    background: linear-gradient(
      90deg,
      rgba(47, 142, 245, 1) 0%,
      rgba(89, 164, 244, 1) 100%
    );
    padding: 20px 30px;
    box-sizing: border-box;
    position: relative;
    .logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > img {
        width: 43px;
        height: 48px;
        margin-right: 20px;
      }
      .logoTitle {
        display: flex;
        flex-direction: column;
        .titleCh {
          font-size: 24px;
          font-weight: 400;
          color: #ffffff;
        }
        .titleEng {
          font-size: 12px;
          color: #ffffff;
          letter-spacing: -1px;
        }
      }
    }
    .white-line {
      width: 2px;
      height: 34px;
      position: absolute;
      background: #f5f6f8;
      top: 30px;
      left: 376px;
    }
    .font-title {
      position: absolute;
      top: 34px;
      left: 400px;
      font-size: 18px;
      color: #f5f6f8;
    }
    .logo-box {
      position: absolute;
      top: 34px;
      right: 24px;
      .el-button {
        color: #ffffff;
        font-size: 18px;
      }
    }
  }
  .content-box {
    flex: 1;
    padding-top: 40px;
    .centre-box {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
    }
    .form-box {
      padding: 40px 140px 0 300px;
      box-sizing: border-box;
      .el-form {
        .el-form-item {
          height: 30px;
        }
        .el-button {
          padding: 8px 43px;
        }
        .get-str {
          .el-button {
             width: 100%;
             height: 100%;
             text-align: center;
             padding: 8px 0;
            }
        }
      }
    .success-box {
      padding-left: 100px;
     .success-img-box {
        width: 200px;
        height: 150px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        color: #333333;
        }
      }
    }
   .email-next {
      .el-button {
        background: #5892f6;
        color: #ffffff;
      }
    }
  .resetPwd-box {
        .el-button {
          background: #5892f6;
          color: #ffffff;
        }
      }
    .back-logo {
      padding-left: 45px;
      .el-button {
        padding: 8px 30px;
        background: #5892F6;
        color: #ffffff;
      }
    }
  }
}
.centre-box /deep/ .el-step__icon {
  width: 32px;
  height: 32px;
  background: #bfbfbf;
  border: none;
  .el-step__icon-inner {
    color: #ffffff;
  }
}
.centre-box /deep/ .el-step__head.is-process {
  .el-step__icon {
    background: #5892f6;
    border: none;
  }
}
.centre-box /deep/ .el-step__head.is-success {
  .el-step__icon {
    background: #5892f6;
    border: none;
  }
  .el-step__line {
    border-color: #bfbfbf;
  }
}
.centre-box /deep/ .el-step__line {
  top: 16px;
}
.centre-box /deep/ .el-step__title {
  font-size: 14px;
}
.centre-box /deep/ .el-step__title.is-success {
  font-weight: bold;
  color: #333333;
}

.form-box /deep/ .el-form-item__content {
  height: 30px;
  width: 264px;
  .el-input__inner {
    height: 30px;
  }
}
</style>
