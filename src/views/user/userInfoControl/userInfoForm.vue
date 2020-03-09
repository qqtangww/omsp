<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 19:29:45
 * @LastEditTime: 2019-09-27 11:39:29
 * @LastEditors: ly
 -->
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
                    <span class="my-input">{{fromData.v_UserID}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">个人邮箱</span>
                    <span class="my-input">{{fromData.v_Email}}</span>
                  </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="24">
                    <span class="my-lab">公司邮箱</span>
                    <span class="my-input">{{fromData.v_companyEmail}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">手机号</span>
                    <span class="my-input">{{fromData.v_Mobile}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <span class="my-lab">微信号</span>
                    <span class="my-input">{{fromData.v_WechatID}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="main-rigth">
                <el-row>
                  <el-col :span="24">
                    <i class="iconfont icon-zuzhijigou"></i>
                    <span class="org-info">部门信息</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                        <div class="org-box">
                         <span>组织机构</span>
                          <div class="msg-num" v-if="fromData.v_OrgFullName !== ''">
                            {{fromData.v_OrgFullName}}
                          </div>
                          <div class="msg-num"  v-else>
                            /
                          </div>
                         </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                        <div class="org-box">
                         <span>直属上级</span>
                          <div class="msg-num" v-if="fromData.leaderUserName !== ''">
                            {{fromData.leaderUserName}}
                          </div>
                          <div class="msg-num" v-else>
                            /
                          </div>
                         </div>
                  </el-col>
                </el-row>
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
        class="formBox">
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
        </div>
      </el-dialog>
    </div>
    <dialog-standard v-if="ifDialog" :ifDialog='ifDialog' :configData='dialogConfigData' :shareData='shareData' @getButtonConfig='changeIfDialog' ></dialog-standard>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import global from '@/views/global/global'
import dialogStandard from '@/components/stdDialog/stdDialogAction'
export default {
  name: 'userInfoForm',
  props: {
    configData: Object
  },
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
      // 个信息
      shareData: {},
      // 手机号正则匹配
      rules: {
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      ifDialog: false,
      dialogConfigData: {}
    }
  },
  created () {
    let _this = this
    global.getPageId(_this)
    // 获取用户信息
    this.getUserInfoConfig()
  },
  computed: {
    userInfo () {
      if (this.$store.state.userInfo.userheader) {
        // console.log(this.$store.state.userInfo.userheader)
        return this.$store.state.userInfo.userheader
      } else {
        return '/assets/images/head.png'
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
    // 操作栏 按钮点击事件
    dialogButtonClick (interfaceData) {
      // 把这个按钮配置项按钮相关信息存vuex
      if (typeof interfaceData === 'object') {
        this.$store.commit('confBtn', interfaceData)
      }
      this.dialogConfigData = {}
      if (interfaceData.linkflag === '1') {
        switch (interfaceData.buttype) {
        // 系统按钮
          case '1':
          // 直接执行方法
            this[interfaceData.func]()
            break
            // 自定义按钮
          case '2':
          // 自定义按钮
          // 拿到解析完的函数体
            let funObj = this.$store.getters.getFunctions
            // 获取到函数名 和 参数
            // 这里的正则是判断是因为  行内传的值是后台接口中这个按钮的数据  工具条只传了方法名
            let funData = {}
            if (interfaceData.func) {
              funData = util.methodSplit(interfaceData.func)
              this.$store.commit('nowConf', funData.fncName)
              for (var key in funObj) {
              // 去除前后空格
                if (key === funData.fncName.replace(/(^\s*)|(\s*$)/g, '')) {
                  let params = {
                    that: this,
                    currentData: this.shareData,
                    cgiService
                  }
                  // 函数自调用
                  funObj[key](params)
                }
              }
            } else {
              this.$message.warning('操作方法函数体为空')
            }
            break
            // 按钮组
          case '3':

            break
            // 分割线
          case '4':

            break

          default:
            break
        }
      } else if (interfaceData.linkflag === '2') {
        // 修改个人信息数据
        this.shareData.v_UserName = this.userName
        this.shareData.v_UserID = this.fromData.v_UserID
        this.shareData.i_TelNotify = this.fromData.i_TelNotify
        this.shareData.v_Mobile = this.fromData.v_Mobile
        this.shareData.v_WechatID = this.fromData.v_WechatID
        this.shareData.i_Id = this.fromData.i_Id
        this.shareData.v_Email = this.fromData.v_Email
        // 弹框配置数据
        this.dialogConfigData.v_Code = interfaceData.code
        this.dialogConfigData.v_CateCode = interfaceData.catecode
        this.dialogConfigData.i_Cate = interfaceData.cate
        this.dialogConfigData.operationcode = interfaceData.operationcode
        this.ifDialog = true
      }
    },
    // 显示操作事件
    changeIfDialog (val) {
      this.ifDialog = val
    },
    // 账号自锁
    switchIsselflock (row) {
      this.fromData = Object.assign({}, row)
      this.modifyUserInfo()
    },
    // 邮箱通知
    switchIsemail (row) {
      this.fromData = Object.assign({}, row)
      this.modifyUserInfo()
    },
    // 短信通知
    switchIsmobile (row) {
      this.fromData = Object.assign({}, row)
      this.modifyUserInfo()
    },
    // 微信通知
    switchIswechat (row) {
      this.fromData = Object.assign({}, row)
      this.modifyUserInfo()
    },

    // 跳转到修改密码页面
    rotuerLink () {
      let modifyPwd = {
        id: '473',
        parentpageid: '10443',
        pageid: '10445',
        pathcode: ',10443,10442',
        pagename: '修改密码',
        pageurl: '/sys/stdFormControl/CC_FM_userPwd_M',
        cate: '1',
        catecode: 'CC_FM',
        code: 'CC_FM_userPwd_M',
        pagetypeval: '1',
        viewid: '',
        viewpath: '',
        iconurl: 'iconfont icon-mimacelve',
        seliconurl: '',
        ismenu: '1',
        needauthorized: '0',
        enableagent: '0',
        isexpand: '0',
        ishidenavigator: '0',
        isdisabled: '0',
        openmode: '0',
        sortno: '25',
        description: '用于用户修改个人密码',
        status: '1',
        creator: 'admin',
        createtime: '2019-10-30 11:57:52',
        lastmodifieduser: 'admin',
        lastmodifiedtime: '2019-10-31 17:16:22',
        level: 3,
        leaf: true
      }
      this.$root.$children[0].$children[0].routerLink(modifyPwd)
      // this.$root.$children[0].$children[0].firstMenuID = '10442'
      // this.$root.$children[0].$children[0].secondMenuID = '10443'
      // this.$root.$children[0].$children[0].pageid = '10445'
    },
    // 上传图片
    handleUpload1Success (res, file) {
      this.progress1 = false
      if (res.code === 0) {
        this.picurl = res.picurl
        // this.fromData.header = res.pic
        this.fromData.picurl = res.picurl
        this.fromData.v_Header = res.pic
        cgiService.temUpdatedUserInfo(this.fromData).then(res => {
          if (res.code === 0) {
            this.$message.success(res.msg)
            this.$store.state.userInfo.userheader = this.fromData.picurl
            this.getUserInfoConfig()
          } else {
            this.$message.error(res.msg)
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
    getUserInfoConfig () {
      cgiService.getUserInfoConfig().then(res => {
        if (res) {
          this.fromData = res.data
        }
      })
    },
    // dialog关闭提示z
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
    modifyUserInfo () {
      cgiService.modifyUserInfo(this.fromData).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          this.getUserInfoConfig()
        }
      })
    }
  },
  components: {
    dialogStandard
  }
}
</script>
<style lang="scss" scoped>

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
    background: url("../../../assets/images/infobackground.png");
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
            background: url("../../../assets/images/infobackgroundd.png");
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
          padding-left: 120px;
          .mian-left {
            .el-row {
              width: 365px;
              height: 30px;
              line-height: 30px;
              .my-info {
                width: 56px;
                height: 19px;
                font-family: "微软雅黑";
                font-size: 16px;
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
              // margin-bottom: 14px;
              .org-info {
                width: 56px;
                height: 19px;
                font-family: "微软雅黑";
                font-size: 16px;
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
            .org-box {
              padding: 0 30px;
              >span {
                color: #999999;
              }
              .msg-num {
                  display: inline-block;
                  height: 20px;
                  line-height: 20px;
                  box-sizing: border-box;
                  margin-left: 20px;
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
.upload-demo /deep/ .el-upload  {
  width: 100%
}
</style>
