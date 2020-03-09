<template>
  <div class="add-modify-form">
    <div class="bodyBorderBox">
      <div class="components-type-form">
        <div class="formOperateBox">
          <!-- 操作栏 -->
          <action-bar
            :configData="configData"
            :shareData="formData"
            :formRed="formRed"
            @sumitForm="commit"
            v-on="$listeners"
          ></action-bar>
        </div>
        <div class="content-box">
          <el-form
            label-position="right"
            label-width="110px"
            :rules="rules"
            inline-message
            ref="ruleForm"
            :model="modAddData"
          >
            <div class="border-box">
              <span>
                <i class="iconfont icon-jibenxinxi"></i> 模板路径
              </span>
              <div class="conBox">
                <el-form-item label="模板编码" prop="v_TemplateCode">
                  <el-input v-model="modAddData.v_TemplateCode" :disabled="isDisable"></el-input>
                </el-form-item>
                <el-form-item label="模板名称" prop="v_TemplateName">
                  <el-input v-model="modAddData.v_TemplateName"></el-input>
                </el-form-item>
                <!-- <el-form-item
                  label="模板组件名称"
                  prop="v_TemplateUrlName">
                  <el-input v-model="modAddData.v_TemplateUrlName"></el-input>
                </el-form-item>-->
                <el-form-item label="描述" prop="v_Description" class='description-label'>
                  <el-input
                    v-model="modAddData.v_Description"
                    placeholder="请输入表关系描述"
                    type="textarea"
                    class="minInput"
                    :autosize="{ minRows: 2, maxRows: 4}"
                  />
                </el-form-item>
                <el-form-item label="缺省选择" prop="i_IsDefault">
                  <el-switch
                    v-model="modAddData.i_IsDefault"
                    active-color="#32c5d2"
                    inactive-color="#e6e7e8"
                    active-value="1"
                    inactive-value="0"
                  ></el-switch>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'shareTempUrl',
  props: {
    configData: Object,
    shareData: Object,
    formData: Object,
    ifDialog: Boolean
  },
  mixins: [logMixin],
  data () {
    return {
      modAddData: {
        // 模板编码
        v_TemplateCode: '',
        // 模板名称
        v_TemplateName: '',
        // 模板组件名称
        v_TemplateUrlName: '',
        // 描述
        v_Description: '',
        // 缺省选择
        i_IsDefault: '0'
      },
      isDisable: false,
      rules: {
        v_TemplateCode: [
          { required: true, message: '请输入模板编码', trigger: 'blur' }
        ],
        v_TemplateName: [
          { required: true, message: '请输入模板名称', trigger: 'blur' }
        ],
        v_TemplateUrlName: [
          { required: true, message: '请输入模板组件名称', trigger: 'blur' }
        ]
      },
      // 未选中标签样式
      // 图标
      iconUrl: [
        {
          value: 'iconfont icon-shituzujian'
        },
        {
          value: 'iconfont icon-jibenxinxi'
        },
        {
          value: 'iconfont icon-zuzhijigou'
        },
        {
          value: 'iconfont icon-buju'
        },
        {
          value: 'iconfont icon-tabsbiaoqianye'
        },
        {
          value: 'iconfont icon-zuoyou'
        },
        {
          value: 'iconfont icon-zuozhongyou'
        },
        {
          value: 'iconfont icon-shangxiayou'
        },
        {
          value: 'iconfont icon-dankuangrongqi'
        },
        {
          value: 'iconfont icon-zuoshangxia'
        },
        {
          value: 'iconfont icon-shangxia'
        }
      ],
      viewId: '',
      // 小红点功能
      oldModAddData: {
        // 模板编码
        v_TemplateCode: '',
        // 模板名称
        v_TemplateName: '',
        // 模板组件名称
        v_TemplateUrlName: '',
        // 描述
        v_Description: '',
        // 缺省选择
        i_IsDefault: '0'
      },
      formRed: false
    }
  },
  created () {
    // 获取当前行操作数据
    let confsBtn = this.$store.state.confsBtn
    if (confsBtn.operationcode === 'modify') {
      let formData = this.$store.state.fieTableData
      this.modAddData = {
        ...formData
      }
      this.viewId = formData.viewid
      this.isDisable = true
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  watch: {
    modAddData: {
      handler: function (newData, oldDate) {
        this.$emit('update:infoData', newData)
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(newData)) {
          this.formRed = true
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 保存提交模板路径
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            ...this.modAddData
          }
          if (!this.modAddData.v_CateCode) {
            // 获取vuex中的Tab数据
            let fieTableData = this.$store.state.fieTableData
            this.$set(params, 'v_CateCode', fieTableData.v_CateCode)
          }
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.saveCopmUrl(params).then(res => {
            if (res.code === 0) {
              if (Number(res.iId) >= 1) {
                this.modAddData.i_Id = res.iId
              }
              this.formRed = false
              this.$message.success(res.msg)
              // 重新调取接口渲染数据
              let params = this.$store.state.paginations['CC_VW_templateUrl']
              this.$set(
                params,
                'viewid',
                this.$store.state.fieRowTableData['CC_VW_templateUrl'].viewid
              )
              this.$emit('getTableData', params)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 弹框关闭回调事件
    closeDia () {
      this.$emit('getButtonConfig', false)
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.components-type-form {
  .content-box {
    height: 100%;
    border: 4px solid #abd6ff;
    .el-form {
      border: none !important;
      padding: 16px;
      .border-box {
        position: relative;
        border: 1px solid #bfbfbf;
        margin-top: 15px;
        padding: 16px 0;
        .conBox {
          margin-left: 20px;
        }
        &:first-of-type {
          margin-top: 0;
          height: 280px;
        }
        > span {
          position: absolute;
          top: -10px;
          left: 12px;
          padding: 0 8px;
          background: #ffffff;
        }
      }
    }
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .tabs-base-info
  .conBox
  /deep/.minInput
  .el-textarea__inner {
  height: 120px !important;
}
.bodyBorderBox {
  border: none !important;
}
</style>
