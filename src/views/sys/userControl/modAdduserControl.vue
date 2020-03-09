<!-- 用户管理-基本信息 -->
<template>
  <div class="mod-add-userControl">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="metaForm" :model="modeAddData" :rules="rules" label-width="128px">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i>
          <span>基本信息</span>
        </span>
        <div class="conBox">
          <el-form-item label="用户账号" prop="v_UserID">
            <el-input
              v-model="modeAddData.v_UserID"
              :disabled="editing"
              placeholder="仅英文、数字和下划线组合"
            />
          </el-form-item>
          <el-form-item label="用户名" prop="v_UserName">
            <el-input v-model="modeAddData.v_UserName" />
          </el-form-item>
          <el-form-item label="用户类型" prop="i_UserType">
            <el-select v-model="modeAddData.i_UserType" placeholder="请选择">
              <el-option
                v-for="(item,key) in userTypeList"
                :key="key"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属机构" v-if="modeAddData.i_UserType === '1'" prop="v_OrgCode">
            <el-select v-model="modeAddData.v_OrgCode" filterable placeholder="请选择">
              <el-option
                v-for="(item,key) in orgList"
                :value="item.orgcode"
                :key="key"
                :label="item.orgfullname"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司邮箱" prop="v_companyEmail">
            <el-input
              v-model="modeAddData.v_companyEmail"
            />
          </el-form-item>
          <el-form-item label="个人邮箱" prop="v_Email">
            <el-input
              v-model="modeAddData.v_Email"
            />
          </el-form-item>
          <el-row>
            <el-col :span='12'>
            <el-form-item label="手机号" prop="v_Mobile" class="special-input">
            <el-input
              v-model="modeAddData.v_Mobile"
            />
          </el-form-item>
          </el-col>
           <el-col :span='12'>
            <el-form-item label="微信号" label-width="78px" prop="v_WechatID" class="special-input">
            <el-input
              v-model="modeAddData.v_WechatID"
            />
          </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述" prop="v_Description" class='description-label'>
            <el-input
              v-model="modeAddData.v_Description"
              placeholder="可填写相关描述，备注。"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
        </div>
       </div>
        <div class="border-box">
        <span>
          <i class="iconfont icon-shezhi"></i>
          <span>设置</span>
        </span>
        <div class="conBox switchBox">
          <el-row>
            <el-col :span="10">
              <el-form-item label="账号启用" prop="i_ActiveFlag">
                <el-switch
                  v-model="modeAddData.i_ActiveFlag"
                  active-value="1"
                  inactive-value="0"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="账号锁定" prop="i_LockFlag">
                <el-switch
                  v-model="modeAddData.i_LockFlag"
                  active-value="1"
                  inactive-value="0"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="下次登录改密" prop="i_NextUpdatePwd">
                <el-switch
                  v-model="modeAddData.i_NextUpdatePwd"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="多重登录">
                <el-switch
                  v-model="modeAddData.i_MultiLogin"
                  active-value="1"
                  inactive-value="0"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="重置密码">
                <el-switch
                  v-model="resetpwd"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="设为管理员">
                <el-switch
                  v-model="modeAddData.i_AdminFlag"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item v-if="resetpwd === '1'" label="新密码" prop="v_Pwd">
            <el-input v-model="modeAddData.v_Pwd" type="password" />
          </el-form-item>
        </div>
        </div>
        <div class="border-box">
        <span >
          <i class="iconfont icon-shezhi"></i>
          <span>策略与有效期</span>
        </span>
        <div class="conBox">
          <!-- 访问 和 密码 需要获取下拉列表 让用户选择 -->
          <el-form-item label="访问策略" prop="v_APcode">
            <el-select v-model="modeAddData.v_APcode" placeholder="请选择" filterable>
              <el-option
                v-for="(item, index) in metaFormoption"
                :key="index"
                :label="item.v_APname"
                :value="item.v_APcode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码策略" prop="v_PPcode">
            <el-select v-model="modeAddData.v_PPcode" placeholder="请选择" filterable>
              <el-option
                v-for="(item,key) in pwdList"
                :key="key"
                :label="item.v_PPname"
                :value="item.v_PPcode"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 密码失效和生效日期 都需要使用日期格式输入框 -->
          <el-form-item label="账号有效期" prop="userStartTime" id="userid-time">
            <el-date-picker
              v-model="userStartTime"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="密码有效期" prop="pwdEndTime" id="userpwd-time">
            <el-date-picker
              v-model="pwdEndTime"
              type="datetimerange"
              :picker-options="pickerOptions2"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              :default-time="['12:00:00', '08:00:00']"
              :clearable="false"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="密码已输错次数" prop="i_PwdTryCount">
            <el-row>
              <el-col :span="5">
                <el-input v-model="modeAddData.i_PwdTryCount" type="text" disabled />
              </el-col>
              <el-col :span="6">
                <span class="clearBox">
                  <el-button type="text" @click="clearBox">
                    <i class="iconfont icon-gengxinjilu"></i>错误清零
                  </el-button>
                </span>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
        </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import { mixin } from '@/assets/js/base.js'
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import actionBar from '@/components/stdDialog/actionBar'
export default {
  name: 'modAdduserControl',
  props: {
    configData: Object,
    shareData: Object
  },
  mixins: [mixin, windowRed, logMixin],
  data () {
    // 账户正则匹配
    var changeUserID = (rule, value, callback) => {
      let mobileVerify = /^[a-zA-Z][a-zA-Z0-9_]*$/
      setTimeout(() => {
        if (!mobileVerify.test(value)) {
          callback(new Error('请输入正确的用户账号'))
        } else {
          callback()
        }
      }, 200)
    }
    // 手机正则匹配
    var changeUserMobile = (rule, value, callback) => {
      let mobileVerify = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!value) {
        callback()
      }
      setTimeout(() => {
        if (!mobileVerify.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 200)
    }
    // 邮箱正则匹配
    var changeUserEmail = (rule, value, callback) => {
      let mobileVerify = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (!value) {
        callback()
      }
      setTimeout(() => {
        if (!mobileVerify.test(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      // 机构列表
      orgList: [],
      // 访问策略管理
      metaFormoption: [],
      // 密码策略管理
      pwdList: [],
      // 表单绑定数据
      modeAddData: {
        i_ActiveFlag: '0',
        i_LockFlag: '0',
        i_MultiLogin: '0',
        i_AdminFlag: '0',
        i_NextUpdatePwd: '0'
      },
      resetpwd: '0',
      // 账号有效期起始时间
      userStartTime: [],
      // 密码有效期起始时间
      pwdEndTime: [],
      // 用户账号是否禁用
      editing: false,
      // 添加验证规则
      rules: {
        v_UserID: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { validator: changeUserID, trigger: 'blur' }
        ],
        v_UserName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 15, message: '长度不可超出15个字符', trigger: 'blur' }
        ],
        v_OrgCode: [
          { required: true, message: '请输入所属机构', trigger: 'blur' }
        ],
        // v_APcode: [
        //   { required: true, message: '请输入所属机构', trigger: 'blur' }
        // ],
        // v_PPcode: [
        //   { required: true, message: '请输入所属机构', trigger: 'blur' }
        // ],
        v_Pwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        i_UserType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        v_companyEmail: [
          { required: true, message: '请输入公司邮箱', trigger: 'blur' },
          { validator: changeUserEmail, trigger: 'blur' }
        ],
        v_Mobile: [
          { validator: changeUserMobile, trigger: 'blur' }
        ],
        v_Email: [
          { validator: changeUserEmail, trigger: 'blur' }
        ]
      },
      // 用户类型列表
      userTypeList: [
        {
          value: '1',
          label: '内部员工'
        },
        {
          value: '2',
          label: '外部用户'
        },
        {
          value: '3',
          label: '系统账号'
        }
      ],
      // 选择日期
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      // 小红点功能
      oldModAddData: {},
      oldUserStartTime: [],
      oldPwdEndTime: []
    }
  },
  watch: {
    modeAddData: {
      handler (data) {
        // delete this.oldModAddData.activeName
        // delete data.activeName
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    userStartTime: {
      handler (data) {
        if (JSON.stringify(this.oldUserStartTime) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    },
    pwdEndTime: {
      handler: function (data) {
        if (JSON.stringify(this.oldPwdEndTime) !== JSON.stringify(data)) {
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
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.modeAddData = {
        ...formData
      }
      this.modeAddData = JSON.parse(JSON.stringify(formData))
      this.editing = true
      this.getPwdList()
      this.getVisitList()
      this.getOrgList()
      this.modeAddData.v_Pwd = ''
      this.$set(this.userStartTime, 0, this.modeAddData.d_Activedate)
      this.$set(this.userStartTime, 1, this.modeAddData.d_ExpiredDate)
      this.$set(this.pwdEndTime, 0, this.modeAddData.d_PwdActiveDate)
      this.$set(this.pwdEndTime, 1, this.modeAddData.d_PwdExpiredDate)
    } else if (confsBtn.operationcode === 'add') {
      this.editing = false
      this.getPwdList()
      this.getVisitList()
      this.getOrgList()
      // 新增用户设置默认的时间
      let start = new Date()
      let end = new Date()
      end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
      this.userStartTime = [start, end]
      this.pwdEndTime = [start, end]
    }
    this.$store.commit(
      'changeRowTabData',
      JSON.parse(JSON.stringify(this.modeAddData))
    )
    // this.$store.commit('changeRowTabData', this.modeAddData)
    this.oldModAddData = Object.assign({}, this.modeAddData)
    this.oldUserStartTime = this.userStartTime
    this.oldPwdEndTime = this.pwdEndTime
  },
  methods: {
    // 获取组织机构
    getOrgList () {
      cgiService.OrgList().then(res => {
        this.orgList = res.data
      })
    },
    getPwdList () {
      cgiService.temPwdList({ size: 500 }).then(res => {
        this.pwdList = res.data
      })
    },
    getPwdListName (code) {
      let ppname = ''
      this.pwdList.forEach(item => {
        if (code === item.ppcode) {
          ppname = item.ppname
          return false
        }
      })
      return ppname
    },
    // 密码输错次数清零
    clearBox () {
      this.modeAddData.i_PwdTryCount = 0
    },
    // 用户基本信息 添加/修改 提交
    commit () {
      this.$refs.metaForm.validate(valid => {
        if (valid) {
          this.modeAddData.d_Activedate = this.userStartTime[0]
          this.modeAddData.d_ExpiredDate = this.userStartTime[1]
          this.modeAddData.d_PwdActiveDate = this.pwdEndTime[0]
          this.modeAddData.d_PwdExpiredDate = this.pwdEndTime[1]

          let params = this.modeAddData
          // 给switch开关设置默认值
          if (!this.modeAddData.i_ActiveFlag) {
            this.modeAddData.i_ActiveFlag = '0'
          }
          if (!this.modeAddData.i_NextUpdatePwd) {
            this.modeAddData.i_NextUpdatePwd = '0'
          }
          if (!this.modeAddData.i_LockFlag) {
            this.modeAddData.i_LockFlag = '0'
          }
          if (!this.modeAddData.i_MultiLogin) {
            this.modeAddData.i_MultiLogin = '0'
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.temUserControlSaveData2(params).then(res => {
            if (!res.code) {
              // 关闭红点提示
              this.isReminder = true
              this.$message.success('操作成功')
              this.oldModAddData = Object.assign({}, this.modeAddData)
              if (res.iId > 1) {
                this.modeAddData.i_Id = res.iId
                this.stdFormData = Object.assign({}, this.modeAddData)
                this.$emit('title', '修改用户')
              }
              // 把提交的数据保存到vuex，用于权限tab
              this.$store.commit('rowData', JSON.parse(JSON.stringify(this.modeAddData)))
              // 重新刷新视图数据
              this.$emit('getTableData')
              // 取消tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              // 把修改的数据存入vuex中  方便返回给其他的Tab页
              this.$store.commit('changeRowTabData', this.modeAddData)
              // 用户账号置灰
              this.editing = true
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    // 获取访问策略编码
    getVisitList () {
      let parmas = {
        size: 500
      }
      cgiService.temAccessList(parmas).then(res => {
        this.metaFormoption = res.data
      })
    },
    getVisitListName (code) {
      let apname = ''
      this.metaFormoption.forEach(item => {
        if (code === item.apcode) {
          apname = item.apname
          return false
        }
      })

      return apname
    },
    clearError () {
      this.$emit('getButtonConfig', false)
      this.modeAddData = {}
      this.$refs.metaForm.resetFields()
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.mod-add-userControl {
  height: 100%;
  display: flex;
  flex-direction: column;
  .el-form {
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
    border: none !important;
    padding: 0px 14px 14px 14px;
     .border-box {
        border: 1px solid #BFBFBF;
        position: relative;
        margin-top: 15px;
        > span {
            position: absolute;
            top: -10px;
            left: 20px;
            padding: 0 4px;
            background: #ffffff;
        }
        .conBox {
            margin: 0;
            padding: 10px 80px;
        }
      }
  }
}
.switchBox /deep/ .el-form-item__content {
  width: auto;
}
.conBox /deep/ .el-input__inner {
        padding-right: 30px;
      }
.special-input /deep/ .el-form-item__content {
    width:  140px
}
#userid-time,#userpwd-time{
  .el-input__inner{
    padding-right: 0;
  }
}
</style>
