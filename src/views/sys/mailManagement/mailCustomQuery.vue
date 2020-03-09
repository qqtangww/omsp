<!-- 邮件模板自定义查询 -->
<template>
<div class='custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="6">
               <el-form-item  class="w-240" label-width="80px" label="模板名称">
                <el-input v-model="formSearch.v_TemplateName" placeholder="请输入模板名称" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"> <div>&nbsp;</div> </el-col>
          <el-col :span="6">
            <el-form-item class="w-240" label-width="100px" label="邮件标题">
                <el-input v-model="formSearch.v_Title" placeholder="请输入邮件标题" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div></el-col>
          <el-col :span="4">
               <el-form-item label-width="50px">
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
// 导入mixins
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'mailCustomQuery',
  mixins: [customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      mailList: [],
      formSearch: {
        v_TemplateName: '',
        v_Title: ''
      },
      modelArr: []
    }
  },
  methods: {
    onSubmit () {
      // 需要查询的字段
      let queryKeyObj = {
        v_TemplateName: 't_sys_email_template.v_TemplateName',
        v_Title: 't_sys_email_template.v_Title'
      }
      let viewCode = this.viewId
      // mixins 中的公共方法   传入 查询的数据 查询的字段
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset () {
      this.formSearch.v_TemplateName = ''
      this.formSearch.v_Title = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>

<style scoped lang='scss'>
.custom-query {
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
        margin-left: 10px;
        /deep/ i{
          font-size: 14px;
        }
      }
    }
}
.custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.custom-query /deep/ .el-form-item__content {
  width: 100%
}
.custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
