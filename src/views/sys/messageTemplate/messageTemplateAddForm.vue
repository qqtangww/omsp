<!-- 消息模板-添加、修改表单-->
<template>
  <!-- 弹框基本信息 -->
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        :formRed="formRed"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      inline-message
      label-position="right"
      label-width="100px"
      :rules="rules"
      ref="modAddData"
      :model="modAddData">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="conBox">
          <el-row>
            <el-col :span="12">
              <el-form-item label="模板类型" prop="v_TemplateType">
                <el-select placeholder="请选择模板类型" v-model="modAddData.v_TemplateType" @change="tempalteChange">
                  <el-option
                    v-for="(item,index) in templateCategory"
                    :key="index"
                    :label="item.v_EnumValue"
                    :value="item.v_EnumValueName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模板接口">
                <el-input v-model="modAddData.v_InterfaceApi"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="模板编码" prop="v_TemplateCode">
                <el-input v-model="modAddData.v_TemplateCode" :disabled="disableCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="模板名称" prop="v_TemplateName">
                <el-input v-model="modAddData.v_TemplateName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="描述" class='description-label'>
            <el-input
              v-model="modAddData.v_Description"
              placeholder="请输入"
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </div>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 系统消息
        </span>
        <div class="conBox" id="msg-template-content">
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="16">
                  <el-form-item
                    label="发送类型"
                    prop="v_MsgRule">
                    <el-radio-group v-model="modAddData.v_MsgRule">
                      <!-- 发送类型 1立即执行 3定期规则执行 -->
                      <el-radio label="1" v-if="modAddData.v_TemplateType !== 'sysMsg'">立即发送</el-radio>
                      <el-radio label="3">按定期规则发送</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="modAddData.v_TemplateType === 'emailMsg'">
                  <el-form-item label="密送发送">
                    <el-switch
                      v-model="modAddData.i_IsBcc"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item
                    label="消息图标"
                    prop="v_Icon"
                    id="icon-preview-box">
                    <el-row>
                      <el-col :span="24">
                        <el-select placeholder="默认" v-model="modAddData.v_Icon">
                          <el-option
                            v-for="(item,index) in optionsIcon"
                            :key="index"
                            :label="item.v_EnumValue"
                            :value="item.v_EnumValue">
                            <span>
                              <i :class="item.v_EnumValue" />
                            </span>
                          </el-option>
                        </el-select>
                        <div id="icon-preview">
                          <i :class="modAddData.v_Icon" :style="`color:${modAddData.v_IconBgcolor}`" />
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item
                    label="图标背景色"
                    prop="v_IconBgcolor"
                    id="icon-preview-box">
                    <el-row>
                      <el-col :span="24">
                        <el-select placeholder="默认" v-model="modAddData.v_IconBgcolor">
                          <el-option
                            v-for="(item,index) in iconColorList"
                            :key="index"
                            :label="item.v_ParamValue"
                            :value="item.v_ParamValue"
                            style="padding: 5px 0 0 15px;">
                            <div id="icon-color-box" :style="`background-color:${item.v_ParamValue}`"></div>
                          </el-option>
                        </el-select>
                        <div id="icon-preview" class="icon-color">
                          <div v-if="modAddData.v_IconBgcolor" id="icon-color-box" :style="`background-color:${modAddData.v_IconBgcolor}`"></div>
                        </div>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-col :span="16">
                  <el-form-item label="接收类型" prop="i_ReceiveCategory" class="w-190">
                    <!-- 发送类型 1全部 2个人 3分组 4管理组织 -->
                    <el-select
                      v-model="modAddData.i_ReceiveCategory"
                      placeholder="请选择接收类型"
                      filterable>
                      <el-option
                        v-for="item in receiveList"
                        :key="item.v_EnumValue"
                        :label="item.v_EnumValueName"
                        :value="item.v_EnumValue"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="modAddData.v_TemplateType === 'emailMsg'">
                  <el-form-item label="合并收件人">
                    <el-switch
                      v-model="modAddData.i_IsMergeAddressee"
                      active-color="#32c5d2"
                      inactive-color="#e6e7e8"
                      active-value="1"
                      inactive-value="0"
                    ></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收人">
                <el-select
                  multiple
                  v-model="userArr"
                  filterable
                  collapse-tags
                  placeholder
                  v-if="modAddData.i_ReceiveCategory === '1'"
                  :disabled="modAddData.i_ReceiveCategory === '1'">
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
                  v-else-if="modAddData.i_ReceiveCategory === '4'">
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
                  v-else-if="modAddData.i_ReceiveCategory === '3'">
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
                  v-else-if="modAddData.i_ReceiveCategory === '2'">
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
          <el-form-item label="抄送人" v-if="modAddData.v_TemplateType === 'emailMsg'">
            <!-- <el-input v-model="modAddData.v_CopyPersons"></el-input> -->
            <el-select
              class="hidden-select"
              v-model="copyPersons"
              multiple
              :popper-append-to-body='false'
              filterable
              allow-create
              default-first-option
              placeholder="请输入抄送人邮箱">
            </el-select>
          </el-form-item>
          <el-form-item label="密送人" v-if="modAddData.v_TemplateType === 'emailMsg'">
            <el-select
              class="hidden-select"
              v-model="bccPersons"
              multiple
              :popper-append-to-body='false'
              filterable
              allow-create
              default-first-option
              placeholder="请输入密送人邮箱">
            </el-select>
          </el-form-item>
          <el-form-item label="消息标题" prop="v_Title">
            <el-input v-model="modAddData.v_Title"></el-input>
          </el-form-item>
          <el-form-item label="消息正文" class="h-30">
            <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
              <span class="flexibleIcon1">
                <i class="iconfont icon-dongcanbiaoshi"></i>
              </span>
            </el-tooltip>
            <span class="warning-msg">请谨慎修改正文内的动参，避免发送信息有误。</span>
          </el-form-item>
          <!-- <quill-editor
            v-model="modAddData.v_Content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor> -->
            <div class="editor-container">
                  <UE :defaultMsg='defaultMsg' :config='config' ref="ue"></UE>
              </div>
          <div class="config-export">
            <el-upload
              class="upload-demo"
              ref="upload"
              name='msg_file'
              multiple
              :action="actionUrl"
              :accept='accept'
              :limit='Number(maxFileCount)'
              :on-remove="handleRemove"
              :http-request="uploadFile"
              :before-upload="beforeUpload"
              :on-success='uploadSuccess'
              :file-list="fileList"
              :auto-upload="false"
              :on-change="onChange"
              :on-exceed="handleExceed">
              <el-button
                slot="trigger"
                size="small"
              ><i class="iconfont icon-tianjia"></i> 选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                @click="submitUpload"
              > <i class="iconfont icon-daoru"></i> 上传到服务器</el-button>
            </el-upload>
            <ul class="text-ul">
              <li class="text-li">1、请先选择文件路径，确定模板文件名正确，再上传至服务器</li>
              <li class="text-li">2、仅支持固定格式的Excel、Word文件。</li>
            </ul>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import axios from 'axios'
import UE from '@/ueditor/ueditor'
export default {
  name: 'messageTemplateAddForm',
  mixins: [logMixin, windowRed],
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
    // 编码正则匹配
    var commonCode = (rule, value, callback) => {
      let codeVerify = /^\w+$/
      setTimeout(() => {
        if (!codeVerify.test(value)) {
          callback(new Error('请输入由数字,英文,下划线组合'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      // 抄送人
      copyPersons: [],
      // 密送人
      bccPersons: [],
      fileList: [],
      multiple: false,
      // 文件上传类型（文件格式）【参数控制】
      accept: 'xlsx',
      actionUrl: '#',
      // 模板类型
      templateCategory: [],
      editorOption: {
        debug: 'info',
        placeholder: '请输入...',
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
        },
        defaultMsg: '测试',
        config: {
          serverUrl: 'http://test.io/php/controller.php?action=config',
          autoHeightEnabled: true,
          autoFloatEnabled: true
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
      modAddData: {
        // 模板接口
        v_InterfaceApi: '',
        // 抄送人
        v_CopyPersons: '',
        // 密送人
        v_BccPersons: '',
        // 是否合并收件人
        i_IsMergeAddressee: '',
        // 是否密送
        i_IsBcc: '',
        // 接收人
        v_ReceiveObjects: '',
        // 消息标题
        v_Title: '',
        // 发送类型
        v_MsgRule: '3',
        // 模板类型：默认系统消息 2019/12/31 lyh确认
        v_TemplateType: 'sysMsg',
        // 接收类型
        i_ReceiveCategory: '1',
        // 编码
        v_TemplateCode: '',
        // 名称
        v_TemplateName: '',
        // 描述
        v_Description: '',
        // 消息图标
        v_Icon: '',
        // 图标背景色
        v_IconBgcolor: '',
        // 消息内容
        v_Content: '',
        // 上传的文件列表【JSON字符串】
        v_FileText: '',
        // 消息内容
        v_SendContent: ''
      },
      oldModAddData: {
        // 模板接口
        v_InterfaceApi: '',
        // 抄送人
        v_CopyPersons: '',
        // 密送人
        v_BccPersons: '',
        // 是否合并收件人
        i_IsMergeAddressee: '',
        // 是否密送
        i_IsBcc: '',
        // 接收人
        v_ReceiveObjects: '',
        // 消息标题
        v_Title: '',
        // 发送类型
        v_MsgRule: '3',
        // 模板类型：默认系统消息 2019/12/31 lyh确认
        v_TemplateType: 'sysMsg',
        // 接收类型
        i_ReceiveCategory: '1',
        // 编码
        v_TemplateCode: '',
        // 名称
        v_TemplateName: '',
        // 描述
        v_Description: '',
        // 消息图标
        v_Icon: '',
        // 图标背景色
        v_IconBgcolor: '',
        // 消息内容
        v_Content: '',
        // 上传的文件列表【JSON字符串】
        v_FileText: '',
        // 消息内容
        v_SendContent: ''
      },
      rules: {
        v_TemplateCode: [
          { required: true, message: '请输入模板编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_TemplateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        v_Icon: [{ required: true, message: '请选择图表', trigger: 'blur' }],
        v_IconBgcolor: [
          { required: true, message: '请选择背景色', trigger: 'blur' }
        ],
        v_MsgRule: [
          { required: true, message: '请选择发送类型', trigger: 'blur' }
        ],
        i_ReceiveCategory: [
          { required: true, message: '请选择接收类型', trigger: 'blur' }
        ],
        v_Title: [
          { required: true, message: '请输入消息标题', trigger: 'blur' }
        ],
        v_TemplateType: [
          { required: true, message: '请选择模板类型', trigger: 'blur' }
        ]
      },
      formRed: false,
      optionsIcon: [],
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      // 接收类型
      receiveList: [],
      // 单个模板最大上传 文件个数【参数控制】
      maxFileCount: '',
      // 单个文件 上传的文件大小限制【参数控制】
      maxFileSize: '',
      // 邮件消息模板接口
      mailInterface: '',
      // 通知消息模板接口
      noticInterface: '',
      // 系统消息模板接口
      sysInterface: '',
      // 上传  文件的数据
      fileData: new FormData(),
      // 提交文件的数据
      arrFileList: [],
      oldArrFileList: [],
      viewid: '',
      // 置灰编码
      disableCode: false,
      defaultMsg: '',
      config: {
        serverUrl: 'http://test.io/php/controller.php?action=config',
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        initialFrameHeight: 300
      }
    }
  },
  watch: {
    modAddData: {
      handler (nv) {
        if (nv.hasOwnProperty('i_ReceiveCategory')) {
          switch (nv.i_ReceiveCategory) {
            case '2':
              // 个人用户
              if (this.personList.length > 0) return
              cgiService.temAgentUserList().then(res => {
                this.personList = res.data
              })
              break
            case '3':
              // 所在的分组
              if (this.groupList.length > 0) return
              cgiService.getTemgroupList().then(res => {
                this.groupList = res.data
              })
              break
            case '4':
              // 管理的组织
              if (this.personorgListList.length > 0) return
              cgiService.getUserOrgList().then(res => {
                this.orgList = res.data
              })
              break

            default:
              break
          }
        }
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(nv)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    // 获取当前表单对应视图得viewid
    this.viewid = this.buttonConfig.viewid
    // 获取参数
    this.getParameter(['msgTemplateFileCategoryLimit', 'msgTemplateFileCountLimit', 'msgTemplateFileUploadLimit', 'mailMsgTemplateInterface', 'noticMsgTemplateInterface', 'sysMsgTemplateInterface'])
    // 调取枚举数据
    this.queryComponents({ enumCode: ['messageTemplateCateg', 'emailConfig', 'emailRule', 'mailReceive', 'messageIcons', 'iconColorAll'] })
    // 按钮的type属性为2  代表行内操作【修改按钮】
    if (this.buttonConfig.type === '2') {
      this.disableCode = true
      util.initFormData(this.modAddData, this.currentTableRow)
      util.initFormData(this.oldModAddData, this.currentTableRow)
      this.$set(this.modAddData, 'i_Id', this.currentTableRow.i_Id)
      this.$set(this.oldModAddData, 'i_Id', this.currentTableRow.i_Id)
      this.defaultMsg = this.currentTableRow.v_Content
      if (this.currentTableRow.v_FileText) {
        let tempList = JSON.parse(this.currentTableRow.v_FileText)
        this.arrFileList = JSON.parse(this.currentTableRow.v_FileText)
        this.oldArrFileList = this.arrFileList
        tempList.forEach(item => {
          let obj = {}
          obj.name = item.filename
          obj.url = item.filename
          this.fileList.push(obj)
        })
      }
      // 抄送人
      if (this.modAddData.v_CopyPersons.length) {
        this.copyPersons = this.modAddData.v_CopyPersons.split(';')
      }
      // 密送人
      if (this.modAddData.v_BccPersons.length) {
        this.bccPersons = this.modAddData.v_BccPersons.split(';')
      }
      let currentTab = Object.assign({}, this.modAddData)
      this.$set(currentTab, 'regin', 'regin1')
      // 把修改的数据存入vuex中  方便返回给其他的Tab页
      this.$store.commit('changeRepetitionRowTabData', currentTab)
      // 拿到接收人的字符串，解析成数组
      if (Number(this.modAddData.i_ReceiveCategory) !== '1' && this.modAddData.v_ReceiveObjects.length > 0) {
        this.splitData(this.modAddData.v_ReceiveObjects, this.modAddData.i_ReceiveCategory)
      }
    }
  },
  methods: {
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制一次上传 ${this.maxFileCount} 个文件`)
    },
    getParameter (params) {
      cgiService.getParameter({ v_ParamCode: params }).then(res => {
        if (res.code === 0) {
          for (let key in res.data) {
            switch (key) {
              // 消息模板文件格式限制
              case 'msgTemplateFileCategoryLimit':
                this.accept = res.data[key].v_ParamValue
                break
              // 消息模板限制文件个数
              case 'msgTemplateFileCountLimit':
                this.maxFileCount = res.data[key].v_ParamValue
                break
              // 消息模板限制单个文件上传大小
              case 'msgTemplateFileUploadLimit':
                this.maxFileSize = res.data[key].v_ParamValue
                break
              // 邮件消息模板接口
              case 'mailMsgTemplateInterface':
                this.mailInterface = res.data[key].v_ParamValue
                break
              // 通知消息模板接口
              case 'noticMsgTemplateInterface':
                this.noticeInterface = res.data[key].v_ParamValue
                break
              // 系统消息模板接口
              case 'sysMsgTemplateInterface':
                this.sysInterface = res.data[key].v_ParamValue
                // 新增 默认填充值
                if (this.buttonConfig.type !== '2') {
                  this.modAddData.v_InterfaceApi = this.oldModAddData.v_InterfaceApi = this.sysInterface
                }
                break
              default:
                break
            }
          }
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
    tempalteChange (val) {
      // 如果下拉是系统消息，默认选中发送类型
      if (val === 'sysMsg') {
        this.modAddData.v_MsgRule = '3'
      }
      switch (val) {
        case 'sysMsg':
          // 系统消息
          if (!this.sysInterface) return
          this.oldModAddData.v_InterfaceApi = this.modAddData.v_InterfaceApi = this.sysInterface
          break
        case 'noticeMsg':
          // 通知消息
          if (!this.noticeInterface) return
          this.oldModAddData.v_InterfaceApi = this.modAddData.v_InterfaceApi = this.noticeInterface
          break
        case 'emailMsg':
          // 邮件
          if (!this.mailInterface) return
          this.oldModAddData.v_InterfaceApi = this.modAddData.v_InterfaceApi = this.mailInterface
          break

        default:
          break
      }
    },
    submitUpload () {
      let url = '/index.php/sys/Message/upload'
      this.$refs.upload.submit()
      const instance = axios.create({
        withCredentials: true
      })
      instance.post(url, this.fileData).then(res => {
        if (res.data.code === 0) {
          // 上传成功之后把文件数据保存
          res.data.data.forEach(item => {
            this.arrFileList.push(item)
          })
          let obj = {}
          this.arrFileList = this.arrFileList.reduce((cur, next) => {
            // eslint-disable-next-line no-unused-expressions
            obj[next.filename] ? '' : obj[next.filename] = true && cur.push(next)
            return cur
          }, [])
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onChange (files, fileList) {
      this.isReminder = false
      // 截取文件 后缀.所在的位置
      let fileName = files.name.lastIndexOf('.')
      // 获取文件名的长度
      let fileNameLength = files.name.length
      // 截取文件后缀名
      let fileFormat = files.name.substring(fileName, fileNameLength)
      // 判断是否符合选中的格式 否 提示
      if (this.accept.indexOf(fileFormat) === -1) {
        this.$message.error(`上传只能是${this.accept}格式!`)
        this.fileList.splice(1, files)
      }
    },
    uploadSuccess (res) {
      this.$message.success('上传成功')
    },
    uploadFile (file) {
      this.fileData.append('msg_file[]', file.file)
      file.onSuccess()
    },
    beforeUpload (file) {
      let isImageSize = file.size / 1024 / 1024 < Number(this.maxFileSize)
      return isImageSize
    },
    handleRemove (file, fileList) {
      // 小红点
      this.isReminder = false
      this.arrFileList.forEach((item, index) => {
        if (file.name === item.filename) {
          this.arrFileList.splice(index, 1)
        }
      })
      this.$set(this.modAddData, 'v_FileText', JSON.stringify(this.arrFileList))
    },
    joinData (data) {
      if (data) this.modAddData.v_ReceiveObjects = data ? data.join(',') : ''
    },
    commit () {
      switch (this.modAddData.i_ReceiveCategory) {
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
      this.$refs.modAddData.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          if (this.arrFileList.length > 0) {
            this.$set(this.modAddData, 'v_FileText', JSON.stringify(this.arrFileList))
          }
          if (this.copyPersons.length) {
            this.modAddData.v_CopyPersons = this.copyPersons.join(';')
          }
          if (this.bccPersons.length) {
            this.modAddData.v_BccPersons = this.bccPersons.join(';')
          }
          let content = this.$refs.ue.getUEContent()
          this.$set(this.modAddData, 'v_Content', content)
          cgiService.newSaveData1(this.modAddData).then(res => {
            if (res.code === 0) {
              if (this.operationcode === 'add') {
                // 如果是添加入口 让其它TAB数据调取新增这个实例的数据
                this.$store.commit('rowData', { v_TemplateCode: res.v_TemplateCode })
              }
              this.disableCode = true
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.isReminder = true
              if (res.iId > 1) {
                this.modAddData.i_Id = res.iId
              }
              // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
              let currentTab = Object.assign({}, this.modAddData)
              this.$set(currentTab, 'regin', 'regin1')
              // 把修改的数据存入vuex中  方便返回给其他的Tab页
              this.$store.commit('changeRepetitionRowTabData', currentTab)

              let params = this.modAddData
              this.$set(params, 'viewid', this.viewid)
              this.$store.commit('nestTableRowData', params)
              this.oldModAddData = Object.assign({}, this.modAddData)
              this.$message.success(res.msg)
              // 重新调取接口渲染数据
              this.$emit('getTableData')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
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
                // 接收类型
                this.receiveList = res.data[key]
                break
              case 'messageIcons':
                // 图标
                this.optionsIcon = res.data[key]
                this.optionsIcon.unshift({ v_EnumValue: '' })
                break
              case 'iconColorAll':
                // 图标颜色
                this.iconColorAll = res.data[key]
                this.iconColorAll.forEach(item => {
                  this.paramsList.push(item.v_EnumValue)
                })
                cgiService.getParameter({ v_ParamCode: this.paramsList }).then(res => {
                  if (res.code === 0) {
                    for (let key in res.data) {
                      res.data[key].v_ParamValue = res.data[key].v_ParamValue.slice(0, 7)
                      this.iconColorList.push(res.data[key])
                    }
                  }
                })
                break
              case 'messageTemplateCateg':
                // 模板类型
                this.templateCategory = res.data[key]
                break

              default:
                break
            }
          }
        }
      })
    },
    closeDialog () {
      this.$emit('getButtonConfig', false)
    },
    clearError () {
      this.$refs.ruleForm.resetFields()
    }
  },
  mounted () {
    this.$refs.ue.style = 'width:auto'
  },
  components: {
    actionBar,
    UE
  }
}
</script>
<style lang="scss" scoped>
#msg-template-content {
  margin: 0;
  /deep/ .m-0 .el-form-item {
    margin-top: 0;
  }
  /deep/ .ql-editor{
    height: 400px;
  }
  .warning-msg{
    color: #FF5757;
    margin-left: 10px;
  }
}
.add-modify-form {
  height: 100%;
  box-sizing: border-box;
  .el-form {
    padding: 10px 16px 0 !important;
    overflow: auto;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px;
      box-sizing: border-box;
      .flexibleIcon {
        left: -30px;
      }
      &:first-of-type {
        margin-top: 10px;
      }
      &:last-of-type {
        margin-bottom: 10px;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      .conBox{
        margin: 0;
        .description-label{
          /deep/ .el-form-item__content{
            width: auto !important;
          }
        }
      }
      .conBox .el-row /deep/ .el-form-item__content{
        width: auto !important;
        /deep/ .el-input__inner {
          padding-right: 41px !important;
        }
      }
      .conBox /deep/ .el-form-item__content{
        width: auto !important;
      }
      .el-form-item__content {
        > span {
          position: absolute;
          top: 52%;
          transform: translateY(-50%);
          &.flexibleIcon1{
            left: -23px;
          }
        }
      }
    }
  }
}
.icon-color {
  margin-top: 2px;
}
#icon-color-box {
  border: 1px solid #999;
  width: 20px;
  height: 20px;
}
.config-export {
  padding-top: 10px;
  .el-button {
    padding: 6px 10px;
    .iconfont  {
      font-size: 12px;

    }
    .icon-daoru {
      color: #23DBC2;
    }
    .icon-tianjia {
      color: #5892F6;
    }
  }
  .text-ul {
    padding: 0;
    list-style: none;
    border: 1px solid #5892F6;
    background: #E3EEFF;
    height: 80px;
    margin-bottom: 0;
    .text-li {
      height: 30px;
      padding: 4px 10px;
      line-height: 30px;
      color: #333333;
    }
  }
  /deep/ .el-upload-list__item {
    height: 30px;
    border: 1px solid #e6e6e6;
  }
}
.hidden-select{
  /deep/ .el-select-dropdown, /deep/ .el-input__suffix{
    display: none;
  }
}
</style>
