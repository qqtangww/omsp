<!-- 通知发布-新增/修改 表单 -->
<template>
  <div class="add-modify-form notification">
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
      inline-message
      label-position="right"
      label-width="100px"
      ref="ruleForm"
      :model="currentData"
      :rules="rules"
      class="send-notice"
    >
      <div class="info-content" id="send-notice-content">
        <span class="form-title">
          <i class="iconfont icon-jibenxinxi"></i> 通知设置
        </span>
        <div class="form-content">
          <el-row class="m-0">
            <el-col :span="12">
              <el-form-item label="通知标题" label-width="85px" prop="v_Title">
                <el-input v-model="currentData.v_Title" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="消息图标" prop="v_Icon" class="iconBox" id="icon-preview-box">
                <el-select v-model="currentData.v_Icon" placeholder="请选择" @focus="getIconList">
                  <el-option
                    v-for="item in iconList"
                    :key="item.value"
                    :label="item.v_EnumValue"
                    :value="item.v_EnumValue"
                  >
                  <span>
                    <i :class="item.v_EnumValue" />
                  </span>
                  </el-option>
                </el-select>
                <div id="icon-preview">
                  <i :class="currentData.v_Icon" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="图标背景色" prop="v_IconBgcolor">
                <el-select v-model="currentData.v_IconBgcolor" placeholder="请选择" @focus="getIconbgList" filterable>
                  <el-option
                    v-for="(item,index) in iconBGC"
                    :key="index"
                    :label="item.v_EnumValueName"
                    :value="item.v_EnumValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item
                label="消息图标"
                prop="v_Icon"
                id="icon-preview-box"
              >
                <el-row>
                  <el-col :span="24">
                    <el-select v-model="currentData.v_Icon" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in iconList"
                        :key="index"
                        :label="item.v_EnumValue"
                        :value="item.v_EnumValue"
                      >
                        <span>
                          <i :class="item.v_EnumValue" />
                        </span>
                      </el-option>
                    </el-select>
                    <div id="icon-preview">
                      <i :class="currentData.v_Icon" :style="`color:${currentData.v_IconBgcolor}`" />
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item
                label="图标背景色"
                prop="v_IconBgcolor"
                id="icon-preview-box"
              >
                <el-row>
                  <el-col :span="24">
                    <el-select v-model="currentData.v_IconBgcolor" placeholder="请选择">
                      <el-option
                        v-for="(item,index) in iconColorList"
                        :key="index"
                        :label="item.v_ParamValue"
                        :value="item.v_ParamValue"
                        style="padding: 5px 0 0 15px;"
                      >
                        <div id="icon-color-box" :style="`background-color:${item.v_ParamValue}`"></div>
                      </el-option>
                    </el-select>
                    <div id="icon-preview" class="icon-color">
                      <div v-if="currentData.v_IconBgcolor" id="icon-color-box" :style="`background-color:${currentData.v_IconBgcolor}`"></div>
                    </div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="发送类型" class="send-radio" label-width="85px">
                <!-- 时间类型 1-立即 2定时 -->
                <el-radio v-model="currentData.i_SendType" label="1">立即发送</el-radio>
                <el-radio v-model="currentData.i_SendType" label="2">定时发送</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接收类型" class="send-radio">
                <!-- 发送类型 1全部 2个人 3分组 4管理组织 -->
                <el-radio v-model="currentData.i_SendCategory" label="1" v-if="isAdmin">全部用户</el-radio>
                <el-radio v-model="currentData.i_SendCategory" label="4">管理组织</el-radio>
                <el-radio v-model="currentData.i_SendCategory" label="2">个人用户</el-radio>
                <el-radio v-model="currentData.i_SendCategory" label="3">用户分组</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="12">
              <el-form-item label="发送时间" label-width="85px" id="notice-data-pick">
                <el-date-picker
                  :disabled="currentData.i_SendType === '1'"
                  :disabledDate="disabledDate"
                  clearable
                  v-model="currentData.d_SendDate"
                  :picker-options="fastPickTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
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
                  v-if="currentData.i_SendCategory === '1'"
                  :disabled="currentData.i_SendCategory === '1'"
                >
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
                  v-else-if="currentData.i_SendCategory === '4'"
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
                  v-else-if="currentData.i_SendCategory === '3'"
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
                  v-else-if="currentData.i_SendCategory === '2'"
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
          <el-form-item label="通知正文" class="h-30" label-width="85px"></el-form-item>
          <quill-editor
            v-model="currentData.v_SendContent"
            ref="myQuillEditor"
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
        v_Title: [
          { required: true, message: '请输入通知标题', trigger: 'blur' }
        ],
        v_Icon: [
          { required: true, message: '请选择消息图标', trigger: 'blur' }
        ],
        v_IconBgcolor: [
          { required: true, message: '请选择图标背景色', trigger: 'blur' }
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
        d_SendDate: '',
        i_SendCategory: '1',
        i_SendType: '1'
      },
      // 消息发送时间
      sendTime: '',
      // 发送时间置灰
      disabledDate: true,
      // icon图标list
      iconList: [],
      // icon背景色list
      iconBGC: [],
      // 选择日期
      fastPickTime: {
        disabledDate (time) {
          const oneDay = 3600 * 1000 * 24
          return time.getTime() <= Date.now() - oneDay
          // return time.getTime() <= Date.now() - 3600 * 1000
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
      iconColorList: [],
      paramsList: [],
      iconColorAll: [],
      oldModAddData: {
        d_SendDate: '',
        i_SendCategory: '1',
        i_SendType: '1'
      },
      formRed: false
    }
  },
  computed: {
    ...mapState({
      // 管理员标识符
      isAdmin: state => state.userInfo.isadministrators
    })
  },
  watch: {
    currentData: {
      deep: true,
      handler (nVal) {
        if (nVal.hasOwnProperty('i_SendCategory')) {
          switch (nVal.i_SendCategory) {
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
          if (nVal.i_SendType === '1') {
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
    }
  },
  created () {
    let enumCode = ['messageIcons', 'iconColorAll']
    this.getEnumValue({ enumCode })
    this.currentData.i_SendCategory = this.isAdmin ? '1' : '4'
    // 新增
    if (this.buttonConfig.operationcode === 'add') {
    } else if (this.buttonConfig.operationcode === 'modify') {
      // 获取 当前行的数据
      let formData = this.$store.state.fieTableData
      this.currentData = {
        ...formData
      }
      if (this.currentData.d_SendDate === '0000-00-00 00:00:00') {
        // 设置定时发送字段为空
        this.currentData.d_SendDate = ''
      }
      // 拿到接收人的字符串，解析成数组
      if (Number(this.currentData.i_SendCategory) !== 1 && this.currentData.v_SendObjects.length > 0) {
        this.splitData(this.currentData.v_SendObjects, this.currentData.i_SendCategory)
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
      switch (this.currentData.i_SendCategory) {
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
          if (!this.personArr.length) {
            this.$message.warning('接收人不能为空')
            return
          }
          this.joinData(this.groupArr)
          break
        case '4':
          // 管理的组织
          if (!this.personArr.length) {
            this.$message.warning('接收人不能为空')
            return
          }
          this.joinData(this.orgArr)
          break

        default:
          break
      }
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.currentData.i_SendType === '2' && this.currentData.d_SendDate.length === 0) {
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
          if (!this.currentData.v_SendContent) {
            this.$message.warning('通知内容不能为空')
            return
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.currentData.logParams = this.getLogParams()
          }
          cgiService.sysNoticeSaveData(this.currentData).then(res => {
            if (res.code === 0) {
              this.oldModAddData = Object.assign({}, this.currentData)
              this.formRed = false
              this.$message.success(res.msg)
              this.currentData.i_Id = res.iId
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_msgNotification'])
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          return false
        }
      })
    },
    joinData (data) {
      if (data) this.currentData.v_SendObjects = data ? data.join(',') : ''
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
    // 获取枚举内容
    getEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          // console.log(res)
          for (let key in res.data) {
            if (key === 'messageIcons') {
              // 图标
              this.iconList = res.data[key]
              this.iconList.unshift({ v_EnumValue: '' })
            } else if (key === 'iconColorAll') {
              // 图标颜色
              this.iconColorAll = res.data[key]
              this.iconColorAll.forEach(item => {
                this.paramsList.push(item.v_EnumValue)
              })
              let v_ParamCode = this.paramsList
              cgiService.getParameter({ v_ParamCode }).then(res => {
                if (res.code === 0) {
                  for (let key in res.data) {
                    res.data[key].v_ParamValue = res.data[key].v_ParamValue.slice(0, 7)
                    this.iconColorList.push(res.data[key])
                  }
                }
              })
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
.send-notice {
  padding: 18px 16px;
  .h-30{
    /deep/ .el-form-item__content{
      height: 30px;
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
  }
  #send-notice-content {
    /deep/ .m-0 .el-form-item {
      margin-top: 0;
    }
  }
  .send-radio {
    /deep/ .el-radio {
      margin-right: 18px;
    }
  }
  .notice-title {
    display: inline-block;
    margin: 16px 0 8px;
    i {
      margin-left: 5px;
    }
  }
  /deep/ .ql-editor {
    height: 230px;
  }
  #notice-data-pick{
      /deep/ .el-input__inner{
          padding-left: 30px;
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
</style>
