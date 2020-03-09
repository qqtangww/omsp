<!-- 枚举管理自定义查询【枚举类型】 -->
<template>
   <div class="enum-type-custom-query">
    <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span='15'>
             <el-form-item  label-width="80px" label="关联表名">
                  <el-input v-model="formSearch.v_SubTableName" placeholder="输入关联表名" clearable @keydown.enter.native="onSubmit"></el-input>
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
import customQueryFun from '@/common/js/mixins/customQueryFun'
export default {
  name: 'newEnumTypeSearch',
  props: {
    shareData: Object,
    configData: Object
  },
  mixins: [customQueryFun],
  data () {
    return {
      formSearch: {
        v_SubTableName: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let searchQuery = ''
      if (this.formSearch.v_SubTableName !== '') {
        searchQuery = `t_sys_tables_relation.v_SubTableName LIKE '%${this.formSearch.v_SubTableName}%'`
      }
      let obj = {
        searchQuery: searchQuery,
        currentViewId: this.viewId
      }

      let sortInfo = this.$store.state.sortData[this.viewId]
      // 合并分页 跟 查询条件  方便操作后  带条件查询数据
      obj = Object.assign(this.$store.state.paginations[this.viewId], obj, { sortInfo })

      this.$set(obj, 'index', 1)
      this.$emit('getTableData')
      this.$store.commit('modifypaginations', obj)
    },
    reset () {
      this.formSearch.v_SubTableName = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>
<style lang="scss" scoped>
.enum-type-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    min-width: 340px;
    max-width: 600px;
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
.enum-type-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.enum-type-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
