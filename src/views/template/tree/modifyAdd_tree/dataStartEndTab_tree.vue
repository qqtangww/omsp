<template>
  <!-- 弹框基本信息 -->
  <div class="data-start-end">
    <el-form inline-message label-position="right" label-width="100px" :rules="rules" ref="ruleForm" :model="modAddData">
      <div class="funcBox">
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="全局函数:"
              label-width="80px"
            >
            </el-form-item>
            <el-form-item
              label=""
              label-width="0px"
              prop="v_ScriptBody"
              class='description-label'>
              <el-input
                v-model="modAddData.v_ScriptBody"
                placeholder=""
                type="textarea"
                class="minInput"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              label="请输入自动加载函数:"
              label-width="140px"
            >
            </el-form-item>
            <el-form-item
              label=""
              label-width="0px"
              prop="v_AutoLoadFunc"
              class='description-label'>
              <el-input
                v-model="modAddData.v_AutoLoadFunc"
                placeholder=""
                type="textarea"
                class="minInput"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="请输入数据发送函数:"
          label-width="140px"
        >

        </el-form-item>
        <el-form-item
          label=''
          label-width="0px"
          prop="v_DataReceiveFunc"
          class='description-label'>
          <el-input
            v-model="modAddData.v_DataReceiveFunc"
            placeholder=""
            type="textarea"
            class="minInput"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
        <el-form-item
          label="请输入数据接收函数:"
          label-width="140px"
        >

        </el-form-item>
        <el-form-item
          label=""
          label-width="0px"
          prop="v_DataSendFunc"
          class='description-label'>
          <el-input
            v-model="modAddData.v_DataSendFunc"
            placeholder=""
            type="textarea"
            class="minInput"
            :autosize="{ minRows: 2, maxRows: 4}"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modAddData: {
        v_AutoLoadFunc: '',
        v_DataReceiveFunc: '',
        v_DataSendFunc: ''
      },
      // 模板路径
      templateUrl: [
        { value: 'CC_VW_instanceForm', label: 'CC_VW_instanceForm' },
        { value: 'CC_VW_instanceDialog', label: 'CC_VW_instanceDialog' }
      ],
      rules: {}
    }
  },
  created () {},
  methods: {},
  mounted () {},
  props: {
    formData: Object
  }
}
</script>
<style lang="scss" scoped>
.formBox
  .el-dialog
  div.el-dialog__body
  .data-start-end
  .funcBox
  /deep/
  .minInput
  > .el-textarea__inner {
  height: 150px !important;
}
.data-start-end {
  height: 544px;
  padding: 0 16px 0px 16px;
  overflow: auto;
  border: 4px solid #abd6ff;
  .el-form {
    border: none !important;
    .funcBox {
      .el-form-item {
        .el-form-item__content {
          margin-left: 0px;
        }
      }
    }
  }
}
</style>
