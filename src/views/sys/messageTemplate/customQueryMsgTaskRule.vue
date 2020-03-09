<!-- 消息模板  绑定任务规则  自定义查询 -->
<template>
  <div class="rule-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='6'>
            <el-form-item label-width="110px" label="任务规则类型：">
              <el-select placeholder="请选择" v-model="formSearch.v_TaskRuleType" clearable>
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
            <el-form-item label-width="110px" label="任务规则编码：">
              <el-input v-model="formSearch.v_TaskRuleCode" placeholder="请输入任务规则编码" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='7'>
            <el-form-item label-width="110px" label="任务规则名称">
              <el-input v-model="formSearch.v_TaskRuleName" placeholder="请输入任务规则名称" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
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
  name: 'taskRuleSearch',
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
        v_TaskRuleName: '',
        v_TaskRuleType: '',
        v_TaskRuleCode: ''
      }
    }
  },
  created () {
    this.getEnum({ enumCode: ['taskCategory'] })
  },
  methods: {
    onSubmit () {
      // 需要查询的字段
      let queryKeyObj = {
        v_TaskRuleName: 't_sys_task_rule_base.v_TaskRuleName',
        v_TaskRuleType: 't_sys_task_rule_base.v_TaskRuleType',
        v_TaskRuleCode: 't_sys_task_rule_base.v_TaskRuleCode'
      }
      let viewCode = this.viewId
      // 传入查询的数据  到 mixins
      this.searchtableData(this.formSearch, queryKeyObj, viewCode)
    },
    reset (arr) {
      this.formSearch.v_TaskRuleName = ''
      this.formSearch.v_TaskRuleType = ''
      this.formSearch.v_TaskRuleCode = ''
      this.resetPagnations('', this.viewId)
    },
    getEnum (params) {
      cgiService.getEnumValues(params).then(res => {
        // 模板类型
        this.templateCategory = res.data['taskCategory']
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.rule-custom-query {
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
.rule-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.rule-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
