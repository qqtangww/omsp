<!-- 数据字段-字段设置-自定义查询 -->
<template>
<div class='dictionaries-filed-custom-query'>
  <el-form inline-message ref="form" class="form-search" :model="formSearch">
      <div class="input-container clearfix">
        <el-row>
          <el-col :span="5">
            <el-form-item  class="w-240" label-width="60px" label="字段名">
              <el-input v-model="formSearch.v_FieldName" placeholder="请输入字段名" clearable @keydown.enter.native="onSubmit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="5">
             <el-form-item  class="w-240" label-width="70px" label="列标题">
                    <el-input v-model="formSearch.v_FieldTitle" placeholder="请输入列标题" clearable @keydown.enter.native="onSubmit"></el-input>
             </el-form-item>
          </el-col>
           <el-col :span="1"><div>&nbsp;</div> </el-col>
          <el-col :span="3">
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
export default {
  name: 'dictionariesFiledCustomQuery',
  mixins: [customQueryFun],
  props: {
    configData: Object,
    shareData: Object
  },
  data () {
    return {
      formSearch: {
        v_FieldName: '',
        v_FieldTitle: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let params = {}
      let searchQuery = ''
      //  把查询条件存入 对象
      for (const key in this.formSearch) {
        // 判断是否存在查询条件
        if (this.formSearch[key]) {
          if (key === 'v_FieldName') {
            params[key] = `t_sys_tables_fields.v_FieldName LIKE '%${this.formSearch.v_FieldName}%' `
          }
          if (key === 'v_FieldTitle') {
            params[key] = `t_sys_tables_fields.v_FieldTitle LIKE '%${this.formSearch.v_FieldTitle}%'`
          }
        }
      }
      // 拼接查询条件
      for (const key in params) {
        if (params[key]) {
          searchQuery += 'AND ' + params[key]
        }
      }
      // 切割  查询条件
      searchQuery = searchQuery.substring(3)
      let obj = {
        searchQuery: searchQuery,
        currentViewId: this.viewId
      }
      let sortInfo = this.$store.state.sortData[this.viewId]
      // 合并分页 跟 查询条件  方便操作后  带条件查询数据
      obj = Object.assign(this.$store.state.paginations[this.viewId], obj, { sortInfo })
      this.$set(obj, 'index', 1)
      this.$store.commit('getSearchData', obj)
      this.$store.commit('modifypaginations', obj)
      this.$emit('getTableData')
    },
    // 时间获取
    getStarAndEndTime (arr) {
      this.formSearch.d_CreateTime = arr[0]
      this.formSearch.d_CreateEndTime = arr[1]
    },
    reset (arr) {
      this.formSearch.v_FieldName = ''
      this.formSearch.v_FieldTitle = ''
      this.resetPagnations('', this.viewId)
    }
  }
}
</script>

<style scoped lang='scss'>
.dictionaries-filed-custom-query {
  overflow: hidden;
  .form-search {
    padding: 4px 0 0;
    width: 100%;
    min-width: 1010px;
    max-width: 1500px;
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
.dictionaries-filed-custom-query /deep/.el-date-editor .el-range__icon {
    line-height: 24px;
}
.dictionaries-filed-custom-query /deep/ .el-form-item__content {
  width: 100%
}
.dictionaries-filed-custom-query /deep/ .el-form-item__content .el-range-editor{
  width: 100%
}
</style>
