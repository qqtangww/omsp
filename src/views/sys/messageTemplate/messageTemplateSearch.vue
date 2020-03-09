<!-- 消息模板自定义查询 -->
<template>
  <div class="message-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='6'>
            <el-form-item label-width="80px" label="模板类型">
              <el-select placeholder="请选择模板类型" v-model="formSearch.v_TemplateType" clearable>
                <el-option
                  v-for="(item,index) in templateCategory"
                  :key="index"
                  :label="item.v_EnumValue"
                  :value="item.v_EnumValueName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-form-item label-width="80px" label="模板编码">
              <el-input v-model="formSearch.v_TemplateCode" placeholder="请输入模板编码" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='7'>
            <el-form-item label-width="80px" label="模板名称">
              <el-input v-model="formSearch.v_TemplateName" placeholder="请输入模板名称" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='1'><div>&nbsp;</div> </el-col>
          <el-col :span='4'>
            <el-form-item label-width="40px">
              <div class="query-button">
                <el-button @click="onSubmit" icon="iconfont icon-sousuo">
                  查询
                </el-button>
                <el-button  @click="reset" icon="iconfont icon-gengxinjilu">
                  重置
                </el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>
<script>
import customQueryFun from '@/common/js/mixins/customQueryFun'
import cgiService from '@/api/cgiService'
export default {
  name: 'messageTemplateSearch',
  props: {
    configData: {
      type: Object
    },
    shareData: {
      type: Object
    }
  },
  mixins: [customQueryFun],
  data () {
    return {
      // 模板类型
      templateCategory: [],
      formSearch: {
        v_TemplateName: '',
        v_TemplateType: '',
        v_TemplateCode: ''
      }
    }
  },
  created () {
    this.getEnum({ enumCode: ['messageTemplateCateg'] })
  },
  methods: {
    onSubmit () {
      // 需要查询的字段
      let queryKeyObj = {
        v_TemplateName: 't_sys_message_template.v_TemplateName',
        v_TemplateType: 't_sys_message_template.v_TemplateType',
        v_TemplateCode: 't_sys_message_template.v_TemplateCode'
      }
      let viewCode = this.viewId
      // 传入查询的数据  到 mixins
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset (arr) {
      this.formSearch.v_TemplateName = ''
      this.formSearch.v_TemplateType = ''
      this.formSearch.v_TemplateCode = ''
      this.resetPagnations('', this.viewId)
    },
    getEnum (params) {
      cgiService.getEnumValues(params).then(res => {
        // 模板类型
        this.templateCategory = res.data['messageTemplateCateg']
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.message-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    width: 100%;
    min-width: 990px;
    max-width: 1280px;
    .el-form-item {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
  }
    .query-button{
      >button{
        height: 30px;
        padding: 0;
        width: 57px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        float: left;
        align-items: center;
        /deep/ i{
          font-size: 14px;
        }
      }
    }
}
.message-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.message-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
