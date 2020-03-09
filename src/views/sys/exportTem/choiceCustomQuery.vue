<!-- 用户分组自定义查询【分组成员】 -->
<template>
   <div class="group-grouping-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='15'>
             <el-form-item  class="w-240" label-width="50px" label="用户:">
                  <el-input v-model="formSearch.groupKeywords" placeholder="请输入用户帐号或用户名" clearable @keydown.enter.native="onSubmit"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span='1'><div>&nbsp;</div> </el-col>
          <el-col :span='8'>
              <el-form-item label-width="0px">
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
import { mapState } from 'vuex'
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'customSearchGroup',
  props: {
    shareData: Object,
    configData: Object
  },
  watch: {
    shareData: {
      handler: function (val) {
        if (val.v_GrpCode) {
          this.groupCode = val.v_GrpCode
        }
      },
      deep: true,
      immediate: true
    }
  },
  mixins: [customQueryFun],
  data () {
    return {
      formSearch: {
        groupKeywords: '',
        groupCode: ''
      }
    }
  },
  computed: {
    ...mapState({
      viewParams: state => state.paginations
    })
  },
  methods: {
    onSubmit () {
      let searchQuery = ''
      if (this.formSearch.groupKeywords !== '') {
        searchQuery = `(t_sys_user.v_UserID LIKE '%${this.formSearch.groupKeywords}%' OR t_sys_user.v_UserName LIKE '%${this.formSearch.groupKeywords}%')`
      }
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
    reset () {
      this.formSearch.groupKeywords = ''
      this.searchQuery = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>
<style lang="scss" scoped>
.group-grouping-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    min-width: 400px;
    width: 100%;
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
        width: 50px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        float: left;
        align-items: center;
        /deep/ i{
          font-size: 12px;
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
