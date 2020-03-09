<!-- 用户分组自定义查询【共享成员】 -->
<template>
   <div class="group-share-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='15'>
             <el-form-item  class="w-240" label-width="80px" label="共享成员">
                  <el-input v-model="formSearch.groupKeywords" placeholder="输入姓名、工号搜索用户" clearable @keydown.enter.native="onSubmit"></el-input>
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
  name: 'customSearchShare',
  props: {
    shareData: Object,
    configData: Object
  },
  mixins: [customQueryFun],
  data () {
    return {
      formSearch: {
        groupKeywords: ''
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
        searchQuery = `(t_sys_group_share_user.v_UserID LIKE '%${this.formSearch.groupKeywords}%' OR t_sys_user.v_UserName LIKE '%${this.formSearch.groupKeywords}%')`
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
// .searchBox {}
.group-share-custom-query {
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
.group-share-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.group-share-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
