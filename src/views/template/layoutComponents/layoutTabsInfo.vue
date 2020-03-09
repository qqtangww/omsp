<!-- 布局组件-tab布局组件-基本信息 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData="configData"
        :shareData="formData"
        @sumitForm="commit"
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class="tabs-base-info">
      <el-form inline-message label-position="right" label-width="110px" :rules="rules" ref="ruleForm" :model="modAddData">
        <div class="border-box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 基本信息
          </span>
          <div class="conBox">
            <el-form-item label="Tab编码" prop="v_RegionCode">
              <el-input v-model="modAddData.v_RegionCode" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="Tab名称" prop="v_RegionName">
              <el-input v-model="modAddData.v_RegionName"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="v_Description" class='description-label'>
              <el-input
                v-model="modAddData.v_Description"
                placeholder="请输入表关系描述"
                type="textarea"
                class="minInput"
                :autosize="{ minRows: 2, maxRows: 4}"
              />
            </el-form-item>
          </div>
        </div>
        <div class="border-box">
          <span>
            <i class="iconfont icon-jibenxinxi"></i> 配置
          </span>
          <div class="conBox">
            <el-form-item label="模板名称" prop="v_TemplateCode">
              <el-select
                placeholder="默认"
                v-model="modAddData.v_TemplateCode"
                @focus="getTemplateUrl"
              >
                <el-option
                  v-for="item in templateURL"
                  :key="item.v_TemplateCode"
                  :label="item.v_TemplateName"
                  :value="item.v_TemplateCode"
                >
                  <span style="float: left">{{ item.v_TemplateName }}</span>
                  <span
                    style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.v_TemplateCode }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <div v-if="modAddData.v_TemplateCode === 'verticalTabs'">
              <el-form-item label="Tab标题">
                <el-input v-model="modAddData.v_TabTitle"></el-input>
              </el-form-item>
              <div id="verticalTabs">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="数值单位" label-width="110px" prop="i_tabDefaultUnit">
                      <el-radio-group v-model="modAddData.i_tabDefaultUnit">
                        <el-radio label="1">百分比</el-radio>
                        <el-radio label="2">像素值</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :push="3" :span="4">
                    <el-form-item label="拖拽调整区域" label-width="100px" prop="i_IsDropRegion">
                      <el-switch
                        v-model="modAddData.i_IsDropRegion"
                        active-color="#32c5d2"
                        inactive-color="#e6e7e8"
                        active-value="1"
                        inactive-value="0"
                      ></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="Tab默认宽度">
                      <el-input-number
                        v-model="modAddData.v_TabDefaultWidth"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="Tab最小宽度" label-width="105px">
                      <el-input-number
                        v-model="modAddData.v_TabMinWidth"
                        controls-position="right"
                        :min="0"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
            <el-form-item label="扩展接口" prop="v_ExtendedInterface">
              <el-input v-model="modAddData.v_ExtendedInterface"></el-input>
            </el-form-item>
            <el-form-item label="未选中标签样式" prop="v_UncheckClassName">
              <el-select placeholder="默认" v-model="modAddData.v_UncheckClassName" disabled>
                <el-option
                  v-for="item in tabsStyle"
                  :key="item.index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import cgiService from '@/api/cgiService'
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
export default {
  name: 'layoutTabsInfo',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object,
    formData: Object
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
        // tab编码
        v_RegionCode: '',
        // tab名称
        v_RegionName: '',
        // 描述
        v_Description: '',
        // 模板路径
        v_TemplateCode: '',
        // 竖形tabs标题
        v_TabTitle: '',
        // 默认单位
        i_tabDefaultUnit: '1',
        // 是否拖拽
        i_IsDropRegion: '',
        // tabs默认宽度
        v_TabDefaultWidth: '',
        // tabs最小宽度
        v_TabMinWidth: '',
        // 扩展接口
        v_ExtendedInterface: ''
      },
      rules: {
        v_RegionCode: [
          { required: true, message: '请输入Tab编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' },
          { validator: commonCode, trigger: 'blur' }
        ],
        v_RegionName: [
          { required: true, message: '请输入Tab名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不可超出50个字符', trigger: 'blur' }
        ],
        v_TemplateCode: [
          { required: true, message: '请选择模板路径', trigger: 'change' }
        ]
      },
      isDisabled: false,
      // 未选中标签样式
      tabsStyle: [],
      templateURL: [],
      oldModAddData: {},
      operationcode: ''
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        // 对比编辑前后数据 不一致出现小红点
        if (data.v_TemplateCode === 'verticalTabs') {
          this.oldModAddData.v_TabDefaultWidth = Number(
            this.oldModAddData.v_TabDefaultWidth
          )
          this.oldModAddData.v_TabMinWidth = Number(
            this.oldModAddData.v_TabMinWidth
          )
        }
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  created () {
    this.getTemplateUrl()
    this.operationcode = this.$store.state.confsBtn.operationcode
    if (this.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.modAddData.i_Id = formData.i_Id
      this.$store.commit('changeRowTabData', this.modAddData)
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_RegionCode }, { v_ComponentType: 'CR_TAB' })
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    // 给oldModAddData赋值
    this.oldModAddData = Object.assign({}, this.modAddData)
  },
  methods: {
    // 获取模板路径
    getTemplateUrl (val) {
      let id = 'CR_TAB'
      cgiService.getTemplateUrl(id).then(res => {
        this.templateURL = res.data
      })
    },
    commit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            this.modAddData.logParams = this.getLogParams()
          }
          let tabData = this.$store.state.tabData
          this.modAddData.v_CateCode = tabData.v_TabsFlagCode
          cgiService.saveLayoutInstance(this.modAddData).then(res => {
            if (res.code === 0) {
              if (this.operationcode === 'add') {
                // 如果是添加入口 让其它TAB数据调取新增这个实例的数据
                this.$store.commit('rowData', {
                  v_RegionCode: res.v_RegionCode
                })
              }
              if (res.iId) {
                this.modAddData.i_Id = res.iId
              }
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$message.success(res.msg)
              let params = this.$store.state.paginations
              this.$emit('getTableData', params['CC_VW_instanceTabs'])
              // 给oldModAddData赋值并且给isReminder赋值true
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
              // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
              let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_RegionCode }, { v_ComponentType: 'CR_TAB' })
              this.$set(currentTab, 'regin', 'regin1')
              this.$store.commit('changeRepetitionRowTabData', currentTab)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  },
  components: {
    actionBar
  }
}
</script>
<style lang="scss" scoped>
.tabs-base-info {
  overflow: auto;
  box-sizing: border-box;
  margin: 0;
  height: 100%;
  border: solid 5px #abd6ff;
  .el-form {
    height: 100%;
    margin: auto;
    padding: 10px;
    border: none !important;
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
        height: 210px;
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
#verticalTabs /deep/ .el-form-item__content {
  width: auto !important;
}
</style>
