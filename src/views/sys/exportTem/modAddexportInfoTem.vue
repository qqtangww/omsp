<!-- 内容组件-表单组件-基本信息 -->
<template>
  <!-- 弹框基本信息 -->
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="modAddData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      inline-message
      label-position="right"
      label-width="110px"
      :rules="rules"
      ref="ruleForm"
      :model="modAddData"
    >
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 基本信息
        </span>
        <div class="conBox">
          <el-form-item
            label="模板类型"
            prop="i_TemplateType"
          >
            <el-select
              v-model="modAddData.i_TemplateType"
              filterable
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in arrType"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="模板编码"
            prop="v_TemplateCode"
          >
            <el-input
              v-model="modAddData.v_TemplateCode"
              :disabled="isDisabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="模板名称"
            prop="v_TemplateName"
          >
            <el-input v-model="modAddData.v_TemplateName"></el-input>
          </el-form-item>
          <el-form-item
            label="接口地址"
            prop="v_InterfaceUrl"
          >
            <el-input v-model="modAddData.v_InterfaceUrl"></el-input>
          </el-form-item>
          <el-form-item
            label="文件数量"
            prop="i_FileNumType"
          >
          <el-radio-group v-model="modAddData.i_FileNumType" @change="changeFileNumType">
              <el-radio label="0">单选</el-radio>
              <el-radio label="1">多选</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="文件类型"
            prop="v_InterfaceUrl"
          >
          <el-select
                placeholder="默认"
                v-model="typeValue"
                 multiple
                @change="getFileType"
              >
                <el-option
                  v-for="(item,index) in fileType"
                  :key="index"
                  :label="item.v_EnumValueName"
                  :value="item.v_EnumValue"
                ></el-option>
              </el-select>
          </el-form-item>
          <el-form-item
            label="模板描述"
            prop="v_Description"
            class='description-label'
          >
            <el-input
              v-model="modAddData.v_Description"
              placeholder="可填写相关描述备注，帮助用户记忆理解。"
              type="textarea"
              class="minInput"
              :autosize="{ minRows: 2, maxRows: 4}"
            />
          </el-form-item>
        </div>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 模板权限
        </span>
        <el-form-item
            label="权限类型"
            prop="i_permissonsType"
          label-width="140px"
          >
          <el-radio-group v-model="modAddData.i_permissonsType">
              <el-radio label="0">无限制</el-radio>
              <el-radio label="1">组织机构</el-radio>
              <el-radio label="2">个人用户</el-radio>
            </el-radio-group>
          </el-form-item>
      </div>
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 模板文件
        </span>
        <div class="conBox">
          <div class="config-export">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="string"
              :accept='accept'
              :multiple='multiple'
              name='excel_template'
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success='uploadSuccess'
              :http-request="uploadFile"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="onChange"
            >
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
          <!-- <div class="config-export">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="actionUrl"
              :accept='accept'
              :multiple='multiple'
              name='excel_template'
              :on-preview="handlePreview"
              :on-progress='handlePro'
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success='uploadSuccess'
              :file-list="fileList"
              :auto-upload="false"
              :on-change="onChange"
            >
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
          </div> -->
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import axios from 'axios'
export default {
  name: 'infoTab',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object
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
      modAddData: {
        // 编码
        i_TemplateType: '',
        // 名称
        v_TemplateCode: '',
        // 自定义内容
        v_TemplateName: '',
        // 扩展接口
        v_InterfaceUrl: '',
        // 描述
        v_Description: '',
        // 上传文件
        v_FileData: '',
        // 文件数量
        i_FileNumType: '0',
        v_FileType: '',
        i_permissonsType: '0'
      },
      accept: '',
      typeValue: [],
      formData: {},
      multiple: false,
      // 模板路径
      arrType: [
        {
          label: '导出模板',
          value: '0'
        },
        {
          label: '导入模板',
          value: '1'
        }
      ],
      rules: {
        i_TemplateType: [
          { required: true, message: '请选择模板类型', trigger: 'change' }
        ],
        v_TemplateCode: [
          { required: true, message: '请输入模板编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_TemplateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        v_InterfaceUrl: [
          { required: true, message: '请输入接口地址', trigger: 'blur' }
        ]
      },
      oldModAddData: {},
      isDisabled: false,
      operationcode: '',
      fileList: [],
      fileData: new FormData(),
      actionUrl: '#',
      arrFileList: [],
      fileType: [],
      oldFileList: []
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (data.hasOwnProperty('activeName')) {
          delete data.activeName
        }
        if (this.oldModAddData.hasOwnProperty('activeName')) {
          delete this.oldModAddData.activeName
        }
        if (data.hasOwnProperty('formRed')) {
          delete data.formRed
        }
        if (this.oldModAddData.hasOwnProperty('formRed')) {
          delete this.oldModAddData.formRed
        }
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    let treeRowData = this.$store.state.fieTreeData['CC_TR_bizcategoryExportTem']
    this.queryEnumValue({ enumCode: 'fileType' })
    this.$set(this.modAddData, 'i_BizID', treeRowData.i_BizID)
    if (this.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      if (formData.v_FileType) {
        // 设置上传文件的格式
        this.typeValue = JSON.parse(formData.v_FileType)
        this.accept = this.typeValue.toString()
      }
      // 设置文件  是多文件上传  还是单文件上传
      if (formData.i_FileNumType === '1') {
        this.multiple = true
      } else {
        this.multiple = false
      }
      this.$set(this.modAddData, 'i_Id', formData.i_Id)
      // 上传后的模板文件数据
      if (formData.v_FileData) {
        let tempList = JSON.parse(formData.v_FileData)
        this.arrFileList = JSON.parse(formData.v_FileData)
        tempList.forEach(item => {
          let obj = {}
          obj.name = item.filename
          obj.url = item.filename
          this.fileList.push(obj)
        })
      }
      // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
      this.$store.commit('changeRowTabData', this.modAddData)
    } else {
      this.$store.commit('changeRowTabData', {})
    }
    // 如果是基础字段修改，隐藏公式tab
    if (this.modAddData.i_permissonsType === '0') {
      document.querySelectorAll('#tab-2')[0].style.display = 'none'
      document.querySelectorAll('#tab-3')[0].style.display = 'none'
    } else if (this.modAddData.i_permissonsType === '1') {
      document.querySelectorAll('#tab-2')[0].style.display = 'inline-block'
      document.querySelectorAll('#tab-3')[0].style.display = 'none'
    } else if (this.modAddData.i_permissonsType === '2') {
      document.querySelectorAll('#tab-3')[0].style.display = 'inline-block'
      document.querySelectorAll('#tab-2')[0].style.display = 'none'
    }
    //  小红点
    this.oldFileList = this.fileList
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    commit () {
      // 保存时 合并已经上传成功的文件
      if (this.modAddData.i_BizID) {
        if (this.arrFileList.length > 0) {
          this.$set(
            this.modAddData,
            'v_FileData',
            JSON.stringify(this.arrFileList)
          )
        }
        // 上传文件文件的格式
        this.$set(this.modAddData, 'v_FileType', JSON.stringify(this.typeValue))
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            cgiService.saveTemplate(this.modAddData).then(res => {
              if (res.code === 0) {
                this.$message.success(res.msg)
                // 取消tab置灰
                this.$emit('changeFlag', { isDisabled: false })
                // 控制  tab标签的显示或隐藏
                if (this.modAddData.i_permissonsType === '0') {
                  document.querySelectorAll('#tab-2')[0].style.display = 'none'
                  document.querySelectorAll('#tab-3')[0].style.display = 'none'
                } else if (this.modAddData.i_permissonsType === '1') {
                  document.querySelectorAll('#tab-2')[0].style.display = 'inline-block'
                  document.querySelectorAll('#tab-3')[0].style.display = 'none'
                } else if (this.modAddData.i_permissonsType === '2') {
                  document.querySelectorAll('#tab-3')[0].style.display = 'inline-block'
                  document.querySelectorAll('#tab-2')[0].style.display = 'none'
                }
                // 重新刷新视图数据
                this.$emit('getTableData', { changeSpecialNodeData: [{ i_Cid: res.i_Cid, isCurrentNode: true }] })

                this.isReminder = true
                if (Number(res.iId) > 0) {
                  this.$set(this.modAddData, 'i_Id', res.iId)
                }
                console.log(this.modAddData)
                // 把提交的数据保存到vuex，用于权限tab
                this.$store.commit('rowData', this.modAddData)
                this.oldModAddData = Object.assign({}, this.modAddData)
                // 首次 把必填项的数据存入 VUEX 中  方便 其他Tab项的数据需要
                this.$store.commit('changeRowTabData', this.modAddData)
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        })
      } else {
        this.$message.warning('请选择需要添加的业务')
      }
    },
    // 判断上传文件大小
    beforeUpload (file) {
      let isFileSize = file.size / 1024 / 1024 < 2
      return isFileSize
    },
    // 阻断 element 自动上传文件 的方法
    uploadFile (file) {
      this.fileData.append('excel_template[]', file.file)
      file.onSuccess()
    },
    // 手动上传
    submitUpload () {
      //  接口
      let url = '/index.php/sys/exportTemplate/upload'
      // 定义  参数的格式
      this.$refs.upload.submit()
      // 上传文件 数组形式 需要的格式  需要设置配置的 axios
      const instance = axios.create({
        withCredentials: true
      })
      // 发送请求
      instance.post(url, this.fileData).then(res => {
        if (!res.code) {
          res.data.data.forEach(item => {
            this.arrFileList.push(item)
          })
          let obj = {}
          this.arrFileList = this.arrFileList.reduce((cur, next) => {
            // console.log(obj[next.filename])
            // eslint-disable-next-line no-unused-expressions
            obj[next.filename] ? '' : obj[next.filename] = true && cur.push(next)
            return cur
          }, [])
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 上传文件的change事件
    onChange (files, fileList) {
      if (!this.accept) {
        this.$message.warning('请先选择文件类型')
        return
      }
      // 小红点 显示
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
    // 上传文件成功的钩子
    uploadSuccess (fileList) {
      this.$message.success('上传成功')
    },
    // 删除 文件上传前的钩子
    handleRemove (file, fileList) {
      // 小红点
      this.isReminder = false
      // 根据 删除文件的名字判断  在提交的数据  是否需要删除 对应的数据
      this.arrFileList.forEach((item, index) => {
        if (file.name === item.filename) {
          this.arrFileList.splice(index, 1)
        }
      })
      this.$set(this.modAddData, 'v_FileData', JSON.stringify(this.arrFileList)
      )
      //  删除后需要手动进行对绑定的数据进行赋值
      this.fileList = fileList
    },
    // 获取上传文件格式的 数据
    getFileType (val) {
      let newArr = []
      val.forEach(item => {
        newArr.push(item)
      })
      this.accept = newArr.toString()
      this.typeValue = val
    },
    // 设置 文件 是否为多文件上传
    changeFileNumType (val) {
      if (val === '1') {
        this.multiple = true
      } else {
        this.multiple = false
      }
    },
    // 获取枚举值
    queryEnumValue (params) {
      cgiService.getEnumValues(params).then(res => {
        if (res.code === 0) {
          this.fileType = res.data.fileType
        }
      })
    }
  },
  mounted () {
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.add-modify-form {
  height: 100%;
  box-sizing: border-box;
  .el-form {
    border: none !important;
    padding: 3px  16px  0 16px !important;
    overflow: auto;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      margin-top: 15px;
      padding: 16px 0;
      box-sizing: border-box;
      &:first-of-type {
        margin-top: 10px;
      }
      &:last-of-type {
        margin-bottom: 10px;
        min-height: 140px;
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      .config-export {
        padding: 10px 30px 0 30px;
        box-sizing: border-box;
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
      }
    }
  }
}
.conBox /deep/ .el-form-item__content {
  width: 520px;
}
.config-export /deep/ .el-upload-list__item {
  height: 30px;
  border: 1px solid #e6e6e6;
}
</style>
