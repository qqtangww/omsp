<!-- 内容组件-视图组件-字段设置【基础、计算字段】-特殊列 -->
<template>
  <div class="add-modify-form">
    <div class="formOperateBox">
      <!-- 操作栏 -->
      <action-bar :configData="configData" @sumitForm="commit" v-on="$listeners"></action-bar>
    </div>
    <el-form inline-message ref="modAddData1" :rules="rules" :model="filedFormData">
      <el-form-item label="特殊列" label-width="70px" class="controlLiHei">
        <el-switch v-model="filedFormData.i_IsSpecialColumn" active-value="1" inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="请输入该特殊列的函数体:" label-width="166px"></el-form-item>
      <el-form-item label label-width="0" class="specialFun description-label">
        <el-input
          class="textareaBox"
          v-model="filedFormData.v_SpecialColumnFunc"
          placeholder='示例：
(function(rowData){
  return {condition:"params.row[params.column.property] === "result"",className: "specialColumnRed"}
})'
          type="textarea"
          :disabled="filedFormData.i_IsSpecialColumn !== '1'"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import actionBar from '@/components/stdDialog/actionBar'
import cgiService from '@/api/cgiService'
import util from '@/common/js/util'
// 小红点mixin
import windowRed from '@/common/js/mixins/windowRed'
import logMixin from '@/common/js/mixins/getLogParams'
import { mapState } from 'vuex'
export default {
  name: 'specialRowFiled_view',
  mixins: [windowRed, logMixin],
  props: {
    shareData: Object,
    configData: Object
  },
  data () {
    return {
      filedFormData: {
        i_IsSpecialColumn: '0',
        v_SpecialColumnFunc: ''
      },
      rules: {},
      formData: {},
      oldFiledFormData: {}
    }
  },
  watch: {
    filedFormData: {
      handler: function (data) {
        if (JSON.stringify(data) !== JSON.stringify(this.oldFiledFormData)) {
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
    let confsBtn = this.$store.state.confsBtn
    if (
      confsBtn.operationcode === 'modify' ||
      confsBtn.operationcode === 'modify_Count'
    ) {
      this.formData = this.$store.state.fieTableData
      util.initFormData(this.filedFormData, this.formData)
      this.$set(this.filedFormData, 'v_ViewID', this.formData.v_ViewID)
    }
    this.oldFiledFormData = Object.assign({}, this.filedFormData)
  },
  methods: {
    commit () {
      let params = {
        ...this.filedFormData
      }
      // 保存 时  取出VUEX Tab的必填项字段 并合并
      Object.assign(params, this.tabData['regin2'])
      // 判断是否需要记录日志
      if (this.buttonConfig.isrecordlog === '1') {
        params.logParams = this.getLogParams()
      }
      cgiService.addTemColumnList(params).then(res => {
        if (res.code === 0) {
          this.$message.success(res.msg)
          //  12/02 调整第一次添加数据  保存 刷新没数据
          // let resObj = {
          //   ...res
          // }
          // this.$set(resObj, 'v_ViewID', res.viewid)
          // 把 接口返回 的数据存到vuex
          // this.$store.commit('rowData', resObj)
          // 重新调取接口渲染数据
          let params = this.$store.state.paginations['CC_VW_viewField']
          this.$set(
            params,
            'viewid',
            this.$store.state.fieRowTableData['CC_VW_viewField'].viewid
          )
          this.$emit('getTableData', params)
          if (Number(res.iId) > 0) {
            // 把 基本信息的值  已对象的形式传值 => shareData 中
            let obj = {}
            obj.modAddData = params
            this.isReminder = true
            this.oldFiledFormData = Object.assign({}, params)
          }
        } else {
          this.$message.error(res.msg)
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
.add-modify-form {
  .el-form {
    padding: 0 10px !important;
    box-sizing: border-box;
    border: none !important;
  }
}
.controlLiHei {
  margin-top: 0px !important;
}
.specialFun {
  height: 465px;
  box-sizing: border-box;
  padding: 0 0 10px 0;
}
.specialFun /deep/ .el-form-item__content {
  height: 100%;
  .textareaBox {
    height: 100%;
  }
}
.formBox
  .el-dialog
  div.el-dialog__body
  .bodyBorderBox
  .specialFun
  /deep/
  .el-form-item__content
  textarea {
  height: 100% !important;
}
</style>
