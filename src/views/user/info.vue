<template>
  <div class="infoPage">
    <div class="info-box">
      <div class="content-box">
        <div class="my-info-box">
          <div class="my-header-box">
            <div class="head-box">
              <div class="head-img-box">
                <el-upload
                  class="upload-demo"
                  name="upload_file"
                  accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
                  :on-success="handleUpload1Success"
                  :before-upload="beforeAvatarUpload"
                  :on-progress="() => progress1=true"
                  :show-file-list="false"
                  action="/index.php/sys/UserRole/uploadpic/upload_imgs_header/upload_file"
                >
                  <div class="shadeBox">修改头像</div>
                  <img :src="userInfo" alt>
                </el-upload>
              </div>
              <div class="username">
                <span class="name">{{userName}}</span>
                <span class="userID">{{userID}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="scollBox">
        <div class="my-main-box">
              <div class="mian-left">
                <el-row>
                  <el-col :span="24">
                    <i class="el-icon-message"></i>
                    <span class="my-info">个人信息</span>
                    <el-button type="text"
                      @click="isShowFrom"
                      v-if="JSON.stringify(modifyObj) !== '{}'"
                      :disabled="modifyObj.isdisabled === '1'">{{ modifyObj.operationname }}
                    </el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">用户名</span>
                    <span class="my-input">{{userName}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">账号</span>
                    <span class="my-input">{{fromData.userid}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">手机号</span>
                    <span class="my-input">{{fromData.mobile}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">公司邮箱</span>
                    <span class="my-input">{{fromData.email}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">微信号</span>
                    <span class="my-input">{{fromData.wechatid}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="main-rigth">
                <el-row>
                  <el-col :span="24">
                    <i class="el-icon-setting"></i>
                    <span class="my-set">偏好设置</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form :inline="true">
                      <el-form-item label="语言">
                        <el-select v-model="language" placeholder="简体中文">
                          <el-option label="简体中文" value="1"></el-option>
                          <el-option label="繁体中文" value="2"></el-option>
                          <el-option label="英文" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="主页">
                        <el-select v-model="homepage" placeholder="/user/info">
                          <el-option label="/sys/pageControl" value="1"></el-option>
                          <el-option label="/sys/roleControl" value="2"></el-option>
                          <el-option label="/sys/userControl" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="菜单">
                        <el-select v-model="menu" placeholder="系统管理">
                          <el-option label="测试菜单" value="1"></el-option>
                          <el-option label="用户中心" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
              </div>
        </div>
        <div class="my-footer-box">
          <div>
            <div class="footer-left">
              <el-row>
                <el-col :span="24">
                  <i class="el-icon-circle-check-outline"></i>
                  <span class="my-safety">账号安全</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="my-lab">账号自锁</span>
                  <el-switch
                    v-model="fromData.selflock"
                    @change="SwitchIsselflock(fromData)"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="0"
                    inactive-value="1"
                  ></el-switch>
                </el-col>
                <el-col :span="24">
                  <span class="my-lab">解锁密码</span>
                  <span class="my-input">{{fromData.lockpwd}}</span>
                </el-col>
                <el-col :span="24">
                  <span class="my-lab">登录密码</span>
                  <!-- <router-link to="/user/pwd">修改</router-link> -->
                  <el-button type="text" @click="rotuerLink">修改</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="footer-rigth">
              <el-row>
                <el-col :span="24">
                  <i class="el-icon-bell"></i>
                  <span class="my-inform">通知</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="my-lab">邮箱</span>
                  <el-switch
                    v-model="fromData.telnotify"
                    @change="SwitchIsemail(fromData)"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="my-lab">短信</span>
                  <el-switch
                    v-model="fromData.mobilenotify"
                    @change="SwitchIsmobile(fromData)"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <span class="my-lab">微信</span>
                  <el-switch
                    v-model="fromData.wechatnotify"
                    @change="SwitchIswechat(fromData)"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        </div>
      </div>
      <el-dialog
        v-dialogDrag
        title="修改个人信息"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        class="formBox"
      >
        <div class="bodyBorderBox">
          <div class="formOperateBox">
            <el-button type="text" @click="dialogVisible = false">
              <i class="iconfont icon-tuichu"></i> 关 闭
            </el-button>
            <el-badge :is-dot="isBadge" class="item">
              <el-button type="text" @click="commit('updataList')">
                <i class="iconfont icon-baocun"></i> 保 存
              </el-button>
            </el-badge>
          </div>
          <el-form ref="updataList" :rules="rules" :model="updataList" label-width="128px">
            <div class="conBox">
              <el-form-item label="用户名">
                <el-input v-model="userName" disabled></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="userid">
                <el-input v-model="updataList.userid" disabled></el-input>
              </el-form-item>
              <el-form-item label="公司邮箱" prop="email">
                <el-input v-model="updataList.email" disabled></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="updataList.mobile"></el-input>
              </el-form-item>
              <el-form-item label="微信号" prop="wechatid">
                <el-input v-model="updataList.wechatid"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
          </span>-->
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import mixins from '@/assets/js/mixin'
import global from '@/views/global/global'
export default {
  data () {
    // 手机号码正则匹配
    var checkMobile = (rule, value, callback) => {
      if (!Number.isInteger(Number(value))) {
        callback(new Error('请输入数字'))
      }
      let mobileVerify = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      setTimeout(() => {
        if (!mobileVerify.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      // 增加数组
      addObj: {},
      // 修改
      modifyObj: {},
      // 删除
      delObj: {},
      // 搜索
      searchObj: {},
      // 用户信息
      fromData: {},
      picurl: '',
      progress1: false,
      // 是否允许短信通知
      ismobile: '1',
      // 是否允许微信通知
      iswechat: '1',
      // 是否允许邮箱通知
      isemail: '1',
      // 默认语言
      language: '1',
      // 默认主页
      homepage: '1',
      // 默认菜单
      menu: '1',
      // 帐号自锁
      selflock: '',
      // 帐号的显示或隐藏
      value2: true,
      // 解锁密码
      input: '',
      // 表单的显示或隐藏
      dialogVisible: false,
      // 修改提交表单的数据
      updataList: {
        // 用户账号
        userid: '',
        id: '',
        defaulttoplevel: '',
        defaulthomepage: '',
        // 手机号
        mobile: '',
        email: '',
        wechatid: '',
        wechatnotify: '',
        telnotify: '',
        mobilenotify: '',
        mac: '',
        defaultlocale: '',
        header: ''
      },
      // 手机号正则匹配
      rules: {
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    let _this = this
    global.getPageId(_this)
    // 获取用户信息
    this.getFromData()
  },
  computed: {
    userInfo () {
      if (this.$store.state.userInfo.userheader) {
        return this.$store.state.userInfo.userheader
      } else {
        return '../../assets/images/head.png'
      }
    },
    userName () {
      return this.$store.state.userInfo.username
    },
    userID () {
      return this.$store.state.userInfo.userid
    }
  },
  methods: {
    // 账号自锁
    SwitchIsselflock (row) {
      this.fromData = Object.assign({}, row)
      this.isSwitch()
    },
    // 邮箱通知
    SwitchIsemail (row) {
      this.fromData = Object.assign({}, row)
      this.isSwitch()
    },
    // 短信通知
    SwitchIsmobile (row) {
      this.fromData = Object.assign({}, row)
      this.isSwitch()
    },
    // 微信通知
    SwitchIswechat (row) {
      this.fromData = Object.assign({}, row)
      this.isSwitch()
    },
    // 修改数据
    isShowFrom () {
      this.dialogVisible = true
      for (const key in this.fromData) {
        for (const i in this.updataList) {
          if (key === i) {
            this.updataList[i] = this.fromData[key]
            this.newForm = Object.assign({}, this.updataList)
          }
        }
      }
    },
    // 跳转到修改密码页面
    rotuerLink () {
      this.$router.replace('/user/pwd')
      this.$store.commit('addTabMenu', {
        parentpageid: '10010',
        pageid: '10012',
        name: '修改密码',
        path: '/user/pwd'
      })
    },
    // 上传图片
    handleUpload1Success (res, file) {
      this.progress1 = false
      if (res.code === 0) {
        this.picurl = res.picurl
        this.fromData.header = res.pic
        this.fromData.picurl = res.picurl
        cgiService.updatedUserInfo(this.fromData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$store.state.userInfo.userheader = this.fromData.picurl
            this.getFromData()
          }
        })
      }
    },
    beforeAvatarUpload (file) {
      let isJpgOrPng = file.type === 'image/jpeg' || 'image/png'
      let isImageSize = file.size / 1024 / 1024 < 2
      if (!isJpgOrPng) {
        this.$message({
          message: '仅支持.png/.jpeg格式',
          type: 'warning'
        })
      }
      return isJpgOrPng && isImageSize
    },
    // 获取用户信息接口
    getFromData () {
      cgiService.getUserInfo().then(res => {
        this.fromData = res.data
        this.userid = res.data.userid
        this.iswechat = res.data.wechatnotify
        this.islocale = res.data.defaultlocale
      })
    },
    // dialog关闭提示
    handleClose (done) {
      if (this.isBadge) {
        this.$confirm('数据已修改,是否需要返回保存？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      } else {
        this.dialogVisible = false
      }
    },
    // 修改个人信息
    commit (formdata) {
      let params = this.updataList
      this.$refs[formdata].validate(valid => {
        if (valid) {
          cgiService.updatedUserInfo(params).then(res => {
            if (res.code === 0) {
              this.isBadge = false
              this.$message.success('保存成功')
              this.getFromData()
            } else {
              this.$message.success(res.msg)
            }
          })
        }
      })
    },
    isSwitch () {
      cgiService.updatedUserInfo(this.fromData).then(res => {
        if (res.code === 0) {
          this.getFromData()
        }
      })
    }
  },
  mounted () {},
  mixins: [mixins]
}
</script>
<style lang="scss">
.content-row {
  padding: 30px;
}
.key {
  color: #99a9bf;
  padding-right: 10px;
}
.my-switch {
  padding-left: 22px;
}

.inner-content {
  .infoPage {
    padding: 8px 0;
    height: calc(100vh - 135px);
    background: url("../../assets/images/infobackground.png");
    .info-box {
      background-color: #fff;
      height: 100%;
      box-sizing: border-box;
      width: 800px;
      margin: auto;
      box-shadow: -2px -1px 8px rgba(0, 0, 0, 0.26);
      .content-box {
        width: 100%;
        height: 100%;
      }
      .dialog-fade-enter-active,
      .dialog-fade-leave-active {
        animation: none;
      }
      .demo-ruleForm {
        width: 400px;
        height: 500px;
      }
      .my-info-box {
        .my-header-box {
          width: 100%;
          .head-box {
            background: url("../../assets/images/infobackgroundd.png");
            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
            height: 122px;
            position: relative;
            .head-img-box {
              height: 110px;
              width: 90px;
              position: absolute;
              top: 58px;
              left: 44px;
              border-radius: 4px;
              border: 4px solid #ffffff;
              box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
              .upload-demo {
                width: 100%;
                height: 100%;
                position: relative;
                &:hover .shadeBox {
                  display: block;
                }
                .shadeBox {
                  position: absolute;
                  top: 0;
                  left: 0;
                  text-align: center;
                  background-color: rgba(0, 0, 0, 0.5);
                  width: 100%;
                  height: 100%;
                  line-height: 100px;
                  color: #fff;
                  display: none;
                }
                img {
                  width: 100%;
                  height: 110px;
                }
              }
            }
          }
          .username {
            margin: 0;
            font-family: "微软雅黑";
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 26px;
            letter-spacing: 0px;
            color: #333333;
            position: absolute;
            top: 152px;
            left: 150px;
            .name {
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 230px;
              vertical-align: sub;
            }
            .userID {
              display: inline-block;
              font-size: 14px;
              color: #999999;
            }
          }
        }
      }
      .scollBox {
         height: calc(100vh - 328px);
         overflow: auto;
         overflow-x: hidden;
         margin-top: 73px;

        .my-main-box {
          display: flex;
          justify-content: center;
          padding-top: 0px;
          padding-left: 22px;
          .mian-left {
            .el-row {
              width: 365px;
              height: 30px;
              line-height: 30px;
              .my-info {
                width: 56px;
                height: 19px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                line-height: 26px;
                letter-spacing: 0px;
                color: #333333;
                padding-left: 10px;
              }
              .el-button {
                padding-left: 20px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #32c5d2;
              }
              .my-lab {
                display: inline-block;
                width: 78px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #999999;
                text-align: right;
              }
              .my-input {
                padding-left: 20px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #333333;
              }
            }
          }
          .main-rigth {
            .el-row {
              width: 365px;
              height: 30px;
              line-height: 30px;
              margin-bottom: 14px;
              .my-set {
                width: 56px;
                height: 19px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                line-height: 26px;
                letter-spacing: 0px;
                color: #333333;
                padding-left: 10px;
              }
              .el-form-item {
                padding-left: 52px;
                margin-bottom: 5px;
                .el-form-item__content {
                  margin-left: 10px;
                  input {
                    height: 30px;
                  }
                }
              }
            }
          }
        }
      .my-footer-box {
        padding-right: 134px;
        > div {
          display: flex;
          justify-content: center;
          margin-left: 160px;
          margin-top: 20px;
          .footer-left {
            .el-row {
              width: 365px;
              height: 30px;
              line-height: 30px;
              .my-safety {
                width: 56px;
                height: 19px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                line-height: 26px;
                letter-spacing: 0px;
                color: #333333;
                padding-left: 10px;
              }
              .my-lab {
                display: inline-block;
                width: 78px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #999999;
                text-align: right;
              }
              .el-switch__core {
                margin-left: 20px;
              }
              .my-input {
                padding-left: 20px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #333333;
              }
              .el-button {
                padding-left: 20px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #32c5d2;
                text-decoration: none;
              }
            }
          }
          .footer-rigth {
            .el-row {
              width: 365px;
              height: 30px;
              line-height: 30px;
              .my-inform {
                width: 56px;
                height: 19px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                line-height: 26px;
                letter-spacing: 0px;
                color: #333333;
                padding-left: 10px;
              }
              .my-lab {
                display: inline-block;
                width: 78px;
                font-family: "微软雅黑";
                font-size: 12px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #999999;
                text-align: right;
              }
              .el-switch__core {
                margin-left: 20px;
              }
            }
          }
        }
      }
      }

    }
    .conBox{
      padding-top: 16px;
    }
  }
  @media screen and (max-width: 1400px) {
    .infoPage {
      height: calc(100vh - 115px);
    }
  }
}
</style>
