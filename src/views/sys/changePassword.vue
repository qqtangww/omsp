<!-- 登录重置密码页面 -->
<template>
  <div class="change-password">
    <div class="header-left">
      <div class="header-logo">
        <img src="@/assets/images/testlogo.png" />
      </div>
      <div class="logo-title">
        <span class="title-cn">易智捷&nbsp;外包服务管理平台</span>
        <span class="title-en">e-Smart Outsourcing Service Management Platform</span>
      </div>
    </div>
    <div class="pwd-content">
      <div class="pwd-opcity-box"></div>
      <div class="pwd-box">
        <div class="pwd-header-box">
          <div class="header-img">
            <div class="header-img-box">
              <img :src="userInfo.userheader" />
              <div class="header-info">
                <div>{{ userInfo.username }}</div>
                <div>{{ userInfo.userid }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pwd-content-box">
          <el-form inline-message ref="form" class="pwd-form" :rules="rules" :model="pwdForm" label-width="120px">
            <el-row>
              <el-col>
                <el-form-item label="原密码" prop="oldpasswd">
                  <el-input
                    type="password"
                    v-model="pwdForm.oldpasswd"
                    autofocus
                    @keydown.enter.native="loginIn"
                    placeholder="请输入原密码"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="新密码" prop="newpasswd">
                  <el-input
                    type="password"
                    v-model="pwdForm.newpasswd"
                    autofocus
                    @keydown.enter.native="loginIn"
                    placeholder="请输入新密码"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="确认新密码" prop="confimpasswd">
                  <el-input
                    type="password"
                    v-model="pwdForm.confimpasswd"
                    autofocus
                    @keydown.enter.native="loginIn"
                    placeholder="请再次输入新密码"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="pwd-btn-box">
              <el-col :span="24">
                <el-button class="pwd-btn" @click="saveIn">保存</el-button>
                <el-button class="pwd-btn" @click="pwdForm = {}">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
          <div class="pwd-footer">
            <span>说明：根据用户设置与安全原因，当前帐号需修改新密码后才可正常登录使用</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cgiService from '@/api/cgiService'
export default {
  name: 'changePassword',
  data () {
    var confimpasswd = (rule, value, callback) => {
      if (value && value !== this.pwdForm.newpasswd) {
        callback(new Error('两次输入的新密码不一致'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {},
      rules: {
        oldpasswd: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newpasswd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confimpasswd: [
          { validator: confimpasswd, trigger: 'blur' },
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      },
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(sessionStorage['temporaryInfo'])
  },
  methods: {
    saveIn () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.pwdForm.userid = this.userInfo.userid
          cgiService.changePwdSendin(this.pwdForm).then(res => {
            if (!res.code) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1000
              })
              //   改密成功直接跳转快捷菜单
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
                this.$router.replace(historyOpenArr[0].pageurl)
                sessionStorage.setItem('fastMenuData', JSON.stringify(historyOpenArr))
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.change-password {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .header-left {
    background-image: linear-gradient(0deg, #2382e6, #5ea5f0);
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    > div {
      margin-left: 16px;
    }
    .header-logo {
      img {
        width: 27px;
        height: 30px;
      }
    }
    .logo-title {
      color: white;
      .title-cn {
        font-size: 22px;
      }
      .title-en {
        font-size: 12px;
      }
    }
  }
  .pwd-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-image: url("../../assets/images/infobackground.png");
    .pwd-opcity-box {
      min-height: 66px;
    }
    .pwd-box {
      background: white;
      flex: 1;
      width: 800px;
      margin: 0 auto;
      box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.26);
      .pwd-header-box {
        .header-img {
          height: 122px;
          background-image: url("../../assets/images/infobackgroundd.png");
          position: relative;
          .header-img-box {
            background: white;
            width: 88px;
            height: 110px;
            border-radius: 4px;
            padding: 2px;
            box-sizing: border-box;
            position: absolute;
            left: 44px;
            bottom: 0;
            transform: translateY(50%);
            box-shadow: 0px 3px 6px rgba(0,0,0,0.16);
            img {
              height: 100%;
              width: 100%;
              border-radius: 4px;
              background: pink;
            }
            .header-info {
              position: absolute;
              bottom: 0;
              left: 88px;
              padding-left: 12px;
              display: flex;
              align-items: flex-end;
              flex-direction: row;
              div {
                font-family: Microsoft YaHei;
                font-weight: 400;
                white-space: nowrap;
                float: left;
                &:first-of-type {
                  font-size: 24px;
                  color: rgba(51, 51, 51, 1);
                }
                &:last-of-type {
                  font-size: 12px;
                  color: rgba(153, 153, 153, 1);
                  margin-left: 8px;
                }
              }
            }
          }
        }
      }
      .pwd-content-box {
        margin-top: 80px;
        .pwd-form {
          width: 340px;
          margin: 0 auto;
          /deep/ .el-input__inner {
            height: 30px;
          }
          /deep/ .el-form-item__content {
            width: 220px;
          }
        }
        .pwd-btn-box {
          button {
            float: right;
            width: 60px;
            border-radius: 4px;
            height: 30px;
            border: none;
            &:last-of-type {
              border: 1px solid #e6e6e6;
              margin-right: 12px;
            }
            &:first-of-type {
              background: linear-gradient(
                180deg,
                rgba(93, 162, 239, 1) 0%,
                rgba(43, 142, 209, 1) 100%
              );
              color: white;
            }
          }
        }
        .pwd-footer {
          width: 600px;
          height: 30px;
          text-align: center;
          margin: 32px auto 0;
          border-top: 1px solid #e6e6e6;
          span {
            display: inline-block;
            color: #999999;
            font-size: 12px;
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
