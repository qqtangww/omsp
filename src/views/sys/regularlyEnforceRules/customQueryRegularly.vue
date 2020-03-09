<!-- 新增、修改消息模板 -- 发送日志 -- 自定义查询 -->
<template>
  <div class="regularly-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="4">
            <el-form-item  label-width="100px" label="定期规则编码">
              <el-input v-model="formSearch.v_RuleCode" placeholder="请输入规则编码" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item  label-width="110px" label="定期规则名称" class="w-260" >
              <el-input v-model="formSearch.v_RuleName" placeholder="请输入规则名称" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-form-item label-width="60px">
                <div class="query-button">
                  <el-button @click="onSubmit" icon="iconfont icon-sousuo">
                    查询
                  </el-button>
                  <el-button @click="reset" icon="iconfont icon-gengxinjilu">
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
export default {
  name: 'conLogCustomQuery',
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
      formSearch: {
        v_RuleCode: '',
        v_RuleName: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let searchQuery = ''
      let params = {}
      for (const key in this.formSearch) {
        if (this.formSearch[key]) {
          if (key === 'v_RuleCode') {
            params[key] = ` t_sys_rule.v_RuleCode like '%${this.formSearch.v_RuleCode}%'`
          }
          if (key === 'v_RuleName') {
            params[key] = ` t_sys_rule.v_RuleName like '%${this.formSearch.v_RuleName}%'`
          }
        }
      }
      for (const key in params) {
        if (params[key]) {
          searchQuery += ' AND ' + params[key]
        }
      }
      // 去掉 拼接好的数据
      searchQuery = searchQuery.substring(5)
      let obj = {
        searchQuery: searchQuery,
        currentViewId: this.viewId
      }
      // 用于：点击查询回到第一页
      this.$emit('changeIndex', '1')
      let temporaryObj = Object.assign({}, this.viewParams[this.viewId], { index: 1 }, obj)
      this.$store.commit('modifypaginations', temporaryObj)
      // 调取接口
      this.$emit('getTableData')
    },
    reset (arr) {
      this.formSearch.v_RuleCode = ''
      this.formSearch.v_RuleName = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>
<style lang="scss" scoped>
.regularly-custom-query .form-search{
  padding: 4px 0 0;
}
</style>
