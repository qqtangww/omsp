<!-- 通知发布-info 表单 -->
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
      class="send-mail-info">
      <div class="info-content" id="send-mail-info-content">
        <span class="form-title">
          <i class="iconfont icon-jibenxinxi"></i> 通知详情
        </span>
        <div class="form-content">
          <el-form-item label="邮件主题:" class="font-bold" label-width="85px">{{ currentData.v_Title }}</el-form-item>
          <el-row class="h-30">
            <el-col :span="6">
              <el-form-item label="发送时间:" label-width="85px">{{currentData.d_SendDate}}</el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="发件人:">{{ currentData.v_SendEmail }}</el-form-item>
            </el-col>
          </el-row>
          <el-row class="h-30">
            <el-col :span="6">
              <el-form-item label="接收类型:" label-width="85px">{{ sendCategory }}</el-form-item>
            </el-col>
            <el-col :span="18" v-if="sendCategory !== '1'">
              <el-form-item label="收件人:" class="ellipsis">{{currentData.v_ReceiveObjects}}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="通知正文:" label-width="85px" class="font-bold"></el-form-item>
          <quill-editor
            v-model="currentData.v_SendContent"
            ref="myQuillEditor"
            id="send-mail-info-quill"
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
      editorOption: {
        debug: 'info',
        contenteditable: false
      },
      content: '',
      // 当前行的数据
      currentData: {
        d_SendDate: '',
        i_ReceiveCategory: '1',
        i_SendType: '1'
      },
      // 消息发送时间
      sendTime: ''
    }
  },
  computed: {
    ...mapState({
    }),
    sendCategory () {
      let category = ''
      switch (this.currentData.i_ReceiveCategory) {
        case '1':
          category = '全部用户'
          break
        case '2':
          category = '个人用户'
          break
        case '3':
          category = '用户分组'
          break
        case '4':
          category = '管理组织'
          break

        default:
          break
      }
      return category
    }
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
  },
  methods: {
    onEditorBlur () {},
    onEditorFocus () {},
    onEditorChange () {},
    saveHtml () {}
  },
  components: {
    actionBar
  }
}
</script>

<style scoped lang='scss'>
.send-mail-info {
  .ellipsis{
    /deep/ .el-form-item__content{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
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
  #send-mail-info-content {
    /deep/ .el-form-item {
      margin-top: 0;
    }
  }
  .send-radio {
    /deep/ .el-radio {
      margin-right: 18px;
    }
  }
  .send-mail-title {
    display: inline-block;
    margin: 16px 0 8px;
    i {
      margin-left: 5px;
    }
  }
  #send-mail-info-quill /deep/ .ql-toolbar {
    display: none;
  }
  #send-mail-info-quill /deep/ .ql-container {
    border: 1px solid #ccc;
  }
  #send-mail-info-quill /deep/ .ql-editor {
    height: 395px;
  }
  #send-mail-data-pick {
    /deep/ .el-input__inner {
      padding-left: 30px;
    }
  }
  .form-content {
    /deep/ .el-form-item__content {
      font-size: 12px;
      height: 30px;
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
</style>
