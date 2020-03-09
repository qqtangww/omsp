<template>
<div class="bodyBorderBox">
    <div class="components-type-form">
   <div class="formOperateBox">
      <el-button type="text" @click="closeDia">
        <i class="iconfont icon-tuichu"></i> 关闭
      </el-button>
      <el-badge :is-dot="isBadge" class="item">
        <el-button type="text" @click="commit('dialog')">
          <i class="iconfont icon-baocun"></i>保存
        </el-button>
      </el-badge>
    </div>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="tab-dialog configTabs">
        <el-tab-pane label="基本信息" name="first">
          <layout-tabs-info :infoData.sync='infoData' ref="tabsInfo" :templateURL='templateURL' :isDisabled="codeDisabled"></layout-tabs-info>
        </el-tab-pane>
        <el-tab-pane label="Tab标签"  name="second" :disabled="isDisable">
          <div class="tabs-field">
           <standardTable :configData='refreshData' :shareData='shareData' ></standardTable>
         </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    </div>
    </div>
</template>
<script>
import layoutTabsInfo from '@/views/template/layoutComponents/layoutTabsInfo'
import standardTable from '@/components/stdTable/stdTableAction'
import cgiService from '@/api/cgiService'
export default {
  name: 'layout-tabs',
  props: {
    configData: Object,
    shareData: Object,
    ifDialog: Boolean
  },
  data () {
    return {
      activeName: 'first',
      isBadge: false,
      isDisable: true,
      codeDisabled: false,
      modAddData: {},
      infoData: {
        viewId: ''
      },
      refreshData: {},
      templateURL: []
    }
  },
  watch: {
    infoData: {
      deep: true,
      handler (data) {
        // if (data) {
        //   this.$set(this.infoData, 'viewId', 'CC_VW_dictionariesFields')
        // }
      }
    },
    ifDialog: {
      handler: function (val) {
        this.$set(this.infoData, 'viewId', 'CC_VW_TabIstant')
        this.refreshData = {
          ...this.infoData
        }
        this.refreshData.viewid = this.infoData.viewId
        sessionStorage['refreshPageData'] = JSON.stringify(this.refreshData)
        let confsBtn = this.$store.state.confsBtn
        // 判断是否是修改数据
        if (confsBtn.operationcode === 'modify') {
          // 获取vuex存的单前行数据
          let formData = this.$store.state.fieTableData
          this.infoData = Object.assign({}, formData)

          this.isDisable = false
          this.codeDisabled = true
          this.getTemplateUrl()
        } else {
          this.getTemplateUrl()
          this.getPreinstall()
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleClick (ev) {

    },
    commit () {
      this.$refs.tabsInfo.$refs.ruleForm.validate(valid => {
        if (valid) {
          // this.infoData.v_CateCode = this.configData.v_TabsFlagCode
          let tabData = this.$store.state.tabData
          this.infoData.v_CateCode = tabData.v_TabsFlagCode
          cgiService.saveLayoutInstance(this.infoData).then(res => {
            if (res.code === 0) {
              this.$message.success(res.msg)
              let params = this.$store.state.paginations
              this.$emit('getTableData', params)
              this.isDisable = false
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 获取模板路径
    getTemplateUrl () {
      let id = 'CR_TAB'
      cgiService.getTemplateUrl(id).then(res => {
        this.$nextTick(() => {
          this.templateURL = res.data
        })
      })
    },
    // 获取模板预设值
    getPreinstall () {
      let tabData = this.$store.state.tabData
      cgiService.getTemplatePreinstall(tabData.v_TabsFlagCode).then(res => {
        // 设置模板路径预设
        if (res.data.templateData === '{}') {
          this.infoData.v_TemplateCode = ''
        } else {
          this.$nextTick(() => {
            // this.infoData.v_TemplateCode = res.data.templateData.v_TemplateCode
            this.$set(this.infoData, 'v_TemplateCode', res.data.templateData.v_TemplateCode)
          })
        }
      })
    },
    // 弹框关闭回调函数
    closeDia () {
      this.codeDisabled = false
      this.$emit('getButtonConfig', false)
    }
  },
  components: {
    layoutTabsInfo,
    standardTable
  }
}
</script>
<style lang="scss" scoped>
  .layout-tabs {
    .tabs-field {
      border: 4px solid #ABD6FF;
    }
  }
  .layout-tabs .tabs-field /deep/ .contentTable {
      height: 394px !important;
      .el-table__fixed-right-patch {
        background: #F7F7F7 !important;
      }
      .el-table__body-wrapper {
        height: 92%;
      }
  }
</style>
