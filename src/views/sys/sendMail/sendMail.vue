<!-- 邮件发送-新增/修改 表单 -->
<template>
  <div class="add-modify-form send-mail-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        @sumitForm="commit"
        v-on="$listeners"
        :formRed="formRed"
      ></action-bar>
    </div>
    <el-form
      label-position="right"
      inline-message
      label-width="85px"
      ref="ruleForm"
      :model="currentData"
      :rules="rules"
      class="send-mail">
      <div class="info-content" id="send-mail-baseinfo">
        <span class="form-title">
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="form-content">
          <el-row class="m-0">
            <el-col :span="12">
              <el-form-item label="邮件类型"  prop="v_EmailType">
                <!-- 时间类型 1-立即 2定时 -->
                <el-radio v-model="currentData.v_EmailType" label="1">系统邮件</el-radio>
                <el-radio v-model="currentData.v_EmailType" label="2">自建邮件</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮件编码" prop="v_EmailCode">
                <el-input v-model="currentData.v_EmailCode" autocomplete="off" :disabled="disableCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="邮件模板" :prop="currentData.v_EmailType === '1' ? 'v_TemplateCode' : ''">
                <el-select v-model="currentData.v_TemplateCode" placeholder="请选择" @focus="getTemplateList" clearable>
                  <el-option
                    v-for="item in mailList"
                    :key="item.value"
                    :label="item.v_TemplateName"
                    :value="item.v_TemplateCode"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发件人" class="send-radio" prop="v_SendEmail">
                <el-select v-model="currentData.v_SendEmail" placeholder="请选择" @focus="getEnumData">
                  <el-option
                    v-for="item in sendNameList"
                    :key="item.value"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="info-content" id="send-mail-content">
        <div class="form-content">
            <span class="form-title">
            <i class="iconfont icon-jibenxinxi"></i> 邮件内容
            </span>
          <el-row class="h-30 m-0">
            <el-col :span="8">
              <el-form-item label="接收类型" prop="i_ReceiveCategory" class="w-190">
                <!-- 发送类型 1全部 2个人 3分组 4管理组织 -->
                <el-select
                  v-model="currentData.i_ReceiveCategory"
                  filterable
                  placeholder>
                  <el-option
                    v-for="item in receiveList"
                    :key="item.v_EnumValue"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="合并接收人" label-width="100px">
                <el-switch
                  v-model="currentData.i_IsMargeSend"
                  active-color="#32c5d2"
                  inactive-color="#e6e7e8"
                  active-value="1"
                  inactive-value="0"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收人">
                <el-select
                  multiple
                  v-model="userArr"
                  filterable
                  collapse-tags
                  placeholder
                  v-if="currentData.i_ReceiveCategory === '1'"
                  :disabled="currentData.i_ReceiveCategory === '1'">
                  <el-option
                    v-for="item in userList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  multiple
                  collapse-tags
                  filterable
                  v-model="orgArr"
                  placeholder="请选择组织"
                  v-else-if="currentData.i_ReceiveCategory === '4'"
                >
                  <el-option
                    v-for="item in orgList"
                    :key="item.value"
                    :label="item.v_OrgShortName"
                    :value="item.v_OrgCode"
                  ></el-option>
                </el-select>
                <el-select
                  multiple
                  filterable
                  collapse-tags
                  v-model="groupArr"
                  placeholder="请选择分组"
                  v-else-if="currentData.i_ReceiveCategory === '3'"
                >
                  <el-option
                    v-for="item in groupList"
                    :key="item.value"
                    :label="item.v_GrpName"
                    :value="item.v_GrpCode"
                  ></el-option>
                </el-select>
                <el-select
                  multiple
                  v-model="personArr"
                  collapse-tags
                  filterable
                  placeholder="请选择用户"
                  v-else-if="currentData.i_ReceiveCategory === '2'"
                >
                  <el-option
                    v-for="item in personList"
                    :key="item.value"
                    :label="item.v_UserName"
                    :value="item.v_UserID"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="发送类型" prop="i_SendType">
                <el-radio v-model="currentData.i_SendType" label="1" v-if="currentData.v_EmailType === '1'">按规则发送</el-radio>
                <el-radio v-model="currentData.i_SendType" label="0" v-if="currentData.v_EmailType === '1'">无规则</el-radio>
                <el-radio v-model="currentData.i_SendType" label="2" v-if="currentData.v_EmailType === '2'">立即发送</el-radio>
                <el-radio v-model="currentData.i_SendType" label="3" v-if="currentData.v_EmailType === '2'">定时发送</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发送规则" :prop="currentData.i_SendType === '0' ? '' : 'v_Rule'" v-if="currentData.v_EmailType === '1'">
                <el-select v-model="currentData.v_Rule" placeholder="请选择" @focus="getEnumData" :disabled="currentData.i_SendType === '0'">
                  <el-option
                    v-for="item in ruleList"
                    :key="item.value"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发送时间" label-width="85px" id="mail-data-pick" :prop="currentData.i_SendType === '2' ? '' : 'd_SendDate'" v-if="currentData.v_EmailType === '2'">
                <el-date-picker
                  :disabled="currentData.i_SendType === '2'"
                  :disabledDate="disabledDate"
                  clearable
                  v-model="currentData.d_SendDate"
                  :picker-options="fastPickTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="请选择日期时间"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="邮件主题" class="h-30" prop="v_Title">
            <el-input v-model="currentData.v_Title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮件正文" class="h-30">
            <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
              <span class="flexibleIcon1">
                <i class="iconfont icon-dongcanbiaoshi"></i>
              </span>
            </el-tooltip>
            <span class="warning-msg">系统邮件请谨慎修改动参，避免发送信息有误</span>
          </el-form-item>
          <quill-editor
            v-model="currentData.v_SendContent"
            ref="myQuillEditor"
            :placeholder="placeholder"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
export default {
  name: 'notification',
  mixins: [logMixin, windowRed],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      rules: {
        v_EmailType: [
          { required: true, message: '请选择邮件类型', trigger: 'blur' }
        ],
        v_EmailCode: [
          { required: true, message: '请输入邮件编码', trigger: 'blur' }
        ],
        v_TemplateCode: [
          { required: true, message: '请选择邮件模板', trigger: 'blur' }
        ],
        v_SendEmail: [
          { required: true, message: '请选择发件人', trigger: 'blur' }
        ],
        i_ReceiveCategory: [
          { required: true, message: '请输选择接收类型', trigger: 'blur' }
        ],
        i_SendType: [
          { required: true, message: '请输选择发送类型', trigger: 'blur' }
        ],
        v_Rule: [
          { required: true, message: '请输选择发送规则', trigger: 'blur' }
        ],
        d_SendDate: [
          { required: true, message: '请输选择发送时间', trigger: 'blur' }
        ],
        v_Title: [
          { required: true, message: '请输入邮件主题', trigger: 'blur' }
        ]
      },
      editorOption: {
        debug: 'info',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      },
      placeholder: 'Compose an epic...',
      readOnly: true,
      theme: 'snow',
      content: '',
      // 当前行的数据
      currentData: {
        // 邮件类型
        v_EmailType: '1',
        // 接收类型
        i_ReceiveCategory: '1',
        // 按规则发送
        i_SendType: '1',
        // 合并接收人
        i_IsMargeSend: '1',
        d_SendDate: '',
        // 邮件模板
        v_TemplateCode: '',
        // 邮件主题
        v_Title: '',
        // 发送规则
        v_Rule: '',
        // 发件人
        v_SendEmail: ''
      },
      // 消息发送时间
      sendTime: '',
      // 发送时间置灰
      disabledDate: true,
      // 发送人list
      sendNameList: [],
      // 发送规则list
      ruleList: [],
      // icon图标list
      iconList: [],
      // icon背景色list
      mailList: [{ value: 'red', label: '红色' }],
      // 选择日期
      fastPickTime: {
        disabledDate (time) {
          const oneDay = 3600 * 1000 * 24
          return time.getTime() <= Date.now() - oneDay
        }
      },
      // 用户数组
      userArr: [],
      // 用户数据
      userList: [],
      // 组织数组
      orgArr: [],
      // 组织数据
      orgList: [],
      // 分组数组
      groupArr: [],
      // 分组数据
      groupList: [],
      // 个人数组
      personArr: [],
      // 个人数据
      personList: [],
      oldModAddData: {
        // 邮件类型
        v_EmailType: '1',
        // 接收类型
        i_ReceiveCategory: '1',
        // 按规则发送
        i_SendType: '1',
        // 合并接收人
        i_IsMargeSend: '1',
        d_SendDate: '',
        v_Title: ''
      },
      formRed: false,
      disableCode: false,
      receiveList: []
    }
  },
  computed: {
    ...mapState({
      // 管理员标识符
      isAdmin: state => state.userInfo.isadministrators
    }),
    templateCode () {
      return this.currentData.v_TemplateCode
    },
    // sendEmail () {
    //   return this.currentData.v_SendEmail
    // },
    emailType () {
      return this.currentData.v_EmailType
    }
  },
  watch: {
    currentData: {
      deep: true,
      handler (nVal) {
        if (nVal.hasOwnProperty('i_ReceiveCategory')) {
          switch (nVal.i_ReceiveCategory) {
            case '2':
              // 个人用户
              cgiService.temAgentUserList().then(res => {
                this.personList = res.data
              })
              break
            case '3':
              // 所在的分组
              cgiService.getTemgroupList().then(res => {
                this.groupList = res.data
              })
              break
            case '4':
              // 管理的组织
              cgiService.getUserOrgList().then(res => {
                this.orgList = res.data
              })
              break

            default:
              break
          }
        }
        if (nVal.hasOwnProperty('i_SendType')) {
          if (nVal.i_SendType === '2') {
            this.currentData.d_SendDate = ''
            this.oldModAddData.d_SendDate = ''
          }
        }
        if (nVal.hasOwnProperty('i_Id')) {
          this.$set(this.oldModAddData, 'i_Id', Number(this.oldModAddData.i_Id))
          this.$set(nVal, 'i_Id', Number(nVal.i_Id))
        }
        if (JSON.stringify(nVal) !== JSON.stringify(this.oldModAddData)) {
          // 小红点
          this.formRed = true
        }
      }
    },
    templateCode (nVal) {
      this.mailList.forEach(item => {
        if (item.v_TemplateCode === nVal) {
          this.currentData.v_SendContent = item.v_Content
          this.currentData.v_Title = item.v_Title
        }
      })
    },
    emailType (nVal) {
      if (Number(nVal) === 2) {
        this.currentData.i_SendType = '2'
      } else {
        this.currentData.i_SendType = '1'
      }
    }
  },
  created () {
    // this.getSendName()
    // this.getEnumData()
    // this.getMailReceive()
    this.currentData.i_ReceiveCategory = this.isAdmin ? '1' : '4'
    this.queryComponents({ enumCode: ['emailConfig', 'emailRule', 'mailReceive'] })
    if (this.buttonConfig.operationcode === 'modify') {
      this.getTemplateList()
      // 编码置灰
      this.disableCode = true
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.currentData.v_EmailType = formData.v_EmailType
      this.currentData.v_EmailCode = formData.v_EmailCode
      this.currentData.v_TemplateCode = formData.v_TemplateCode
      this.currentData.v_SendEmail = formData.v_SendEmail
      this.currentData.i_ReceiveCategory = formData.i_ReceiveCategory
      this.currentData.i_SendType = formData.i_SendType
      this.currentData.v_Rule = formData.v_Rule
      this.currentData.d_SendDate = formData.d_SendDate
      this.currentData.v_Title = formData.v_Title
      this.currentData.v_SendContent = formData.v_SendContent
      this.currentData.v_ReceiveObjects = formData.v_ReceiveObjects
      this.currentData.i_Id = formData.i_Id
      if (this.currentData.d_SendDate === '0000-00-00 00:00:00') {
        // 设置定时发送字段为空
        this.currentData.d_SendDate = ''
      }
      // 拿到接收人的字符串，解析成数组
      if (Number(this.currentData.i_ReceiveCategory) !== 1 && this.currentData.v_ReceiveObjects.length > 0) {
        this.splitData(this.currentData.v_ReceiveObjects, this.currentData.i_ReceiveCategory)
      }
    }
    this.oldModAddData = Object.assign({}, this.currentData)
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},
    saveHtml () {},
    commit () {
      switch (this.currentData.i_ReceiveCategory) {
        case '1':
          // 全部用户
          this.joinData()
          break
        case '2':
          // 个人用户
          if (!this.personArr.length) {
            this.$message.warning('接收人不能为空')
            return
          }
          this.joinData(this.personArr)
          break
        case '3':
          // 所在的分组
          if (!this.groupArr.length) {
            this.$message.warning('接收人不能为空')
            return
          }
          this.joinData(this.groupArr)
          break
        case '4':
          // 管理的组织
          if (!this.orgArr.length) {
            this.$message.warning('接收人不能为空')
            return
          }
          this.joinData(this.orgArr)
          break

        default:
          break
      }
      if (this.currentData.i_ReceiveCategory === '1') {
        this.$confirm('是否确定保存？若收件人为全部用户，发送耗时较长，严重可能导致系统宕机。', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', showClose: false, closeOnClickModal: false
        }).then(() => {
          this.commitData()
        })
      } else {
        this.commitData()
      }
    },
    joinData (data) {
      if (data) this.currentData.v_ReceiveObjects = data ? data.join(',') : ''
    },
    commitData () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.currentData.i_SendType === '3' && this.currentData.d_SendDate.length === 0) {
            this.$message.warning('请选择发送时间')
            return
          } else {
            let sendDate = this.currentData.d_SendDate
            let currentData = new Date()
            if (new Date(sendDate).getTime() < currentData.getTime()) {
              this.$message.warning('发送时间不可早于当前时间')
              return
            }
          }
          // 如果选择了无规则，就不传发送规则字段
          if (this.currentData.i_SendType === '0') delete this.currentData.v_Rule
          if (!this.currentData.v_SendContent) {
            this.$message.warning('邮件发送内容不能为空')
            return
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.currentData.logParams = this.getLogParams()
          }
          this.sendNameList.forEach(item => {
            if (item.v_EnumValue === this.sendEmail) {
              this.currentData.v_SendName = item.v_EnumValueName
            }
          })
          cgiService.sysEmailSaveData(this.currentData).then(res => {
            if (res.code === 0) {
              this.disableCode = true
              this.oldModAddData = Object.assign({}, this.currentData)
              this.formRed = false
              this.$message.success(res.msg)
              this.currentData.i_Id = res.iId
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_sendMail'])
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    splitData (data, category) {
      let dataList = data.split(',')
      switch (category) {
        case '2':
          // 个人用户
          this.personArr = dataList
          break
        case '3':
          // 所在的分组
          this.groupArr = dataList
          break
        case '4':
          // 管理的组织
          this.orgArr = dataList
          break

        default:
          break
      }
    },
    // 获取模板列表
    getTemplateList () {
      cgiService.sysEmailTemplateList().then(res => {
        if (res.code === 0) {
          this.mailList = res.data
        }
      })
    },
    getSendName () {
      this.queryComponents({ enumCode: 'emailRule' })
    },
    getEnumData () {
      this.queryComponents({ enumCode: 'emailConfig' })
    },
    getMailReceive () {
      this.queryComponents({ enumCode: 'mailReceive' })
    },
    // 获取组件
    queryComponents (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            switch (key) {
              case 'emailConfig':
                this.sendNameList = res.data[key]
                break
              case 'emailRule':
                this.ruleList = res.data[key]
                break
              case 'mailReceive':
                this.receiveList = res.data[key]
                break

              default:
                break
            }
          }
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
.send-mail {
  padding: 18px 16px;
  .h-30{
    /deep/ .el-form-item__content{
      height: 30px;
    }
  }
  .mail-data-pick{
      /deep/ .el-input__inner{
          padding-left: 30px;
      }
  }
  .form-title {
    position: absolute;
    top: -10px;
    left: 8px;
    padding: 0 8px;
    background: #ffffff;
    font-size: 14px;
  }
  .info-content {
    position: relative;
    padding: 16px 40px;
    border: 1px solid #bfbfbf;
    &:last-of-type{
        margin-top: 16px;
    }
  }
  #send-mail-baseinfo,#send-mail-content {
    /deep/ .m-0 .el-form-item {
      margin-top: 0;
    }
    &#send-mail-content{
    .flexibleIcon1{
      top: 0;
    }
    .warning-msg{
      color: #FF5757;
      margin-left: 6px;
    }
  }
  }
  .flexibleIcon1  {
     left: -24px;
  }
  .send-radio {
    /deep/ .el-radio {
      margin-right: 18px;
    }
  }
  .mail-title {
    display: inline-block;
    margin: 16px 0 8px;
    i {
      margin-left: 5px;
    }
  }
  /deep/ .ql-editor {
    height: 280px;
  }
  #mail-data-pick{
      /deep/ .el-input__inner{
          padding-left: 30px;
      }
  }
}
</style>
