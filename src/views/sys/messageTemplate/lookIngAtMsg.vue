<!-- 消息模板  发送日志  查看日志 -->
<template>
  <!-- 弹框基本信息 -->
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="shareData"
        v-on="$listeners"
      ></action-bar>
    </div>
    <el-form
      inline-message
      label-position="right"
      label-width="80px">
      <div class="border-box">
        <span>
          <i class="iconfont icon-jibenxinxi"></i> 消息详情
        </span>
        <div class="content-box">
          <el-form-item label="消息标题：">{{ shareData.v_Title }}</el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label="发送时间：">{{ shareData.d_SendDate }}</el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="发送人：">{{ shareData.v_SendUserID }}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="接收类型：">{{ receiveCategory }}</el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="接收人：">{{ shareData.v_ReceiveUserID }}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="消息正文："></el-form-item>
          <quill-editor
            id="message-content"
            v-model="shareData.v_Content"
            ref="myQuillEditor"
            :options="editorOption"
          ></quill-editor>
        </div>
      </div>
      <div class="border-box">
        <div class="custom-bar">
          <button
            style="{color:#32C5D2}"
            type="text"
            class="download-button"
            @click="download">
            <i class="iconfont icon-daoru"></i>批量下载</button>
        </div>
        <el-table
          ref="multipleTable"
          :data="fileList"
          tooltip-effect="dark"
          class="contentTable"
          :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
          height="200px"
          @selection-change="selectChange">
          <el-table-column type="selection" width="30" />
          <el-table-column label="消息附件文件列表" width="auto" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row.filename }}</template>
          </el-table-column>
          <el-table-column label="操作" width="80" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                :enterable='false'
                content="下载"
                placement="bottom-start">
                <el-button
                  style="{color:#32C5D2}"
                  type="text"
                  icon="iconfont icon-daoru"
                  class="opeartionBtn"
                  @click="download(scope.$index, scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import logMixin from '@/common/js/mixins/getLogParams'
import { API } from '@/api/basic'
export default {
  name: 'lookIngAtMsg',
  mixins: [logMixin],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      // 选中的数据
      checkSelectData: [],
      i_Id: '',
      editorOption: {
        debug: 'info',
        placeholder: '',
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
      fileList: []
    }
  },
  watch: {
    'shareData.i_ReceiveCategory' (nv, ov) {
      console.log(nv, ov)
    }
  },
  computed: {
    receiveCategory () {
      let receiveCategory = ''
      switch (this.shareData.i_ReceiveCategory) {
        case '1':
          receiveCategory = '全部'
          break
        case '2':
          receiveCategory = '管理组织'
          break
        case '3':
          receiveCategory = '用户分组'
          break
        case '4':
          receiveCategory = '个人'
          break
        default:
          break
      }
      return receiveCategory
    }
  },
  created () {
    if (this.currentTableRow.v_FileText) this.fileList = JSON.parse(this.currentTableRow.v_FileText)
    this.i_Id = this.currentTableRow.i_Id
  },
  methods: {
    // 表格checked
    selectChange (val) {
      // 把选中数据加到组件data
      this.checkSelectData = val
    },
    download (index, row) {
      let checkedData = this.checkSelectData
      if (checkedData.length > 0 || row) {
        this.$confirm('是否确定下载?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          let commitParams = []
          // 导出选中的数据
          var files = []
          // 批量下载
          if (checkedData.length > 0) {
            checkedData.forEach(val => {
              files.push(val.file)
            })
            // 获取到Files字符串
            let filesStr = 'files=' + files.join(',')
            if (files.length > 0) { commitParams.push(filesStr) }
          } else {
            let filesStr = 'files=' + row.file
            commitParams.push(filesStr)
          }
          window.open(API.defaults.baseURL + 'sys/Message/downloadFile/' + '?' + 'i_Id=' + this.i_Id + '&' + commitParams.join('&'))
        })
      } else {
        this.$message({
          message: '没有选中数据，请重试',
          type: 'warning'
        })
      }
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
#msg-template-content {
  margin: 0;
}
.add-modify-form {
  height: 100%;
  box-sizing: border-box;
  color: #333333;
  .el-form {
    padding: 16px 16px 0 !important;
    overflow: auto;
    .border-box {
      position: relative;
      border: 1px solid #bfbfbf;
      box-sizing: border-box;
      &:last-of-type{
        margin: 16px 0;
        .custom-bar{
          background: #E6FEFF;
          height: 30px;
          line-height: 30px;
          button{
            cursor: pointer;
            outline: none;
            background: none;
            border: none;
            i{
              color: #23DBC2;
              margin-right: 6px;
            }
          }
        }
      }
      > span {
        position: absolute;
        top: -10px;
        left: 12px;
        padding: 0 8px;
        background: #ffffff;
      }
      .content-box{
        margin: 0;
        padding: 10px 60px;
        .description-label{
          /deep/ .el-form-item__content{
            width: auto !important;
          }
        }
      }
    }
  }
  label{
    color: #666666;
  }
  /deep/ .el-form-item__content{
    font-size: 12px;
  }
}

#message-content {
  /deep/ .ql-toolbar {
    display: none;
  }
  /deep/ .ql-editor{
    height: 400px;
    border-top: 1px solid #ccc;
  }
}
</style>
