<!-- 修改密码页面 -->
<template>
  <div class="pwdBox">
    <div class="pwdCentenBox">
      <div class="form-box">
        <div class="header-box">
          <div class="img-box">
            <img :src="userInfo" alt />
          </div>
          <div class="username">
            <span class="name">{{userName}}</span>
            <span class="userID">{{userID}}</span>
          </div>
        </div>
        <el-form inline-message :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <div class="pwdTitle">
            <span>
              <i class="iconfont icon-xiugaimima"></i> 修改密码
            </span>
          </div>
          <el-form-item label="旧密码" prop="oldpasswd">
            <el-input type="password" v-model="ruleForm2.oldpasswd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpasswd">
            <el-input type="password" v-model="ruleForm2.newpasswd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confimpasswd">
            <el-input type="password" v-model="ruleForm2.confimpasswd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="pwd-btn" label-width="94px">
            <el-button
              v-for="(item,index) in configData.confOperation.tools"
              :key="index"
              type="primary"
              :id="'pwd-' + item.operationcode"
              @click="dialogButtonClick(item)"
              :disabled="item.isdisabled === '1'"
            >{{ item.operationname }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import util from '@/common/js/util.js'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'modifyUserPassword',
  mixins: [logMixin],
  props: {
    configData: Object
  },
  data () {
    // 判断旧密码的非法输入
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    // 判断新密码的非法输入
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.ruleForm2.confimpasswd !== '') {
          this.$refs.ruleForm2.validateField('confimpasswd')
        }
        callback()
      }
    }
    // 判断第二次输入的密码是否一至
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm2.newpasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单监听的数据
      ruleForm2: {
        oldpasswd: '',
        newpasswd: '',
        confimpasswd: ''
      },
      rules2: {
        oldpasswd: [{ validator: validatePass, trigger: 'blur' }],
        newpasswd: [{ validator: validatePass1, trigger: 'blur' }],
        confimpasswd: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created () {
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo.userheader
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
            let formFunctions = this.$store.state.formFunctions[this.configData.code]
            // 获取到函数名 和 参数
            // 这里的正则是判断是因为  行内传的值是后台接口中这个按钮的数据  工具条只传了方法名
            let funData = {}
            if (interfaceData.func) {
              funData = util.methodSplit(interfaceData.func)
              this.$store.commit('nowConf', funData.fncName)
              for (var key in formFunctions) {
                // 去除前后空格
                if (key === funData.fncName.replace(/(^\s*)|(\s*$)/g, '')) {
                  let params = {
                    that: this,
                    currentData: this.shareData,
                    cgiService
                  }
                  // 函数自调用
                  formFunctions[key](params)
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
      }
    },
    // 修改密码接口
    submitForm () {
      this.$refs.ruleForm2.validate(res => {
        if (res) {
          let params = this.ruleForm2
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.modifyUserPassword(params).then(res => {
            if (res.code === 0) {
              this.$refs.ruleForm2.resetFields()
              this.$message.success(res.msg)
              this.ruleForm2 = {}
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 重置事件
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss">
.inner-content {
  .pwdBox {
    height: 100%;
    background: url("../../../assets/images/infobackground.png");
    padding-top: 8px;
    padding-bottom: 4px;
    border: 1px solid #87a9c7;
    box-sizing: border-box;
    .pwdCentenBox {
      margin: auto;
      width: 800px;
      background: #ffffff;
      height: 100%;
      box-shadow: -2px -1px 8px rgba(0, 0, 0, 0.26);
      .form-box {
        position: relative;
        .header-box {
          height: 122px;
          width: 100%;
          background: url("../../../assets/images/infobackgroundd.png");
          position: relative;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          .img-box {
            position: absolute;
            top: 58px;
            left: 44px;
            width: 90px;
            height: 110px;
            box-shadow: -2px -1px 8px rgba(0, 0, 0, 0.26);
            > img {
              width: 100%;
              height: 100%;
              border: 4px solid #ffffff;
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
            top: 148px;
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

      .demo-ruleForm {
        width: 460px;
        margin: auto;
        padding-top: 80px;
        .pwdTitle {
          margin-bottom: 20px;
          padding-left: 20px;
          > span {
            font-size: 16px;
            > i {
              font-size: 22px;
              vertical-align: middle;
            }
          }
        }
        .el-form-item {
          margin-bottom: 8px;
          .el-input__inner {
            height: 30px;
            width: 220px;
            margin-left: 10px;
          }
          .el-input {
            .el-input__suffix {
              position: absolute;
              left: 127px;
              top: 0px;
              vertical-align: middle;
            }
          }
          .el-form-item__error {
            // 2020-1-9 样式走查修改
            // position: absolute;
            // top: 20%;
            // left: 0;
          }
        }
        .pwd-btn {
          .el-form-item__content {
            padding-left: 98px;
            > button {
              padding: 6px 17px;
              &.el-button--primary {
                background-image: linear-gradient(
                  180deg,
                  rgba(93, 162, 239, 1) 0%,
                  rgba(43, 142, 209, 1) 100%
                );
              }
            }
            .el-button:first-of-type {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.pwd-btn {
  button {
    height: 32px;
  }
  /deep/ #pwd-resetPwd {
    background: white;
    background-image: none;
    color: black;
    border: 1px solid #e6e6e6;
  }
}
</style>
