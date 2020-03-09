<!-- 通知详情-查看 表单 -->
<template>
  <div class="add-modify-form notification">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" :shareData="shareData" v-on="$listeners"></action-bar>
    </div>
    <el-form
      label-position="right"
      label-width="100px"
      inline-message
      ref="ruleForm"
      :model="currentData"
      class="send-notice"
    >
      <div class="info-content border-box" id="details-info-content">
        <span class="form-title">
          <i class="iconfont icon-jibenxinxi"></i> 消息详情
        </span>
        <div class="form-content">
          <!-- <el-form-item label="通知标题:" label-width="85px" prop="v_Title">{{currentData.v_Title}}</el-form-item> -->
          <el-form-item label="消息标题:" label-width="70px">{{ currentData.v_Title }}</el-form-item>
          <el-row class="h-30">
            <el-col :span="6">
              <el-form-item label="接收时间:" label-width="70px">{{currentData.d_SendDate}}</el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发送人:">{{ currentData.v_UserName }}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发送人账号:">{{currentData.v_SendUserID}}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="消息正文:" label-width="70px"></el-form-item>
          <quill-editor
            v-model="currentData.v_SendContent"
            ref="myQuillEditor"
            id="notice-info-quill"
            disabled
            :options="editorOption"
          ></quill-editor>
        </div>
      </div>
      <div class="details-view">
        <div class="toolsBox">
          <div class="toolsCls" id="tools-button">
            <el-button
              class="views-tools-btn"
              type="text"
              @click="download"
            ><i class="iconfont icon-daoru" style="color: rgb(35, 219, 194);"></i>批量下载
            </el-button>
          </div>
        </div>
        <el-table
          :class="['table-wrapper','contentTable']"
          :header-cell-style="{backgroundImage:'linear-gradient(0deg, #2d8ed3 0%, #60a3f1 100%)', color:'#ffffff' }"
          ref="stdtable"
          :data="stdTableList"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            fixed="left"
            width="30"
          ></el-table-column>
          <el-table-column
          prop="filename"
          label="消息附件文件列表">
          </el-table-column>
          <el-table-column width="60"
            label="操作"
            class-name="operation-cls"
            fixed="right">
            <template slot-scope="scope">
              <span>
                <el-tooltip class="item" effect="dark" content="下载" placement="bottom-start">
                  <el-button
                  size="mini"
                  class="el-button el-tooltip opeartionBtn item el-button--text"
                  @click="download(scope.$index, scope.row)"><i class="iconfont icon-daoru"></i></el-button>
                </el-tooltip>
              </span>
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
      // 选中的数据
      checkSelectData: [],
      API,
      stdTableList: [],
      editorOption: {
        debug: 'info',
        placeholder: ''
      },
      content: '',
      // 当前行的数据
      currentData: {
        d_CreateTime: '',
        d_SendDate: '',
        i_SendCategory: '1',
        i_SendType: '1'
      },
      // 消息发送时间
      sendTime: '',
      i_Id: ''
    }
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
    currentData: {
      deep: true,
      handler (nVal) {
        if (nVal.hasOwnProperty('i_SendType')) {
          if (nVal.i_SendType === '1') {
            this.currentData.d_SendDate = ''
          }
        }
      }
    }
  },
  created () {
    // 获取 当前行的数据
    let formData = this.$store.state.fieTableData
    this.currentData = {
      ...formData
    }
    this.i_Id = this.currentData.i_Id
    this.stdTableList = JSON.parse(this.currentData.v_FileText)
  },
  methods: {
    saveHtml () {},
    // 表格checked
    handleSelectionChange (val) {
      // 把选中数据加到组件data
      this.checkSelectData = val
    },
    download (index, row) {
      let checkedData = this.checkSelectData
      if (checkedData.length > 0 || row) {
        this.$confirm('是否确定下载?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let commitParams = []
          // 导出选中的数据
          var files = []

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

<style scoped lang='scss'>
.send-notice {
  padding: 18px 16px;
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
  #details-info-content {
    /deep/ .el-form-item {
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
  #notice-info-quill /deep/ .ql-toolbar {
    display: none;
  }
  #notice-info-quill /deep/ .ql-container {
    border: 1px solid #ccc;
  }
  #notice-info-quill /deep/ .ql-editor {
    height: 260px;
  }
  #notice-data-pick {
    /deep/ .el-input__inner {
      padding-left: 30px;
    }
  }
  .form-content {
    /deep/ .el-form-item__content {
      font-size: 12px;
      height: 30px;
      color: #333;
    }
    .font-bold /deep/ .el-form-item__label{
      font-weight: bold;
    }
    .content-bold {
      /deep/ .el-form-item__content {
        font-weight: bold;
      }
    }
  }
}

.toolsBox{
  z-index: 10;
  border-bottom: 2px solid #BFBFBF;
  .views-tools-btn /deep/ i{
      font-size: 14px;
      margin-right: 6px;
  }
  /deep/ .icon-xia{
    position: absolute;
    top: 0;
    right: -18px;
  }
}
#tools-button button{
  color: #333333;
}
.details-view {
  margin-top: 18px;
  border: 1px solid #BFBFBF;
}
</style>
