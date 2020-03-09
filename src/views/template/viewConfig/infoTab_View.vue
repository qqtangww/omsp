<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 14:40:56
 * @LastEditTime: 2019-10-09 15:55:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar
        :configData='configData'
        :shareData='formData'
        @sumitForm='commit'
        v-on="$listeners"
      ></action-bar>
    </div>
    <div class="infoBox">
      <el-form inline-message ref='modAddDatas' :rules="rules" :model="modAddData" label-width="110px">
        <div class="basicInfoBox">
          <el-form-item
            label="视图编码"
            prop="v_ViewID"
          >
            <el-input v-model="modAddData.v_ViewID" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item
            label="视图名称"
            prop="v_ViewName"
          >
            <el-input v-model="modAddData.v_ViewName"></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="v_ViewCName"
            class='description-label'>
            <el-input
              class='textareaBox'
              v-model="modAddData.v_ViewCName"
              placeholder="可填写相关描述，帮助用户记忆和了解"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item
            label="SQL查询"
            id="viewText"
            class="flexibleParameter description-label"
            prop="v_SQLString"
          >
           <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
                <span class="flexibleIcon1">
                    <i class="iconfont icon-dongcanbiaoshi"></i>
                </span>
              </el-tooltip>
            <el-input
              v-model="modAddData.v_SQLString"
              placeholder="请输入SQL语句"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item
            label="查询条件"
            id="viewText"
            class="flexibleParameter description-label"
            prop="v_PreCondition"
          >
             <el-tooltip class="item" effect="dark" content="输入动参" placement="top">
                <span class="flexibleIcon1">
                    <i class="iconfont icon-dongcanbiaoshi"></i>
                </span>
              </el-tooltip>
            <el-input
              v-model="modAddData.v_PreCondition"
              placeholder=""
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item
            label="模板名称"
            prop="v_TemplateCode"
          >
            <el-select
              v-model="modAddData.v_TemplateCode"
              filterable
              clearable
              @focus="getTemplateUrl()"
            >
              <el-option
                v-for="item in templateUrl"
                :key="item.i_Id"
                :label="item.v_TemplateName"
                :value="item.v_TemplateCode"
              >
                <span style="float: left">{{ item.v_TemplateName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.v_TemplateCode }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扩展接口" prop="v_SelectQueryInterFace">
            <el-input v-model="modAddData.v_SelectQueryInterFace"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'infoTab_View',
  mixins: [windowRed, logMixin],
  props: {
    configData: Object,
    shareData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      modAddData: {
        // 视图编码
        v_ViewID: '',
        // 视图名称
        v_ViewName: '',
        // 描述
        v_ViewCName: '',
        // SQL查询
        v_SQLString: '',
        // 查询条件
        v_PreCondition: '',
        // 模板名称
        v_TemplateCode: '',
        // 扩展接口
        v_SelectQueryInterFace: ''
      },
      flag: false,
      formData: {},
      // 表单规则
      rules: {
        v_ViewID: [
          { required: true, message: '请输入视图编码', trigger: 'blur' }
        ],
        v_ViewName: [
          { required: true, message: '请输入视图名称', trigger: 'blur' }
        ],
        v_SQLString: [
          { required: true, message: '请输入SQL查询', trigger: 'blur' }
        ],
        // v_PreCondition: [
        //   { required: true, message: '请输入查询条件', trigger: 'blur' }
        // ],
        v_TemplateCode: [
          { required: true, message: '请选择模板', trigger: 'change' }
        ]
      },
      // 模板路径数据
      templateUrl: [],
      // 禁用 视图编码
      isDisabled: false,
      oldModAddData: {},
      operationcode: ''
    }
  },
  watch: {
    modAddData: {
      handler: function (data) {
        if (JSON.stringify(this.oldModAddData) !== JSON.stringify(data)) {
          this.isReminder = false
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapState({
      tabData: state => state.repetitionRowTabData
    })
  },
  created () {
    this.operationcode = this.$store.state.confsBtn.operationcode
    if (this.operationcode === 'modify') {
      this.isDisabled = true
      let formData = this.$store.state.fieTableData
      util.initFormData(this.modAddData, formData)
      this.$set(this.modAddData, 'i_Id', formData.i_Id)
      // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
      let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_ViewID }, { v_ComponentType: 'CC_VW' })
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    } else {
      let currentTab = {}
      this.$set(currentTab, 'regin', 'regin1')
      this.$store.commit('changeRepetitionRowTabData', currentTab)
    }
    this.oldModAddData = Object.assign({}, this.modAddData)
    this.getTemplateUrl()
  },
  methods: {
    // 获取模板路径
    getTemplateUrl () {
      let id = 'CC_VW'
      cgiService.getTemplateUrl(id).then(res => {
        this.templateUrl = res.data
      })
    },
    // 提交
    commit () {
      let params = {
        ...this.modAddData
      }
      this.$refs.modAddDatas.validate(valid => {
        if (valid) {
          delete params.activeName
          delete params.viewid
          // 判断是否需要记录日志
          if (this.buttonConfig.isrecordlog === '1') {
            params.logParams = this.getLogParams()
          }
          cgiService.saveViewData(params).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              if (this.operationcode === 'add') {
                // 如果是添加入口 让其它TAB数据调取新增这个实例的数据
                this.$store.commit('rowData', { viewid: res.viewid })
              }
              let resObj = {
                ...res
              }
              // tab置灰
              this.$emit('changeFlag', { isDisabled: false })
              this.$set(resObj, 'v_ViewID', res.viewid)
              this.$set(resObj, 'viewName', params.v_ViewName)
              // 把 接口返回 的数据存到vuex
              this.$store.commit('rowData', resObj)
              if (Number(res.iId) > 0) {
                this.modAddData.i_Id = res.iId
                params.i_Id = res.iId
                let data = {
                  ...this.modAddData
                }
                this.$set(data, 'viewid', this.modAddData.v_ViewID)
                this.$store.commit('nestTableRowData', data)
              }
              // 把修改的数据存入vuex中  方便返回给其他的Tab页【方便组参数保存调取数据】
              let currentTab = Object.assign({}, this.modAddData, { code: this.modAddData.v_ViewID }, { v_ComponentType: 'CC_VW' })
              this.$set(currentTab, 'regin', 'regin1')
              this.$store.commit('changeRepetitionRowTabData', currentTab)

              // 拉取默认分页配置 paginations
              let pageConfig = this.$store.state.paginations
              this.$emit('getTableData', pageConfig['CC_VW_contentView'])
              this.isReminder = true
              this.oldModAddData = Object.assign({}, this.modAddData)
            } else {
              this.$message.error(res.msg)
            }
          })
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
  .infoBox {
    overflow: auto;
    height: 100%;
    .el-form {
      height: 100%;
      padding: 0px 80px 16px 50px;
      border: none !important;
      box-sizing: border-box;
      margin: auto;
      overflow: auto;
      .basicInfoBox {
        width: 729px;
        margin:  0 auto;
        padding: 10px 0;
      }
      .flexibleIcon1  {
        left: -30px;
      }
    }
  }
}
#viewText {
  /deep/ .el-textarea textarea {
    min-height: 200px!important;
  }
}
.el-form .el-form-item .flexibleIcon1   {
  top: 50%;
  transform: translateY(-50%)
}
</style>
